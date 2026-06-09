<?php
if(!defined('ABSPATH')){
    exit;
}
if (!class_exists('ebec_review_notice')) {
    class ebec_review_notice {
        /**
         * The Constructor
         */
        public function __construct() {
            // register actions
         
            if(is_admin()){
                add_action( 'ect_display_admin_notices',array($this,'ebec_admin_notice_for_reviews'));
                add_action( 'wp_ajax_ebec_dismiss_notice',array($this,'ebec_dismiss_review_notice' ) );
            }
        }

    // ajax callback for review notice
    public function ebec_dismiss_review_notice() {
        check_ajax_referer( 'ebec_dismiss_notice_nonce', 'security' );
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error(
                array(
                    'message' => esc_html__( 'Unauthorized', 'events-block-for-the-events-calendar' ),
                )
            );
        }
        update_option( 'ebec-alreadyRated', 'yes' );
        wp_send_json_success();
    }
   // admin notice  
    public function ebec_admin_notice_for_reviews(){

        if( !current_user_can( 'update_plugins' ) ){
            return;
         }
         // get installation dates and rated settings
         $installation_date = get_option( 'ebec_activation_time' );
         if(is_numeric($installation_date)){
            $installation_date = gmdate("Y-m-d h:i:s", $installation_date);
         }
       
         $alreadyRated =get_option( 'ebec-alreadyRated' )!=false?get_option( 'ebec-alreadyRated'):"no";
         
         if(null != get_option('ebec_spare_me')){
            $spare_me = get_option('ebec_spare_me');
            if($spare_me==true){
               $alreadyRated ="yes";
            }
         }
        
         // check user already rated 
         if( $alreadyRated=="yes") {
                return;
            }

             // grab plugin installation date and compare it with current date
             $display_date = gmdate( 'Y-m-d h:i:s' );
             $diff_days    = 0;  
             try {
                 $install_date = new DateTime( $installation_date );
                 $current_date = new DateTime( $display_date );
                 $diff_days    = $install_date->diff( $current_date )->days;
             } catch ( Exception $e ) {
                 return;
             }
          
            // check if installation days is greator then week
            if ($diff_days>=3) {
                wp_enqueue_style( 'ebec-feedback-notice-styles', EBEC_URL.'/admin/feedback-notice/css/ebec-admin-feedback-notice.css', [], EBEC_VERSION );
                wp_enqueue_script( 'ebec-feedback-notice-script', EBEC_URL.'/admin/feedback-notice/js/ebec-admin-feedback-notice.js', array( 'jquery' ), EBEC_VERSION, true );
                $content = $this->ebec_create_notice_content();
                //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                printf( '%s', $content );
            }
       }  

       // generated review notice HTML
        function ebec_create_notice_content() {
            $ajax_url      = esc_url( admin_url( 'admin-ajax.php' ) );
            $ajax_callback = sanitize_key( 'ebec_dismiss_notice' );
            $wrap_cls      = 'notice notice-info is-dismissible ect-required-plugin-notice';
            $p_name        = esc_html( "Events Block For The Events Calendar" );
            $like_it_text  = esc_html__( 'Rate Now! ★★★★★', 'events-block-for-the-events-calendar' );
            $already_rated_text = esc_html__( 'Already Reviewed', 'events-block-for-the-events-calendar' );
            $not_interested     = esc_html__( 'Not Interested', 'events-block-for-the-events-calendar' );
            $p_link        = esc_url( 'https://wordpress.org/support/plugin/events-block-for-the-events-calendar/reviews/' );
            $nonce         = wp_create_nonce( 'ebec_dismiss_notice_nonce' );
        
            $message = sprintf(
                wp_kses_post(
                    'Thanks for using <b>%s</b> WordPress plugin. We hope it meets your expectations! <br/>Please give us a quick rating, it works as a boost for us to keep working on more <a href="https://coolplugins.net/?utm_source=ebec_plugin&utm_medium=inside&utm_campaign=author_page&utm_content=review_notice" target="_blank"><strong>Cool Plugins</strong></a>!<br/>'
                ),
                $p_name
            );
        
            $html = '
            <div data-ajax-url="%7$s" data-ajax-callback="%8$s" data-nonce="%9$s" class="cool-feedback-notice-wrapper %1$s">
                <div class="message_container">%4$s
                    <div class="callto_action">
                        <ul>
                            <li class="love_it"><a href="%5$s" class="like_it_btn button button-primary" target="_new" title="%6$s">%6$s</a></li>
                            <li class="already_rated"><a href="javascript:void(0);" class="already_rated_btn button ebec_dismiss_notice" title="%2$s">%2$s</a></li>
                            <li class="already_rated"><a href="javascript:void(0);" class="already_rated_btn button ebec_dismiss_notice" title="%3$s">%3$s</a></li>
                        </ul>
                        <div class="clrfix"></div>
                    </div>
                </div>
            </div>';
        
            return sprintf(
                $html,
                esc_attr( $wrap_cls ),          // %1$s
                esc_html( $already_rated_text ),// %2$s
                esc_html( $not_interested ),    // %3$s
                $message,                       // %4$s (already sanitized)
                esc_url( $p_link ),             // %5$s
                esc_html( $like_it_text ),      // %6$s
                esc_url( $ajax_url ),           // %7$s
                esc_attr( $ajax_callback ),     // %8$s
                esc_attr( $nonce )              // %9$s
            );
        }

    } //class end

} 



