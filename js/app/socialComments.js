SR.define(function(App) {
	return {
		initLate: function(imgToLoad) {
			this.$commentTabs = $('#comment-tabs');
			if (this.$commentTabs.length > 0) {
				this.tabs().preRender();
				var self = this,
					itl = imgToLoad || '';
				App.waitImgsForLoad(itl, function() {
					self.loadPlugins();
				});
			}
			return this;
		},
		tabs: function() {
			//tabs
			this.$commentTabs.each(function() {
				var $this = $(this),
					$controls = $this.find('.controls'),
					$a = $controls.find('a'),
					$contentTabs = $this.find('.content-tab'),
					current = '',
					select = function($link) {
						var i = $link.attr('href');
						if (i != current) {
							current = i;
							$a.parent().removeClass('active');
							$link.parent().addClass('active');
							$controls.removeClass('gplus-tab facebook-tab wordpress-tab').addClass(current.substr(1));
							$contentTabs.hide();
							$(current).show();
						}
					};
				select($a.eq(0));
				$a.click(function(e) {
					e.preventDefault();
					select($(this));
				});
			});
			return this;
		},
		preRender: function() {
			var widthComments = window.comment_tab_width || 750,
				url = window.location.href;

			//GPLUS
			$('#gplus-tab').html('<div class="g-comments" data-width="' + widthComments + '" data-href="' + url + '" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD">Loading Google+ Comments ...</div>');

			//FACEBOOK
			$('#fb-comments').html('<div class="fb-comments" data-width="' + widthComments + '" data-href="' + url + '" data-num-posts="20" data-colorscheme="light" data-mobile="auto"></div>');

			return this;
		},
		loadPlugins: function() {
			//GPLUS
			$.getScript('//apis.google.com/js/plusone.js?callback=gpcb');

			//FACEBOOK
			$.getScript('//connect.facebook.net/en_US/all.js#xfbml=1', function() {
				FB.init();
				FB.XFBML.parse();
			});

			return this;
		}
	};
});