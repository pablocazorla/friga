<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<article class="sub-frame work-post-large-image">
	<figure>
		<img src="<?php echo pc_thumb_url('large');?>" data-pixelloading="<?php echo pc_thumb_url('portfolio-thumb');?>"/>
	</figure>
</article>
<article class="sub-frame work-post nice-scroll" id="work-<?php the_ID();?>">
	<section class="summary">
		<div class="summary-content clearfix">
			<div class="summary-content-col">
				<h1><?php the_title(); ?></h1>
				<div class="summary-excerpt">
					<?php the_excerpt(); ?>
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