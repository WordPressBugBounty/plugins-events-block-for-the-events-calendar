import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { getEditorDocument } from '../utils/getEditorDocument.js';
import { normalizeIntlLocale } from '../utils/normalizeIntlLocale.js';

const { __ } = wp.i18n;

const EXCERPT_WORDS = (
	typeof ebecBlockData !== 'undefined' && ebecBlockData.excerptWords
) ? Number( ebecBlockData.excerptWords ) : 55;

const SITE_LOCALE = normalizeIntlLocale(
	typeof ebecBlockData !== 'undefined' ? ebecBlockData.locale : undefined
);

const preventEditorNav = ( e ) => {
	e.preventDefault();
};

const HTML_TAG_REGEX = /(<([^>]+)>)/gi;

const Layout = ( props ) => {
	const fontFamilyHref = useMemo( () => {
		const families = ( props.fontFamilies || [] )
			.filter( ( font ) => font && font !== 'Default' )
			.map( ( font ) => encodeURIComponent( font ) )
			.join( '|' );
		return families ? `https://fonts.googleapis.com/css?family=${ families }` : '';
	}, [ props.fontFamilies ] );

	useEffect( () => {
		if ( ! fontFamilyHref ) {
			return;
		}
		const targetDoc = getEditorDocument();
		if ( targetDoc.querySelector( `link[href="${ fontFamilyHref }"]` ) ) {
			return;
		}
		const link = targetDoc.createElement( 'link' );
		link.href = fontFamilyHref;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		targetDoc.head.appendChild( link );
	}, [ fontFamilyHref ] );

	const dateParts = useMemo( () => {
		const dateStart = new Date( props.start_date );
		const dateEnd = new Date( props.end_date );
		if ( Number.isNaN( dateStart.getTime() ) ) {
			return null;
		}

		const longMonthStart = dateStart.toLocaleString( SITE_LOCALE, { month: 'long' } );
		const shortMonthStart = dateStart.toLocaleString( SITE_LOCALE, { month: 'short' } );
		const longMonthEnd = Number.isNaN( dateEnd.getTime() )
			? longMonthStart
			: dateEnd.toLocaleString( SITE_LOCALE, { month: 'long' } );

		return {
			day: props.start_date_day,
			day_j: String( parseInt( props.start_date_day, 10 ) ),
			month: shortMonthStart,
			full_month: longMonthStart,
			year: props.start_date_year,
			weekday: dateStart.toLocaleDateString( SITE_LOCALE, { weekday: 'long' } ),
			longMonthStart,
			shortMonthStart,
			longMonthEnd,
			startTime: dateStart.toLocaleString( SITE_LOCALE, { hour: 'numeric', minute: 'numeric', hour12: true } ).toLowerCase(),
			endTime: Number.isNaN( dateEnd.getTime() )
				? ''
				: dateEnd.toLocaleString( SITE_LOCALE, { hour: 'numeric', minute: 'numeric', hour12: true } ).toLowerCase(),
		};
	}, [ props.start_date, props.end_date, props.start_date_day, props.start_date_year ] );

	const eventTime = useMemo( () => {
		if ( ! dateParts ) {
			return null;
		}
		if ( props.allDay ) {
			return <span>{ __( 'All Day', 'events-block-for-the-events-calendar' ) }</span>;
		}
		if ( props.start_date_day === props.end_date_day && dateParts.longMonthStart === dateParts.longMonthEnd ) {
			return <span>{ dateParts.startTime } - { dateParts.endTime }</span>;
		}
		const currentYear = new Date().getFullYear();
		const startYear = parseInt( props.start_date_year, 10 ) !== currentYear ? `, ${ props.start_date_year }` : '';
		const endYear = parseInt( props.end_date_year, 10 ) !== currentYear ? `, ${ props.end_date_year }` : '';
		return (
			<span>
				{ dateParts.longMonthStart } { props.start_date_day }{ startYear } – { dateParts.longMonthEnd } { props.end_date_day }{ endYear }
			</span>
		);
	}, [ dateParts, props.allDay, props.start_date_day, props.end_date_day, props.start_date_year, props.end_date_year ] );

	const desc = useMemo( () => {
		if ( props.eventDescType === 'full' ) {
			return '' !== props.description ? props.description : props.excerpt;
		}
		const excerpt = props.excerpt || props.description || '';
		const excerptArr = excerpt.replace( HTML_TAG_REGEX, ' ' ).split( ' ' );
		const descJoin = excerptArr.slice( 0, EXCERPT_WORDS ).join( ' ' );
		return excerptArr.length > EXCERPT_WORDS ? `${ descJoin }[...]` : descJoin;
	}, [ props.eventDescType, props.description, props.excerpt ] );

	if ( ! dateParts ) {
		return null;
	}

	const event_type = props.feature === false ? 'ebec-simple-event' : 'ebec-featured-event';
	let date_style = '';

	if ( props.date_format != null ) {
		if ( props.date_format === 'DM' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.shortMonthStart }</span>
			</div>;
		} else if ( props.date_format === 'MD' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-month" >{ dateParts.shortMonthStart } </span>
				<span className="ebec-ev-day"> { props.start_date_day }</span>
			</div>;
		} else if ( props.date_format === 'FD' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-month">{ dateParts.longMonthStart } </span>
				<span className="ebec-ev-day"> { props.start_date_day }</span>
			</div>;
		} else if ( props.date_format === 'DF' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart }</span>
			</div>;
		} else if ( props.date_format === 'FD,Y' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-month">{ dateParts.longMonthStart }</span>
				<span className="ebec-ev-day"> { props.start_date_day }, </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
			</div>;
		} else if ( props.date_format === 'MD,Y' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-month">{ dateParts.shortMonthStart }</span>
				<span className="ebec-ev-day"> { props.start_date_day }, </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
			</div>;
		} else if ( props.date_format === 'MD,YT' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-month">{ dateParts.shortMonthStart }</span>
				<span className="ebec-ev-day"> { props.start_date_day }, </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
				<span className="ebec-ev-time"><span className="ebec-icon"><i className="ebec-icon-clock" aria-hidden="true"></i></span>{ eventTime }</span>
			</div>;
		} else if ( props.date_format === 'jMl' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.shortMonthStart } </span>
				<span className="ebec-ev-weekday">{ dateParts.weekday }</span>
			</div>;
		} else if ( props.date_format === 'full' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart } </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
				<span className="ebec-ev-time"><span className="ebec-icon"><i className="ebec-icon-clock" aria-hidden="true"></i></span>{ eventTime }</span>
			</div>;
		} else if ( props.date_format === 'd.FY' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day }. </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart } </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
			</div>;
		} else if ( props.date_format === 'd.F' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date }>
				<span className="ebec-ev-day"> { props.start_date_day }. </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart }</span>
			</div>;
		} else if ( props.date_format === 'd.Ml' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day }. </span>
				<span className="ebec-ev-month">{ dateParts.shortMonthStart } </span>
				<span className="ebec-ev-weekday">{ dateParts.weekday }</span>
			</div>;
		} else if ( props.date_format === 'ldF' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-weekday">{ dateParts.weekday } </span>
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart }</span>
			</div>;
		} else if ( props.date_format === 'Mdl' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-month">{ dateParts.shortMonthStart } </span>
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-weekday">{ dateParts.weekday }</span>
			</div>;
		} else if ( props.date_format === 'dFT' ) {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart } </span>
				<span className="ebec-ev-time"><span className="ebec-icon"><i className="ebec-icon-clock" aria-hidden="true"></i></span>{ eventTime }</span>
			</div>;
		} else {
			date_style = <div className="ebec-date-area default-schedule" itemProp="startDate" content={ props.start_date } >
				<span className="ebec-ev-day"> { props.start_date_day } </span>
				<span className="ebec-ev-month">{ dateParts.longMonthStart } </span>
				<span className="ebec-ev-yr">{ props.start_date_year }</span>
			</div>;
		}
	}

	return (
		<Fragment>
			{ props.display_header === true && props.eventHeaderType === 'show_header' && props.eventLayout !== 'minimal' &&
				<div className={ 'ebec-month-header ' + event_type }>
					<span className="ebec-header-year">{ dateParts.longMonthStart } { props.start_date_year }</span>
					<span className="ebec-header-line"></span>
				</div> }
			<div id={ 'event-' + props.id } className={ 'ebec-list-posts style-1 ' + event_type }>
				<div className="ebec-event-date-tag">
					<div className="ebec-event-datetimes">
						<span className="ev-mo">{ dateParts.shortMonthStart }</span>
						<span className="ebec-ev-day">{ props.start_date_day }</span>
					</div>
				</div>
				<div className="ebec-event-details">
					<div className="ebec-event-datetime">
						<span className="ebec-minimal-list-time">
							{ date_style }
							<meta itemProp="endDate" content={ props.end_date }></meta>
						</span>
					</div>
					<a href={ props.url } onClick={ preventEditorNav } className="ebec-events-title" dangerouslySetInnerHTML={ { __html: props.title } } />
					{ props.eventLayout !== 'minimal' &&
						<>
							{ props.hide_venue === 'no' && props.venue.length !== 0 &&
								<div className="ebec-list-venue">
									<span className="ebec-icon"><i className="ebec-icon-location" aria-hidden="true"></i></span>
									<a href={ props.venue_url } onClick={ preventEditorNav } title={ props.venue_name }>{ props.venue_name }</a>
									,
									<span className="tribe-address">
										{ props.venue_address !== '' &&
											<span className="tribe-street-address">{ props.venue_address }</span> }
										{ '' !== props.venue_zip && ( props.venue_address !== '' || '' !== props.venue_city ) && <br></br> }
										{ '' !== props.venue_city ?
											<>
												<span className="tribe-locality">{ props.venue_city }</span><span className="tribe-delimiter">, </span>
											</>
											: ' ' }
										{ '' !== props.venue_state &&
											<abbr className="tribe-region tribe-events-abbr" title="">{ props.venue_state } </abbr> }
										{ props.venue_zip && '' !== props.venue_zip && undefined !== props.venue_zip &&
											<span className="tribe-postal-code"> { props.venue_zip } </span> }
										<span className="tribe-country-name">{ props.venue_country }</span>
									</span>
								</div> }
							{ props.display_description === 'yes' && props.display_description !== '' &&
								<div className="ebec-minimal-list-desc">
									<div className="ebec-event-content" itemProp="description" content={ props.description }>
										<p dangerouslySetInnerHTML={ { __html: desc } } />
									</div>
								</div> }
							{ props.event_cost != null &&
								<div className="ebec-list-cost"><div dangerouslySetInnerHTML={ { __html: props.event_cost } }></div></div> }
						</> }

					<div className="ebec-style-1-more">
						<a href={ props.url } onClick={ preventEditorNav } className="ebec-events-read-more" rel="bookmark">{ props.link_name }</a>
					</div>
				</div>
				{ props.eventLayout !== 'minimal' &&
					<div className="ebec-right-wrapper">
						{ props.image_url && props.image_url !== '' &&
							<a className="ebec-static-small-list-ev-img" href={ props.url } onClick={ preventEditorNav }>
								<img src={ props.image_url }></img>
								<span className="ebec-image-overlay ebec-overlay-type-extern"><span className="ebec-image-overlay-inside"></span></span>
							</a> }
					</div> }
			</div>
		</Fragment>
	);
};

export default Layout;
