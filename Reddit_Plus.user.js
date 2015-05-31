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
    // Switch the [+] and [-] buttons.
    $( 'span', $( '#' + id ) ).toggle();

    // If we aren't loading / haven't loaded the comments yet, do this now.
    if ( ! $div.attr( 'data-loading' ) ) {
      $div.attr( 'data-loading', true );
      // Fetch the comments and fill them into the appropriate div.
      $('#div-' + id ).load( url + ' .nestedlisting', function() {
        // Add a link at the bottom to close the comments.
        $('<a/>', {
          style : 'cursor: pointer;',
          html  : '<span title="Close comments">Close comments [-]</span>',
          click : function() {
            // Scroll the window to the correct position.
            $(window).scrollTop( $(window).scrollTop() - $div.height() );

            // Hide the comments.
            toggleComments( id, url );
          }
        }).appendTo( $(this) );
      });
    }
  }

  /**
   * Add the toggles next to the comment links.
   */
  function addCommentToggles() {
    $( '.comments' ).not( '.rp-toggle-added' ).each(function() {
      var id  = 'show-comments-' + $(this).closest( '.thing' ).attr( 'data-fullname' );
      var url = this.href;

      // Link to expand / reduce the comments.
      $('<a/>', {
        'id'  : id,
        style : 'cursor: pointer;',
        html  : '<span title="Show comments">[+]</span><span title="Close comments" style="display:none">[-]</span>',
        click : function() { toggleComments( id, url ); }
      })
      .insertAfter( $(this) );

      // The div that will contain the loaded comments.
      $('<div/>', {
        'id'  : 'div-' + id,
        html  : 'loading...'
      })
      .hide()
      .appendTo( $(this).closest( '.entry' ) );

      // Add a class to remember which ones have already been added.
      $(this).addClass( 'rp-toggle-added' );
    });
  }
});