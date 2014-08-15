<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<script type="text/javascript">pageID = 'home';</script>
	<article class="sub-frame nice-scroll page home">
		Home
		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>
	</article>
<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>