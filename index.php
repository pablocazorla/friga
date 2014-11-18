<?php get_header(); ?>
	<script type="text/javascript">pageID = 'home';</script>
	<div id="home-presentation">
		<div id="home-presentation-content">
			<div id="home-presentation-videocontainer">
				<img class="video-placehoder" src="<?php bloginfo('template_url'); ?>/video/presentate-placeholder.jpg">
				<video loop="" autoplay="">
			        <source type="video/mp4" src="<?php bloginfo('template_url'); ?>/video/presentate.mp4"></source>
			        <source type="video/webm" src="<?php bloginfo('template_url'); ?>/video/presentate.webm"></source>			        
			    </video>
			    <div class="velo"></div>
		    </div>
		    
		    <div id="home-presentation-text">
		    	<div id="home-presentation-text-wrap">
			    	<h1>I am Illustrator, Designer and Creative</h1>
			    	<p>My name is <i>Pablo Cazorla</i>, and my job is to create all kind of beautiful things related to the world of the image.</p>
			    	<p><a href="#my-last-works" id="goto-last-work" class="button">See my last work</a></p>
			    </div>
		    </div>
	    </div>
	</div>
	<article class="page home">		
		<section class="home-section home-illustration" id="my-last-works">
			<div class="home-section-content">
				<h2><a class="async-link" href="<?php echo get_post_type_archive_link('illustration');?>">Illustration</a></h2>
				<?php $list = new WP_Query('post_type=illustration&posts_per_page=1');
				if ($list->have_posts()):
				while ($list->have_posts()): $list->the_post(); ?>
					<p>Last work: <a class="async-illust-link" href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>" ><?php the_title(); if(has_post_thumbnail()){ the_post_thumbnail('illustration-thumb');} ?></a></p>
					<figure class="home-figure">
						<?php
						if(has_post_thumbnail()){
				           	the_post_thumbnail('large');
				        }
				        ?>
				        <figcaption>
				        	<a class="async-illust-link link-in-fig" href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>" ><?php the_title(); if(has_post_thumbnail()){ the_post_thumbnail('illustration-thumb');} ?></a> | <a class="async-link" href="<?php echo get_post_type_archive_link('illustration');?>">Illustration</a>
				        </figcaption>
			        </figure>
				<?php endwhile; 
				wp_reset_postdata();
				endif; ?>
			</div>
		</section>
		<section class="home-section home-design">
			<div class="home-section-content">
				<h2><a class="async-link" href="<?php echo get_post_type_archive_link('design');?>">Design</a></h2>
				<?php $list = new WP_Query('post_type=design&posts_per_page=1');
				if ($list->have_posts()):
				while ($list->have_posts()): $list->the_post(); ?>
					<p>Last work: <a class="async-link" class="" href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>" ><?php the_title(); ?></a></p>
					<figure class="home-figure">
						<?php
						if(has_post_thumbnail()){
				           	the_post_thumbnail('large');
				        }
				        ?>
				        <figcaption>
				        	<a class="async-link link-in-fig" href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>" ><?php the_title(); ?></a> | <a class="async-link" href="<?php echo get_post_type_archive_link('design');?>">Design</a>
				        </figcaption>
			        </figure>
				<?php endwhile; 
				wp_reset_postdata();
				endif; ?>
			</div>
		</section>
		<section class="home-section home-blog blog">
			<div class="home-section-content blog-container">
				<h2><a class="async-link" href="<?php echo pc_category_link('Blog'); ?>">Blog</a></h2>
				<p class="home-subtitle-blog">The last posts. Also you can read <a class="async-link" href="<?php echo pc_category_link('Blog'); ?>">all posts</a>.</p>
				<div class="blog-list-gallery clearfix">					
					<?php $list = new WP_Query('posts_per_page=3');
					if ($list->have_posts()):
					while ($list->have_posts()): $list->the_post(); ?>

					<div class="post-in-list" id="post-<?php the_ID();?>">
						<div class="post-in-list-content">
							<a href="<?php the_permalink(); ?>" class="async-link post-in-list-link-thumb alink">				
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
									<a href="<?php the_permalink(); ?>" class="async-link alink">					
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

					<?php endwhile; 
					wp_reset_postdata();
					else :?>
					<h3>Sorry, works not found</h3>
					<?php endif; ?>
				</div>
			</div>
		</section>
		<section class="home-section home-about">
			<div class="home-section-content clearfix">
				<img class="home-about-img" src="<?php bloginfo('template_url'); ?>/img/home-about.jpg">
				<div class="home-about-text">
					<h2><a class="async-link" href="<?php bloginfo( 'url' ); ?>/me">About me</a></h2>
					<p>I'm digital artist, fantasy illustrator, concept artist and designer.</p>
					<p>In my work you will find a great diversity: concept art for games, storyboards, web illustration, infographics, traditional painting, 3D images, books…</p>
					<p>I love fantasy illustration, games, movies,  interactive web apps,  3D animation and everything about the world of the image.</p>
					<p>Since 15 years ago, I work on this fascinating world, and I have accumulated tons of experience designing websites, painting, drawing, making infographics, etc.</p>
					<p>I live and work as a professional freelance in Mendoza, Argentina.</p>
				</div>
			</div>
		</section>		
	</article>
<?php get_footer(); ?>