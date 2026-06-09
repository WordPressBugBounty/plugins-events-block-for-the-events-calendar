<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if (class_exists('IntlDateFormatter')) {
	$ebec_month_number = $event_value['event_start_date_details_month'];

	$ebec_formatter_long = new IntlDateFormatter(
		get_locale(), // Current WordPress locale
		IntlDateFormatter::LONG,
		IntlDateFormatter::NONE,
		null,
		null,
		'LLLL' // Full month name
	);
	$ebec_formatter_short = new IntlDateFormatter(
		get_locale(),
		IntlDateFormatter::LONG,
		IntlDateFormatter::NONE,
		null,
		null,
		'LLL' // Short month name
	);

	$ebec_date_object = DateTime::createFromFormat('!m', $ebec_month_number);

	$ebec_long_month_start  = $ebec_formatter_long->format($ebec_date_object);
	$ebec_short_month_start = $ebec_formatter_short->format($ebec_date_object);
} else {
	$ebec_long_month_start  = DateTime::createFromFormat( '!m', $event_value['event_start_date_details_month'] )->format( 'F' );
	$ebec_short_month_start = DateTime::createFromFormat( '!m', $event_value['event_start_date_details_month'] )->format( 'M' );
}

$ebec_event_type      = tribe( 'tec.featured_events' )->is_featured( $event_id ) ? 'ebec-featured-event' : 'ebec-simple-event';
$ebec_description     = ! empty( $event_value['event_description'] ) ? $event_value['event_description'] : tribe_events_get_the_excerpt( $event_id );
if ( 'full' !== $desc_type ) {
	$ebec_description_excerpt = has_excerpt( $event_id ) ? get_the_excerpt( $event_id ) : $event_value['event_description'];
	$ebec_filter_desc         = wp_strip_all_tags( $ebec_description_excerpt );
	$ebec_excerpt             = wpautop(
		// wp_trim_words() gets the first X words from a text string.
		wp_trim_words(
			$ebec_filter_desc, // We'll use the post's content as our text string.
			55, // We want the first 55 words.
			'[...]' // This is what comes after the first 55 words.
		)
	);

	$ebec_description = $ebec_excerpt;
}

// Layout
if ( $display_header === true && $attributes['event_header_type'] === 'show_header' && 'minimal' !== $layout ) {
	$ebec_html .= '<div class="ebec-month-header ' . esc_attr( $ebec_event_type ) . '"><span class="ebec-header-year" >' . esc_html( $ebec_long_month_start ) . ' ' . esc_html( $event_value['event_start_date_details_year'] ) . '</span><span class="ebec-header-line"></span></div>';
}

	$ebec_html .= '<div id="event-' . esc_attr( $event_id ) . '" class="ebec-list-posts style-1 ' . esc_attr( $ebec_event_type ) . '">';
	$ebec_html .= '<div class="ebec-event-date-tag"><div class="ebec-event-datetimes">
            <span class="ev-mo" >' . esc_html( $ebec_short_month_start ) . '</span>
            <span class="ebec-ev-day" >' . esc_html( $event_value['event_start_date_details_day'] ) . '</span>
            </div></div>';
	$ebec_html .= '<div class="ebec-event-details" >';
	$ebec_html .= '<div class="ebec-event-datetime">
             <span class="ebec-minimal-list-time">
            ' . ebec_date_style( absint( $event_id ), $attributes ) . '
             </span>
             </div>';
	$ebec_html .= '<a href="' . esc_url( $event_value['event_url'] ) . '" class="ebec-events-title" >' . wp_kses_post( $event_value['event_title'] ) . '</a>';
if ( $attributes['ebec_venue'] == 'no' && tribe_has_venue( $event_id ) && 'minimal' !== $layout ) {
	$ebec_html .= '<div class="ebec-list-venue" >';
	if ( $event_value['have_venue_address'] ) {
		$ebec_html .= '<span class="ebec-icon"><i class="ebec-icon-location" aria-hidden="true"></i></span>';
	}
	$ebec_venue_details = array_filter( (array) $event_value['venue_details'], 'is_string' );
	$ebec_html .= implode( ',', array_map( 'wp_kses_post', $ebec_venue_details ) );
	$ebec_html .= '</div>';
}


if ( $attributes['ebec_display_desc'] == 'yes' && ! empty( $ebec_description ) && 'minimal' !== $layout ) {
	$ebec_html .= '<div class="ebec-minimal-list-desc">
                <div class="ebec-event-content" itemprop="description" >
                <div>' . wp_kses_post( $ebec_description ) . '</div>
                </div>
              </div>';
}
if ( ! empty( $event_value['event_cost'] ) && 'minimal' !== $layout ) {
	$ebec_html .= '<div class="ebec-list-cost">' . esc_html( $event_value['event_cost'] ) . '</div>';
}
		$ebec_html .= '<div class="ebec-style-1-more" ><a href="' . esc_url( $event_value['event_url'] ) . '" class="ebec-events-read-more" rel="bookmark" >' . esc_html( $attributes['event_link_name'] ) . '</a></div>';
	$ebec_html     .= '</div>';
if ( 'minimal' !== $layout ) {
	$ebec_html .= '<div class="ebec-right-wrapper">';
	if ( $event_value['image'] != null ) {
		$ebec_html .= '<a class="ebec-static-small-list-ev-img" href="' . esc_url( $event_value['event_url'] ) . '">
				<img src="' . esc_url( $event_value['image'] ) . '"></img><span class="ebec-image-overlay ebec-overlay-type-extern"><span class="ebec-image-overlay-inside"></span></span>
				</a>';
	}
		$ebec_html .= '  </div>';
}
	$ebec_html .= '</div>';
