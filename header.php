<!doctype HTML>
<!--[if IE 7]>    <html class="ie7 ie-lt-8 ie-lt-9 ie-lt-10" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 ie-lt-9 ie-lt-10" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="ie9 ie-lt-10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html lang="en"> <!--<![endif]-->
<head>	
	<title><?php
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	echo ", $site_description";
	if ( $paged >= 2 || $page >= 2 )
		echo ' - ' . sprintf( 'Page %s', max( $paged, $page ) );
	?></title>
		
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="resource-type" content="document" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta http-equiv="content-language" content="en-us" />
	<meta name="author" content="Pablo Cazorla" />
	<meta name="contact" content="contact@pcazorla.com" />
	<meta name="copyright" content="Designed by Pablo Cazorla under licence Creative Commons - <?php echo date('Y'); ?>." />
	
	<!--link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'-->
	<link href='http://fonts.googleapis.com/css?family=Raleway:400,600' rel='stylesheet' type='text/css'>
	<link href="<?php bloginfo('template_url'); ?>/style.css" rel="stylesheet" type="text/css" />
	
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	
	<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.ico" />
	
	<!--[if lt IE 9]>
	<script src="<?php bloginfo('template_url'); ?>/js/html5-3.4-respond-1.1.0.min.js"></script>
	<![endif]-->
	<script type="text/javascript">
		baseURL = "<?php bloginfo( 'url' ); ?>";
	</script>
	
	<?php wp_head(); ?>	

</head>
<body>	
<div id="site-navigation">
	<div class="site-navigation-icon to-open-site-navigation">
		<span class="lineIconNav lineIconNav1"></span><span class="lineIconNav lineIconNav2"></span><span class="lineIconNav lineIconNav3"></span>
	</div>
	<div class="site-navigation-content">
		<a href="<?php bloginfo( 'url' ); ?>" class="brand">
			<img src="<?php bloginfo('template_url'); ?>/img/pablocazorla.jpg" class="pablocazorla"/>
			<span class="brand-name"><?php bloginfo( 'name' ); ?></span>
			<span class="brand-description"><?php bloginfo( 'description' ); ?></span>
		</a>
		<nav class="site-nav">
			<p>
				<span>Work</span>
				<a href="<?php echo get_post_type_archive_link('illustration');?>">Illustration</a>
				<a href="<?php echo get_post_type_archive_link('illustration');?>">Design</a>
			</p>
			<p>
				<span>About me</span>
				<a href="">Bio</a>				
				<a href="">Contact</a>
				<a href="<?php echo pc_category_link('Blog'); ?>">Blog</a>
			</p>
		</nav>
	</div>
</div>
<div id="shell">
	<div class="frame current">