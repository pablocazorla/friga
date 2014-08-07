<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame blog-post blog nice-scroll page" data-id="blog-post">
		<div class="col-blog-row">
			<div class="col-blog left">				
				<header class="header-blog">					
					<img src="<?php bloginfo('template_url'); ?>/img/thumb-404.jpg" />					
					<div class="header-box-container">
						<div class="header-container">
							<h1>Page not found</h1>							
						</div>
					</div>												
				</header>
				<section class="blog-container">					
					<div class="content">
						<p>Sorry!</p>
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
		<a href="<?php echo pc_category_link('Blog'); ?>" class="back-to-grid"><span class="link-title">All the Blog</span></a>			
	</nav>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>