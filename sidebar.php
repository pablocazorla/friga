<?php
/**
* The Sidebar containing the primary and secondary widget areas.
*/
?>
<div class="sidebar" id="sidebar">
	<ul class="widgets-list">
		<?php if ( ! dynamic_sidebar( 'primary-widget-area' ) ) : ?>
		<li class="widget-container widget_search">
			<?php get_search_form(); ?>
		</li>
		<?php endif; // end primary widget area ?>

		<li class="widget-container widget_menu_categories">
			<h3>Categories</h3>
			<?php  wp_nav_menu(array('menu' => 'Blog Navigation' ));?>
		</li>

		<?php if ( ! dynamic_sidebar( 'secondary-widget-area' ) ) : ?>
		<li 	class="widget-container widget_archives">
			<h3 class="widget-title">Archives</h3>
			<ul>
				<?php wp_get_archives( 'type=monthly' ); ?>
			</ul>
		</li>
		<?php endif; ?>
		<!--li class="widget-container">
			<a href="<?php bloginfo('rss2_url'); ?>" class="rss-link">RSS feed</a>
		</li-->
	</ul>
</div>
