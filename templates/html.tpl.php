<?php

/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 *
 * @ingroup themeable
 */
?><!DOCTYPE html>
<html lang="en" class="js">
<head>
  <meta charset="utf-8">
  <title><?php print $head_title; ?></title>
  <meta name="description" content="Personal website of Chunliang Lu.">
  <meta name="viewport" content="width=device-width">

  <link rel="shortcut icon" href="/assets/favicon.ico">
  <link rel="stylesheet" href="/assets/packed.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/7.3/styles/default.min.css">

  <?php if ($is_admin && !$static_page): ?>
  <?php print $scripts;?>
  <?php print $styles;?>
  <?php endif; ?>
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page; ?>

  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      config: ["MMLorHTML.js"],
      jax: ["input/TeX","output/HTML-CSS","output/NativeMML"],
      extensions: ["tex2jax.js","MathMenu.js"],
      TeX: {
        extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
      },
      messageStyle: "none",
      showProcessingMessages: false,
      tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
      // use \$ to represent a literral dollar sign
      processEscapes: true,
    });
  </script>

  <script type="text/javascript">
    // Add a script element as a child of the body
    function downloadJSAtOnload() {
      var element = document.createElement("script");
      element.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js";
      document.body.appendChild(element);
      var element = document.createElement("script");
      element.src = "/assets/packed.js";
      document.body.appendChild(element);
    }
    // Check for browser support of event handling capability
    if (window.addEventListener)
      window.addEventListener("load", downloadJSAtOnload, false);
    else if (window.attachEvent)
      window.attachEvent("onload", downloadJSAtOnload);
    else window.onload = downloadJSAtOnload;
  </script>

</body>
</html>
