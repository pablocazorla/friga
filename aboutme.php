<?php
/*
Template Name: About me
*/
?>
<?php get_header(); ?>
	<script type="text/javascript">pageID = 'about-me';</script>
	<article class="about-me">
		<section id="about-me-summary">	
			<div id="about-me-summary-content">
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
				<?php
				 	$titleShare = get_the_title();
				 	$descriptionShare = 'Pablo Cazorla: illustrator, designer, creative.';
				 	$urlImageShare = get_template_directory_uri().'/img/about.jpg';
				 ?>
				<?php endwhile; endif; ?>
			</div>
			<div class="about-tab-wrap">
				<div class="about-tab first" title="My expertice, my knowledge..." data-ind="1"><span>My skills</span></div>
				<div class="about-tab for-contact" title="Get in touch" data-ind="2"><span>Contact</span></div>
			</div>
		</section>
		<section id="about-me-skills">
			<div class="about-me-container">
				<h2>Skill-meter</h2>
				<div class="skill-meter-wrap">
					<canvas id="skill-meter" width="900" height="350">Hola</canvas>
					<div class="skill-meter-controls"></div>
					<div class="skill-meter-arrow to-left" data-ind="-1" style="display:none"><span></span></div>
					<div class="skill-meter-arrow to-right" data-ind="1" style="display:none"><span></span></div>
				</div>
				<p>This is a very subjective approximation of what my skill-meter could show. I am growing constantly, learning new things all time and sharping my practice to get the best of me.</p>
				<p>I could say I am essentially a self-taught: most of my knowledge I have achieved through experience and the need to solve issues creatively.</p>
			</div>
			<div class="about-tab-wrap">
				<div class="about-tab first for-contact" title="Get in touch" data-ind="2"><span>Contact</span></div>
			</div>
		</section>

		<section id="contact">
			<a id="contact-me" name="contact-me" style="position:relative;height:0;"></a>
			<div id="contact-container">
				<div class="contact-email-container">
					<h2>Get in touch!</h2>
					<p>Please send me a message via email if you have any questions for me. I'll try my best to get back to you within 2 business days.</p>
					<p><a class="contact-button" href="mailto:contact@pcazorla.com" target="_blank"><span class="cs-icon"></span>contact@pcazorla.com</a></p>
				</div>
				<div class="contact-social-container">
					<a class="cs-g bubble" href="https://www.google.com/+PabloCazorla" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Follow me on Google+</span></a>
					<a class="cs-tw bubble" href="http://twitter.com/pablo_cazorla" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Follow me on Twitter</span></a>
					<a class="cs-pin bubble" href="" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Follow me on Pinterest</span></a>
					<a class="cs-i bubble" href="http://instagram.com/pablocazorla" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Follow me on Instagram</span></a>
					<a class="cs-yt bubble" href="http://www.youtube.com/user/pablocazu" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Subscribe to my Youtube channel</span></a>
					<a class="cs-be bubble" href="https://www.behance.net/pablo-cazorla" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Watch my work on Behance</span></a>
					<a class="cs-de bubble" href="http://davicazu.deviantart.com/" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Watch my work on Deviant Art</span></a>
					<a class="cs-git bubble" href="https://github.com/pablocazorla" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">Fork my projects on GitHub</span></a>
					<a class="cs-rss bubble" href="<?php bloginfo( 'url' ); ?>/rss" target="_blank"><span class="cs-icon"></span><span class="bubble-msg">RSS blog</span></a>
				</div>
			</div>
		</section>
	</article>
	<style type="text/css">
		img.blur {
			filter: url('#blurfx');
			-webkit-filter: blur(8px);
			-moz-filter: blur(8px);
			-o-filter: blur(8px);
			-ms-filter: blur(8px);
			filter: blur(8px);	
			filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='8');
		}
	</style>
	<svg xmlns="http://www.w3.org/2000/svg" height="0" style="position:absolute">
	   <filter height="116%" width="116%" y="-8%" x="-8%" id="blurfx">
	       <feGaussianBlur stdDeviation="8" in="SourceGraphic"/>
	   </filter>
	</svg>	
	<div class="about-me-img">
		<img src="<?php echo $urlImageShare; ?>" id="about-me-img-pablo"/>	
	</div>
	<nav class="post-navigation in-left">
		<a href="" class="share link-facebook" data-share="{'on':'facebook'}"><span class="link-title">Share on Facebook</span></a>
		<a href="" class="share link-twitter" data-share="{'on':'twitter','description':'I want to share |<?php echo $titleShare; ?>|'}"><span class="link-title">Share on Twitter</span></a>
		<a href="" class="share link-google" data-share="{'on':'google'}"><span class="link-title">Share on Google+</span></a>
		<a href="" class="share link-pinterest" data-share="{'on':'pinterest','media':'<?php echo $urlImageShare; ?>','description':'|<?php echo $titleShare; ?>|: <?php echo $descriptionShare; ?>'}"><span class="link-title">Share on Pinterest</span></a>			
	</nav>

<?php get_footer(); ?>