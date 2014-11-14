<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<script type="text/javascript">pageID = 'illustration-list';</script>
	<style type="text/css">
		.gallery-summary-container img {
			filter: url('#blurfx');
			-webkit-filter: blur(3px);
			-moz-filter: blur(3px);
			-o-filter: blur(3px);
			-ms-filter: blur(3px);
			filter: blur(3px);	
			filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
		}
	</style>
	<svg xmlns="http://www.w3.org/2000/svg" height="0">
	   <filter height="116%" width="116%" y="-8%" x="-8%" id="blurfx">
	       <feGaussianBlur stdDeviation="3" in="SourceGraphic"/>
	   </filter>
	</svg>
	<article class="sub-frame illustration-list <?php echo $flavor;?> nice-scroll page">
		<header class="panel">
			<div class="gallery-summary-container">
				<?php
					if(has_post_thumbnail()){
			           	the_post_thumbnail('illustration-thumb');
			        }
			    ?>
				<div class="text-box align-center">
					<h1>Illustration</h1>
					<p>Fusce eget aliquet tellus, at feugiat nisi. Cras ullamcorper id risus non scelerisque. Fusce rhoncus sollicitudin faucibus. Aliquam consequat tellus id metus ultricies fermentum. Fusce hendrerit lorem diam, consequat ultricies mi tempus sit amet. Nunc vitae pharetra enim.</p>
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
		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>	
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>