SR.define(function(App) {
	return {
		marginTop: 350,
		fTop: 0,
		wpST: 0,
		difHeight: 0,
		r: 1,
		op: 1,
		settedOp: false,
		ready: false,
		timerScrollDown: null,
		init: function() {
			this.$wp = $('.sub-frame.illustration-post');
			this.$figure = $('.illustration-post-large-image figure');
			this.$wpSummary = this.$wp.find('.summary');
			this.$wpSummaryContent = this.$wpSummary.find('.summary-content');
			this.$postNavigation = $('.post-navigation');
			this.$toOpacity = this.$wpSummaryContent.add(this.$postNavigation);
			this.$wp.scrollTop(this.wpST);
			this.scrollLabel().setEvents(this);
			return this;
		},
		calculatePosition: function() {
			this.wpST = this.$wp.scrollTop();
			this.fTop = Math.round((this.wpST * this.r - this.marginTop));
			this.fTop = (this.fTop < 0) ? 0 : this.fTop;
			this.op = 1 - (this.wpST * 1.2 / this.marginTop);
			this.op = (this.op < 0) ? 0 : this.op;
			if (this.difHeight < this.fTop) {
				this.fTop = this.difHeight;
				if (!this.settedOp) {
					this.$toOpacity.css('opacity', '1');
					this.settedOp = true;
					this.$postNavigation.css('right', '0');
					if (this.timerScrollDown) {
						clearInterval(this.timerScrollDown);
						this.timerScrollDown = null;
					}
				}
			} else {
				this.settedOp = false;
				this.$toOpacity.css('opacity', this.op);
				if (this.op == 0) {
					this.$postNavigation.css('right', '-60px');
				}
				if (this.op == 1) {
					this.$postNavigation.css('right', '0');
				}
			}
			this.$figure.css('top', '-' + this.fTop + 'px');
			return this;
		},
		calculateSize: function() {
			if (this.ready) {
				this.difHeight = this.$figure.height() - App.$window.height();
				this.marginTop = (this.difHeight > 0) ? Math.round(this.$wpSummaryContent.height() * .8 * this.r) : 10;
				this.$wpSummary.height(this.$figure.height() + this.marginTop);
				if (this.difHeight <= 0 && this.timerScrollDown) {
					clearInterval(this.timerScrollDown);
					this.timerScrollDown = null;
				}
				this.calculatePosition();
			}
			return this;
		},
		setEvents: function(self) {
			this.$wp.scroll(function() {
				self.calculatePosition();
			});
			App.$window.resize(function() {
				self.calculateSize();
			});
			var $img = this.$figure.find('img').eq(0);
			if ($img[0].complete) {
				this.ready = true;
				this.calculateSize();
			} else {
				$img.load(function() {
					self.ready = true;
					self.calculateSize();
				});
			}
			return this;
		},
		scrollLabel: function() {
			var $scrollDown = $('#scroll-down'),
				secondsWait = 6,
				secondsRestart = 10,
				showing = false,
				show = function() {
					$scrollDown.fadeIn(400);
					showing = true;
				},
				hide = function() {
					if (showing) {
						$scrollDown.fadeOut(400);
						secondsWait = secondsRestart;
						showing = false;
					}
				};
			this.timerScrollDown = setInterval(function() {
				secondsWait--;
				if (secondsWait == 0) {
					show();
				}
			}, 1000);
			this.$wp.scroll(hide);
			return this;
		}
	}
});