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
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>

<head profile="<?php print $grddl_profile; ?>">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title><?php print $head_title; ?></title>

  <link href="/modules/system/system.base.css" rel="stylesheet"/>
  <link href="/<?php print $directory;?>/css/normalize.css" rel="stylesheet"/>
  <link href="/<?php print $directory;?>/css/style.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="/<?php print $directory;?>/css/print.css" media="print" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="//yandex.st/highlightjs/7.3/styles/default.min.css">

  <?php if ($is_admin): ?>
  <link href="/<?php print $directory;?>/css/admin.css" rel="stylesheet"/>
  <?php endif; ?>

</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php print $page; ?>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script type="text/javascript" src="/<?php print $directory;?>/js/script.js" defer></script>
  
  <?php if ($is_admin): ?>
  <script type="text/javascript" src="/<?php print $directory;?>/js/jquery.hotkeys.js"></script>
  <script type="text/javascript" src="/<?php print $directory;?>/js/js-markdown-extra.js"></script>
  <script type="text/javascript" src="/<?php print $directory;?>/js/admin.js"></script>
  <?php endif; ?>

</body>

</html>
