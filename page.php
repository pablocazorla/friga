<?php get_header(); ?>
	<script type="text/javascript">pageID = 'page';</script>
	<article class="page blog">
		<div class="col-blog-row">
			<div class="col-blog left in-page">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<header class="header-blog">
					<?php if(has_post_thumbnail()){
					the_post_thumbnail('thumbnail');
					}else{ ?>
					<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />
					<?php } ?>
					<div class="header-box-container">
						<div class="header-container">
							<h1><?php the_title(); ?></h1>
						</div>
					</div>												
				</header>
				<section class="blog-container">					
					<div class="content">
						<?php the_content(); ?>
					</div>								
				</section>
				 <?php
				 	$titleShare = get_the_title();
				 	$descriptionShare = get_the_excerpt();
				 	$urlImageShare = url_thumbnail('full');
				 ?>
				<?php endwhile; endif; ?>
			</div>
		</div>
	</article>	
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>			
	</nav>
<?php get_footer(); ?>