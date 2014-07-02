<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<article id="article-main" class="blog-main">
		<div class="column column-left">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>		
			<section  id="post-<?php the_ID();?>" class="blog blog-post clearfix">
				<header class="header-blog">
					<h1><?php the_title(); ?></h1>
					<div class="category">
						Category: <?php the_category(', '); ?>					
					</div>
				</header>
				<div class="content">
					<?php the_content(); ?>
				</div>
				<?php comments_template(); ?>	
				<?php endwhile; endif; ?>
				<div class="nav-post clearfix">
					<?php
					$portfolioid = get_cat_ID('Portfolio');
					$portfoliochildcats  = get_categories(array('child_of' => $portfolioid));
					foreach ($portfoliochildcats as $key => $cat) {
					   $catids[$key] = $cat -> cat_ID;
					}
					$excludechildren = implode(', ',$catids);				
					?>
					<div class="prev"><?php previous_post_link('%link', '&lt; %title', FALSE, $portfolioid . ', ' . $excludechildren); ?></div>			
					<div class="next"><?php next_post_link('%link', '%title &gt;', FALSE, $portfolioid . ', ' . $excludechildren); ?></div>							
				</div>				
			</section>
		</div>
		<div class="column column-right">	
			<aside class="sidebar">			
				<?php get_sidebar(); ?>	
			</aside>
		</div>
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>