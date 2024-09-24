<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// dynamic css
$selectors = '
.ebec-block-' . $ebec_block_id . ' .ebec-header-year 
  {
      color:' . $main_skin_color . '
   }
 .ebec-block-' . $ebec_block_id . ' .ebec-header-line  {
     background-color:' . $main_skin_color . ' !important
 }
 .ebec-block-' . $ebec_block_id . ' .ebec-event-datetimes .ev-mo {
     color:' . $main_skin_color . '
 }
 .ebec-block-' . $ebec_block_id . ' .ebec-event-datetimes .ebec-ev-day  {
     color:' . $main_skin_color . '
 }
 .ebec-list-wrapper>:not(.ebec-minimal-list-wrapper) .ebec-list-posts{
    border-left-color:' . $main_skin_color . '!important
 }
  .ebec-block-' . $ebec_block_id . ' .ebec-event-details  {
     border-left-color:' . $main_skin_color . '!important
 }
 .ebec-block-' . $ebec_block_id . ' .ebec-events-title  {
     color:' . $event_title_color . ';
     font-size:' . $event_title_font . 'px;
     font-family:' . $event_title_family . ';
     font-weight:' . $event_title_weight . ';
     text-transform:' . $event_title_transform . ';
     font-style:' . $event_title_style . ';
     text-decoration:' . $event_title_decoration . ';
     line-height:' . ( 'initial' === $event_title_line_height ? 'initial' : $event_title_line_height . 'px' ) . ';
     letter-spacing:' . $event_title_letter_spacing . 'px
 }
 .ebec-block-' . $ebec_block_id . ' .ebec-date-area {
     color:' . $event_date_color . ';
     font-size:' . $event_date_font . 'px;
     font-family:' . $event_date_family . ';
     font-weight:' . $event_date_weight . ';
     text-transform:' . $event_date_transform . ';
     font-style:' . $event_date_style . ';
     text-decoration:' . $event_date_decoration . ';
     line-height:' . ( 'initial' === $event_date_line_height ? 'initial' : $event_date_line_height . 'px' ) . ';
     letter-spacing:' . $event_date_letter_spacing . 'px
 }
  .ebec-block-' . $ebec_block_id . ' .ebec-list-venue  {
     color:' . $event_venue_color . ';
     font-size:' . $event_venue_font . 'px;
     font-family:' . $event_venue_family . ';
     font-weight:' . $event_venue_weight . ';
     text-transform:' . $event_venue_transform . ';
     font-style:' . $event_venue_style . ';
     text-decoration:' . $event_venue_decoration . ';
     line-height:' . ( 'initial' === $event_venue_line_height ? 'initial' : $event_venue_line_height . 'px' ) . ';
     letter-spacing:' . $event_venue_letter_spacing . 'px
 }
  .ebec-block-' . $ebec_block_id . ' .ebec-event-content  {
     color:' . $event_description_color . ';
     font-size:' . $event_description_font . 'px;
     font-family:' . $event_description_family . ';
     font-weight:' . $event_description_weight . ';
     text-transform:' . $event_description_transform . ';
     font-style:' . $event_description_style . ';
     text-decoration:' . $event_description_decoration . ';
     letter-spacing:' . $event_description_letter_spacing . 'px;
     line-height:' . ( 'initial' === $event_description_line_height ? 'initial' : $event_description_line_height . 'px' ) . ';
 }

  .ebec-block-' . $ebec_block_id . ' .ebec-events-read-more  {
     color:' . $event_link_color . ';
     font-size:' . $event_link_font . 'px;
     font-family:' . $event_link_family . ';
     font-weight:' . $event_link_weight . ';
     text-transform:' . $event_link_transform . ';
     font-style:' . $event_link_style . ';
     text-decoration:' . $event_link_decoration . ';
     line-height:' . ( 'initial' === $event_link_line_height ? 'initial' : $event_link_line_height . 'px' ) . ';
     letter-spacing:' . $event_link_letter_spacing . 'px
 }
 .ebec-block-' . $ebec_block_id . ' .ebec-list-venue a{
   color:' . $event_venue_color . ';
 }

 .ebec-block-' . $ebec_block_id . ' .ebec-list-cost {
   color:' . $main_skin_color . ';
 }';
