<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php $cat_name = single_cat_title('',false);?>
	<article class="sub-frame blog-list blog nice-scroll page" data-id="blog-list">
		<div class="col-blog-row">
			<div class="col-blog left">	
				<section class="blog-container">
					<header class="header-blog">
						<?php if(has_post_thumbnail()){ the_post_thumbnail('thumbnail');}?>	
						<div class="header-box-container">
							<div class="header-container">
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
								<?php echo category_description(); ?>
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
									<img src="<?php bloginfo('template_url'); ?>/img/default-blog-thumbnail.jpg" />
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
						<h2>Sorry, works not found</h2>
						<?php endif; ?>
					</div>
					
				</section>
			</div>
			<div class="col-blog right">
				<aside>
					<?php get_sidebar(); ?>
				</aside>
			</div>
			<div class="col-blog right-nav">
				
			</div>
		</div>

	</article>
	<nav class="post-navigation in-blog">
		<?php
			next_posts_link('<span class="link-title">Next Posts</span>');
			previous_posts_link('<span class="link-title">Previous Posts</span>');
		?>
	</nav>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>