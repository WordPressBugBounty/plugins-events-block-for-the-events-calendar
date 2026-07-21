<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! function_exists( 'ebec_darken_color' ) ) {
    function ebec_darken_color( $color, $percent ) {
        $num = hexdec( ltrim( $color, '#' ) );
        $amt = round( 2.55 * $percent );
        $R   = ( $num >> 16 ) - $amt;
        $G   = ( ( $num >> 8 ) & 0x00FF ) - $amt;
        $B   = ( $num & 0x0000FF ) - $amt;

        return sprintf( '#%02x%02x%02x', max( 0, $R ), max( 0, $G ), max( 0, $B ) );
    }
}
// dynamic css
$ebec_selectors = '
.ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-header-year 
  {
      color:' . esc_attr( $ebec_main_skin_color ) . '
   }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-header-line  {
     background-color:' . esc_attr( $ebec_main_skin_color ) . ' !important
 }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-event-datetimes .ev-mo {
     color:' . esc_attr( $ebec_main_skin_color ) . '
 }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-event-datetimes .ebec-ev-day  {
     color:' . esc_attr( $ebec_main_skin_color ) . '
 }
 .ebec-list-wrapper>:not(.ebec-minimal-list-wrapper) .ebec-list-posts{
    border-left-color:' . esc_attr( $ebec_main_skin_color ) . '!important
 }
  .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-event-details  {
     border-left-color:' . esc_attr( $ebec_main_skin_color ) . '!important
 }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-list-posts .ebec-events-title  {
     color:' . sanitize_hex_color( $ebec_event_title_color ) . ';
     font-size:' . absint( $ebec_event_title_font ) . 'px;
     font-family:\'' . esc_attr( $ebec_event_title_family ) . '\';
     font-weight:' . esc_attr( $ebec_event_title_weight ) . ';
     text-transform:' . esc_attr( $ebec_event_title_transform ) . ';
     font-style:' . esc_attr( $ebec_event_title_style ) . ';
     text-decoration:' . esc_attr( $ebec_event_title_decoration ) . ' !important;
     line-height:' . ( 'initial' === $ebec_event_title_line_height ? 'initial' : esc_attr( $ebec_event_title_line_height ) . 'px' ) . ';
     letter-spacing:' . floatval( $ebec_event_title_letter_spacing ) . 'px
 }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-date-area {
     color:' . sanitize_hex_color( $ebec_event_date_color ) . ';
     font-size:' . absint( $ebec_event_date_font ) . 'px;
     font-family:\'' . esc_attr( $ebec_event_date_family ) . '\';
     font-weight:' . esc_attr( $ebec_event_date_weight ) . ';
     text-transform:' . esc_attr( $ebec_event_date_transform ) . ';
     font-style:' . esc_attr( $ebec_event_date_style ) . ';
     text-decoration:' . esc_attr( $ebec_event_date_decoration ) . ';
     line-height:' . ( 'initial' === $ebec_event_date_line_height ? 'initial' : esc_attr( $ebec_event_date_line_height ) . 'px' ) . ';
     letter-spacing:' . floatval( $ebec_event_date_letter_spacing ) . 'px
 }
  .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-list-venue  {
     color:' . sanitize_hex_color( $ebec_event_venue_color ) . ';
     font-size:' . absint( $ebec_event_venue_font ) . 'px;
     font-family:\'' . esc_attr( $ebec_event_venue_family ) . '\';
     font-weight:' . esc_attr( $ebec_event_venue_weight ) . ';
     text-transform:' . esc_attr( $ebec_event_venue_transform ) . ';
     font-style:' . esc_attr( $ebec_event_venue_style ) . ';
     text-decoration:' . esc_attr( $ebec_event_venue_decoration ) . ';
     line-height:' . ( 'initial' === $ebec_event_venue_line_height ? 'initial' : esc_attr( $ebec_event_venue_line_height ) . 'px' ) . ';
     letter-spacing:' . floatval( $ebec_event_venue_letter_spacing ) . 'px
 }
  .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-event-content  {
     color:' . sanitize_hex_color( $ebec_event_description_color ) . ';
     font-size:' . absint( $ebec_event_description_font ) . 'px;
     font-family:\'' . esc_attr( $ebec_event_description_family ) . '\';
     font-weight:' . esc_attr( $ebec_event_description_weight ) . ';
     text-transform:' . esc_attr( $ebec_event_description_transform ) . ';
     font-style:' . esc_attr( $ebec_event_description_style ) . ';
     text-decoration:' . esc_attr( $ebec_event_description_decoration ) . ';
     letter-spacing:' . floatval( $ebec_event_description_letter_spacing ) . 'px;
     line-height:' . ( 'initial' === $ebec_event_description_line_height ? 'initial' : esc_attr( $ebec_event_description_line_height ) . 'px' ) . ';
 }

  .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .style-1 .ebec-events-read-more  {
     color:' . sanitize_hex_color( $ebec_event_link_color ) . ';
     font-size:' . absint( $ebec_event_link_font ) . 'px;
     font-family:\'' . esc_attr( $ebec_event_link_family ) . '\';
     font-weight:' . esc_attr( $ebec_event_link_weight ) . ';
     text-transform:' . esc_attr( $ebec_event_link_transform ) . ';
     font-style:' . esc_attr( $ebec_event_link_style ) . ';
     text-decoration:' . esc_attr( $ebec_event_link_decoration ) . ' !important;
     line-height:' . ( 'initial' === $ebec_event_link_line_height ? 'initial' : esc_attr( $ebec_event_link_line_height ) . 'px' ) . ';
     letter-spacing:' . floatval( $ebec_event_link_letter_spacing ) . 'px
 }
 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-list-venue a{
   color:' . sanitize_hex_color( $ebec_event_venue_color ) . ';
 }

 .ebec-block-' . sanitize_html_class( $ebec_block_id ) . ' .ebec-list-cost {
   color:' . sanitize_hex_color( $ebec_main_skin_color ) . ';
 }
   .ebec-minimal-list-wrapper .ebec-list-posts.style-1.ebec-simple-event .ebec-event-date-tag{
   background-color:' . sanitize_hex_color( $ebec_event_simple_color ) . ';
   border-left: 4px solid ' . ebec_darken_color( esc_attr( $ebec_event_simple_color ), 20 ) . ';
 }
 .ebec-minimal-list-wrapper .ebec-list-posts.style-1.ebec-featured-event .ebec-event-date-tag{
   background-color:' . sanitize_hex_color( $ebec_event_featured_color ) . ';
   border-left: 4px solid ' . ebec_darken_color( esc_attr( $ebec_event_featured_color ), 20 ) . ';
 }';
