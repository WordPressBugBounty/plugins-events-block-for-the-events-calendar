import { Component, Fragment, createRef } from '@wordpress/element';
import preview from '../Components/preview/events.png';
import { Inspector } from './inspector.js';
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@wordpress/components';
import Layout from './layout.js';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import contentEventStyle from './styling.js';
import { getEditorDocument } from '../utils/getEditorDocument.js';
import { buildInspectorProps } from '../utils/buildInspectorProps.js';
import { eventsWithHeaderFlags } from '../utils/eventHeaderFlags.js';

const { __ } = wp.i18n;

/**
 * Google-font family names used by the block (for editor preview loading).
 *
 * @param {Object} attributes Block attributes.
 * @return {string[]}
 */
function buildFontFamilies( attributes ) {
	return [
		attributes.event_title_family,
		attributes.event_venue_family,
		attributes.event_description_family,
		attributes.event_date_family,
		attributes.event_link_family,
	].filter( ( font ) => font && font !== 'Default' );
}

class EventBlocks extends Component {

	constructor() {
		super( ...arguments );

		this.state = {
			categoriesList: [],
		};
		this.ref = createRef();
		this.doc = null;

		this.handleCategorySelect = ( v ) => this.props.setAttributes( { ebec_ev_category: v } );
		this.handleEventsLimit = ( v ) => this.props.setAttributes( { ebec_max_events: v } );
		this.handleVenue = ( v ) => this.props.setAttributes( { ebec_venue: v } );
		this.handleDisplayDesc = ( v ) => this.props.setAttributes( { ebec_display_desc: v } );
		this.handleEventType = ( v ) => this.props.setAttributes( { ebec_type: v } );
		this.handleDateFormat = ( v ) => this.props.setAttributes( { ebec_date_formats: v } );
		this.handleEventOrder = ( v ) => this.props.setAttributes( { ebec_order: v } );
		this.handleEventTime = ( v ) => this.props.setAttributes( { ebec_event_source: v } );
		this.handleEventRangeStart = ( v ) => this.props.setAttributes( { ebec_date_range_start: v } );
		this.handleEventRangeEnd = ( v ) => this.props.setAttributes( { ebec_date_range_end: v } );
		this.handleSkinColor = ( v ) => this.props.setAttributes( { main_skin_color: v.hex } );
		this.handleNoEventText = ( v ) => this.props.setAttributes( { no_event_text: v } );
		this.handleEventDateColor = ( v ) => this.props.setAttributes( { event_date_color: v.hex } );
		this.handleEventDateFont = ( v ) => this.props.setAttributes( { event_date_font: v } );
		this.handleEventDateFamily = ( v ) => this.props.setAttributes( { event_date_family: v } );
		this.handleEventDateWeight = ( v ) => this.props.setAttributes( { event_date_weight: v } );
		this.handleEventDateTransform = ( v ) => this.props.setAttributes( { event_date_transform: v } );
		this.handleEventDateStyle = ( v ) => this.props.setAttributes( { event_date_style: v } );
		this.handleEventDateDecoration = ( v ) => this.props.setAttributes( { event_date_decoration: v } );
		this.handleEventDateLineHeight = ( v ) => this.props.setAttributes( { event_date_line_height: v } );
		this.handleEventDateLetterSpacing = ( v ) => this.props.setAttributes( { event_date_letter_spacing: v } );
		this.handleEventTitleColor = ( v ) => this.props.setAttributes( { event_title_color: v.hex } );
		this.handleEventTitleFont = ( v ) => this.props.setAttributes( { event_title_font: v } );
		this.handleEventTitleFamily = ( v ) => this.props.setAttributes( { event_title_family: v } );
		this.handleEventTitleWeight = ( v ) => this.props.setAttributes( { event_title_weight: v } );
		this.handleEventTitleTransform = ( v ) => this.props.setAttributes( { event_title_transform: v } );
		this.handleEventTitleStyle = ( v ) => this.props.setAttributes( { event_title_style: v } );
		this.handleEventTitleDecoration = ( v ) => this.props.setAttributes( { event_title_decoration: v } );
		this.handleEventTitleLineHeight = ( v ) => this.props.setAttributes( { event_title_line_height: v } );
		this.handleEventTitleLetterSpacing = ( v ) => this.props.setAttributes( { event_title_letter_spacing: v } );
		this.handleEventVenueColor = ( v ) => this.props.setAttributes( { event_venue_color: v.hex } );
		this.handleEventVenueFont = ( v ) => this.props.setAttributes( { event_venue_font: v } );
		this.handleEventVenueFamily = ( v ) => this.props.setAttributes( { event_venue_family: v } );
		this.handleEventVenueWeight = ( v ) => this.props.setAttributes( { event_venue_weight: v } );
		this.handleEventVenueTransform = ( v ) => this.props.setAttributes( { event_venue_transform: v } );
		this.handleEventVenueStyle = ( v ) => this.props.setAttributes( { event_venue_style: v } );
		this.handleEventVenueDecoration = ( v ) => this.props.setAttributes( { event_venue_decoration: v } );
		this.handleEventVenueLineHeight = ( v ) => this.props.setAttributes( { event_venue_line_height: v } );
		this.handleEventVenueLetterSpacing = ( v ) => this.props.setAttributes( { event_venue_letter_spacing: v } );
		this.handleEventDescriptionColor = ( v ) => this.props.setAttributes( { event_description_color: v.hex } );
		this.handleEventDescriptionFont = ( v ) => this.props.setAttributes( { event_description_font: v } );
		this.handleEventDescriptionFamily = ( v ) => this.props.setAttributes( { event_description_family: v } );
		this.handleEventDescriptionWeight = ( v ) => this.props.setAttributes( { event_description_weight: v } );
		this.handleEventDescriptionTransform = ( v ) => this.props.setAttributes( { event_description_transform: v } );
		this.handleEventDescriptionStyle = ( v ) => this.props.setAttributes( { event_description_style: v } );
		this.handleEventDescriptionDecoration = ( v ) => this.props.setAttributes( { event_description_decoration: v } );
		this.handleEventDescriptionLineHeight = ( v ) => this.props.setAttributes( { event_description_line_height: v } );
		this.handleEventDescriptionLetterSpacing = ( v ) => this.props.setAttributes( { event_description_letter_spacing: v } );
		this.handleEventLinkColor = ( v ) => this.props.setAttributes( { event_link_color: v.hex } );
		this.handleEventLinkFont = ( v ) => this.props.setAttributes( { event_link_font: v } );
		this.handleEventLinkFamily = ( v ) => this.props.setAttributes( { event_link_family: v } );
		this.handleEventLinkWeight = ( v ) => this.props.setAttributes( { event_link_weight: v } );
		this.handleEventLinkTransform = ( v ) => this.props.setAttributes( { event_link_transform: v } );
		this.handleEventLinkStyle = ( v ) => this.props.setAttributes( { event_link_style: v } );
		this.handleEventLinkDecoration = ( v ) => this.props.setAttributes( { event_link_decoration: v } );
		this.handleEventLinkLineHeight = ( v ) => this.props.setAttributes( { event_link_line_height: v } );
		this.handleEventLinkLetterSpacing = ( v ) => this.props.setAttributes( { event_link_letter_spacing: v } );
		this.handleEventLinkName = ( v ) => this.props.setAttributes( { event_link_name: v } );
		this.handleEventLayout = ( v ) => this.props.setAttributes( { event_layout: v } );
		this.handleEventDescType = ( v ) => this.props.setAttributes( { event_desc_type: v } );
		this.handleEventHeaderType = ( v ) => this.props.setAttributes( { event_header_type: v } );
		this.handleEventSimpleColor = ( v ) => this.props.setAttributes( { event_simple_color: v.hex } );
		this.handleEventFeaturedColor = ( v ) => this.props.setAttributes( { event_featured_color: v.hex } );
	}

	getDocument() {
		if ( this.doc ) {
			return this.doc;
		}
		const doc = getEditorDocument( this.ref );
		if ( this.ref?.current?.ownerDocument || doc !== document ) {
			this.doc = doc;
		}
		return doc;
	}

	injectBlockStyles() {
		const doc = this.getDocument();
		if ( ! doc ) {
			return;
		}
		const element = doc.getElementById( 'event-block-style-' + this.props.clientId );
		if ( element ) {
			element.textContent = contentEventStyle( this.props );
		}
	}

	componentDidMount() {
		const doc = this.getDocument();
		if ( doc ) {
			const styleEl = doc.createElement( 'style' );
			styleEl.setAttribute( 'id', 'event-block-style-' + this.props.clientId );
			doc.head.appendChild( styleEl );
		}

		apiFetch( { path: '/wp/v2/tribe_events_cat?page=1&per_page=100' } ).then( ( data ) => {
			const categoryList = Array.isArray( data )
				? data.map( ( val ) => val.slug )
				: [];
			categoryList.push( 'all' );
			this.setState( { categoriesList: categoryList } );
		} );

		this.props.setAttributes( { ebec_block_id: this.props.clientId } );
		this.injectBlockStyles();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.attributes !== this.props.attributes || prevProps.clientId !== this.props.clientId ) {
			this.injectBlockStyles();
		}
	}

	renderEventList( attributes, events, eventsStatus ) {
		const {
			ebec_ev_category,
			ebec_venue,
			ebec_display_desc,
			ebec_date_formats,
			event_layout,
			event_desc_type,
			event_header_type,
			event_link_name,
			no_event_text,
		} = attributes;

		const categoryClassNames = Array.isArray( ebec_ev_category )
			? ebec_ev_category.join( ' ' )
			: ebec_ev_category;
		const fontFamilies = buildFontFamilies( attributes );

		return (
			<div id={ `ebec-${ event_layout }-list-wrp` } className={ `ebec-${ event_layout }-list-wrapper ${ categoryClassNames }` }>
				{ eventsStatus === 'loading' ? (
					<Spinner />
				) : ( eventsStatus === 'ready' && events.length > 0 ) ? (
					<div>
						{ eventsWithHeaderFlags( events ).map( ( { event, showHeader } ) => (
							<Layout
								key={ event.id }
								id={ event.id }
								title={ event.title }
								venue={ event.venue }
								start_date={ event.start_date }
								start_date_year={ event.start_date_details.year }
								start_date_day={ event.start_date_details.day }
								end_date_year={ event.end_date_details.year }
								end_date_day={ event.end_date_details.day }
								end_date={ event.end_date }
								venue_name={ event.venue.venue }
								venue_address={ event.venue.address !== undefined ? event.venue.address : '' }
								venue_city={ event.venue.city !== undefined ? event.venue.city : '' }
								venue_zip={ event.venue.zip !== undefined ? event.venue.zip : '' }
								venue_state={ event.venue.state ? event.venue.state : ( event.venue.province ? event.venue.province : '' ) }
								venue_country={ event.venue.country }
								venue_url={ event.venue.url }
								description={ event.description }
								excerpt={ event.excerpt }
								image_url={ event.image.url }
								feature={ event.featured }
								url={ event.url }
								allDay={ event.all_day }
								display_header={ showHeader }
								hide_venue={ ebec_venue }
								display_description={ ebec_display_desc }
								date_format={ ebec_date_formats }
								event_cost={ event.cost }
								link_name={ event_link_name }
								eventLayout={ event_layout }
								eventDescType={ event_desc_type }
								eventHeaderType={ event_header_type }
								fontFamilies={ fontFamilies }
							/>
						) ) }
					</div>
				) : (
					<h2>{ __( no_event_text, 'events-block-for-the-events-calendar' ) }</h2>
				) }
			</div>
		);
	}

	render() {
		const { attributes, events, eventsStatus } = this.props;

		if ( attributes.isPreview ) {
			return <img width="100%" src={ preview } alt="" />;
		}

		const inspectorProps = buildInspectorProps(
			attributes,
			this,
			this.state.categoriesList
		);

		return (
			<Fragment>
				<Inspector { ...inspectorProps } />
				<div
					{ ...( this.props.wrapperBlockProps || {} ) }
					className={ 'ebec-list-wrapper' + ( this.props.wrapperBlockProps && this.props.wrapperBlockProps.className ? ' ' + this.props.wrapperBlockProps.className : '' ) }
					ref={ ( node ) => {
						this.ref.current = node;
						const blockRef = this.props.wrapperBlockProps && this.props.wrapperBlockProps.ref;
						if ( typeof blockRef === 'function' ) {
							blockRef( node );
						} else if ( blockRef ) {
							blockRef.current = node;
						}
					} }
				>
					{ this.renderEventList( attributes, events, eventsStatus ) }
				</div>
			</Fragment>
		);
	}
}

/**
 * Format a Date for the Tribe Events REST API.
 *
 * @param {Date} date Date instance.
 * @return {string}
 */
function formatTribeDate( date ) {
	const pad = ( n ) => String( n ).padStart( 2, '0' );
	if ( Number.isNaN( date.getTime() ) ) {
		return '1971-01-01 00:00:00';
	}
	return `${ date.getFullYear() }-${ pad( date.getMonth() + 1 ) }-${ pad( date.getDate() ) } ${ pad( date.getHours() ) }:${ pad( date.getMinutes() ) }:00`;
}

/**
 * Build REST query params from block attributes (server-side filtering).
 *
 * @param {Object} attributes Block attributes.
 * @return {Object}
 */
const OPEN_RANGE_START = '1971-01-01 00:00:00';
const OPEN_RANGE_END = '2099-12-31 23:59:59';

function buildEventsQuery( attributes ) {
	const {
		ebec_ev_category,
		ebec_max_events,
		ebec_date_range_start,
		ebec_date_range_end,
		ebec_type,
		ebec_event_source,
		ebec_order,
	} = attributes;

	const now = new Date();
	let start_date = OPEN_RANGE_START;
	let end_date = OPEN_RANGE_END;

	if ( ebec_event_source ) {
		start_date = formatTribeDate( new Date( ebec_date_range_start ) );
		end_date = formatTribeDate( new Date( ebec_date_range_end ) );
	}

	if ( ebec_type === 'past' ) {
		if ( ! ebec_event_source ) {
			start_date = OPEN_RANGE_START;
			end_date = formatTribeDate( now );
		} else if ( new Date( end_date ) > now ) {
			end_date = formatTribeDate( now );
		}
	} else if ( ebec_type === 'future' ) {
		if ( ! ebec_event_source ) {
			start_date = OPEN_RANGE_START;
			end_date = OPEN_RANGE_END;
		} else if ( new Date( start_date ) < now ) {
			start_date = formatTribeDate( now );
		}
	} else if ( ! ebec_event_source ) {
		start_date = OPEN_RANGE_START;
		end_date = OPEN_RANGE_END;
	}

	// Same _EventEndDate meta_query the PHP frontend adds, independent of
	// the start_date/end_date range above (see $meta_date_compare in
	// build_event_query_args()). Keeps ongoing/multi-day events that the
	// plain start_date filter would otherwise exclude.
	let ends_after = '';
	let ends_before = '';
	if ( ebec_type === 'future' ) {
		ends_after = formatTribeDate( now );
	} else if ( ebec_type === 'past' ) {
		ends_before = formatTribeDate( now );
	}

	const cats = Array.isArray( ebec_ev_category ) ? ebec_ev_category : [];
	const categories = cats.filter( ( c ) => c && c !== 'all' ).join( ',' );
	const limit = Math.min( Math.max( parseInt( ebec_max_events, 10 ) || 10, 1 ), 999 );
	const order = String( ebec_order || 'ASC' ).toUpperCase() === 'DESC' ? 'desc' : 'asc';

	const per_page = order === 'desc' ? 999 : limit;

	return {
		per_page,
		limit,
		start_date,
		end_date,
		ends_after,
		ends_before,
		order,
		categories,
	};
}

const EventBlocksWithData = compose( [
	withSelect( ( select, props ) => {
		const { attributes } = props;
		const queryKey = JSON.stringify( buildEventsQuery( attributes ) );
		const result = select( 'ebec/events_data' ).getEvents( queryKey );

		return {
			eventsStatus: result.status,
			events: result.events,
		};
	} ),
] )( EventBlocks );

export default function Edit( props ) {
	const blockProps = useBlockProps();
	return <EventBlocksWithData { ...props } wrapperBlockProps={ blockProps } />;
}
