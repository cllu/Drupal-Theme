(function ($, window, document, undefined) {
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

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-36894915-2', 'chunliang.me');
  ga('send', 'pageview');
 
  $.getScript("https://yandex.st/highlightjs/7.3/highlight.min.js");
})(jQuery,this, this.document);
