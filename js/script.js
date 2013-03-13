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
            // dismiss the messages
            $('.messages').remove();
        } else if ( $('#node-edit-panel').length ) { 
           // edit the node
            if ( $("#header").css("margin-left") == "0px" ) {
                 // fade in
                openEditPanel();
            } else {
                // fade out
                closeEditPanel();
            }
        } else {
            $('#header').toggle();
        }
    });
    
    // search
    $(document).bind('keydown', 'alt+shift+f', function(){
        $('#edit-search-block-form--2').focus();
    });


    $(document).bind('keydown', 'ctrl+enter', function(){
        $('header').animate({
            marginLeft: "-25%"
        }, {
            step: function(now, fx) {
                $('#main').css("margin-left", (now+25)+"%");
            }
        });
    });

    window.editNode = editNode;
    window.closeEditPanel = closeEditPanel;
    window.openEditPanel = openEditPanel;

    $(document).ready(function() {
        $("#node-edit-btn").click(function() {
          if ($("#node-edit-panel").length) {
            // if we have opened edit form, just reopen it
            openEditPanel()
          } else {
            editNode();
          }
        });
    });

    function editNode(){

        var converter = new Showdown.converter();
        // load edit form to node-edit-form div
        $.get($('link[rel=shortlink]')[0].href+'/edit/ajax', function(data){
            
            $("<div/>", {id: "node-edit-panel"}).appendTo(document.body);
            
            $(data).appendTo($("#node-edit-panel"));

            // clear current content and add markdown-preview div
            $("#content").html("");
            $("<div/>", {id: "body-preview"}).appendTo($("#content"));

            // fieldset collapsed
            $("#node-edit-panel fieldset").addClass("collapsed");
            $("#node-edit-panel fieldset").click(function(){$(this).toggleClass("collapsed")});

            $("#body-preview").html(converter.makeHtml($("#edit-body textarea.text-full").val()));
            $("#edit-title").keyup(function() {
                $("#page-title h1").html($("#edit-title").val())
            });
            $('#edit-body textarea.text-full').keyup(function () {
                $('#body-preview').html(converter.makeHtml($(this).val()));
            });

            openEditPanel();

        });

        // init showdown and mathjax to render textarea lively
        //$("textarea.text-full").on("keyup", function () {
            //body = $("textarea.text-full").val()
            // strip math from body to prevent math being rendered by markdown
            //body = replace_math(body);
            // process by markdown engine
            //body = markdown(body);
            // restore latex code
            //body = restore_math(body);
            // procese by mathjax 
            //$("body-preview").html(body);
        //});

        // slide left to edit
    }

    function openEditPanel() {
        // slide in the edit panel
        $('#header').animate({
            marginLeft: "-25%"
        }, {
            step: function(now, fx) {
                $('#main').css("margin-left", (now+25)+"%");
                $('#node-edit-panel').css("right", (-now/25) * 510 -510 );
            }
        });
    }

    function closeEditPanel() {
        // slide right
        $('header').animate({
            marginLeft: "0%"
        }, {
            step: function(now, fx) {
                $('#main').css("margin-left", (now+25)+"%");
                $('#node-edit-panel').css("right", (-now/25) * 510 -510 );
            }
        });
    }

    function saveNode() {
        // slide right if necessary

        // submit the form

        // load the current server-side rendered body and update
    }

})(jQuery, Drupal, this, this.document);
