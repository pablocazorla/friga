pageID = pageID || 'all';

SR.config({
	baseUrl: baseTemplateURL + '/js/',
	paths: {
		'nc': 'libs/jquery.nicescroll.min',
		'ho': 'app/home',
		'sn': 'app/siteNavigation',
		'lp': 'app/loadPage',
		'li': 'app/loadIllustration',
		'gi': 'app/galleryIllustration',
		'ip': 'app/illustrationPost',
		'cv': 'app/commentValidation',
		'sc': 'app/socialComments',
		'sb': 'app/sidebar',
		'pp': 'app/prettyprint',
		'ss': 'app/socialShare',
		'csl': 'app/contentSlider',
		'dsl': 'app/designSlider',
		'sk': 'app/sketchbook',
		'me': 'app/aboutme'
	},
	defaults: {
		'$nc': 'nc',
		'siteNavigation': 'sn',
		'loadPage': 'lp',
	}
});

function common(App) {
	App.$window = $(window);
	App.$body = $('body');
	App.$shell = $('#shell');

	App.niceScroll = {
		init: function() {
			this.ready = ($.fn.niceScroll) ? true : false;
			this.$selection = $();
			return this;
		},
		set: function(selection, cfg) {
			if (this.ready) {
				var sett = cfg || {};
				$(selection).niceScroll(cfg);
				this.$selection = this.$selection.add($(selection));
			}
			return this;
		},
		remove: function() {
			if (this.ready) {
				this.$selection.getNiceScroll().remove();
			}
			return this;
		}
	};
	App.graphLoader = {
		ready: false,
		duration: 300,
		init: function() {
			this.$L = $('#pc-loading-graph');
			this.ready = true;
			return this;
		},
		show: function() {
			if (this.ready) {
				this.$L.fadeIn(this.duration);
			}
			return this;
		},
		hide: function() {
			if (this.ready) {
				this.$L.fadeOut(this.duration);
			}
			return this;
		}
	};
	App.waitImgsForLoad = function(selection, callback, notError) {
		var ne = notError || false,
			$selection = $(selection),
			numTotal = $selection.length,
			count = 0,
			ready = false,
			detectLoaded = function() {
				count++;
				if (count >= numTotal && !ready) {
					ready = true;
					callback();
				}
			}
		if (numTotal > 0) {
			$selection.each(function() {
				var $img = $(this);
				if ($img[0].complete) {
					detectLoaded();
				} else {
					$img.load(function() {
						detectLoaded();
					});
					if (!ne) {
						$img.error(detectLoaded);
					}
				}
			});
		} else {
			callback();
		}
	};
	$('document').ready(function() {
		App.init();
		App.niceScroll.set('.niceScroll,.nice-scroll');
		$('.post-navigation').addClass('visible');
	});
};

switch (pageID) {
	case 'home':
		SR.set({
			'loadIllustration': 'li',
			'setHome': 'ho'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				$('.async-link').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url);
				});
				$('.async-illust-link').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						url = $this.attr('href'),
						urlImgBig = $this.attr('data-imgbig'),
						$img = $this.find('img');
					App.loadIllustration.load(url, urlImgBig, $img[0], 'right');
				});
			});
		});
		break;
	case 'illustration-list':
		SR.set({
			'loadIllustration': 'li',
			'galleryIllustration': 'gi'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				$('.gallery figure a').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						url = $this.attr('href'),
						urlImgBig = $this.attr('data-imgbig'),
						$img = $this.find('img');
					App.loadIllustration.load(url, urlImgBig, $img[0], 'right');
				});
			});
		});
		break;
	case 'illustration-post':
		SR.set({
			'illustrationPost': 'ip',
			'loadIllustration': 'li',
			'commentValidation': 'cv',
			'socialComments': 'sc',
			'socialShare': 'ss',
			'contentSlider': 'csl'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				App.socialComments.initLate('.illustration-post-large-image img,.post-navigation img,.content img');
				$('a.next-post,a.prev-post').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href'),
					urlImgBig = $this.attr('data-imgbig'),
					$img = $this.find('img');
					App.loadIllustration.load(url, urlImgBig, $img[0], direction);
				});
				$('a.back-to-grid').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url, 'left');
				});
			});
		});
		break;
	case 'blog-list':
		SR.set({
			'sidebar': 'sb',
			'socialShare': 'ss'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				$('a.alink,.alink-content a,.blog-list-nav a').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url);
				});
				$('a.next-post,a.prev-post').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href');
					App.loadPage.load(url, direction);
				});
			});
		});
		break;
	case 'blog-post':
		SR.set({
			'sidebar': 'sb',
			'contentSlider': 'csl',
			'commentValidation': 'cv',
			'socialComments': 'sc',
			'socialShare': 'ss',
			'prettyprint': 'pp'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				App.socialComments.initLate('.content img');
				$('a.next-post,a.prev-post').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href');
					App.loadPage.load(url, direction);
				});
				$('a.back-to-grid').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url, 'left');
				});
			});
		});
		break;
	case 'sketch-list':
		SR.set({
			'sketchbook': 'sk'
		}, function(App) {
			$('document').ready(function() {
				common(App);
			});
		});
		break;
	case 'design-list':
		SR.set({
			'designSlider': 'dsl'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				$('a.alink').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url);
				});
			});
		});
		break;
	case 'design-post':
		SR.set({
			'contentSlider': 'csl',
			'commentValidation': 'cv',
			'socialComments': 'sc',
			'socialShare': 'ss',
			'prettyprint': 'pp'
		}, function(App) {
			$('document').ready(function() {
				common(App);
				App.socialComments.initLate('.content img');
				$('a.next-post,a.prev-post').click(function(e) {
					e.preventDefault();
					var $this = $(this),
						direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href');
					App.loadPage.load(url, direction);
				});
				$('a.back-to-grid').click(function(e) {
					e.preventDefault();
					var url = $(this).attr('href');
					App.loadPage.load(url, 'left');
				});
			});
		});
		break;
	case 'page':
		SR.set({
			'socialShare': 'ss',
		}, function(App) {
			$('document').ready(function() {
				common(App);
			});
		});
		break;
	case 'about-me':
		SR.set({
			'socialShare': 'ss',
			'aboutMe': 'me',
		}, function(App) {
			$('document').ready(function() {
				common(App);

			});
		});
		break;
	default:
		SR.set({
			'socialShare': 'ss',
		}, function(App) {
			$('document').ready(function() {
				common(App);
			});
		});
}