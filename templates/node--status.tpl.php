<div class="node node-status"> 

  <div class="node-meta">
    Posted on <?php print date('F j, Y', $created); ?>
  </div>

  <div class="node-content">
  <?php
    $body = field_view_value('node', $node, 'body', $body[0]);
    print $body['#markup'];
  ?> 
  </div>

</div><!-- /.node -->
