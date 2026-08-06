/**
 * Resolve the document that hosts the block editor canvas.
 * Caches the iframe document after the first successful lookup.
 *
 * @param {{ current?: Element }|null} ref Optional React ref into the canvas.
 * @return {Document}
 */
let cachedEditorDoc = null;

export function getEditorDocument( ref = null ) {
	if ( ref?.current?.ownerDocument ) {
		cachedEditorDoc = ref.current.ownerDocument;
		return cachedEditorDoc;
	}

	if ( cachedEditorDoc ) {
		return cachedEditorDoc;
	}

	const iframe = document.querySelector( 'iframe[name="editor-canvas"]' );
	if ( iframe?.contentDocument ) {
		cachedEditorDoc = iframe.contentDocument;
		return cachedEditorDoc;
	}

	return document;
}
