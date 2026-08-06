<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
/**
 * List layout template.
 *
 * Expected $context keys:
 * - event_id (int)
 * - event_value (array)
 * - attributes (array)
 * - layout (string)
 * - desc_type (string)
 * - display_header (bool)
 *
 * @var array $context
 */

$event_id        = isset( $context['event_id'] ) ? absint( $context['event_id'] ) : 0;
$event_value     = isset( $context['event_value'] ) && is_array( $context['event_value'] ) ? $context['event_value'] : array();
$attributes      = isset( $context['attributes'] ) && is_array( $context['attributes'] ) ? $context['attributes'] : array();
$layout          = isset( $context['layout'] ) ? (string) $context['layout'] : 'default';
$desc_type       = isset( $context['desc_type'] ) ? (string) $context['desc_type'] : 'short';
$display_header  = ! empty( $context['display_header'] );
$html            = '';

$ebec_months            = ebec_localized_month_names( $event_value['event_start_date_details_month'] );
$ebec_long_month_start  = $ebec_months['long'];
$ebec_short_month_start = $ebec_months['short'];

$ebec_event_type = tribe( 'tec.featured_events' )->is_featured( $event_id ) ? 'ebec-featured-event' : 'ebec-simple-event';

$excerpt_words = defined( 'EBEC_EXCERPT_WORDS' ) ? (int) EBEC_EXCERPT_WORDS : 55;

if ( 'full' === $desc_type ) {
	$ebec_description = ! empty( $event_value['event_description'] )
		? $event_value['event_description']
		: tribe_events_get_the_excerpt( $event_id );
} else {
	$ebec_description_excerpt = has_excerpt( $event_id ) ? get_the_excerpt( $event_id ) : $event_value['event_description'];
	$ebec_filter_desc         = wp_strip_all_tags( $ebec_description_excerpt );
	$ebec_description         = wpautop(
		wp_trim_words(
			$ebec_filter_desc,
			$excerpt_words,
			'[...]'
		)
	);
}

// Layout
if ( $display_header === true && $attributes['event_header_type'] === 'show_header' && 'minimal' !== $layout ) {
	$html .= '<div class="ebec-month-header ' . esc_attr( $ebec_event_type ) . '"><span class="ebec-header-year" >' . esc_html( $ebec_long_month_start ) . ' ' . esc_html( $event_value['event_start_date_details_year'] ) . '</span><span class="ebec-header-line"></span></div>';
}

	$html .= '<div id="event-' . esc_attr( $event_id ) . '" class="ebec-list-posts style-1 ' . esc_attr( $ebec_event_type ) . '">';
	$html .= '<div class="ebec-event-date-tag"><div class="ebec-event-datetimes">
            <span class="ev-mo" >' . esc_html( $ebec_short_month_start ) . '</span>
            <span class="ebec-ev-day" >' . esc_html( $event_value['event_start_date_details_day'] ) . '</span>
            </div></div>';
	$html .= '<div class="ebec-event-details" >';
	$html .= '<div class="ebec-event-datetime">
             <span class="ebec-minimal-list-time">
            ' . ebec_date_style( absint( $event_id ), $attributes ) . '
             </span>
             </div>';
	$html .= '<a href="' . esc_url( $event_value['event_url'] ) . '" class="ebec-events-title" >' . wp_kses_post( $event_value['event_title'] ) . '</a>';
if ( $attributes['ebec_venue'] == 'no' && tribe_has_venue( $event_id ) && 'minimal' !== $layout ) {
	$html .= '<div class="ebec-list-venue" >';
	if ( $event_value['have_venue_address'] ) {
		$html .= '<span class="ebec-icon"><i class="ebec-icon-location" aria-hidden="true"></i></span>';
	}
	$ebec_venue_details = array_filter( (array) $event_value['venue_details'], 'is_string' );
	$html .= implode( ',', array_map( 'wp_kses_post', $ebec_venue_details ) );
	$html .= '</div>';
}


if ( $attributes['ebec_display_desc'] == 'yes' && ! empty( $ebec_description ) && 'minimal' !== $layout ) {
	$html .= '<div class="ebec-minimal-list-desc">
                <div class="ebec-event-content" itemprop="description" >
                <div>' . wp_kses_post( $ebec_description ) . '</div>
                </div>
              </div>';
}
if ( ! empty( $event_value['event_cost'] ) && 'minimal' !== $layout ) {
	$html .= '<div class="ebec-list-cost">' . esc_html( $event_value['event_cost'] ) . '</div>';
}
		$html .= '<div class="ebec-style-1-more" ><a href="' . esc_url( $event_value['event_url'] ) . '" class="ebec-events-read-more" rel="bookmark" >' . esc_html( $attributes['event_link_name'] ) . '</a></div>';
	$html     .= '</div>';
if ( 'minimal' !== $layout ) {
	$html .= '<div class="ebec-right-wrapper">';
	if ( $event_value['image'] != null ) {
		$html .= '<a class="ebec-static-small-list-ev-img" href="' . esc_url( $event_value['event_url'] ) . '">
				<img src="' . esc_url( $event_value['image'] ) . '"></img><span class="ebec-image-overlay ebec-overlay-type-extern"><span class="ebec-image-overlay-inside"></span></span>
				</a>';
	}
		$html .= '  </div>';
}
	$html .= '</div>';
