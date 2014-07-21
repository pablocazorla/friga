<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article class="sub-frame work-post-large-image">
	<figure class="pixel-loading">
		<?php 
		if(has_post_thumbnail()){
            the_post_thumbnail('pixelloading');
           	the_post_thumbnail('large');
        }
		?>		
		<!--img width="1880" height="1175" alt="amanecer" class="attachment-large wp-post-image" src="https://dl.dropboxusercontent.com/u/13764188/amanecer-1880x1175.jpeg"-->
	</figure>
</article>
<article class="sub-frame work-post nice-scroll" id="work-<?php the_ID();?>">
	<section class="summary">
		<div class="summary-content clearfix">
			<div class="summary-content-col">
				<h1><?php the_title(); ?></h1>
				<div class="summary-excerpt">
					<?php the_excerpt(); ?>
					<div class="load-from-right">
						<?php previous_post_link('%link &raquo;'); ?><br>
						<?php next_post_link('&laquo; %link'); ?>
					</div>
				</div>
				<div class="summary-social">
				</div>
			</div>
		</div>
	</section>
	<section class="panel work-content">
		<?php the_content(); ?>
	</section>
</article>
<?php endwhile; endif; ?>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>