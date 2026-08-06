/**
 * Convert a WordPress locale (en_US) to a BCP 47 tag (en-US) for Intl APIs.
 *
 * @param {string|undefined} locale WordPress locale from get_locale().
 * @return {string|undefined} Valid Intl locale, or undefined to use browser default.
 */
export function normalizeIntlLocale( locale ) {
	if ( ! locale || typeof locale !== 'string' ) {
		return undefined;
	}

	const bcp47 = locale.trim().replace( /_/g, '-' );
	if ( ! bcp47 ) {
		return undefined;
	}

	try {
		const [ canonical ] = Intl.getCanonicalLocales( bcp47 );
		return canonical || undefined;
	} catch ( e ) {
		return undefined;
	}
}
