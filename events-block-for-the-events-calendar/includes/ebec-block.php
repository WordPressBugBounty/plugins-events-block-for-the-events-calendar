<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class EBEC_Register_Block {


	private static $instance = null;

	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

		/**
		 * Constructor.
		 *
		 * @access private
		 */
	private function __construct() {
		add_action( 'init', array( $this, 'ebec_register_block' ) );
	}

		/**
		 * Register block styles/scripts (handles only) and block from block.json.
		 * WordPress loads CSS via block.json style / editorStyle — no manual enqueue.
		 */
	public function ebec_register_block() {
		if ( ! function_exists( 'register_block_type_from_metadata' ) ) {
			return;
		}

			$asset_file = EBEC_PATH . 'dist/index.asset.php';
			$asset      = file_exists( $asset_file )
				? include $asset_file
				: array(
					'dependencies' => array(),
					'version'      => EBEC_VERSION,
				);

			$script_deps = array_unique(
				array_merge(
					isset( $asset['dependencies'] ) ? (array) $asset['dependencies'] : array(),
					array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-block-editor' )
				)
			);
			$version     = isset( $asset['version'] ) ? $asset['version'] : EBEC_VERSION;

			wp_register_script(
				'ebec-event-list-editor-script',
				EBEC_URL . 'dist/index.js',
				$script_deps,
				$version,
				true
			);

			wp_localize_script(
				'ebec-event-list-editor-script',
				'ebecBlockData',
				array(
					'excerptWords' => defined( 'EBEC_EXCERPT_WORDS' ) ? (int) EBEC_EXCERPT_WORDS : 55,
					'locale'       => get_locale(),
				)
			);

			wp_register_style(
				'ebec-event-list-style',
				EBEC_URL . 'dist/style-index.css',
				array(),
				$version
			);

			// Attributes live only in block.json — single source of truth.
			register_block_type_from_metadata(
				EBEC_PATH,
				array(
					'render_callback' => array( $this, 'ebec_render_function' ),
				)
			);
	}

	/**
	 * Render Callback
	 */
	public function ebec_render_function( $attributes ) {

		// Runtime date defaults (cannot be static in block.json). Site-local via wp_date().
		if ( empty( $attributes['ebec_date_range_start'] ) ) {
			$attributes['ebec_date_range_start'] = wp_date( 'Y-m-d H:i' );
		}
		if ( empty( $attributes['ebec_date_range_end'] ) ) {
			$attributes['ebec_date_range_end'] = wp_date( 'Y-m-d H:i', strtotime( '+6 months' ) );
		}

		$ebec_block_id = isset( $attributes['ebec_block_id'] ) ? sanitize_key( wp_unslash( $attributes['ebec_block_id'] ) ) : '';
		$error         = "<div class='ebec_error'>" . esc_html( $attributes['no_event_text'] ) . '</div>';
		$all_events    = tribe_get_events( $this->build_event_query_args( $attributes ) );

		if ( empty( $all_events ) ) {
			return $error;
		}

		$this->enqueue_block_fonts( $attributes, $ebec_block_id );

		return $this->render_event_list( $all_events, $attributes, $ebec_block_id );
	}

	/**
	 * Build tribe_get_events() arguments from block attributes.
	 *
	 * @param array $attributes Block attributes.
	 * @return array
	 */
	private function build_event_query_args( $attributes ) {
		$tax_query         = '';
		$time_range        = ebec_fetch_start_end_time( $attributes );
		$start_time        = (array) $time_range[0];
		$end_time          = (array) $time_range[1];
		$meta_date_compare = '>=';
		$meta_key          = '_EventStartDate';
		$meta_date         = '';

		if ( $attributes['ebec_type'] == 'past' ) {
			$meta_date_compare = '<';
		} elseif ( $attributes['ebec_type'] == 'all' ) {
			$meta_date_compare = '';
		}

		if ( '' !== $meta_date_compare ) {
			$meta_date = array(
				array(
					'key'     => '_EventEndDate',
					'value'   => current_time( 'Y-m-d H:i:s' ),
					'compare' => $meta_date_compare,
					'type'    => 'DATETIME',
				),
			);
		}

		if ( ! empty( $attributes['ebec_ev_category'] ) && ! in_array( 'all', $attributes['ebec_ev_category'] ) ) {
			$tax_query = array(
				array(
					'taxonomy' => 'tribe_events_cat',
					'field'    => 'slug',
					'terms'    => $attributes['ebec_ev_category'],
				),
			);

		}

		$order = ( isset( $attributes['ebec_order'] ) && in_array( strtoupper( $attributes['ebec_order'] ), array( 'ASC', 'DESC' ), true ) )
			? strtoupper( $attributes['ebec_order'] )
			: 'ASC';
		$max_events = isset( $attributes['ebec_max_events'] )
			? absint( $attributes['ebec_max_events'] )
			: 10;

		return array(
			'start_date'     => $start_time['date'],
			'end_date'       => $end_time['date'],
			'order'          => $order,
			'orderby'        => 'event_date',
			'posts_per_page' => $max_events,
			//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_key'       => $meta_key,
			//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
			'meta_query'     => $meta_date,
			//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'      => $tax_query,
		);
	}

	/**
	 * Enqueue Google Fonts used by the block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $block_id   Sanitized block id.
	 */
	private function enqueue_block_fonts( $attributes, $block_id ) {
		$font_family_array = array(
			$attributes['event_title_family'],
			$attributes['event_venue_family'],
			$attributes['event_description_family'],
			$attributes['event_date_family'],
			$attributes['event_link_family'],
		);
		$sanitized_fonts   = array_map(
			function( $font ) {
				return rawurlencode( sanitize_text_field( $font ) );
			},
			array_filter( $font_family_array )
		);

		$build_url  = 'https://fonts.googleapis.com/css?family=';
		$build_url .= implode( '|', $sanitized_fonts );
		wp_enqueue_style(
			'ebec-google-font-' . $block_id,
			esc_url( $build_url ),
			array(),
			EBEC_VERSION,
			'all'
		);
	}

	/**
	 * Render the full event list markup.
	 *
	 * @param array  $events     Event posts.
	 * @param array  $attributes Block attributes.
	 * @param string $block_id   Sanitized block id.
	 * @return string
	 */
	private function render_event_list( $events, $attributes, $block_id ) {
		$category = implode(
			',',
			array_map(
				'sanitize_title',
				(array) ( isset( $attributes['ebec_ev_category'] ) ? $attributes['ebec_ev_category'] : array() )
			)
		);

		$allowed_layouts = array( 'default', 'minimal' );
		$layout          = isset( $attributes['event_layout'] )
			? sanitize_text_field( $attributes['event_layout'] )
			: 'default';
		$layout          = in_array( $layout, $allowed_layouts, true ) ? $layout : 'default';
		$layout_cls      = 'ebec-' . $layout . '-list';
		$desc_type       = isset( $attributes['event_desc_type'] ) ? $attributes['event_desc_type'] : 'short';

		$style          = EBEC_Style_Settings::from_attributes( $attributes );
		$ebec_selectors = EBEC_Style_Settings::build_selectors( $block_id, $style );

		$ebec_html = '';
		if ( '' !== $ebec_selectors ) {
			$ebec_html .= '<style id="ebec-block-style-' . esc_attr( $block_id ) . '">' . $ebec_selectors . '</style>';
		}
		$ebec_html .= '<!---------- Event List Block Version:' . esc_html( EBEC_VERSION ) . ' By Cool Plugins Team-------------->';
		$ebec_html .= '<div id="ebec-events-list-content" class="ebec-list-wrapper ebec-block-' . esc_attr( $block_id ) . '">';
		$ebec_html .= '<div id="' . esc_attr( $layout_cls ) . '-wrp" class="' . esc_attr( $layout_cls ) . '-wrapper ' . esc_attr( $category ) . '">';

		$display_month  = '';
		$display_year   = '';
		$display_header = true;

		foreach ( $events as $event ) {
			$event_id    = absint( $event->ID );
			$event_year  = tribe_get_start_date( $event_id, false, 'Y' );
			$event_month = tribe_get_start_date( $event_id, false, 'm' );

			if ( $display_year === $event_year ) {
				if ( $display_month === $event_month ) {
					$display_header = false;
				} else {
					$display_month  = $event_month;
					$display_header = true;
				}
			} else {
				$display_year   = $event_year;
				$display_month  = $event_month;
				$display_header = true;
			}

			$ebec_html .= $this->render_event_item(
				$event_id,
				$this->get_event_data( $event_id ),
				$attributes,
				$layout,
				$desc_type,
				$display_header
			);
		}

		$ebec_html .= '</div></div>';
		return $ebec_html;
	}

	/**
	 * Render a single event row via the list layout template.
	 *
	 * @param int    $event_id        Event ID.
	 * @param array  $event_value     Prepared event data.
	 * @param array  $attributes      Block attributes.
	 * @param string $layout          Layout key.
	 * @param string $desc_type       Description type.
	 * @param bool   $display_header  Whether to show month header.
	 * @return string
	 */
	private function render_event_item( $event_id, $event_value, $attributes, $layout, $desc_type, $display_header ) {
		$context = array(
			'event_id'        => $event_id,
			'event_value'     => $event_value,
			'attributes'      => $attributes,
			'layout'          => $layout,
			'desc_type'       => $desc_type,
			'display_header'  => $display_header,
		);

		return $this->load_list_layout( $context );
	}

	/**
	 * Include the list layout with an isolated $context contract.
	 *
	 * @param array $context Explicit template data.
	 * @return string
	 */
	private function load_list_layout( array $context ) {
		$template = EBEC_PATH . '/Layouts/list/ebec-list-layout.php';

		return ( static function ( array $context ) use ( $template ) {
			$html = '';
			include $template;
			return $html;
		} )( $context );
	}

	/**
	 * Build the event data array used by the list layout.
	 *
	 * @param int $event_id Event ID.
	 * @return array
	 */
	public function get_event_data( $event_id ) {
		$event_value_filter = array();

		$event_value_filter['venue_details'] = tribe_get_venue_details( $event_id );
		if ( ! empty( $event_value_filter['venue_details']['address'] ) && isset( $event_value_filter['venue_details']['linked_name'] ) ) {
			$event_value_filter['have_venue_address'] = true;
		} else {
			$event_value_filter['have_venue_address'] = false;
		}
		$event_value_filter['event_start_date_details_year']  = tribe_get_start_date( $event_id, false, 'Y' );
		$event_value_filter['event_start_date_details_month'] = tribe_get_start_date( $event_id, false, 'm' );
		$event_value_filter['event_start_date_details_day']   = tribe_get_start_date( $event_id, false, 'd' );
		$event_value_filter['event_title']                    = get_the_title( $event_id );
		$event_value_filter['event_description']              = tribe_get_the_content( null, true, $event_id );
		$event_value_filter['event_cost']                     = tribe_get_cost( $event_id, true );
		$event_value_filter['event_url']                      = tribe_get_event_link( $event_id );
		$event_value_filter['image']                          = tribe_event_featured_image( $event_id, 'full', false, false );
		return $event_value_filter;
	}
}

/**
 * Returns the block registration singleton.
 *
 * Prefer EBEC_Register_Block::get_instance() in new code.
 *
 * @return EBEC_Register_Block
 */
function ebec_get_block_instance() {
	return EBEC_Register_Block::get_instance();
}
ebec_get_block_instance();
