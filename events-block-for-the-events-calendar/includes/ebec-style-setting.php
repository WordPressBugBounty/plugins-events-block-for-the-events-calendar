<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


$ebec_main_skin_color = isset($attributes['main_skin_color']) ? sanitize_hex_color($attributes['main_skin_color']):"";

//dynamic title style
$ebec_event_title_color = isset($attributes['event_title_color']) ? sanitize_hex_color($attributes['event_title_color']):"";
$ebec_event_title_font = isset($attributes['event_title_font'])?sanitize_text_field($attributes['event_title_font']):"";
$ebec_event_title_family = isset($attributes['event_title_family'])?sanitize_text_field($attributes['event_title_family']):"";
$ebec_event_title_weight = isset($attributes['event_title_weight'])?sanitize_text_field($attributes['event_title_weight']):"";
$ebec_event_title_transform = isset($attributes['event_title_transform'])?sanitize_text_field($attributes['event_title_transform']):"";
$ebec_event_title_style = isset($attributes['event_title_style'])?sanitize_text_field($attributes['event_title_style']):"";
$ebec_event_title_decoration = isset($attributes['event_title_decoration'])?sanitize_text_field($attributes['event_title_decoration']):"";
$ebec_event_title_line_height = isset($attributes['event_title_line_height'])?sanitize_text_field($attributes['event_title_line_height']):"";
$ebec_event_title_letter_spacing = isset($attributes['event_title_letter_spacing'])?sanitize_text_field($attributes['event_title_letter_spacing']):"";

//dynamic date style
$ebec_event_date_color = isset($attributes['event_date_color']) ? sanitize_hex_color($attributes['event_date_color']):"";
$ebec_event_date_font = isset($attributes['event_date_font'])?sanitize_text_field($attributes['event_date_font']):"";
$ebec_event_date_family = isset($attributes['event_date_family'])?sanitize_text_field($attributes['event_date_family']):"";
$ebec_event_date_weight = isset($attributes['event_date_weight'])?sanitize_text_field($attributes['event_date_weight']):"";
$ebec_event_date_transform = isset($attributes['event_date_transform'])?sanitize_text_field($attributes['event_date_transform']):"";
$ebec_event_date_style = isset($attributes['event_date_style'])?sanitize_text_field($attributes['event_date_style']):"";
$ebec_event_date_decoration = isset($attributes['event_date_decoration'])?sanitize_text_field($attributes['event_date_decoration']):"";
$ebec_event_date_line_height = isset($attributes['event_date_line_height'])?sanitize_text_field($attributes['event_date_line_height']):"";
$ebec_event_date_letter_spacing = isset($attributes['event_date_letter_spacing'])?sanitize_text_field($attributes['event_date_letter_spacing']):"";

//dynamic venue style
$ebec_event_venue_color = isset($attributes['event_venue_color']) ? sanitize_hex_color($attributes['event_venue_color']):"";
$ebec_event_venue_font = isset($attributes['event_venue_font'])?sanitize_text_field($attributes['event_venue_font']):"";
$ebec_event_venue_family = isset($attributes['event_venue_family'])?sanitize_text_field($attributes['event_venue_family']):"";
$ebec_event_venue_weight = isset($attributes['event_venue_weight'])?sanitize_text_field($attributes['event_venue_weight']):"";
$ebec_event_venue_transform = isset($attributes['event_venue_transform'])?sanitize_text_field($attributes['event_venue_transform']):"";
$ebec_event_venue_style = isset($attributes['event_venue_style'])?sanitize_text_field($attributes['event_venue_style']):"";
$ebec_event_venue_decoration = isset($attributes['event_venue_decoration'])?sanitize_text_field($attributes['event_venue_decoration']):"";
$ebec_event_venue_line_height = isset($attributes['event_venue_line_height'])?sanitize_text_field($attributes['event_venue_line_height']):"";
$ebec_event_venue_letter_spacing = isset($attributes['event_venue_letter_spacing'])?sanitize_text_field($attributes['event_venue_letter_spacing']):"";

//dynamic description style
$ebec_event_description_color = isset($attributes['event_description_color']) ? sanitize_hex_color($attributes['event_description_color']):"";
$ebec_event_description_font = isset($attributes['event_description_font'])?sanitize_text_field($attributes['event_description_font']):"";
$ebec_event_description_family = isset($attributes['event_description_family'])?sanitize_text_field($attributes['event_description_family']):"";
$ebec_event_description_weight = isset($attributes['event_description_weight'])?sanitize_text_field($attributes['event_description_weight']):"";
$ebec_event_description_transform = isset($attributes['event_description_transform'])?sanitize_text_field($attributes['event_description_transform']):"";
$ebec_event_description_style = isset($attributes['event_description_style'])?sanitize_text_field($attributes['event_description_style']):"";
$ebec_event_description_decoration = isset($attributes['event_description_decoration'])?sanitize_text_field($attributes['event_description_decoration']):"";
$ebec_event_description_line_height = isset($attributes['event_description_line_height'])?sanitize_text_field($attributes['event_description_line_height']):"";
$ebec_event_description_letter_spacing = isset($attributes['event_description_letter_spacing'])?sanitize_text_field($attributes['event_description_letter_spacing']):"";

//dynamic link style
$ebec_event_link_color = isset($attributes['event_link_color']) ? sanitize_hex_color($attributes['event_link_color']):"";
$ebec_event_link_font = isset($attributes['event_link_font'])?sanitize_text_field($attributes['event_link_font']):"";
$ebec_event_link_family = isset($attributes['event_link_family'])?sanitize_text_field($attributes['event_link_family']):"";
$ebec_event_link_weight = isset($attributes['event_link_weight'])?sanitize_text_field($attributes['event_link_weight']):"";
$ebec_event_link_transform = isset($attributes['event_link_transform'])?sanitize_text_field($attributes['event_link_transform']):"";
$ebec_event_link_style = isset($attributes['event_link_style'])?sanitize_text_field($attributes['event_link_style']):"";
$ebec_event_link_decoration = isset($attributes['event_link_decoration'])?sanitize_text_field($attributes['event_link_decoration']):"";
$ebec_event_link_line_height = isset($attributes['event_link_line_height'])?sanitize_text_field($attributes['event_link_line_height']):"";
$ebec_event_link_letter_spacing = isset($attributes['event_link_letter_spacing'])?sanitize_text_field($attributes['event_link_letter_spacing']):"";


// Simple Event Style
$ebec_event_simple_color = isset($attributes['event_simple_color']) ? sanitize_hex_color($attributes['event_simple_color']):"";

// Featured Event Style
$ebec_event_featured_color = isset($attributes['event_featured_color']) ? sanitize_hex_color($attributes['event_featured_color']):"";





