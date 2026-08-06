jQuery( document ).ready( function ( $ ) {
	$( '.ebec_dismiss_notice' ).on( 'click', function () {
		const $button = $( this );
		const $wrapper = $button.parents( '.cool-feedback-notice-wrapper' );
		const ajaxURL = $wrapper.data( 'ajax-url' );
		const ajaxCallback = $wrapper.data( 'ajax-callback' );
		const nonce = $wrapper.data( 'nonce' );

		$button.prop( 'disabled', true );
		$wrapper.find( '.ebec_dismiss_notice' ).prop( 'disabled', true );
		$wrapper.find( '.ebec-dismiss-error' ).remove();

		$.post(
			ajaxURL,
			{
				action: ajaxCallback,
				security: nonce,
			},
			function ( data ) {
				if ( data && data.success ) {
					$wrapper.slideUp( 'fast', function () {
						$( this ).remove();
					} );
					return;
				}

				$button.prop( 'disabled', false );
				$wrapper.find( '.ebec_dismiss_notice' ).prop( 'disabled', false );
				$wrapper.append(
					$( '<p class="ebec-dismiss-error" style="color:#b32d2e;margin:8px 0 0;"></p>' ).text(
						'Could not dismiss this notice. Please try again.'
					)
				);
			},
			'json'
		).fail( function () {
			$button.prop( 'disabled', false );
			$wrapper.find( '.ebec_dismiss_notice' ).prop( 'disabled', false );
			$wrapper.find( '.ebec-dismiss-error' ).remove();
			$wrapper.append(
				$( '<p class="ebec-dismiss-error" style="color:#b32d2e;margin:8px 0 0;"></p>' ).text(
					'Could not dismiss this notice. Please try again.'
				)
			);
		} );
	} );
} );
