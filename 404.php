<?php get_header(); ?>
	<script type="text/javascript">pageID = 'blog-post';</script>
	<article class="blog-post blog  page">
		<div class="col-blog-row">
			<div class="col-blog left">				
				<header class="header-blog">					
					<img src="<?php bloginfo('template_url'); ?>/img/thumb-404.jpg" />					
					<div class="header-box-container">
						<div class="header-container">
							<h1>Error 404</h1>							
						</div>
					</div>												
				</header>
				<section class="blog-container">					
					<div class="content">
						<p>Sorry! Page not found.</p>
					</div>			
				</section>
			</div>
			<div class="col-blog right"></div>
		</div>
	</article>
	<aside class="aside-sidebar">
		<?php get_sidebar(); ?>
	</aside>
	<nav class="post-navigation">
		<a href="<?php echo pc_category_link('Blog'); ?>" class="back-to-grid"><span class="link-title">All the Blog</span></a>			
	</nav>
<?php get_footer(); ?>