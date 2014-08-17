<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<script type="text/javascript">pageID = 'design-list';</script>
	<article class="sub-frame design-list <?php echo $flavor;?> page">
		
		<section id="design-slider" style="display:none">
			<div class="d-slide" style="background-color:red">slide1</div>
			<div class="d-slide" style="background-color:blue">slide2</div>
			<div class="d-slide" style="background-color:green">slide3</div>
			<div class="d-slide" style="background-color:yellow">slide4</div>
		</section>



















		<!--section class="">

			<?php
			$list = new WP_Query('post_type=design&posts_per_page=64');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>
		
			<figure>						
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" >	
					<?php
					if(has_post_thumbnail()){
			           	the_post_thumbnail('design-image');
			        }
			        ?>					
				</a>
				<figcaption><?php the_title(); ?></figcaption>				
			</figure>

			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>

		</section-->

		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>	
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>