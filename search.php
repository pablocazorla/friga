<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame blog-list blog nice-scroll page" data-id="blog-list">
		<div class="col-blog-row">
			<div class="col-blog left">	
				<section class="blog-container">
					<header class="header-blog">
						<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />
						<div class="header-box-container">
							<div class="header-container">
								<h1>
									Results of "<?php echo $s; ?>"
								</h1>
							</div>
						</div>												
					</header>
					<div class="blog-list-gallery clearfix">
						<?php if (have_posts()) :?>
						<?php while (have_posts()) : the_post();?>
						<div class="post-in-list" id="post-<?php the_ID();?>">
							<div class="post-in-list-content">
								<a href="<?php the_permalink(); ?>" class="post-in-list-link-thumb alink">				
									<?php if(has_post_thumbnail()){
									the_post_thumbnail('thumbnail');
									}else{ ?>
									<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />
									<?php } ?>
									<div class="capt">
										<div>
											Read More
										</div>
									</div>
								</a>
								<div class="post-in-list-caption">											
									<h2>
										<a href="<?php the_permalink(); ?>" class="alink">					
											<?php the_title(); ?>
										</a>
									</h2>
									<div class="category alink-content">
										<?php the_category(', '); ?>					
									</div>
									<?php the_excerpt(); ?>
								</div>
							</div>
						</div>
						<?php endwhile; ?>
						<?php else :?>
							<div class="post-not-found">
								<p>Sorry, posts not found</p>
							</div>
						<?php endif; ?>
					</div>
					
				</section>
			</div>
			<div class="col-blog right"></div>
			<div class="col-blog right-nav"></div>
		</div>
		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>
	</article>
	<aside class="aside-sidebar">
		<?php get_sidebar(); ?>
	</aside>
	<nav class="post-navigation in-blog">
		<?php 
			echo '<a href="'. pc_category_link('Blog',true) .'" class="back-to-grid"><span class="link-title">All the Blog</span></a>';					
			next_posts_link('<span class="link-title">Next Posts</span>');
			previous_posts_link('<span class="link-title">Previous Posts</span>');
		?>
	</nav>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>