/**
 * Compute month-header visibility for each event in one pass (no map mutation).
 *
 * @param {Array} events Event rows from the REST store.
 * @return {Array<{event: Object, showHeader: boolean}>}
 */
export function eventsWithHeaderFlags( events ) {
	let displayMonth = '';
	let displayYear = '';

	return events.map( ( event ) => {
		const year = event.start_date_details.year;
		const month = event.start_date_details.month;
		let showHeader = true;

		if ( displayYear === year ) {
			if ( displayMonth === month ) {
				showHeader = false;
			} else {
				displayMonth = month;
				showHeader = true;
			}
		} else {
			displayYear = year;
			displayMonth = month;
			showHeader = true;
		}

		return { event, showHeader };
	} );
}
