SR.define(function(App) {

	var backColors = [
			'5a7880',
			'5a8074',
			'76805a',
			'806c56',
			'756a80'
		],
		idColor = -1,
		getbackColor = function() {
			var bc = '#' + backColors[++idColor];
			idColor = (idColor >= (backColors.length - 1)) ? -1 : idColor;
			return bc;
		},
		timerToScroll = null;

	return {
		hw: 300,
		moving: false,
		timming: 800,
		ended: false,
		scrollTop: 0,
		init: function() {
			this.$slider = $('#design-slider');
			this.$slis = this.$slider.find('.d-slide').each(function() {
				$(this).css('background-color', getbackColor());
			});
			this.length = this.$slis.length;
			this.$more = $('#design-more');
			this.$article = this.$slider.parent();
			this.$article.scrollTop(0);
			this.current = 0;

			this.$slis.eq(0).addClass('current');
			this.$slis.eq(1).addClass('next');
			this.isLtIE8 = (typeof document.attachEvent === "object") ? true : false;
			this.calculateSize().renderCtrl().setEvents(this);
			this.$slider.fadeIn(400, function() {
				$('#design-loading').hide();
			});
			this.$scrollDown = $('#scroll-down');
			var self = this;
			setTimeout(function() {
				self.calculateSize();
			}, 50);
			timerToScroll = setTimeout(function() {
				self.$scrollDown.fadeIn(400);
				timerToScroll = 'waitHide';
			}, 5000);
			return this;
		},
		calculateSizeForContent: function() {
			var self = this;
			this.$slis.each(function() {
				var h = .5 * (self.hw - $(this).find('.d-slide-anim-ramp').height());
				h = (h < 10) ? 10 : h;
				$(this).find('.d-slide-anim,.d-slide-text').css('top', h + 'px');
			});
		},
		calculateSize: function() {
			this.hw = App.$window.height();
			this.$slider.height(this.hw);
			this.calculateSizeForContent();
			return this;
		},
		renderCtrl: function() {
			var str = '<div id="design-slider-control">',
				cl = 'current';
			for (var i = 0; i < this.length; i++) {
				if (i > 0) {
					cl = '';
				}
				str += '<span class="' + cl + '" rel="' + i + '"></span>';
			}
			str += '</div>';
			this.$ctrl = $(str);
			this.$ctrl.appendTo(this.$slider);
			return this;
		},
		change: function(direction) {
			var self = this;
			if (!this.moving && self.scrollTop == 0) {
				var gou = this.current + direction;
				if (gou >= 0 && gou < this.length) {
					if (timerToScroll != null) {
						self.$scrollDown.fadeOut(200);
						timerToScroll = null;
					}
					this.moving = true;
					this.current = gou;
					if (direction > 0) {
						self.$slis.filter('.prev').removeClass('prev');
						this.$slis.eq(this.current - 1).removeClass('current').addClass('prev animated');
						this.$slis.eq(this.current).removeClass('next').addClass('current');
						if ((this.current + 1) < this.length) {
							this.$slis.eq(this.current + 1).addClass('next')
						}
					} else {
						self.$slis.filter('.next').removeClass('next');
						this.$slis.eq(this.current).removeClass('prev').addClass('current animated');
						this.$slis.eq(this.current + 1).removeClass('current').addClass('next');
						if ((this.current - 1) >= 0) {
							this.$slis.eq(this.current - 1).addClass('prev')
						}
					}
					setTimeout(function() {
						self.moving = false;
						self.$slis.filter('.animated').removeClass('animated');
						self.ended = ((self.current + 1) == self.length) ? true : false;

						if (self.ended) {
							self.$more.show();
							self.$article.scrollTop(0);
						} else {
							self.$more.hide();
						}

					}, this.timming);
					self.$ctrl.find('span').removeClass('current').eq(self.current).addClass('current');
				}
			}
		},
		setEvents: function(self) {

			self.$slis.find('img').load(function() {
				self.calculateSizeForContent();
			});


			var setScrollTop = function() {
				self.scrollTop = self.$article.scrollTop();
			};
			App.$window.resize(function() {
				self.calculateSize();
				setScrollTop();
			});

			// Drag ***************************************/
			var dragging = false,
				ymouseInit, dif,
				$prev = false,
				$current = false;
			this.$slider.on('mousedown', function(e) {
				setScrollTop();
				if (!dragging && self.scrollTop == 0 && !self.moving && !self.isLtIE8) {
					dragging = true;
					ymouseInit = e.pageY;
					if ((self.current - 1) >= 0) {
						$prev = self.$slis.eq(self.current - 1);
					}
					$current = self.$slis.eq(self.current);
				}
			});
			App.$window.on('mousemove', function(e) {
				if (dragging) {
					dif = 100 * (e.pageY - ymouseInit) / self.hw;
					if (dif > 0 && $prev) {
						$prev.css('top', (dif - 100) + '%');
						$current.css('top', '');
					} else {
						if ($prev) {
							$prev.css('top', '');
						}
						if (dif <= 0 && !self.ended) {
							$current.css('top', dif + '%');
						}
					}
				}
			}).on('mouseup', function(e) {
				if (dragging) {
					if (Math.abs(dif) > 30) {
						if ($prev) {
							$prev.css('top', '');
						}
						$current.css('top', '');
						dragging = false;
						$prev = false;
						$current = false;
						if (self.ended && dif <= 0) {} else {
							self.change(-1 * Math.abs(dif) / dif);
						}
					} else {
						self.moving = true;
						if (dif > 0 && $prev) {
							$prev.animate({
								'top': '-100%'
							}, 200, function() {
								$prev.css('top', '');
								dragging = false;
								$prev = false;
								$current = false;
								self.moving = false;
							});
						} else {
							if (dif <= 0) {
								$current.animate({
									'top': '0%'
								}, 200, function() {
									$current.css('top', '');
									dragging = false;
									$prev = false;
									$current = false;
									self.moving = false;
								});
							}
						}
					}
				}
			});
			// Scroll ***************************************/
			// Firefox
			this.$slider.on('DOMMouseScroll', function(e) {
				setScrollTop();
				if (!dragging && self.scrollTop == 0 && !self.moving) {
					var d = e.originalEvent.detail,
						dir = (d > 0) ? 1 : -1;
					self.change(dir);
				}

			})
			// Other
			.on('mousewheel', function(e) {
				setScrollTop();
				if (!dragging && self.scrollTop == 0 && !self.moving) {
					var d = e.originalEvent.wheelDelta,
						dir = (d < 0) ? 1 : -1;
					self.change(dir);
				}
			});
			//
			var keyPressed = false;
			App.$window.on('keydown', function(e) {
				if (!dragging && !keyPressed && self.scrollTop == 0 && !self.moving && !self.isLtIE8) {
					keyPressed = true;
					var unicode = e.keyCode ? e.keyCode : e.charCode;
					if (unicode == 37 || unicode == 38) {
						setScrollTop();
						self.change(-1);
					}
					if (unicode == 39 || unicode == 40) {
						setScrollTop();
						self.change(1);
					}
				}
			}).on('keyup', function(e) {
				if (keyPressed) keyPressed = false;
			});



			return this;
		}
	}
});