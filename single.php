<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame blog-post blog nice-scroll page" data-id="blog-post">
		<div class="col-blog-row">
			<div class="col-blog left">
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
							<div class="category alink-content">
								<?php the_category(', '); ?>					
							</div>
						</div>
					</div>												
				</header>
				<section class="blog-container">					
					<div class="content">
						<?php the_content(); ?>
					</div>
					<hr/>
					<div class="comments-panel">					
						<div class="comments-panel-box">
							<?php comments_template(); ?>
						</div>
					</div>				
				</section>							
				<?php endwhile; endif; ?>
			</div>
			<div class="col-blog right"></div>
			<div class="col-blog right-nav"></div>
		</div>
	</article>
	<aside class="aside-sidebar">
		<?php get_sidebar(); ?>
	</aside>
	<nav class="post-navigation in-blog">
		<a href="<?php echo pc_category_link('Blog'); ?>" class="back-to-grid"><span class="link-title">All the Blog</span></a>
		<?php previous_post_link('%link', '<span class="link-title"> %title </span>', FALSE); ?>
		<?php next_post_link('%link', '<span class="link-title"> %title </span>', FALSE); ?>				
	</nav>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>