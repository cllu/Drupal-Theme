<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $secondary_menu_heading: The title of the menu used by the secondary links.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['navigation']: Items for the navigation region, below the main menu (if any).
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 * - $page['bottom']: Items to appear at the bottom of the page below the footer.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see zen_preprocess_page()
 * @see template_process()
 */
?>

<div id="wrapper">

  <div id="header" role="banner">

    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a>
    <?php endif; ?>

    <?php if ($site_name || $site_slogan): ?>
      <div id="name-and-slogan">
        <?php if ($site_name): ?>
          <h1 id="site-name">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
          </h1>
        <?php endif; ?>

        <?php if ($site_slogan): ?>
          <h2 id="site-slogan"><?php print $site_slogan; ?></h2>
        <?php endif; ?>
      </div><!-- /#name-and-slogan -->
    <?php endif; ?>

    <?php if ($is_admin && !$static_page): ?>
    <div id="search">
      <form class="search-form" action="/search/node" method="get" accept-charset="UTF-8">
        <input onblur="if (this.value=='') {this.value='Search';}" onfocus="if (this.value='Search') {this.value='';}" type="text" id="edit-keys--2" name="keys" value="Search" size="12" maxlength="255" class="form-text">
      </form>
    </div>
    <?php endif; ?>

    <div id="navigation">
      <ul>
        <li><a href="/">Home</a></li>    
        <li><a href="/blog">Blog</a></li>    
        <li><a href="/favorites">Favorites</a></li>    
      </ul>
    </div><!-- /#navigation -->
   
   <?php if ($is_admin && !$static_page): ?>
   <div id="management">
    <ul>
    <li><a href="/status">Status</a></li>    
    <li>
      <a id="node-add-btn">Add</a>
      <ul>
        <li><a class="new-node" href="/node/add/blog">Blog</a></li>
        <li><a class="new-node" href="/node/add/diary">Diary</a></li>
        <li><a class="new-node" href="/node/add/note">Note</a></li>
        <li><a class="new-node" href="/node/add/page">Page</a></li>
      </ul>
    </li>
    <?php if (isset($node)): ?>
    <li><a href="/node/<?php print $node->nid; ?>/edit" id="edit-node">Edit</a></li>
    <?php endif; ?>
    </ul>
    </div>
    <?php endif; ?>

  </div>

  <div id="main">
    <?php print $messages; ?>
    <?php if (!isset($node) && !$static_page): ?>
    <div id="page">
      <div id="page-title">
        <?php print render($title_prefix); ?>
        <?php if ($title): ?>
          <h1 class="title"><?php print $title; ?>
          <?php if (isset($node) && property_exists($node, 'private') && ($node->private)): ?><span><img src="/sites/all/themes/mei/images/private.gif"></span><?php endif; ?>
          </h1> 
        <?php endif; ?>
        <?php print render($title_suffix); ?>
      </div>

      <div id="page-meta">
        <?php print $breadcrumb; ?>
        <?php print render($tabs); ?>
        <?php print render($page['help']); ?>
        <?php if ($action_links): ?>
          <ul class="action-links"><?php print render($action_links); ?></ul>
        <?php endif; ?>
      </div>

      <div id="page-content">
        <?php print render($page['content']); ?>
      </div>
    </div><!-- /#page -->
    <?php else: ?>
    <?php print render($page['content']); ?>
    <?php endif; ?>

  </div><!-- /#main -->

</div><!-- /#page -->

