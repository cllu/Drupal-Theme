/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

    // add keyboard shortcuts.
    $(document).bind('keydown', 'alt+shift+h', function(){
        window.location = '/';
    });
    $(document).bind('keydown', 'alt+shift+b', function(){
        window.location = '/node/add/blog';
    });
    $(document).bind('keydown', 'alt+shift+n', function(){
        window.location = '/node/add/note';
    });
    $(document).bind('keydown', 'alt+shift+t', function(){
        window.location = '/node/add/diary';
    });

    // login/logout
    $(document).bind('keydown', 'alt+shift+i', function(){
        window.location = '/user/login';
    });
    $(document).bind('keydown', 'alt+shift+o', function(){
        window.location = '/user/logout';
    });

    // node edit/preview/save
    $(document).bind('keydown', 'alt+shift+e', function(){
        window.location = $('link[rel=shortlink]')[0].href+'/edit';
    });
    $(document).bind('keydown', 'alt+shift+p', function(){
        $('#edit-preview').click();
    });
    $(document).bind('keydown', 'alt+shift+s', function(){
        $('#edit-submit').click();
    });
    $(document).bind('keydown', 'alt+shift+d', function(){
        $('#edit-delete').click();
    });
    // cancel the edit form and return to the page.
    $(document).bind('keydown', 'alt+shift+c', function(){
        current = window.location.href;
        if (current.substr(-5) == '/edit') {
            window.location = current.substr(0, current.length-5);
        }
    });

    // dismiss the message
    $(document).bind('keydown', 'esc', function(){
        if ( $('.messages').length ) {
            $('.messages').remove();
        } else {
            $('#header').toggle();
        }
    });
    
    // search
    $(document).bind('keydown', 'alt+shift+f', function(){
        $('#edit-search-block-form--2').focus();
    });


})(jQuery, Drupal, this, this.document);
