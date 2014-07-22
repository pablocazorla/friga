<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<?php if (!$async){?>
<article class="sub-frame illustration-post-large-image">
	<figure>				
		<img src="<?php echo url_thumbnail('large');?>">
	</figure>
</article>
<?php } ?>
<nav class="illustration-post-nav over-img">
	<a href="">illust</a>
	<?php
	$prev_post = get_previous_post();
	$srcImgBigPrev = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID), 'large');
	
	if (!empty( $prev_post )){
		echo '<a href="'.get_permalink( $prev_post->ID ).'" class="next-illustration" title="'.get_the_title($prev_post->ID).'" data-imgbig="'.$srcImgBigPrev[0].'">'.get_the_post_thumbnail($prev_post->ID, 'illustration-thumb').'</a>';
	}
	$next_post = get_next_post();
	$srcImgBigNext = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID), 'large');

	if (!empty( $next_post )){
		echo '<a href="'.get_permalink( $next_post->ID ).'" class="prev-illustration" title="'.get_the_title($next_post->ID).'" data-imgbig="'.$srcImgBigNext[0].'">'.get_the_post_thumbnail($next_post->ID, 'illustration-thumb').'</a>';
	}
	?>
</nav>
<article class="sub-frame illustration-post nice-scroll page" id="illustration-<?php the_ID();?>" data-id="illustration-post">	
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
	<section class="panel illustration-content">
		<?php the_content(); ?>
	</section>
</article>

<?php endwhile; endif; ?>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>