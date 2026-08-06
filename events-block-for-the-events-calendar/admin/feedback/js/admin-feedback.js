(function ($) {
	$(document).ready(function () {
		const plugin_name = 'events-block-for-the-events-calendar';
		const plugin_slug = 'ebec';
		const $popup = $( '#cool-plugins-feedback-' + plugin_slug );
		const $target = $( '#the-list' ).find(
			'[data-slug="' + plugin_name + '"] span.deactivate a'
		);
		const plugin_deactivate_link = $target.attr( 'href' );

		function showFeedbackError( message ) {
			$( '.cp-feedback-error' ).remove();
			const $terms = $( '.cp-feedback-terms-input' ).first();
			if ( ! $terms.length ) {
				return;
			}
			$( '<p class="cp-feedback-error"></p>' )
				.text( message )
				.appendTo( $terms.parent() );
		}

		function deactivatePlugin() {
			window.location = plugin_deactivate_link;
		}

		$target.on( 'click', function ( event ) {
			event.preventDefault();
			$( '#wpwrap' ).css( 'opacity', '0.4' );

			$popup.animate(
				{ opacity: 1 },
				200,
				function () {
					$popup.removeClass( 'hide-feedback-popup' );
					$popup.find( '#cool-plugin-submitNdeactivate' ).addClass( plugin_slug );
					$popup.find( '#cool-plugin-skipNdeactivate' ).addClass( plugin_slug );
				}
			);
		} );

		$( '#wpwrap' ).on( 'click', function ( ev ) {
			if ( $popup.filter( '.hide-feedback-popup' ).length === 0 ) {
				ev.preventDefault();
				$popup.animate(
					{ opacity: 0 },
					200,
					function () {
						$popup.addClass( 'hide-feedback-popup' );
						$popup.find( '#cool-plugin-submitNdeactivate' ).removeClass( plugin_slug );
						$popup.find( '#cool-plugin-skipNdeactivate' ).removeClass( plugin_slug );
						$( '#wpwrap' ).css( 'opacity', '1' );
					}
				);
			}
		} );

		$( document ).on( 'click', '#cool-plugin-submitNdeactivate.' + plugin_slug, function () {
			const nonce = $popup.find( 'input[name="_wpnonce"]' ).val();
			const reason = $( '.cp-feedback-input:checked' ).val();
			const reasonChecked = $( '.cp-feedback-input-wrapper > input' ).is( ':checked' );
			let message = '';

			$( '.cp-feedback-error' ).remove();

			if ( ! reasonChecked ) {
				showFeedbackError( '* Please select at least one reason.' );
				return;
			}

			if ( $( '#cp-feedback-terms-input' ).is( ':checked' ) === false ) {
				showFeedbackError(
					'* Please agree to the details by checking the box before submitting the form.'
				);
				return;
			}

			const reasonText = $( 'textarea[name="reason_' + reason + '"]' ).val();
			message = reasonText === '' ? 'N/A' : reasonText;

			$.ajax( {
				url: ajaxurl,
				method: 'POST',
				data: {
					action: plugin_slug + '_submit_deactivation_response',
					_wpnonce: nonce,
					reason: reason,
					message: message,
				},
				beforeSend: function () {
					$( '#cool-plugin-submitNdeactivate' ).text( 'Deactivating...' );
					$( '#cool-plugin-submitNdeactivate' ).attr( 'id', 'deactivating-plugin' );
					$( '.cp-feedback-loader' ).show();
					$( '#cool-plugin-skipNdeactivate' ).remove();
				},
				success: function () {
					$( '.cp-feedback-wrapper' ).hide();
					$( '.cp-feedback-loader' ).hide();
					$( '#deactivating-plugin' ).text( 'Deactivated' );
					deactivatePlugin();
				},
				error: function () {
					// Feedback is best-effort; still honour the deactivate intent.
					deactivatePlugin();
				},
			} );
		} );

		$( document ).on( 'click', '#cool-plugin-skipNdeactivate.' + plugin_slug, function () {
			$( '#cool-plugin-skipNdeactivate' ).attr( 'id', 'deactivating-plugin' );
			deactivatePlugin();
		} );
	} );
})( jQuery );
