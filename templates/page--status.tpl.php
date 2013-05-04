<div id="wrapper">
  <?php include 'page.header.inc'; ?>

  <div id="main">
    <?php print $messages; ?>
    <div id="page">
      <div id="page-title">
        <h1 class="title"><?php print $title; ?></h1> 
      </div>

      <div id="page-content">
        <form id="quick-status" action="/node/add/status/ajax" method="POST">
          <textarea id="status-body" name="body" rows="3"></textarea>
          <input type="submit" name="submit" value="Save">
        </form>
      </div>

    </div><!-- /#page -->

    <div id="nodes">
      <?php print render($page['content']); ?>
    </div>

    <?php print theme('pager'); ?>

  </div><!-- /#main -->
</div><!-- /#page -->

