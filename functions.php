<?php
/***********************************************
* MENUS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'nav-menus' );

	register_nav_menus( array(
		'primary' => 'Primary Navigation',
		'secondary' => 'Illustration Navigation',
		'tertiary' => 'Design Navigation'
) );

/***********************************************
* POST THUMBNAILS
***********************************************/
if ( function_exists( 'add_theme_support' ) )
add_theme_support( 'post-thumbnails' );

/* PIXEL LOADING */
add_image_size( 'illustration-thumb', 470, 470, array( 'center', 'top' ) );

/* URL THUMBNAILS */
function url_thumbnail($tamagno){
	$src = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), $tamagno);
	return $src[0];
}

/***********************************************
* Custom values
***********************************************/
function customVal($keyVal){
    echo get_post_custom($post->ID)[$keyVal][0];
}

/***********************************************
* CUSTOM LENGTH EXCERPT
***********************************************/
/*function custom_excerpt_length( $length ) {
	return 14;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
*/
/***********************************************
* CUSTOM TYPE: ILLUSTRATION
***********************************************/
function create_illustration_type() {
  $args = array(
    'labels' => array(
      'name' => 'Illustrations',
      'singular_name' => 'Illustration'
    ),
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => false,
    'show_tagcloud' => false,
    'show_in_nav_menus' => true,
    'menu_position' => 5,
    'menu_icon' => 'dashicons-format-gallery',
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' )
  ); 
  register_post_type('illustration',$args);
}
add_action( 'init', 'create_illustration_type' );

// Illustration Types
function create_illustration_taxonomies() {
    register_taxonomy(
        'illustration',
        'illustration',
        array(
            'labels' => array(
                'name' => 'Illustration Types',
                'singular_name' => 'Illustration Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true,
            'show_in_nav_menus' => true
        )
    );
}
add_action( 'init', 'create_illustration_taxonomies', 0 );


/***********************************************
* CUSTOM TYPE: DESING
***********************************************/
function create_design_type() {
  $args = array(
    'labels' => array(
      'name' => 'Designs',
      'singular_name' => 'Design'
    ),
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
    'show_in_menu' => true, 
    'query_var' => true,
    'rewrite' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
    'hierarchical' => false,
    'show_tagcloud' => false,
    'show_in_nav_menus' => true,
    'menu_position' => 6,
    'menu_icon' => 'dashicons-desktop',
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments', 'custom-fields' )
  ); 
  register_post_type('design',$args);
}
add_action( 'init', 'create_design_type' );

// Design Types
function create_design_taxonomies() {
    register_taxonomy(
        'design',
        'design',
        array(
            'labels' => array(
                'name' => 'Design Types',
                'singular_name' => 'Design Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true,
            'show_in_nav_menus' => true
        )
    );
}
add_action( 'init', 'create_design_taxonomies', 0 );


















?>