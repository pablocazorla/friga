<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<link href='http://fonts.googleapis.com/css?family=McLaren' rel='stylesheet' type='text/css'>
	<article class="sub-frame sketch-list <?php echo $flavor;?> nice-scroll page" data-id="sketch-list">
		<header class="panel">
			<div class="text-box align-center">
				<h1>Sketchbook</h1>
				<p>dsf sdfdsf ddfsd</p>								
			</div>			
		</header>
		<section class="sketchbook-container">
			<div class="sketchbook-fold">
				<ul class="sketchbook">

			<?php
			$par = 1;
			$list = new WP_Query('post_type=sketch&posts_per_page=24');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>

			<?php if($par == 1){ 
				echo '<li class="sk-page">';
			} ?>
				<div class="sk-face" id="sketch-<?php the_ID();?>" alt="<?php the_title();?>">
					<?php if(has_post_thumbnail()){the_post_thumbnail('sketchbook-image');} ?>
					<div class="sk-face-content">
						<?php the_content(); ?>
					</div>					
				</div>
			<?php if($par == -1){ ?>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php } 
				$par *= -1;
			?>

			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>

			<?php if($par == -1){ ?>
					<div class="sk-face"></div>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php } ?>

			<?php else :?>
				<li class="sk-page">
					<div class="sk-face">
						<p>Sorry, sketches not found!</p>
					</div>
					<div class="sk-face"></div>
					<img class="sketchbook-page-bg" src="<?php bloginfo('template_url');?>/img/sketchbook/sketchbook-page-bg.png">
				</li>
			<?php endif; ?>
				</ul>
				<img class="sketchbook-fold-bg" src="<?php bloginfo('template_url'); ?>/img/sketchbook/sketchbook-fold-bg.jpg">
			</div>	
		</section>
		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>	
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>