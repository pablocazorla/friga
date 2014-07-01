<?php get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article id="article-main" class="work-main work-post work-<?php the_ID();?>">	
	<section class="work work-post clearfix">
		<?php the_content(); ?>
	</section>			
</article>
<?php endwhile; endif; ?>
<?php get_footer(); ?>

