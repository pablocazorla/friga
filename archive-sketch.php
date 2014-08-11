<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame sketch-list <?php echo $flavor;?> nice-scroll page" data-id="sketch-list">
		<header class="panel">
			<div class="text-box align-center">
				<h1>Sketchbook</h1>
				<p>dsf sdfdsf ddfsd</p>								
			</div>			
		</header>
		<section class="">




			<?php
			$list = new WP_Query('post_type=sketch&posts_per_page=24');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>		
			  

<?php the_title(); ?>



			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>
		</section>


		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>	
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>