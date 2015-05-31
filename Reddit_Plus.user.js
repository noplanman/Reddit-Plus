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
   * @param  {jQuery} $div DIV of the comment area.
   * @param  {string} url  URL of the entry to load the comments from.
   */
  function toggleComments( $div, url ) {
    // Show / Hide the comments area div.
    $div.toggle();

    // If we aren't loading / haven't loaded the comments yet, do this now.
    if ( ! $div.attr( 'data-loading' ) ) {
      $div.attr( 'data-loading', true );

      // Fetch the comments and fill them into the appropriate div.
      $div.load( url + ' .commentarea', function() {
        var $commentArea = $(this);

        // Remove the title and comment filter menu.
        $commentArea.find( '.panestack-title, .menuarea' ).remove();

        // Hide the input field to add a comment and add a button to show it.
        var $commentForm = $commentArea.find( '.usertext.cloneable' ).hide();
        // Add a link at the top to add a new comment.
        $('<a/>', {
          style : 'display: inline-block; margin: 4px 10px;',
          html  : '<button>Add new comment</button><button style="display:none;">Cancel</button>',
          click : function() {
            // Switch the "Add new comment" and "Cancel" buttons.
            $( 'button', $(this) ).toggle();

            // Show or Hide the comment form.
            $commentForm.toggle();

            // Set the focus on the comment input field.
            $( 'textarea', $commentForm ).focus();
          }
        }).prependTo( $commentArea );


        // Add a link at the bottom to close the comments.
        $('<a/>', {
          style : 'cursor: pointer;',
          html  : '<span>Close comments [-]</span>',
          click : function() {
            // Scroll the window to the correct position.
            $(window).scrollTop( $(window).scrollTop() - $div.height() );

            // Hide the comments.
            toggleComments( $div, url );
          }
        }).appendTo( $commentArea );
      });
    }
  }

  /**
   * Add the toggles next to the comment links.
   */
  function addCommentToggles() {
    $( '.comments' ).not( '.rp-toggle-added' ).each(function() {
      var $commentsLink = $(this);

      // Remember the url of the post page, cause that's where we load the comments from.
      var url = this.href;

      // The div that will contain the loaded comments.
      var $div = $('<div/>', {
        html : 'loading...'
      })
      .hide()
      .appendTo( $commentsLink.closest( '.entry' ) );

      // Add a class to remember which ones have already been added.
      $commentsLink.addClass( 'rp-toggle-added' );

      // Link to expand / reduce the comments.
      $('<a/>', {
        style : 'cursor: pointer;',
        html  : '<span title="Show comments">[+]</span><span title="Close comments" style="display:none">[-]</span>',
        click : function() {
          // Switch the "[+]" and "[-]" buttons.
          $( 'span', $(this) ).toggle();

          // Show or Hide the comments.
          toggleComments( $div, url );
        }
      }).insertAfter( $commentsLink );
    });
  }
});