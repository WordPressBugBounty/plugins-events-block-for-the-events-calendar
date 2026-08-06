<?php
/**
 * Plugin Name: Events Block For The Events Calendar
 * Description: <a href="http://wordpress.org/plugins/the-events-calendar/">📅 The Events Calendar Addon</a> - Events Gutenberg Block to Create List Events In Block Editor.
 * Plugin URI:  https://eventscalendaraddons.com/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=get_pro&utm_content=plugin_uri
 * Author:      Cool Plugins
 * Author URI:  https://coolplugins.net/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=author_page&utm_content=plugins_list
 * Version: 1.4.8
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: events-block-for-the-events-calendar
 * Domain Path: /languages
 * Requires Plugins: the-events-calendar
 * @package events-block-for-the-event-calender
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EBEC_VERSION', '1.4.8' );
define( 'EBEC_FILE', __FILE__ );
define( 'EBEC_PATH', plugin_dir_path( EBEC_FILE ) );
define( 'EBEC_URL', plugin_dir_url( EBEC_FILE ) );
define( 'EBEC_FEEDBACK_API', 'https://feedback.coolplugins.net/' );


final class Ebec_Event_Block {

	/**
	 * Max events per REST page (must stay in sync with editor fetch).
	 */
	const REST_MAX_PER_PAGE = 999;

	/**
	 * Plugin instance.
	 *
	 * @access private
	 */
	private static $instance = null;

	/**
	 * Get plugin instance.
	 *
	 * @static
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->register_hooks();
		}
		return self::$instance;
	}

	/**
	 * Constructor — no side effects; hooks are wired in register_hooks().
	 *
	 * @access private
	 */
	private function __construct() {
	}

	/**
	 * Register activation/deactivation hooks and runtime actions/filters.
	 */
	private function register_hooks() {
		$this->ebec_load_cron_dependency();
		register_activation_hook( EBEC_FILE, array( $this, 'ebec_activate' ) );
		register_deactivation_hook( EBEC_FILE, array( $this, 'ebec_deactivate' ) );
		add_action( 'init', array( $this, 'ebec_required_plugins_notice' ) );
		add_action( 'plugins_loaded', array( $this, 'ebec_load_runtime_modules' ) );
		add_action( 'admin_print_scripts', array( $this, 'ebec_hide_unrelated_notices' ) );
		add_filter( 'tribe_rest_event_max_per_page', array( $this, 'ebec_rest_max_per_page' ), 10, 0 );
		add_filter( 'rest_tribe_events_collection_params', array( $this, 'ebec_rest_collection_params' ) );
	}

	public function ebec_activate() {
		update_option( 'ebec-v', EBEC_VERSION );
		update_option( 'ebec_activation_time', gmdate( 'Y-m-d h:i:s' ) );

		$review_option = get_option( 'cpfm_opt_in_choice_cool_events' );

		if ( $review_option === 'yes' ) {
			if ( ! wp_next_scheduled( 'ebec_extra_data_update' ) ) {
				wp_schedule_event( time(), 'every_30_days', 'ebec_extra_data_update' );
			}
		}

		$this->ebec_seed_install_options();
	}

	/**
	 * Seed one-time install options (activation only).
	 */
	private function ebec_seed_install_options() {
		if ( ! get_option( 'ebec_initial_save_version' ) ) {
			add_option( 'ebec_initial_save_version', EBEC_VERSION );
		}

		if ( ! get_option( 'ebec-install-date' ) ) {
			add_option( 'ebec-install-date', gmdate( 'Y-m-d h:i:s' ) );
		}
	}

	public function ebec_deactivate() {
		if ( wp_next_scheduled( 'ebec_extra_data_update' ) ) {
			wp_clear_scheduled_hook( 'ebec_extra_data_update' );
		}
	}

	/**
	 * Hide foreign admin notices on events screens; register shared notice hook elsewhere.
	 */
	public function ebec_hide_unrelated_notices() {
		if ( $this->is_events_addon_page() ) {
			$this->strip_foreign_admin_notices();
		}

		if ( $this->is_events_admin_screen() ) {
			return;
		}

		$this->register_dashboard_notice();
	}

	/**
	 * Whether the current request is an events-related admin screen.
	 *
	 * @return bool
	 */
	private function is_events_admin_screen() {
		return $this->is_events_addon_page() || $this->is_events_post_type_screen();
	}

	/**
	 * Whether the current admin page query matches events addon pages.
	 *
	 * @return bool
	 */
	private function is_events_addon_page() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! isset( $_GET['page'] ) ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page_param = sanitize_key( wp_unslash( $_GET['page'] ) );

		$allowed_pages = array(
			'cool-plugins-events-addon',
			'cool-events-registration',
			'tribe-events-shortcode-template-settings',
			'tribe_events-events-template-settings',
			'countdown_for_the_events_calendar',
			'esas-speaker-sponsor-settings',
			'esas_speaker',
			'esas_sponsor',
			'ewpe',
			'epta',
		);

		return in_array( $page_param, $allowed_pages, true );
	}

	/**
	 * Whether the current screen is an events-related post type list/edit screen.
	 *
	 * @return bool
	 */
	private function is_events_post_type_screen() {
		$current_screen = get_current_screen();
		if ( ! $current_screen || empty( $current_screen->post_type ) ) {
			return false;
		}

		$allowed_post_types = array(
			'esas_speaker',
			'esas_sponsor',
			'epta',
			'ewpe',
		);

		return in_array( $current_screen->post_type, $allowed_post_types, true );
	}

	/**
	 * Remove other plugins' admin notice callbacks from $wp_filter.
	 */
	private function strip_foreign_admin_notices() {
		if ( ! class_exists( 'EBEC_Notice_Stripper' ) ) {
			require_once EBEC_PATH . 'includes/class-ebec-notice-stripper.php';
		}
		EBEC_Notice_Stripper::strip();
	}

	/**
	 * Register the shared dashboard admin notice action once.
	 *
	 * ECT_ADMIN_NOTICE_HOOKED / ECT_ADMIN_NOTICE_RENDERED are intentionally shared
	 * across all Cool Plugins Events addons as a cross-plugin lock — do not rename
	 * them to an EBEC_ prefix; that would break coordination with sibling plugins.
	 */
	private function register_dashboard_notice() {
		// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		if ( defined( 'ECT_ADMIN_NOTICE_HOOKED' ) ) {
			return;
		}

		define( 'ECT_ADMIN_NOTICE_HOOKED', true );

		add_action(
			'admin_notices',
			array( $this, 'ebec_dash_admin_notices' ),
			PHP_INT_MAX
		);
		// phpcs:enable
	}

	public function ebec_dash_admin_notices() {
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		if ( defined( 'ECT_ADMIN_NOTICE_RENDERED' ) ) {
			return;
		}

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedConstantFound
		define( 'ECT_ADMIN_NOTICE_RENDERED', true );

		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Cross-plugin contract.
		do_action( 'ect_display_admin_notices' );
	}

	/**
	 * Load cron class early (needed for activation/deactivation scheduling).
	 */
	public function ebec_load_cron_dependency() {
		require_once EBEC_PATH . 'admin/cpfm-feedback/cron/class-cron.php';
	}

	/**
	 * Load admin UI, feedback, and block runtime modules after plugins_loaded.
	 */
	public function ebec_load_runtime_modules() {
		if ( is_admin() ) {
			require_once EBEC_PATH . '/admin/events-addon-page/events-addon-page.php';
			cool_plugins_events_addon_settings_page( 'the-events-calendar', 'cool-plugins-events-addon', '📅 Events Addons For The Events Calendar' );

			require_once EBEC_PATH . '/admin/feedback/admin-feedback-form.php';
			require_once EBEC_PATH . '/admin/feedback-notice/ebec-review-notice.php';
			new EBEC_Review_Notice();
		}
		if ( class_exists( 'Tribe__Events__Main' ) || defined( 'Tribe__Events__Main::VERSION' ) ) {
			require EBEC_PATH . '/includes/ebec-functions.php';
			require EBEC_PATH . '/includes/ebec-style-setting.php';
			require EBEC_PATH . '/includes/ebec-block.php';
		}

		if ( ! class_exists( 'CPFM_Feedback_Notice' ) ) {
			require_once EBEC_PATH . 'admin/cpfm-feedback/cpfm-feedback-notice.php';
		}

		add_action( 'cpfm_register_notice', array( $this, 'ebec_register_feedback_notice' ) );
		add_action( 'cpfm_after_opt_in_ebec', array( $this, 'ebec_handle_opt_in' ) );
	}

	/**
	 * Register CPFM usage-tracking notice for this plugin.
	 */
	public function ebec_register_feedback_notice() {
		if ( ! class_exists( 'CPFM_Feedback_Notice' ) || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$notice = array(
			'title'          => __( 'Cool Plugins Events Addons', 'events-block-for-the-events-calendar' ),
			'message'        => __( 'Help us make this plugin more compatible with your site by sharing non-sensitive site data.', 'events-block-for-the-events-calendar' ),
			'pages'          => array( 'cool-plugins-events-addon' ),
			'always_show_on' => array( 'cool-plugins-events-addon' ),
			'plugin_name'    => 'ebec',
		);

		CPFM_Feedback_Notice::cpfm_register_notice( 'cool_events', $notice );

		if ( ! isset( $GLOBALS['cool_plugins_feedback'] ) ) {
			//phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
			$GLOBALS['cool_plugins_feedback'] = array();
		}

		//phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
		$GLOBALS['cool_plugins_feedback']['cool_events'][] = $notice;
	}

	/**
	 * Handle CPFM opt-in for this plugin.
	 *
	 * @param string $category Notice category key.
	 */
	public function ebec_handle_opt_in( $category ) {
		if ( 'cool_events' === $category ) {
			EBEC_cronjob::ebec_send_data();
		}
	}

	public function ebec_required_plugins_notice() {
		$option = get_option( 'classic-editor-replace' );
		if ( class_exists( 'Classic_Editor' ) && $option == 'classic' ) {
			// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Cross-plugin contract.
			add_action( 'ect_display_admin_notices', array( $this, 'ebec_install_gutenberg_notice' ) );
		}
	}

	public function ebec_install_gutenberg_notice() {
		if ( current_user_can( 'activate_plugins' ) ) {
			printf(
				'<div class="error CTEC_Msz ect-required-plugin-notice"><p>%s <a href="%s">%s</a></p></div>',
				esc_html__( 'In order to use Event Gutenberg Block, Please select the block editor of', 'events-block-for-the-events-calendar' ),
				esc_url( admin_url( 'options-writing.php' ) ),
				esc_html__( 'Gutenberg Block Editor', 'events-block-for-the-events-calendar' )
			);
		}
	}

	/**
	 * Cap tribe REST max per page at REST_MAX_PER_PAGE.
	 *
	 * @return int
	 */
	public function ebec_rest_max_per_page() {
		return self::REST_MAX_PER_PAGE;
	}

	/**
	 * Raise rest collection per_page maximum for tribe events.
	 *
	 * @param array $params Collection params.
	 * @return array
	 */
	public function ebec_rest_collection_params( $params ) {
		if ( isset( $params['per_page'] ) ) {
			$params['per_page']['maximum'] = self::REST_MAX_PER_PAGE;
		}
		return $params;
	}

}
/**
 * Bootstrap helper for the main plugin singleton.
 *
 * @return Ebec_Event_Block
 */
function ebec_event_block() {
	return Ebec_Event_Block::get_instance();
}
ebec_event_block();
