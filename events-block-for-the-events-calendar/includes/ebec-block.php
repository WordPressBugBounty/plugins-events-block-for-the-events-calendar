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

			wp_register_style(
				'ebec-event-list-style',
				EBEC_URL . 'dist/style-index.css',
				array(),
				$version
			);

			// editorStyle ensures CSS loads in the apiVersion 3 editor iframe
			// even on empty posts before the block is inserted.
			

			$attributes = array(
				'ebec_ev_category' => array(
					'type' => 'array',
					'default' => array('all')
				),
				'ebec_max_events' => array(
					'type' => 'string',
					'default' => '10'
				),
				'ebec_block_id' => array(
					'type' => 'string',
					'default' => ''
				),
				'ebec_venue' => array(
					'type' => 'string',
					'default' => 'no'
				),
				'ebec_display_cate' => array(
					'type' => 'string',
					'default' => 'yes'
				),
				'ebec_display_desc' => array(
					'type' => 'string',
					'default' => 'yes'
				),
				'ebec_type' => array(
					'type' => 'string',
					'default' => 'all'
				),
				'ebec_hide_read_more_link' => array(
					'type' => 'string',
					'default' => 'yes'
				),
				'ebec_date_formats' => array(
					'type' => 'string',
					'default' => 'MD,YT'
				),
				'ebec_order' => array(
					'type' => 'string',
					'default' => 'ASC'
				),
				'ebec_event_source' => array(
					'type' => 'boolean',
					'default' => false
				),
				'main_skin_color' => array(
					'type' => 'string',
					'default' => '#00445e'
				),
				'event_date_color' => array(
					'type' => 'string',
					'default' => '#00445e'
				),
				'event_title_color' => array(
					'type' => 'string',
					'default' => '#00445e'
				),
				'event_venue_color' => array(
					'type' => 'string',
					'default' => '#00445e'
				),
				'event_description_color' => array(
					'type' => 'string',
					'default' => '#515d64'
				),
				'event_link_color' => array(
					'type' => 'string',
					'default' => '#00445e'
				),
				'event_date_font' => array(
					'type' => 'number',
					'default' => 15
				),
				'event_title_font' => array(
					'type' => 'number',
					'default' => 26
				),
				'event_venue_font' => array(
					'type' => 'number',
					'default' => 15
				),
				'event_description_font' => array(
					'type' => 'number',
					'default' => 13
				),
				'event_link_font' => array(
					'type' => 'number',
					'default' => 16
				),
				'event_date_family' => array(
					'type' => 'string',
					'default' => 'Abel'
				),
				'event_date_weight' => array(
					'type' => 'string',
					'default' => 'bold'
				),
				'event_date_transform' => array(
					'type' => 'string',
					'default' => 'none'
				),
				'event_date_style' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_date_decoration' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_date_line_height' => array(
					'type' => 'number',
					'default' => 18
				),
				'event_date_letter_spacing' => array(
					'type' => 'number',
					'default' => 0
				),
				'event_title_family' => array(
					'type' => 'string',
					'default' => 'Abel'
				),
				'event_title_weight' => array(
					'type' => 'string',
					'default' => 'bold'
				),
				'event_title_transform' => array(
					'type' => 'string',
					'default' => 'none'
				),
				'event_title_style' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_title_decoration' => array(
					'type' => 'string',
					'default' => 'underline'
				),
				'event_title_line_height' => array(
					'type' => 'number',
					'default' => 'initial'
				),
				'event_title_letter_spacing' => array(
					'type' => 'number',
					'default' => 0
				),
				'event_venue_family' => array(
					'type' => 'string',
					'default' => 'Abel'
				),
				'event_venue_weight' => array(
					'type' => 'string',
					'default' => 'bold'
				),
				'event_venue_transform' => array(
					'type' => 'string',
					'default' => 'none'
				),
				'event_venue_style' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_venue_decoration' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_venue_line_height' => array(
					'type' => 'number',
					'default' => 'initial'
				),
				'event_venue_letter_spacing' => array(
					'type' => 'number',
					'default' => 0
				),
				'event_description_family' => array(
					'type' => 'string',
					'default' => 'Abel'
				),
				'event_description_weight' => array(
					'type' => 'string',
					'default' => 'bold'
				),
				'event_description_transform' => array(
					'type' => 'string',
					'default' => 'none'
				),
				'event_description_style' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_description_decoration' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_description_line_height' => array(
					'type' => 'number',
					'default' => 'initial'
				),
				'event_description_letter_spacing' => array(
					'type' => 'number',
					'default' => 0
				),
				'event_link_family' => array(
					'type' => 'string',
					'default' => 'Abel'
				),
				'event_link_weight' => array(
					'type' => 'string',
					'default' => 'normal'
				),
				'event_link_transform' => array(
					'type' => 'string',
					'default' => 'none'
				),
				'event_link_style' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_link_decoration' => array(
					'type' => 'string',
					'default' => 'initial'
				),
				'event_link_line_height' => array(
					'type' => 'number',
					'default' => 1.5
				),
				'event_link_letter_spacing' => array(
					'type' => 'number',
					'default' => 0
				),
				'event_link_name' => array(
					'type' => 'string',
					'default' => 'Find out More'
				),
				'no_event_text' => array(
					'type' => 'string',
					'default' => 'There is No Event'
				),
				'isPreview' => array(
					'type' => 'boolean',
					'default' => false
				),
				'event_layout' => array(
					'type' => 'string',
					'default' => 'default'
				),
				'event_desc_type' => array(
					'type' => 'string',
					'default' => 'short'
				),
				'event_header_type' => array(
					'type' => 'string',
					'default' => 'show_header'
				),
				'event_simple_color' => array(
					'type' => 'string',
					'default' => '#99d6b6'
				),
				'event_featured_color' => array(
					'type' => 'string',
					'default' => '#66baff'
				)
			);

			$settings = array_merge(
				$attributes,
				array(
					'ebec_date_range_start' => array(
						'type'    => 'string',
						'default' => gmdate( 'Y-m-d H:i', current_time( 'timestamp', 0 ) ),
					),
					'ebec_date_range_end'   => array(
						'type'    => 'string',
						'default' => gmdate( 'Y-m-d H:i', strtotime( '+6 months', current_time( 'timestamp', 0 ) ) ),
					),
				)
			);

			register_block_type_from_metadata(
				EBEC_PATH,
				array(
					'render_callback' => array( $this, 'ebec_render_function' ),
					'attributes'      => $settings,
				)
			);
	}

		/**
		 * Render Callback
		 */
	public function ebec_render_function( $attributes ) {

			$tax_query         = '';
			$ebec_block_id     = isset( $attributes['ebec_block_id'] ) ? sanitize_key(wp_unslash(($attributes['ebec_block_id']))) : '';
			$error             = "<div class='ebec_error'>" . esc_html( $attributes['no_event_text'] ) . '</div>';
			$category = implode(
				',',
				array_map(
					'sanitize_title',
					(array) ( isset( $attributes['ebec_ev_category'] ) ? $attributes['ebec_ev_category'] : array() )
				)
			);
			$time_range        = ebec_fetch_start_end_time( $attributes );
			$start_time        = (array) $time_range[0];
			$end_time          = (array) $time_range[1];
			$meta_date_compare = '>=';
			$attributes['key'] = '_EventStartDate';
		if ( $attributes['ebec_type'] == 'past' ) {
			$meta_date_compare = '<';
		} elseif ( $attributes['ebec_type'] == 'all' ) {
			$meta_date_compare = '';
		}
			$attributes['key']       = '_EventStartDate';
			$attributes['meta_date'] = '';
			$meta_date_date          = '';
		if ( '' !== $meta_date_compare ) {
			$meta_date_date          = current_time( 'Y-m-d H:i:s' );
			$attributes['key']       = '_EventStartDate';
			$attributes['meta_date'] = array(
				array(
					'key'     => '_EventEndDate',
					'value'   => $meta_date_date,
					'compare' => $meta_date_compare,
					'type'    => 'DATETIME',
				),
			);
		}
		if ( ! empty( $attributes['ebec_ev_category'] ) ) {
			if ( ! in_array( 'all', $attributes['ebec_ev_category'] ) ) {
				$tax_query = array(
					array(
						'taxonomy' => 'tribe_events_cat',
						'field'    => 'slug',
						'terms'    => $attributes['ebec_ev_category'],
					),
				);
			}
		}
		$order = ( isset( $attributes['ebec_order'] ) && in_array( strtoupper( $attributes['ebec_order'] ), array( 'ASC', 'DESC' ), true ) )
					? strtoupper( $attributes['ebec_order'] )
					: 'ASC';
		$max_events = isset( $attributes['ebec_max_events'] )
					? absint( $attributes['ebec_max_events'] )
					: 10;
			$all_events = tribe_get_events(
				array(
					'start_date'     => $start_time['date'],
					'end_date'       => $end_time['date'],
					'order'          => $order,
					'orderby'        => 'event_date',
					'posts_per_page' => $max_events,
					//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
					'meta_key'       => $attributes['key'],
					//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
					'meta_query'     => $attributes['meta_date'],
					//phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
					'tax_query'      => $tax_query,
				)
			);
		if ( ! empty( $all_events ) ) {
			$font_family_array = array(
				$attributes['event_title_family'],
				$attributes['event_venue_family'],
				$attributes['event_description_family'],
				$attributes['event_date_family'],
				$attributes['event_link_family'],
			);
				$block_id      = isset( $attributes['ebec_block_id'] ) ? sanitize_key(wp_unslash($attributes['ebec_block_id'])) : '';
				$sanitized_fonts = array_map(
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
				$events         = '';
				$ebec_html       = '';
				$display_month   = '';
				$display_year    = '';
				$display_header  = true;
				$events          = $all_events;
				$allowed_layouts = array( 'default', 'minimal' );

				$layout = isset( $attributes['event_layout'] )
					? sanitize_text_field( $attributes['event_layout'] )
					: 'default';
				
				$layout = in_array( $layout, $allowed_layouts, true ) ? $layout : 'default';
				$layout_cls      = 'ebec-' . $layout . '-list';
				$desc_type       = isset( $attributes['event_desc_type'] ) ? $attributes['event_desc_type'] : 'short';
				include EBEC_PATH . '/includes/ebec-style-setting.php';
				include EBEC_PATH . '/Layouts/list/ebec-list-style.php';
			if ( isset( $ebec_selectors ) ) {
				// Attach to the block.json style handle (registered above). WP prints
				// this when it loads ebec-event-list-style for the rendered block.
				wp_add_inline_style( 'ebec-event-list-style', $ebec_selectors );
			}

				$ebec_html .= '<!---------- Event List Block Version:' . esc_html(EBEC_VERSION) . ' By Cool Plugins Team-------------->';
				$ebec_html .= '<div id="ebec-events-list-content" class="ebec-list-wrapper ebec-block-' . esc_attr($ebec_block_id) . '">';
				$ebec_html .= '<div id="' . esc_attr($layout_cls) . '-wrp" class="' . esc_attr($layout_cls) . '-wrapper ' . esc_attr($category) . '">';

			foreach ( $events as $key => $event ) {
				$event_id = absint( $event->ID );
				if ( $display_year == tribe_get_start_date( $event_id, false, 'Y' ) ) {
					if ( $display_month == tribe_get_start_date( $event_id, false, 'm' ) ) {
						$display_header = false;
					} else {
						$display_month  = tribe_get_start_date( $event_id, false, 'm' );
						$display_header = true;
					}
				} else {
					$display_year   = tribe_get_start_date( $event_id, false, 'Y' );
					$display_month  = tribe_get_start_date( $event_id, false, 'm' );
					$display_header = true;
				}
					$event_value = $this->ebec_check_event_value( $event_id );
					include EBEC_PATH . '/Layouts/list/ebec-list-layout.php';

			}
				$ebec_html .= '</div></div>';
				return $ebec_html;
		} else {
			return $error;
		}
	}
	public function ebec_check_event_value( $event_id ) {
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

function ebec_register_block_call() {
	return EBEC_Register_Block::get_instance();
}
	$GLOBALS['ebec_block'] = ebec_register_block_call();




