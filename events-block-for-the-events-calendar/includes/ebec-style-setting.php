<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sanitize block style attributes and build scoped CSS from the shared selector map.
 *
 * Selector/property map: includes/style-selector-map.json (also imported by src/Block/styling.js).
 */
class EBEC_Style_Settings {

	/**
	 * Cached decoded selector map.
	 *
	 * @var array|null
	 */
	private static $selector_map = null;

	/**
	 * Attribute key => sanitizer callback.
	 *
	 * @return array<string, callable>
	 */
	private static function field_map() {
		$hex  = 'sanitize_hex_color';
		$text = 'sanitize_text_field';

		return array(
			'main_skin_color'                  => $hex,
			'event_title_color'                => $hex,
			'event_title_font'                 => $text,
			'event_title_family'               => $text,
			'event_title_weight'               => $text,
			'event_title_transform'            => $text,
			'event_title_style'                => $text,
			'event_title_decoration'           => $text,
			'event_title_line_height'          => $text,
			'event_title_letter_spacing'       => $text,
			'event_date_color'                 => $hex,
			'event_date_font'                  => $text,
			'event_date_family'                => $text,
			'event_date_weight'                => $text,
			'event_date_transform'             => $text,
			'event_date_style'                 => $text,
			'event_date_decoration'            => $text,
			'event_date_line_height'           => $text,
			'event_date_letter_spacing'        => $text,
			'event_venue_color'                => $hex,
			'event_venue_font'                 => $text,
			'event_venue_family'               => $text,
			'event_venue_weight'               => $text,
			'event_venue_transform'            => $text,
			'event_venue_style'                => $text,
			'event_venue_decoration'           => $text,
			'event_venue_line_height'          => $text,
			'event_venue_letter_spacing'       => $text,
			'event_description_color'          => $hex,
			'event_description_font'           => $text,
			'event_description_family'         => $text,
			'event_description_weight'         => $text,
			'event_description_transform'      => $text,
			'event_description_style'          => $text,
			'event_description_decoration'     => $text,
			'event_description_line_height'    => $text,
			'event_description_letter_spacing' => $text,
			'event_link_color'                 => $hex,
			'event_link_font'                  => $text,
			'event_link_family'                => $text,
			'event_link_weight'                => $text,
			'event_link_transform'             => $text,
			'event_link_style'                 => $text,
			'event_link_decoration'            => $text,
			'event_link_line_height'           => $text,
			'event_link_letter_spacing'        => $text,
			'event_simple_color'               => $hex,
			'event_featured_color'             => $hex,
		);
	}

	/**
	 * Load shared selector map (single source of truth with the editor).
	 *
	 * @return array{rules: array}
	 */
	public static function get_selector_map() {
		if ( null !== self::$selector_map ) {
			return self::$selector_map;
		}

		$path = EBEC_PATH . 'includes/style-selector-map.json';
		$raw  = is_readable( $path ) ? file_get_contents( $path ) : false;
		$data = ( false !== $raw ) ? json_decode( $raw, true ) : null;

		self::$selector_map = ( is_array( $data ) && isset( $data['rules'] ) ) ? $data : array( 'rules' => array() );
		return self::$selector_map;
	}

	/**
	 * Build sanitized style values from block attributes.
	 *
	 * @param array $attributes Block attributes.
	 * @return array<string, string>
	 */
	public static function from_attributes( $attributes ) {
		$style = array();
		foreach ( self::field_map() as $key => $sanitizer ) {
			$raw           = isset( $attributes[ $key ] ) ? $attributes[ $key ] : '';
			$sanitized     = call_user_func( $sanitizer, $raw );
			$style[ $key ] = ( null === $sanitized || false === $sanitized ) ? '' : (string) $sanitized;
		}
		return $style;
	}

	/**
	 * Join scope + selector (no extra space when selector starts with combinator).
	 *
	 * @param string $scope    Scoped root, e.g. .ebec-block-abc.
	 * @param string $selector Relative selector from the map.
	 * @return string
	 */
	private static function scoped_selector( $scope, $selector ) {
		$selector = ltrim( (string) $selector );
		if ( '' !== $selector && in_array( $selector[0], array( '>', '+', '~' ), true ) ) {
			return $scope . $selector;
		}
		return $scope . ' ' . $selector;
	}

	/**
	 * Resolve a single CSS property value from the style map.
	 *
	 * @param array              $prop  Property definition from JSON.
	 * @param array<string,string> $style Sanitized style values.
	 * @return string Empty when unresolved.
	 */
	private static function resolve_prop_value( $prop, $style ) {
		$attr = isset( $prop['attr'] ) ? $prop['attr'] : '';
		if ( '' === $attr || ! isset( $style[ $attr ] ) || '' === $style[ $attr ] ) {
			return '';
		}

		$value = $style[ $attr ];
		if ( ! empty( $prop['darken'] ) && function_exists( 'ebec_darken_color' ) ) {
			$value = ebec_darken_color( $value, (int) $prop['darken'] );
		}

		if ( ! empty( $prop['template'] ) ) {
			$value = str_replace( '{value}', $value, $prop['template'] );
		}

		if ( ! empty( $prop['important'] ) ) {
			$value .= ' !important';
		}

		return $value;
	}

	/**
	 * Build typography declarations for a rule.
	 *
	 * @param array              $rule  Rule from JSON.
	 * @param array<string,string> $style Sanitized style values.
	 * @return string
	 */
	private static function typography_declarations( $rule, $style ) {
		$prefix = isset( $rule['typography'] ) ? $rule['typography'] : '';
		if ( '' === $prefix ) {
			return '';
		}

		$omit = isset( $rule['omit'] ) ? (array) $rule['omit'] : array();
		$only = isset( $rule['only'] ) ? (array) $rule['only'] : array();

		$line_height = $style[ $prefix . '_line_height' ];
		$line_height = ( 'initial' === $line_height ) ? 'initial' : absint( $line_height ) . 'px';

		$decoration = esc_attr( $style[ $prefix . '_decoration' ] );
		if ( ! empty( $rule['decorationImportant'] ) ) {
			$decoration .= ' !important';
		}

		$all = array(
			'color'           => sanitize_hex_color( $style[ $prefix . '_color' ] ),
			'font-size'       => absint( $style[ $prefix . '_font' ] ) . 'px',
			'font-family'     => "'" . esc_attr( $style[ $prefix . '_family' ] ) . "'",
			'font-weight'     => esc_attr( $style[ $prefix . '_weight' ] ),
			'text-transform'  => esc_attr( $style[ $prefix . '_transform' ] ),
			'font-style'      => esc_attr( $style[ $prefix . '_style' ] ),
			'text-decoration' => $decoration,
			'line-height'     => $line_height,
			'letter-spacing'  => floatval( $style[ $prefix . '_letter_spacing' ] ) . 'px',
		);

		$css = '';
		foreach ( $all as $property => $value ) {
			if ( ! empty( $only ) && ! in_array( $property, $only, true ) ) {
				continue;
			}
			if ( in_array( $property, $omit, true ) ) {
				continue;
			}
			if ( '' === $value || null === $value ) {
				continue;
			}
			$css .= $property . ':' . $value . ';';
		}
		return $css;
	}

	/**
	 * Build scoped dynamic CSS for a rendered block.
	 *
	 * @param string $block_id Sanitized block id.
	 * @param array  $style    Sanitized style map from from_attributes().
	 * @return string
	 */
	public static function build_selectors( $block_id, $style ) {
		$scope = '.ebec-block-' . sanitize_html_class( $block_id );
		$map   = self::get_selector_map();
		$css   = '';

		foreach ( $map['rules'] as $rule ) {
			if ( empty( $rule['selector'] ) ) {
				continue;
			}

			$declarations = '';
			if ( ! empty( $rule['typography'] ) ) {
				$declarations .= self::typography_declarations( $rule, $style );
			}
			if ( ! empty( $rule['props'] ) && is_array( $rule['props'] ) ) {
				foreach ( $rule['props'] as $prop ) {
					$value = self::resolve_prop_value( $prop, $style );
					if ( '' === $value || empty( $prop['property'] ) ) {
						continue;
					}
					$declarations .= esc_attr( $prop['property'] ) . ':' . $value . ';';
				}
			}

			if ( '' === $declarations ) {
				continue;
			}

			$css .= self::scoped_selector( $scope, $rule['selector'] ) . '{' . $declarations . '}';
		}

		return $css;
	}
}
