<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php
	
	$cat_name = single_cat_title('',false);
?>
	<article class="sub-frame work-list <?php echo $flavor;?> nice-scroll">
		<header class="panel">
			<div class="text-box align-center">
				<h1>Illustration</h1>
				<?php echo category_description(); ?>				
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
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" class="load-from-right">	
					<?php
					if(has_post_thumbnail()){
			           	the_post_thumbnail('thumbnail');
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