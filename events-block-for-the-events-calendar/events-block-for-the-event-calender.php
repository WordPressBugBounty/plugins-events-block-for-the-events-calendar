<?php
/**
 * Plugin Name: Events Block For The Events Calendar
 * Description: <a href="http://wordpress.org/plugins/the-events-calendar/">📅 The Events Calendar Addon</a> - Events Gutenberg Block to Create List Events In Block Editor.
 * Plugin URI:  https://eventscalendaraddons.com/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=get_pro&utm_content=plugin_uri
 * Author:      Cool Plugins
 * Author URI:  https://coolplugins.net/?utm_source=ebec_plugin&utm_medium=readme&utm_campaign=coolplugins&utm_content=author_uri
 * Version: 1.3.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: ebec
 * Requires Plugins: the-events-calendar
 * @package events-block-for-the-event-calender
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EBEC_VERSION', '1.3.2' );
define( 'EBEC_FILE', __FILE__ );
define( 'EBEC_PATH', plugin_dir_path( EBEC_FILE ) );
define( 'EBEC_URL', plugin_dir_url( EBEC_FILE ) );


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
		// register activation deactivation hooks
		register_activation_hook( EBEC_FILE, array( $this, 'ebec_activate' ) );
		register_deactivation_hook( EBEC_FILE, array( $this, 'ebec_deactivate' ) );
		add_action( 'init', array( $this, 'ebec_required_plugins_notice' ) );
		// Load the plugin after Dependancy Plugin loaded.
		add_action( 'plugins_loaded', array( $this, 'ebec_file_include' ) );
	}
	public function ebec_activate() {
		update_option( 'ebec-v', EBEC_VERSION );
		update_option( 'ebec_activation_time', date( 'Y-m-d h:i:s' ) );
	}
	public function ebec_deactivate() {
		// Future
	}
	function ebec_file_include() {
		if ( is_admin() ) {
			require_once EBEC_PATH . '/admin/feedback/admin-feedback-form.php';
			require_once EBEC_PATH . '/admin/ebec-review-notice.php';
			new ebec_review_notice();
		}
		if ( class_exists( 'Tribe__Events__Main' ) || defined( 'Tribe__Events__Main::VERSION' ) ) {
			require EBEC_PATH . '/includes/ebec-functions.php';
			require EBEC_PATH . '/includes/ebec-block.php';
		}
	}
	function ebec_required_plugins_notice() {
		$option = get_option( 'classic-editor-replace' );
		if ( class_exists( 'Classic_Editor' ) && $option == 'classic' ) {
			add_action( 'admin_notices', array( $this, 'ebec_Install_gutenbrg_Notice' ) );
		} else {
			if ( ! class_exists( 'Tribe__Events__Main' ) or ! defined( 'Tribe__Events__Main::VERSION' ) ) {
				add_action( 'admin_notices', array( $this, 'ebec_Install_ECT_Notice' ) );
			}
		}
	}
	function ebec_Install_ECT_Notice() {
		if ( current_user_can( 'activate_plugins' ) ) {
			printf(
				'<div class="error CTEC_Msz"><p>' .
				esc_html( __( '%1$s %2$s', 'ebec' ) ),
				esc_html( __( 'In order to use Event Gutenberg Block, Please first install the latest version of', 'ebec' ) ),
				sprintf(
					'<a href="%s">%s</a>',
					esc_url( 'plugin-install.php?tab=plugin-information&plugin=the-events-calendar&TB_iframe=true' ),
					esc_html( __( 'The Events Calendar', 'ebec' ) ),
				) . '</p></div>'
			);
		}
	}
	function ebec_Install_gutenbrg_Notice() {
		if ( current_user_can( 'activate_plugins' ) ) {
			printf(
				'<div class="error CTEC_Msz"><p>' .
				esc_html( __( '%1$s %2$s', 'ebec' ) ),
				esc_html( __( 'In order to use Event Gutenberg Block, Please  select the block editor of', 'ebec' ) ),
				sprintf(
					'<a href="%s">%s</a>',
					esc_url( 'options-writing.php' ),
					esc_html( __( 'Gutenberg Block Editor', 'ebec' ) ),
				) . '</p></div>'
			);
		}
	}

}
function Ebec_Event_Block() {
	return Ebec_Event_Block::get_instance();
}
Ebec_Event_Block();
