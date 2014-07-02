<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php $cat_name = single_cat_title('',false);?>
	<article id="article-main" class="blog-main">
		<div class="column column-left">			
			<section class="blog blog-list clearfix">
				<header class="header-blog">
					<h1>
						<?php if(is_category()):
							echo $cat_name; 
						elseif(is_tag()):
							echo "Tag <i>".$cat_name."</i>"; 
						elseif(is_author()):
							echo "Author: <i>".$cat_name."<i>"; 
						elseif(is_archive()):
							echo "On archive <i>".$cat_name."<i>";
						endif; ?>
					</h1>
				</header>
				<?php if (have_posts()) :?>
				<?php while (have_posts()) : the_post();?>	   
				
				<div class="post-in-list clearfix" id="post-<?php the_ID();?>">
					<a href="<?php the_permalink(); ?>" class="thumbnail-link alink">				
					<?php if(has_post_thumbnail()){
						the_post_thumbnail('thumbnail');
					}else{ ?>
						<img src="<?php bloginfo('template_url'); ?>/img/default-blog-thumbnail.jpg" />
					<?php } ?>
						<div class="capt">
							<div>
								<span>Read More</span>
							</div>
						</div>
					</a>			
					<h2>
						<a href="<?php the_permalink(); ?>" class="alink">					
							<?php the_title(); ?>
						</a>
					</h2>
					<div class="category">
						Category: <?php the_category(', '); ?>					
					</div>
					<?php the_excerpt(); ?>
				</div>

				<?php endwhile; ?>
				<?php else :?>
				<h2>Sorry, works not found</h2>
				<?php endif; ?>
				<?php if (show_posts_nav()) : ?>
				<nav class="navPages">		
					<?php global $wp_query;
					$big = 999999999; // need an unlikely integer		
					echo paginate_links( array(
						'base' => str_replace( $big, '%#%', get_pagenum_link( $big ) ),
						'format' => '?paged=%#%',
						'current' => max( 1, get_query_var('paged') ),
						'total' => $wp_query->max_num_pages,
						'prev_text' => 'Prev',
						'next_text' => 'Next'
					) );
					?>
				</nav>
				<?php endif; ?>	
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