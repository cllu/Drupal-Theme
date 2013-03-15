<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in html.tpl.php and page.tpl.php.
 * Some may be blank but they are provided for consistency.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 */
?><!DOCTYPE html>
<head>
  <title><?php print $head_title; ?></title>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>

<div id="page">
  <div id="main">
    <div id="content" class="column" role="main">
      <a id="main-content"></a>
      <?php if ($title): ?>
        <h1 class="title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print $content; ?>
    </div><!-- /#content -->

  </div><!-- /#main -->
</div><!-- /#page -->

</body>
</html>
