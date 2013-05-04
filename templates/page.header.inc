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
