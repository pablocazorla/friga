<?php
/*
Template Name: About me
*/
?>
<?php get_header(); ?>
<?php $async = $_GET['async']; ?>
<?php if (!$async){?>
<?php get_header(); ?>
<?php } ?>
	<script type="text/javascript">pageID = 'about-me';</script>
	<article class="sub-frame nice-scroll about-me">
		<section id="about-me-summary" style="xdisplay:none">			
			<div id="about-me-summary-content">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
				<div id="scroll-down">
					<div id="scroll-down-inner">
						Scroll down
						<span class="scroll-icon"></span>
					</div>	
				</div>
				<?php
				 	$titleShare = get_the_title();
				 	$descriptionShare = 'Pablo Cazorla: illustrator, designer, creative.';
				 	$urlImageShare = get_template_directory_uri().'/img/about.jpg';
				 ?>
				<?php endwhile; endif; ?>
			</div>
		</section>
		<section id="about-me-skills">
			<div class="about-me-container">
				<h2>Skill-meter</h2>
				<div class="skill-meter-wrap">
					<canvas id="skill-meter" width="900" height="350"></canvas>
					<div class="skill-meter-controls"></div>
					<div class="skill-meter-arrow to-left" data-ind="-1"><span></span></div>
					<div class="skill-meter-arrow to-right" data-ind="1"><span></span></div>
				</div>
			</div>
		</section>
		<?php include(TEMPLATEPATH . '/footertemplate.php'); ?>
	</article>
	<div class="sub-frame about-me-img">
		<img data-src="<?php echo $urlImageShare; ?>" src="" id="about-me-img-pablo"/>
		<img src="<?php bloginfo('template_url'); ?>/img/about.png" id="about-me-img-pix"/>
	</div>
	<nav class="post-navigation">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>			
	</nav>

<?php if (!$async){?>
<?php get_footer(); ?>
<?php } ?>