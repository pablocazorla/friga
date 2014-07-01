<?php get_header(); ?>
	<article id="article-main" class="work-main">
		<header class="header-work text-box">
			<h1>Work</h1>
			<p>The Amazon Kindle team approached Character to concept and develop a cross-media advertising campaign to promote their latest, most advanced e-reader device, Kindle Paperwhite.</p>
			<?php wp_nav_menu(array('menu' => 'Tertiary' ));?>
		</header>
		<section class="work work-list clearfix">
			<?php if (have_posts()) :?>
			<?php while (have_posts()) : the_post();
			$category = get_the_category(); 
			$categoryClass = str_replace(" ","-",strtolower($category[0]->cat_name));
			?>	   
			<figure class="<?php echo $categoryClass;?> visible autosize-img">						
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>">					
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
<?php get_footer(); ?>