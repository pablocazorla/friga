<?php
 /*Template Name: Illustration
 */
get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
<?php
	$category_id = get_cat_ID('Design');
	$flavor = 'illustration-flavor';
	if (in_category($category_id )|| post_is_in_descendant_category($category_id )) {
		$flavor = 'design-flavor';
	}
	$cat_name = single_cat_title('',false);
?>
	<article class="sub-frame work-list <?php echo $flavor;?> nice-scroll">
		<header class="panel">
			<div class="text-box align-center">
				<h1><?php echo $cat_name; ?></h1>
				<?php echo category_description(); ?>
				<?php if ($cat_name == 'Illustration'){?>
				<div class="gallery-menu"><?php  wp_nav_menu(array('menu' => $cat_name.'Menu' ));?></div>
				<?php } ?>
			</div>			
		</header>
		<section class="gallery clearfix">
			<?php if (have_posts()) :?>
			<?php while (have_posts()) : the_post();?>
			<?php
				$categoryClass = "";
				foreach((get_the_category()) as $category) { 
				   $categoryClass = $categoryClass." ".str_replace(" ","-",strtolower($category->cat_name));
				} 
			?>
			<figure class="<?php echo $categoryClass;?>">						
				<a href="<?php the_permalink(); ?>" rel="<?php the_ID();?>" class="load-from-right">	
					<img src="<?php echo pc_thumb_url('thumbnail');?>" data-pixelloading="<?php echo pc_thumb_url('portfolio-thumb');?>"/>
					<figcaption style="display:none">
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
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>
