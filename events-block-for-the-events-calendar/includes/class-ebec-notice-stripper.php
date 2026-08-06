<?php
/**
 * Strips foreign admin-notice callbacks from $wp_filter on Events addon screens.
 *
 * @package events-block-for-the-event-calender
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class EBEC_Notice_Stripper {

	/**
	 * Hook → specific callback names to remove.
	 * An empty list means remove all callbacks for that hook (with wpforms exception).
	 *
	 * @var array<string, string[]>
	 */
	const RULES = array(
		'user_admin_notices' => array(),
		'admin_notices'      => array(),
		'all_admin_notices'  => array(),
		'admin_footer'       => array(
			'render_delayed_admin_notices',
		),
	);

	/**
	 * Apply strip rules to the global $wp_filter.
	 */
	public static function strip() {
		global $wp_filter;

		/**
		 * Filter which notice hooks/callbacks to strip on Events addon screens.
		 *
		 * @param array<string, string[]> $rules Hook name => callback names (empty = strip all).
		 */
		$rules = apply_filters( 'ebec_admin_notice_strip_rules', self::RULES );

		foreach ( $rules as $notice_type => $callbacks_to_remove ) {
			if ( empty( $wp_filter[ $notice_type ] ) || empty( $wp_filter[ $notice_type ]->callbacks ) || ! is_array( $wp_filter[ $notice_type ]->callbacks ) ) {
				continue;
			}

			foreach ( $wp_filter[ $notice_type ]->callbacks as $priority => $hooks ) {
				foreach ( $hooks as $name => $arr ) {
					if ( self::should_remove_callback( $arr, $callbacks_to_remove ) ) {
						self::remove_callback( $notice_type, $priority, $name );
					}
				}
			}
		}
	}

	/**
	 * Whether a filter callback entry should be removed.
	 *
	 * @param array  $arr                  WP_Hook callback entry (has 'function' key).
	 * @param array  $callbacks_to_remove  Named callbacks to target; empty = strip-all mode.
	 * @return bool
	 */
	public static function should_remove_callback( $arr, $callbacks_to_remove ) {
		$remove_all = empty( $callbacks_to_remove );

		if ( is_object( $arr['function'] ) && is_callable( $arr['function'] ) ) {
			return $remove_all;
		}

		$class = ! empty( $arr['function'][0] ) && is_object( $arr['function'][0] )
			? strtolower( get_class( $arr['function'][0] ) )
			: '';

		if ( $remove_all ) {
			return false === strpos( $class, 'wpforms' );
		}

		$cb = is_array( $arr['function'] ) ? $arr['function'][1] : $arr['function'];
		return in_array( $cb, $callbacks_to_remove, true );
	}

	/**
	 * Unset a single callback from $wp_filter.
	 *
	 * @param string $notice_type Hook name.
	 * @param int    $priority    Priority bucket.
	 * @param string $name        Callback id within the bucket.
	 */
	public static function remove_callback( $notice_type, $priority, $name ) {
		global $wp_filter;

		unset( $wp_filter[ $notice_type ]->callbacks[ $priority ][ $name ] );
	}
}
