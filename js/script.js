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
            if ( window.originalMarginLeft && window.originalMarginLeft == parseInt($("#wrapper").css("margin-left")) ) {
                 // fade in
                console.log("open edit panel");
                openEditPanel();
            } else {
                // fade out
                console.log("close edit panel");
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

        // load edit form to node-edit-form div
        $.get($('link[rel=shortlink]')[0].href+'/edit/ajax', function(data){
            
            $("<div/>", {id: "node-edit-panel"}).appendTo(document.body);
            
            $(data).appendTo($("#node-edit-panel"));

            $(window).resize(function(){
              textarea = $('textarea.text-full');
              editpanel = $('#node-edit-panel');
              //extra = editpanel[0].scrollHeight - editpanel.height();
              extra = $('#node-edit-panel form').outerHeight() - editpanel.outerHeight();
              //if (Math.abs(extra) > 10) {
                textarea.height(textarea.height() - extra );
              //}
            });


            // clear current content and add markdown-preview div
            $(".node-body").html("");
            $("<div/>", {id: "body-preview"}).appendTo($(".node-body"));

            // fieldset collapsed
            $("#node-edit-panel fieldset").addClass("collapsed");
            $("#node-edit-panel fieldset").click(function(){$(this).toggleClass("collapsed")});

            $("#edit-title").keyup(function() {
                $(".node-title h1").html($("#edit-title").val())
            });

            // body-preview  using showdown
            //var converter = new Showdown.converter();
            //$("#body-preview").html(converter.makeHtml($("#edit-body textarea.text-full").val()));
            //$('#edit-body textarea.text-full').keyup(function () {
            //    $('#body-preview').html(converter.makeHtml($(this).val()));
            //});

            $("#body-preview").html(Markdown($("#edit-body textarea.text-full").val()));
            $('#edit-body textarea.text-full').keyup(function () {
                $('#body-preview').html(Markdown($(this).val()));
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "body-preview"]);
            });

            openEditPanel();
            $(window).resize();
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
        marginLeft = parseInt($("#wrapper").css("margin-left"), 10);
        if (window.originalMarginLeft && marginLeft != window.originalMarginLeft) {
            return 0;
        }

        window.originalMarginLeft = marginLeft;
        window.collapsedMarginLeft = -250;

        $("#wrapper").animate({
            marginLeft: window.collapsedMarginLeft
        }, {
            step: function (now, fx) {
                rate = (now - window.collapsedMarginLeft) / (window.originalMarginLeft - window.collapsedMarginLeft);
                $("#node-edit-panel").css("right", - rate * 510);
            }
        });

    }

    function closeEditPanel() {
        // slide right

        $("#wrapper").animate({
            marginLeft: window.originalMarginLeft
        }, {
            step: function (now, fx) {
                rate = (now - window.collapsedMarginLeft) / (window.originalMarginLeft - window.collapsedMarginLeft);
                $("#node-edit-panel").css("right", - rate * 510);
            }
        });

    }

    function saveNode() {
        // slide right if necessary

        // submit the form

        // load the current server-side rendered body and update
    }

})(jQuery, Drupal, this, this.document);
