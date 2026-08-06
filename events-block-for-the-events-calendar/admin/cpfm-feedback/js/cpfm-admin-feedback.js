jQuery( document ).ready( function ( $ ) {
	const noticePanel = $( '#cpfNoticePanel' );
	const urlParams = new URLSearchParams( window.location.search );
	const currentPage = urlParams.get( 'page' );

	if (
		noticePanel.data( 'auto-show' ) &&
		adminNotice.autoShowPages &&
		adminNotice.autoShowPages.includes( currentPage )
	) {
		setTimeout( function () {
			noticePanel.fadeIn( 300 );
		}, 500 );
	}

	$( document ).on( 'click', '#cpfm_remove_notice', function ( e ) {
		e.preventDefault();
		noticePanel.fadeOut( 300 );
	} );

	$( document ).on( 'click', '.opt-in-yes, .opt-in-no', function ( e ) {
		e.preventDefault();

		const button = $( this );
		const category = button.data( 'category' );
		const optIn = button.val();
		const noticeItem = button.closest( '.notice-item' );

		$.post(
			adminNotice.ajaxurl,
			{
				action: 'cpfm_handle_opt_in',
				nonce: adminNotice.nonce,
				category: category,
				opt_in: optIn,
			},
			function ( response ) {
				if ( ! response.success ) {
					return;
				}

				noticeItem.slideUp( 300, function () {
					noticeItem.remove();
					const remainingNotices = $( '#cpfNoticePanel .notice-item.unread' );
					if ( remainingNotices.length === 0 ) {
						noticePanel.fadeOut( 300 );
					}
				} );
			}
		);
	} );

	$( '.cpf-toggle-extra' ).on( 'click', function ( e ) {
		e.preventDefault();
		$( this ).closest( '.notice-item' ).find( '.cpf-extra-info' ).slideToggle();
	} );
} );
