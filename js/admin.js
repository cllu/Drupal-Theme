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
(function ($, window, document, undefined) {

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
        $('#node-edit-btn').click();
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
        $("a#edit-node").click(function() {
          if ($("#node-edit-panel").length) {
            // if we have opened edit form, just reopen it
            openEditPanel();
          } else {
            editNode(this.href + '/ajax');
          }
          return false;
        });

        $('a.new-node').click(function() {
            node_type = this.href.substring(this.href.lastIndexOf('/')+1);
            editNode('/node/'+node_type+'/edit/ajax');
            return false;  
        })
    });

    function editNode(link){

        // load edit form to node-edit-form div
        $.get(link, function(data){
            
            $("<div/>", {id: "node-edit-panel"}).appendTo(document.body);
            
            $('<div/>', {id: 'dragger'}).appendTo($('#node-edit-panel'));
            $(data).appendTo($("#node-edit-panel"));

            // autosave
            enableFormAutoSave();

            // dragger
            $('#dragger').bind('mousedown', function(e) {
                var $dragable = $(this).parent(),
                    startWidth = $dragable.width(),
                    pX = e.pageX;
                
                $(document).bind('mouseup', function(e) {
                    $(document).unbind('mouseup').unbind('mousemove');
                });
                
                $(document).bind('mousemove', function(me) {
                    var mx = (me.pageX - pX);
                    $dragable.css({
                        width: startWidth - mx
                    });
                });
            });


            // clear current content and add markdown-preview div
            $(".node-content").html("");
            $("<div/>", {id: "body-preview"}).appendTo($(".node-content"));

            // fieldset collapsed
            $("#node-edit-panel fieldset").addClass("collapsed");
            $("#node-edit-panel fieldset legend").click(function(){
                $(this).parent().toggleClass("collapsed"); 
                $(window).resize();
                $('#ace-editor').resize();
            });

            $("#edit-title").keyup(function() {
                $(".node-title h1").html($("#edit-title").val())
            });
            
            $('<div/>', {id:"ace-editor"}).insertAfter($('.form-item-title'));
            $body = $("#edit-body textarea.text-full");
            $editor = $('#ace-editor');
            // ace editor
            $.getScript('//d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js', function() {
                editor = ace.edit("ace-editor");
                editor.setTheme("ace/theme/tomorrow_night");
                editor.getSession().setMode("ace/mode/markdown");
                editor.getSession().setUseWrapMode(true);

                // set initial value from textarea
                editor.setValue($body.val());
                markdown = new Markdown.Converter();
                Markdown.Extra.init(markdown);
                $("#body-preview").html(markdown.makeHtml(editor.getValue()));
                editor.getSession().on('change', function(e) {
                    // update textarea value
                    $body.val(editor.getValue());
                    // trigger the event so we can update the preview
                    $('#body-preview').html(markdown.makeHtml(editor.getValue()));
                    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, "body-preview"]);
                    $('#body-preview pre code').each(function(i, e) {hljs.highlightBlock(e)});
                });

                editor.clearSelection();

                // hide editor
                $body.hide();
                $('#ace-editor').css('position', 'relative');
                $('#ace-editor').css('height', '100px');
                // resize editor
                $(window).resize(function(){
                    editpanel = $('#node-edit-panel');
                    //extra = editpanel[0].scrollHeight - editpanel.height();
                    extra = $('#node-edit-panel form').outerHeight() - editpanel.outerHeight();
                    //if (Math.abs(extra) > 10) {
                    $editor.height($editor.height() - extra );
                    //}
                });

                $(window).resize();

            })
            
            openEditPanel();
        });

    } // end of editNote()

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


            $("fieldset legend").click(function(){
                $(this).parent().toggleClass("collapsed"); 
            });

    function enableFormAutoSave() {
        $('.node-form').sisyphus({
            locationBased: true,
            timeout: 10,
            onSave: function() {console.log('autosave succeed');}    
        });
    }

    enableFormAutoSave();

})(jQuery, this, this.document);

