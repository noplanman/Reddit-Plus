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

  // Add necessary CSS styles.
  addCSS();

  // Initial load.
  addCommentToggles();

  /**
   * Fetch the comments and fill them into the appropriate div.
   * @param  {jQuery} $div DIV of the comment area.
   * @param  {string} url  URL of the entry to load the comments from.
   */
  function loadComments( $div, url ) {
    // Let the user know that it's loading the comments.
    $div.html( 'loading...' );

    // Get the comments page and extract the info we need.
    $.get( url, function( response ) {
      // Get rid of all images first, no need to load those.
      var $post = $( response.replace( /<img[^>]*>/g, '' ) );

      // Also fetch the text telling us how many comments there are.
      var numOfCommentsText = $post.find( '.flat-list .first .comments' ).html();
      $div.prevAll( '.flat-list' ).find( '.first .comments' ).html( numOfCommentsText );

      // Find the comments area.
      var $commentArea = $( '.commentarea', $post );

      // Remove the title and comment filter menu.
      $commentArea.find( '.panestack-title, .menuarea' ).remove();

      // Hide the input field to add a comment and add a button to show it.
      var $commentForm = $( '.usertext.cloneable', $commentArea ).hide();
      var $textArea = $( 'textarea', $commentForm );

      // Add a button at the top to add a new comment.
      $('<a/>', {
        class : 'rp-button',
        html  : '<button>add new comment</button><button style="display:none;">cancel</button>',
        click : function() {
          // Switch the "Add new comment" and "Cancel" buttons.
          $( 'button', this ).toggle();

          // Show or Hide the comment form.
          $commentForm.toggle();

          // Set the focus on the comment input field.
          $textArea.focus();
        }
      }).prependTo( $commentArea );

      $( 'button.save', $commentArea ).click( function() { $textArea.focus(); } );

      // Add a link at the bottom to close the comments.
      $('<a/>', {
        class : 'rp-link',
        html  : '<span>close comments [-]</span>',
        click : function() {
          // Scroll the window to the correct position.
          $(window).scrollTop( $(window).scrollTop() - $div.height() );

          // Hide the comments.
          toggleComments( $div, url );
        }
      }).appendTo( $commentArea );


      // Add a button at the top to reload the comments.
      $('<a/>', {
        class : 'rp-button',
        html  : '<button>reload comments</button>',
        click : function() {
          // Reload all the comments.
          loadComments( $div, url );
        }
      }).prependTo( $commentArea );

      // Add the freshly loaded comments to the DIV.
      $div.html( $commentArea );
    });
  }

  /**
   * Toggle the comments area below the link.
   *
   * @param  {jQuery} $div DIV of the comment area.
   * @param  {string} url  URL of the entry to load the comments from.
   */
  function toggleComments( $div, url ) {
    // Show / Hide the comments area div.
    $div.toggle();

    // Switch the "[+]" and "[-]" buttons.
    $div.closest( '.entry' ).find( '.rp-comments-toggle span' ).toggle();

    // If we aren't loading / haven't loaded the comments yet, do this now.
    if ( ! $div.attr( 'data-loading' ) ) {
      $div.attr( 'data-loading', true );
      loadComments( $div, url );
    }
  }

  /**
   * Add the toggles next to the comment links.
   */
  function addCommentToggles() {
    // Don't execute on comment pages.
    if ( $( 'body.comments-page' ).length > 0 ) {
      return;
    }

    // Add toggles next to the comment links that haven't been handled yet.
    $( '.comments' ).not( '.rp-comments-toggle-added' ).each(function() {
      var $commentsLink = $(this);

      // Remember the url of the post page, cause that's where we load the comments from.
      var url = this.href;

      // The div that will contain the loaded comments.
      var $div = $('<div/>', {
        class : 'rp-comments-div',
        html  : 'loading...'
      })
      .hide()
      .appendTo( $commentsLink.closest( '.entry' ) );

      // Link to expand / reduce the comments.
      $('<a/>', {
        class : 'rp-comments-toggle',
        style : 'cursor: pointer;',
        html  : '<span title="show comments">[+]</span><span title="close comments" style="display:none">[-]</span>',
        click : function() {
          // Show or Hide the comments.
          toggleComments( $div, url );
        }
      }).insertAfter( $commentsLink );

      // Add a class to remember which ones have already been added.
      $commentsLink.addClass( 'rp-comments-toggle-added' );
    });
  }


  /**
   * Add the required CSS rules to the head.
   */
  function addCSS() {
    $( '<style>' ).html(
      // Menu item.
      '.rp-comments-div .rp-button { display: inline-block; margin: 4px; }' +
      '.rp-comments-div .rp-link { cursor: pointer; }'
    ).appendTo( 'head' );
  }
});
