<?php 
/***********************************************
* HABILITAR MENUS DE NAVEGACION
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'nav-menus' );
// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => 'Primary Navigation',
		'secondary' => 'Secondary Navigation',
		'tertiary' => 'Tertiary Navigation'
) );
/***********************************************
* HABILITAR POST THUMBNAILS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'post-thumbnails' );

/* For HOME */
add_image_size( 'portfolio-thumb', 384, 5000,false);
/***********************************************
* OBTENIENDO LA URL COMPLETA DE LA THUMBNAIL
***********************************************/
function pc_thumb_url($tamagno){
$src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), $tamagno);
return $src[0];
}

/***********************************************
* CUSTOM EXCERPT
***********************************************/
function custom_excerpt_length( $length ) {
	return 34;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
/***********************************************/
/**
 * Register widgetized areas, including two sidebars and four widget-ready columns in the footer.
 *
 * To override twentyten_widgets_init() in a child theme, remove the action hook and add your own
 * function tied to the init hook.
 *
 * @since Twenty Ten 1.0
 * @uses register_sidebar
 */
function twentyten_widgets_init() {
	// Area 1, located at the top of the sidebar.
	register_sidebar( array(
		'name' => __( 'Primary Widget Area', 'twentyten' ),
		'id' => 'primary-widget-area',
		'description' => __( 'The primary widget area', 'twentyten' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 2, located below the Primary Widget Area in the sidebar. Empty by default.
	register_sidebar( array(
		'name' => __( 'Secondary Widget Area', 'twentyten' ),
		'id' => 'secondary-widget-area',
		'description' => __( 'The secondary widget area', 'twentyten' ),
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );


}
/** Register sidebars by running twentyten_widgets_init() on the widgets_init hook. */
add_action( 'widgets_init', 'twentyten_widgets_init' );
/**/

/***********************************************
* OBTENIENDO LA URL COMPLETA DE LA THUMBNAIL
***********************************************/
function storelicious_thumb_url(){
$src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), array( 200,200 ));
return $src[0];
}
/********************************************
 * If more than one page exists, return TRUE.
*********************************************/
function show_posts_nav() {
	global $wp_query;
	return ($wp_query->max_num_pages > 1);
}
//Obtener la url del idioma
function get_url_idioma(){
	$args='';
    parse_str($args);
    if(function_exists('icl_get_languages')){
        $languages = icl_get_languages($args);
        if(1 < count($languages)){
            foreach($languages as $l){
               $lengua = $l['url'];
            }
			return $lengua;
        }    
    }
}
/***************************************************
 * PAGE_LINK_FN
 ***************************************************/

function page_link_fn($page_name,$real_name){

	global $wpdb;
	$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '".$page_name."' AND post_status = 'publish' AND post_type = 'page'");
	$link = get_page_link($page_id);
	$page_link = '<a alt ="'.$real_name.'" title ="'.$real_name.'" href="'.$link.'">'.$real_name.'</a>';
	echo $page_link;
}

function page_link_href_fn($page_name){

	global $wpdb;
	$page_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name = '".$page_name."' AND post_status = 'publish' AND post_type = 'page'");
	$link = get_page_link($page_id);
	echo $link;
}
/***************************************************
 * GET_TAG_LIST_FN
 ***************************************************/
 
function get_tag_list_fn($countTag,$masTemasLink,$masTemasText){
	$tags = get_tags();
	$html = '<ul>';	
	foreach ($tags as $tag){
		if($countTag > 0){
		$tag_link = get_tag_link($tag->term_id);

		$html .= "<li><a href='{$tag_link}' title='{$tag->name} Tag' alt='{$tag->name} Tag' class='{$tag->slug}'>";
		$html .= "{$tag->name}</a></li>";
		}
		$countTag--;
	}
	$html .= '<li><a href='.$masTemasLink.'>'.$masTemasText.'</a></li>';
	$html .= '</ul>';
	echo $html;
}

// Nuevo avatar misterioso
add_filter('avatar_defaults', 'miavatar');
function miavatar ($avatar_defaults) {
     // Ruta a nuestra imagen (puede estar en el mismo servidor o en otro)
     $avatar = 'http://localhost/wp-content/themes/p/img/grdefault.gif';
     // Nombre de nuestro avatar
     $avatar_defaults[$avatar] = "PC";
     return $avatar_defaults;
}
//Excluir Categorias en Navegación:
function excludeCats ($nomCat){
	$excludID = get_cat_ID($nomCat);	
	$excludString = $excludID;	
	$categoriesExclud = get_categories('child_of='.$excludID); 
	foreach($categoriesExclud as $categoryEx) {	
		$excludString .= ' and '. $categoryEx->term_id;	
	}	
	return $excludString;
}
/*Quitar barra de admin */

add_filter( 'show_admin_bar', '__return_false' );


/**
 * Tests if any of a post's assigned categories are descendants of target categories
 *
 * @param int|array $cats The target categories. Integer ID or array of integer IDs
 * @param int|object $_post The post. Omit to test the current post in the Loop or main query
 * @return bool True if at least 1 of the post's categories is a descendant of any of the target categories
 * @see get_term_by() You can get a category by name or slug, then pass ID to this function
 * @uses get_term_children() Passes $cats
 * @uses in_category() Passes $_post (can be empty)
 * @version 2.7
 * @link http://codex.wordpress.org/Function_Reference/in_category#Testing_if_a_post_is_in_a_descendant_category
 */
if ( ! function_exists( 'post_is_in_descendant_category' ) ) {
	function post_is_in_descendant_category( $cats, $_post = null ) {
		foreach ( (array) $cats as $cat ) {
			// get_term_children() accepts integer ID only
			$descendants = get_term_children( (int) $cat, 'category' );
			if ( $descendants && in_category( $descendants, $_post ) )
				return true;
		}
		return false;
	}
}



?>
