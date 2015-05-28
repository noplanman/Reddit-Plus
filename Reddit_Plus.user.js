// ==UserScript==
// @name        Reddit Plus
// @namespace   reddit
// @description Additional little features for Reddit.
// @include     *.reddit.com*
// @version     1.0
// @copyright   2015 Armando Lüscher
// @author      Armando Lüscher
// @oujs:author noplanman
// @grant       none
// @homepageURL https://github.com/noplanman/Reddit-Plus
// @supportURL  https://github.com/noplanman/Reddit-Plus/issues
// ==/UserScript==

// Make sure we have jQuery loaded.
if ( ! ( 'jQuery' in window ) ) { return false; }

// Run everything as soon as the DOM is set up.
jQuery( document ).ready(function( $ ) {

  /**
   * The MutationObserver to detect page changes.
   */
  var Observer = {

    // The mutation observer object.
    observer : null,

    // The elements that we are observing.
    queryToObserve : '#siteTable',

    /**
     * Start observing for DOM changes.
     */
    init : function() {

      // Check if we can use the MutationObserver.
      if ( 'MutationObserver' in window ) {
        var toObserve = document.querySelector( Observer.queryToObserve );
        if ( toObserve ) {

          Observer.observer = new MutationObserver( function( mutations ) {
            addCommentToggles();
          });

          // Observe child changes.
          Observer.observer.observe( toObserve, {
            childList: true
          });
        }
      }
    }
  };

  Observer.init();

  // Initial load.
  addCommentToggles();


  /**
   * Toggle the comments area below the link.
   *
   * @param  {string} id  ID of the comment expand button.
   * @param  {string} url URL of the entry to load the comments.
   */
  function toggleComments( id, url ) {
    // Show / Hide the comments area.
    var $div = $( '#div-' + id ).toggle();
    $( 'span', $( '#' + id ) ).toggle();

    // If we aren't loading / haven't loaded the comments yet, do this now.
    if ( ! $div.data( 'loading' ) ) {
      $div.data( 'loading', true );
      $( '#div-' + id ).load( url + ' .nestedlisting' );
    }
  }

  /**
   * Add the toggles next to the comment links.
   */
  function addCommentToggles() {
    $( '.comments' ).not( '.show-comments-toggled' ).each(function() {
      var url = this.href;
      var id  = 'show-comments-' + url.split('/')[6];

      $( '<a/>', {
        'id'  : id,
        style : 'cursor: pointer;',
        title : 'Expand comments',
        html  : '<span>[+]</span><span style="display:none">[-]</span>',
        click : function() { toggleComments( id, url ); }
      })
      .insertAfter( $(this) );

      $( '<div/>', {
        'id'  : 'div-' + id,
        html  : r.config.status_msg.loading,
      })
      .hide()
      .appendTo( $(this).closest( '.entry' ) );
//      .insertAfter( $(this).closest( '.flat-list' ).next( '.expando' ) );

      $( this ).addClass( 'show-comments-toggled' );
    });
  }
});