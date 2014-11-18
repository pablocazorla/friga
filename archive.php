<?php get_header(); ?>
<?php $cat_name = single_cat_title('',false);?>
	<script type="text/javascript">pageID = 'blog-list';</script>
	<article class="blog-list blog  page">
		<div class="col-blog-row">
			<div class="col-blog left">	
				<section class="blog-container">
					<header class="header-blog">
						<?php if(has_post_thumbnail()){
						the_post_thumbnail('thumbnail');
						}else{ ?>
						<img src="<?php bloginfo('template_url'); ?>/img/default-thumbnail.jpg" />
						<?php } ?>
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
								<p><?php echo category_description(); ?></p>
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
						<?php
						 	$titleShare = $cat_name;
						 	$descriptionShare = category_description();
						 	$urlImageShare = url_thumbnail('full');
						 ?>
						<?php endwhile; ?>
						<?php else :?>
						<h2>Sorry, works not found</h2>
						<?php endif; ?>
					</div>
					
				</section>
			</div>
			<div class="col-blog right"></div>
		</div>
	</article>
	<aside class="aside-sidebar">
		<?php get_sidebar(); ?>
	</aside>	
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>
	</nav>
	<nav class="post-navigation">
		<?php 
			if($cat_name != 'Blog'){
				echo '<a href="'. pc_category_link('Blog',true) .'" class="back-to-grid"><span class="link-title">All the Blog</span></a>';
			}		
			next_posts_link('<span class="link-title">Next Posts</span>');
			previous_posts_link('<span class="link-title">Previous Posts</span>');
		?>
	</nav>

<?php get_footer(); ?>