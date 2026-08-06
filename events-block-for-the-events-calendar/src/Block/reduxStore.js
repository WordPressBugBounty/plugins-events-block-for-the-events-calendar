import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_RESULT = {
	status: 'loading',
	events: [],
};

const actions = {
	populateEvents( queryKey, status, events = [] ) {
		return {
			type: 'POPULATE_EVENTS',
			queryKey,
			status,
			events,
		};
	},
};

const reducer = ( state = {}, action ) => {
	switch ( action.type ) {
		case 'POPULATE_EVENTS':
			return {
				...state,
				[ action.queryKey ]: {
					status: action.status,
					events: Array.isArray( action.events ) ? action.events : [],
				},
			};
		default:
			return state;
	}
};

const selectors = {
	getEvents( state, queryKey ) {
		return state[ queryKey ] || DEFAULT_RESULT;
	},
};

/**
 * Build Tribe Events REST path from a query object.
 *
 * Note: /tribe/events/v1/events does not register an `order` arg, so
 * ordering is applied client-side after fetch (see sortEventsByStartDate).
 *
 * @param {Object} query Normalized query params.
 * @return {string} REST path.
 */
function buildEventsPath( query ) {
	const params = new URLSearchParams( {
		page: '1',
		per_page: String( query.per_page ),
		start_date: query.start_date,
		end_date: query.end_date,
		strict_dates: 'true',
	} );

	if ( query.ends_after ) {
		params.set( 'ends_after', query.ends_after );
	}

	if ( query.ends_before ) {
		params.set( 'ends_before', query.ends_before );
	}

	if ( query.categories ) {
		params.set( 'categories', query.categories );
	}

	return `/tribe/events/v1/events/?${ params.toString() }`;
}

/**
 * Sort events by start_date, then keep only the display limit.
 * Tribe REST ignores order= and returns earliest-first, so DESC must
 * over-fetch then slice after sorting (mirrors tribe_get_events order).
 *
 * @param {Array}  events Event rows from the REST response.
 * @param {string} order  'asc' | 'desc'.
 * @param {number} limit  Max events to keep for the block preview.
 * @return {Array}
 */
function sortEventsByStartDate( events, order, limit ) {
	const direction = String( order || 'asc' ).toLowerCase() === 'desc' ? -1 : 1;
	const max = Math.min( Math.max( parseInt( limit, 10 ) || 10, 1 ), 999 );

	return [ ...events ]
		.sort( ( a, b ) => {
			const aTime = Date.parse( a.start_date ) || 0;
			const bTime = Date.parse( b.start_date ) || 0;
			return ( aTime - bTime ) * direction;
		} )
		.slice( 0, max );
}

const store = createReduxStore( 'ebec/events_data', {
	reducer,
	actions,
	selectors,
	resolvers: {
		getEvents: ( queryKey ) => async ( { dispatch } ) => {
			let query;
			try {
				query = JSON.parse( queryKey );
			} catch ( e ) {
				dispatch.populateEvents( queryKey, 'error', [] );
				return;
			}

			try {
				const events_data = await apiFetch( {
					path: buildEventsPath( query ),
				} );

				if ( ! events_data || ! Array.isArray( events_data.events ) ) {
					dispatch.populateEvents( queryKey, 'error', [] );
					return;
				}

				if ( events_data.events.length === 0 ) {
					dispatch.populateEvents( queryKey, 'empty', [] );
					return;
				}

				const sorted = sortEventsByStartDate(
					events_data.events,
					query.order,
					query.limit
				);
				dispatch.populateEvents( queryKey, 'ready', sorted );
			} catch ( e ) {
				dispatch.populateEvents( queryKey, 'error', [] );
			}
		},
	},
} );

register( store );
