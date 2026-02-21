<?php
/**
 * Plugin Name: Events Block For The Events Calendar
 * Description: <a href="http://wordpress.org/plugins/the-events-calendar/">📅 The Events Calendar Addon</a> - Events Gutenberg Block to Create List Events In Block Editor.
 * Plugin URI:  https://eventscalendaraddons.com/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=get_pro&utm_content=plugin_uri
 * Author:      Cool Plugins
 * Author URI:  https://coolplugins.net/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=author_page&utm_content=plugins_list
 * Version: 1.4.1
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

define( 'EBEC_VERSION', '1.4.1' );
define( 'EBEC_FILE', __FILE__ );
define( 'EBEC_PATH', plugin_dir_path( EBEC_FILE ) );
define( 'EBEC_URL', plugin_dir_url( EBEC_FILE ) );
define( 'EBEC_FEEDBACK_API', 'https://feedback.coolplugins.net/' );


final class Ebec_Event_Block {

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
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 *
	 * @access private
	 */
	private function __construct() {
		$this->ebec_include_files();
		// register activation deactivation hooks
		register_activation_hook( EBEC_FILE, array( $this, 'ebec_activate' ) );
		register_deactivation_hook( EBEC_FILE, array( $this, 'ebec_deactivate' ) );
		add_action( 'init', array( $this, 'ebec_required_plugins_notice' ) );
		// Load the plugin after Dependancy Plugin loaded.
		add_action( 'plugins_loaded', array( $this, 'ebec_file_include' ) );
		add_action('init', array($this, 'ebec_modify_rest_api_limits'), 20);
		add_action('admin_enqueue_scripts', array($this, 'ebec_enqueue_scripts'));
	}
	public function ebec_activate() {
		update_option( 'ebec-v', EBEC_VERSION );
		update_option( 'ebec_activation_time', gmdate( 'Y-m-d h:i:s' ) );

		$review_option = get_option("cpfm_opt_in_choice_cool_events");

			if ($review_option === 'yes') {
				if (!wp_next_scheduled('ebec_extra_data_update')) {

					wp_schedule_event(time(), 'every_30_days', 'ebec_extra_data_update');

				}
			}

			if (!get_option( 'ebec_initial_save_version' ) ) {
                add_option( 'ebec_initial_save_version', EBEC_VERSION );
            }

            if(!get_option( 'ebec-install-date' ) ) {
                add_option( 'ebec-install-date', gmdate('Y-m-d h:i:s') );
            }
	}
	public function ebec_deactivate() {
		if (wp_next_scheduled('ebec_extra_data_update')) {
			wp_clear_scheduled_hook('ebec_extra_data_update');
		}
	}
	public static function ebec_display_header() {
		// Required plugins list (path + minimum version)
		$required_plugins = [
			'countdown-for-the-events-calendar/countdown-for-events-calendar.php' => '1.4.16',
			'cp-events-calendar-modules-for-divi-pro/cp-events-calendar-modules-for-divi-pro.php' => '2.0.2',
			'event-page-templates-addon-for-the-events-calendar/the-events-calendar-event-details-page-templates.php' => '1.7.15',
			'events-block-for-the-events-calendar/events-block-for-the-event-calender.php' => '1.3.12',
			'event-single-page-builder-pro/event-single-page-builder-pro.php' => '2.0.1',
			'events-search-addon-for-the-events-calendar/events-calendar-search-addon.php' => '1.2.18',
			'events-speakers-and-sponsors/events-speakers-and-sponsors.php' => '1.1.1',
			'events-widgets-for-elementor-and-the-events-calendar/events-widgets-for-elementor-and-the-events-calendar.php' => '1.6.28',
			'events-widgets-pro/events-widgets-pro.php' => '3.0.1',
			'template-events-calendar/events-calendar-templates.php' => '2.5.4',
			'the-events-calendar-templates-and-shortcode/the-events-calendar-templates-and-shortcode.php' => '4.0.1',
		];

		$show_header = true;

		// Loop through all plugins
		foreach ($required_plugins as $plugin_path => $min_version) {

			// Plugin active hai?
			if (is_plugin_active($plugin_path)) {

				// Plugin data get karo
				$plugin_data = get_plugin_data(WP_PLUGIN_DIR . '/' . $plugin_path);
				$current_version = $plugin_data['Version'];

				// Version check
				if (version_compare($current_version, $min_version, '<=')) {
					$show_header = false;
					break;
				}
			}
		}
		return $show_header;
	}
	public function ebec_enqueue_scripts() {
		
		$screen = get_current_screen();
        $screen_id = $screen ? $screen->id : '';
        $parent_file = ['events-addons_page_tribe-events-shortcode-template-settings',
                    'events-addons_page_tribe_events-events-template-settings',
                    'toplevel_page_cool-plugins-events-addon',
                    'events-addons_page_cool-events-registration',
                    'events-addons_page_countdown_for_the_events_calendar',
                    'edit-epta',
                    'edit-esas_speaker',
                    'edit-esas_sponsor',
                    'events-addons_page_esas-speaker-sponsor-settings',
                    'edit-ewpe'];
		if (self::ebec_display_header() && in_array($screen_id, $parent_file)) {
		// Common admin notice filter script (runs only on our target pages)
			wp_enqueue_script(
				'ebec-admin-notice-filter',
				EBEC_URL . 'assets/js/ebec-admin-notice-filter.js',
				array( 'jquery' ),
				EBEC_VERSION,
				true
			);

			wp_localize_script(
				'ebec-admin-notice-filter',
				'ebec_notice_filter',
				array(
					'nonce'             => wp_create_nonce( 'ebec_notice_filter' ),
					'allowedBodyClasses' => array(
						'events-addons_page_tribe-events-shortcode-template-settings',
						'events-addons_page_tribe_events-events-template-settings',
						'toplevel_page_cool-plugins-events-addon',
						'events-addons_page_cool-events-registration',
						'events-addons_page_countdown_for_the_events_calendar',
						'post-type-epta',
						'post-type-esas_speaker',
						'post-type-esas_sponsor',
						'events-addons_page_esas-speaker-sponsor-settings',
						'post-type-ewpe',
					),
				)
			);
		}
	}
	public function ebec_include_files(){
        require_once EBEC_PATH . 'admin/cpfm-feedback/cron/class-cron.php';
    }
	function ebec_file_include() {
		if ( is_admin() ) {
			require_once EBEC_PATH . '/admin/events-addon-page/events-addon-page.php';
			cool_plugins_events_addon_settings_page( 'the-events-calendar', 'cool-plugins-events-addon', '📅 Events Addons For The Events Calendar' );
			
			require_once EBEC_PATH . '/admin/feedback/admin-feedback-form.php';
			require_once EBEC_PATH . '/admin/feedback-notice/ebec-review-notice.php';
			new ebec_review_notice();
		}
		if ( class_exists( 'Tribe__Events__Main' ) || defined( 'Tribe__Events__Main::VERSION' ) ) {
			require EBEC_PATH . '/includes/ebec-functions.php';
			require EBEC_PATH . '/includes/ebec-block.php';
		}

		if(!class_exists('CPFM_Feedback_Notice')){
			require_once EBEC_PATH . 'admin/cpfm-feedback/cpfm-feedback-notice.php';
		}

		add_action('cpfm_register_notice', function () {
		
			if (!class_exists('CPFM_Feedback_Notice') || !current_user_can('manage_options')) {
				return;
			}
			$notice = [
				'title' => __('Cool Plugins Events Addons', 'events-block-for-the-events-calendar'),
				'message' => __('Help us make this plugin more compatible with your site by sharing non-sensitive site data.', 'events-block-for-the-events-calendar'),
				'pages' => ['cool-plugins-events-addon'],
				'always_show_on' => ['cool-plugins-events-addon'], // This enables auto-show
				'plugin_name'=>'ebec',
				
			];

			CPFM_Feedback_Notice::cpfm_register_notice('cool_events', $notice);

				if (!isset($GLOBALS['cool_plugins_feedback'])) {
					//phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
					$GLOBALS['cool_plugins_feedback'] = [];
				}
			
				//phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
				$GLOBALS['cool_plugins_feedback']['cool_events'][] = $notice;
	   
		});
		add_action('cpfm_after_opt_in_ebec', function($category) {

			if ($category === 'cool_events') {
				EBEC_cronjob::ebec_send_data();
			}
		});
	}
	function ebec_required_plugins_notice() {
		$option = get_option( 'classic-editor-replace' );
		if ( class_exists( 'Classic_Editor' ) && $option == 'classic' ) {
			add_action( 'admin_notices', array( $this, 'ebec_Install_gutenbrg_Notice' ) );
		}

		if (!get_option( 'ebec_initial_save_version' ) ) {
            add_option( 'ebec_initial_save_version', EBEC_VERSION );
        }

        if(!get_option( 'ebec-install-date' ) ) {
            add_option( 'ebec-install-date', gmdate('Y-m-d h:i:s') );
        }
	}
	function ebec_Install_gutenbrg_Notice() {
		if ( current_user_can( 'activate_plugins' ) ) {
			printf(
				'<div class="error CTEC_Msz ect-required-plugin-notice"><p>' .
				/* translators: 1: Message asking user to select block editor, 2: Link to Gutenberg Block Editor settings */
				esc_html( __( '%1$s %2$s', 'events-block-for-the-events-calendar' ) ),
				esc_html( __( 'In order to use Event Gutenberg Block, Please  select the block editor of', 'events-block-for-the-events-calendar' ) ),
				sprintf(
					'<a href="%s">%s</a>',
					esc_url( 'options-writing.php' ),
					esc_html( __( 'Gutenberg Block Editor', 'events-block-for-the-events-calendar' ) ),
				) . '</p></div>'
			);
		}
	}

	public function ebec_modify_rest_api_limits() {
		add_filter('tribe_rest_event_max_per_page', function($max) {
			return 999;
		});

		add_filter('rest_tribe_events_collection_params', function($params) {
			if (isset($params['per_page'])) {
				$params['per_page']['maximum'] = 999;
			}
			
			return $params;
		});
	}

}
function Ebec_Event_Block() {
	return Ebec_Event_Block::get_instance();
}
Ebec_Event_Block();
