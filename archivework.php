<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php $cat_name = single_cat_title('',false);?>
	<article id="article-main" class="work-main">
		<header class="header-work text-box">
			<h1><?php echo $cat_name; ?></h1>
			<p><?php echo category_description(); ?></p>
			<?php wp_nav_menu(array('menu' => $cat_name.'Menu' ));?>
		</header>
		<section class="work work-list clearfix">
			<?php if (have_posts()) :?>
			<?php while (have_posts()) : the_post();?>
			<?php
				$categoryClass = "";
				foreach((get_the_category()) as $category) { 
				   $categoryClass = $categoryClass." ".str_replace(" ","-",strtolower($category->cat_name));
				} 
			?>
			<figure class="<?php echo $categoryClass;?> visible autosize-img">						
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" class="alink">					
					<?php if(has_post_thumbnail()): the_post_thumbnail('thumbnail'); endif; ?>
					<figcaption>
						<div>
							<h2><?php the_title(); ?></h2>
							<span>View Project</span>
						</div>
					</figcaption>
				</a>					
			</figure>	   
			<?php endwhile; ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>
		</section>		
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>
