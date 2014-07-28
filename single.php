<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame blog-post blog nice-scroll page" data-id="blog-post">
		<div class="col-blog-row">
			<div class="col-blog left">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<header class="header-blog-post">
					<?php if(has_post_thumbnail()){ the_post_thumbnail('thumbnail');}?>	
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
					<?php comments_template(); ?>
				</section>					
				<?php endwhile; endif; ?>
			</div>
			<div class="col-blog right">
				<aside>
					<?php get_sidebar(); ?>
				</aside>
			</div>
			<div class="col-blog right-nav">
				<nav>
					<a href="<?php pc_category_link('Blog'); ?>">Blog</a>
					<?php previous_post_link('%link', '&lt; %title', FALSE); ?>
					<?php next_post_link('%link', '%title &gt;', FALSE); ?>
				</nav>
			</div>
		</div>
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>