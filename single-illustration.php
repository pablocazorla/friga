<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<?php if (!$async){?>
<article class="sub-frame illustration-post-large-image">
	<figure>				
		<img src="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>"/>
	</figure>
</article>
<?php } ?>
<nav class="illustration-post-nav over-img">
	<?php
	echo '<a href="'.get_post_type_archive_link('illustration').'" class="back-to-illustrations"><span class="link-title">All Illustrations</span></a>';

	$prev_post = get_previous_post();
	$srcImgBigPrev = wp_get_attachment_image_src( get_post_thumbnail_id($prev_post->ID), 'large');
	
	if (!empty( $prev_post )){
		echo '<a href="'.get_permalink( $prev_post->ID ).'" class="next-illustration" data-imgbig="'.$srcImgBigPrev[0].'"><span class="link-title">'.get_the_title($prev_post->ID).'</span>'.get_the_post_thumbnail($prev_post->ID, 'illustration-thumb').'</a>';
	}
	$next_post = get_next_post();
	$srcImgBigNext = wp_get_attachment_image_src( get_post_thumbnail_id($next_post->ID), 'large');

	if (!empty( $next_post )){
		echo '<a href="'.get_permalink( $next_post->ID ).'" class="prev-illustration" data-imgbig="'.$srcImgBigNext[0].'"><span class="link-title">'.get_the_title($next_post->ID).'</span>'.get_the_post_thumbnail($next_post->ID, 'illustration-thumb').'</a>';
	}
	?>
</nav>
<article class="sub-frame illustration-post nice-scroll page" id="illustration-<?php the_ID();?>" data-id="illustration-post">	
	<section class="summary">
		<div class="summary-content clearfix <?php if (!$async){ echo 'visible ';} customVal('summaryColor');?>">
			<div class="summary-content-col <?php customVal('summaryPosition');echo ' '; customVal('summaryBackground');?>">
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
		<div class="text-box">
			<?php the_content(); ?>
		</div>
	</section>
	<section class="comments-panel">
		<div class="comments-panel-box">
			<?php comments_template(); ?>
		</div>
	</section>
</article>

<?php endwhile; endif; ?>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>