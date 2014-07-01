<?php get_header(); ?>
	<article id="article-main">
		<header class="header-work text-center-box">
			<h1>Work</h1>
			<p>The Amazon Kindle team approached Character to concept and develop a cross-media advertising campaign to promote their latest, most advanced e-reader device, Kindle Paperwhite.</p>
			<?php wp_nav_menu(array('menu' => 'Tertiary' ));?>
		</header>
		<section class="work clearfix">
			<?php if (have_posts()) :?>
			<?php while (have_posts()) : the_post(); ?>	    
			<figure>			
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