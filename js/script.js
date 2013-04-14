(function ($, window, document, undefined) {
  // header div
  $('#header').css('opacity', '0.4');
  $('#header').mouseenter(function(){$(this).animate({opacity: 1}); }).mouseleave(function(){$(this).animate({opacity: 0.4}); });
  
  // MathJax
  $.getScript("https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?delayStartupUntil=configured", function() {
  
    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/TeX","output/HTML-CSS","output/NativeMML"],
      extensions: ["tex2jax.js","MathMenu.js","MathZoom.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      },
      messageStyle: "none",
      showProcessingMessages: false,
      tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
    });

    MathJax.Hub.Configured();
  });

  // Google analysis
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-36894915-2', 'chunliang.me');
  ga('send', 'pageview');
 
  // syntax highlighter
  $.getScript("//cdnjs.cloudflare.com/ajax/libs/highlight.js/7.3/highlight.min.js", function() {
    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  });
})(jQuery,this, this.document);
