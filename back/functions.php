<?php
/***********************************************
* CUSTOM TYPE: ILLUSTRATION
***********************************************/
function codex_custom_init() {
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
    'hierarchical' => true,
    'show_tagcloud' => false,
    'menu_position' => 5,
    'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
  ); 
  register_post_type('illustration',$args);
}
add_action( 'init', 'codex_custom_init' );

// Categories
function create_illustration_taxonomies() {
    register_taxonomy(
        'illustration_type',
        'illustration',
        array(
            'labels' => array(
                'name' => 'Illustration Types',
                'singular_name' => 'Illustration Type'
            ),
            'show_ui' => true,
            'show_tagcloud' => false,
            'hierarchical' => true
        )
    );
}
add_action( 'init', 'create_illustration_taxonomies', 0 );






?>
