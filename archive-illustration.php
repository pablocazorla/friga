<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<article class="sub-frame illustration-list <?php echo $flavor;?> nice-scroll page" data-id="illustration-list">
		<header class="panel">
			<div class="text-box align-center">
				<h1>Illustration</h1>
				<p>dsf sdfdsf ddfsd</p>				
				<div class="gallery-menu"><?php  wp_nav_menu(array('menu' => 'Illustration Menu' ));?></div>				
			</div>			
		</header>
		<section class="gallery clearfix">
			<?php if (have_posts()) :?>
			<?php while (have_posts()) : the_post();?>			
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
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" data-imgbig="<?php if(has_post_thumbnail()){ echo url_thumbnail('large');} ?>" >	
					<?php
					if(has_post_thumbnail()){
			           	the_post_thumbnail('illustration-thumb');
			        }
			        ?>					
				</a>
				<figcaption><?php the_title(); ?></figcaption>				
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