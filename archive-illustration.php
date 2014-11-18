<?php
 /*Template Name: Illustration
 */
get_header(); ?>
	<script type="text/javascript">pageID = 'illustration-list';</script>
	<?php
	 	$titleShare = 'Illustration';
	 	$descriptionShare = 'My portfolio is my best presentation. In my work as an illustrator and artist you are going to find a variety of styles: conceptual, fantastic, literary, realistic, functional design, video games, etc.';
	 	$urlImageShare = url_thumbnail('illustration-medium');
	 ?>
	<article class="illustration-list <?php echo $flavor;?>  page">
		<header class="panel">
			<div class="gallery-summary-container">				
				<div class="text-box align-center">
					<h1><?php echo $titleShare;?></h1>
					<p><?php echo $descriptionShare;?></p>
				</div>					
			</div>
			<div class="gallery-menu-container">	
				<div class="text-box align-center">			
					<div class="gallery-menu"><?php  wp_nav_menu(array('menu' => 'Illustration Menu' ));?></div>		
				</div>
			</div>				
		</header>
		<section class="gallery clearfix">
			<?php
			$list = new WP_Query('post_type=illustration&posts_per_page=64');
			if ($list->have_posts()):
			while ($list->have_posts()): $list->the_post(); ?>
		
			<?php
				$types = get_the_terms( $post->ID, 'illustration' );
				$classType = '';										
				if ( $types && ! is_wp_error( $types ) ) {
					foreach ( $types as $type ) {
						$classType = $classType." ".str_replace(" ","-",strtolower($type->name));
					}
				}
			?>
			<figure class="<?php echo $classType;?>">						
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('illustration-large');} ?>" >
			        <?php if(has_post_thumbnail()){
						echo '<img class="illustration-thumb-img" src="" srcwait="' . url_thumbnail('illustration-thumb') .'">';
					} ?>
				</a>
				<figcaption class="gallery-caption"><?php the_title(); ?></figcaption>				
			</figure>	   
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
			<?php else :?>
			<h2>Sorry, works not found</h2>
			<?php endif; ?>
		</section>
	</article>	
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>
	</nav>
<?php get_footer(); ?>