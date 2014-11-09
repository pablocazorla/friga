SR.define(function(App) {
	var modVideo = 846 / 476;
	return {
		init: function() {
			this.$page = $('.page.home').scrollTop(0);
			this.$presentation = $('#home-presentation');
			this.$content = $('#home-presentation-content');
			this.$videocontainer = $('#home-presentation-videocontainer');
			this.$text = $('#home-presentation-text');
			this.$textWrap = $('#home-presentation-text-wrap');
			
			this.height = 1000;
			return this.setSize().setScroll().setEvents(this);
		},
		setSize: function() {
			this.height = App.$window.height();
			this.$presentation.height(this.height);
			var widthWin = this.$presentation.width(),
				modWin = widthWin / this.height,
				widthVideo = '100%',
				leftVideo = '0';
			if (modWin < modVideo) {
				var w = (this.height * modVideo);
				widthVideo = w + 'px';
				leftVideo = -.5 * (w - widthWin) + 'px';
			}
			this.$videocontainer.css({
				width: widthVideo,
				left: leftVideo
			});

			var textHeight = this.$textWrap.height();
			this.$text.css({
				'top': (.5 * (this.height - textHeight)) +'px'
			});
			return this;
		},
		setScroll: function() {
			var scr = this.$page.scrollTop() * .5;
			scr = (scr > this.height) ? this.height : scr;
			this.$content.css('top', scr + 'px');
			return this;
		},
		setEvents: function(self) {
			App.$window.resize(function() {
				self.setSize();
			});
			this.$page.scroll(function() {
				self.setScroll();
			});

			this.$textWrap.animate({
				opacity : 1
			},600);

			$('#goto-last-work').click(function(e){
				e.preventDefault();

				var hr = $(this).attr('href'),
					sc = $(hr).offset().top;
				self.$page.animate({
					'scrollTop': sc + 'px'
				},800);
			});

			return this;
		}
	}
});