SR.define(function(App) {
	return {
		columns: 4,
		current: 'all',
		enabled: true,
		init: function() {
			this.$gallery = $('.gallery').not('.gridding').addClass('gridding');
			this.$figures = this.$gallery.find('figure');
			this.$a = $('.gallery-menu a');

			this.draw().setEvents(this).loadImages();
			return this;
		},
		draw: function() {
			var windowWidth = App.$window.width();
			this.columns = 4;
			if (windowWidth < 1400) {
				this.columns = 3;
			}
			if (windowWidth < 820) {
				this.columns = 2;
			}
			if (windowWidth < 500) {
				this.columns = 1;
			}
			var posX = 0,
				posY = 0,
				stepX = 100 / this.columns, // %
				stepY = Math.round(this.$gallery.width() / this.columns); // px
			this.$figures.not('.hidden').each(function() {
				$(this).css({
					'width': stepX + '%',
					'height': stepY + 'px',
					'left': posX + '%',
					'top': posY + 'px'
				});
				posX += stepX;

				if (posX >= 100) {
					posX = 0;
					posY += stepY;
				}
			});
			this.$gallery.height(posY + stepY);
			return this;
		},
		select: function(cl, $aLink) {
			if (cl != this.current && this.enabled) {
				this.enabled = false;

				if (cl == 'all') {
					this.$figures.removeClass('hidden');
				} else {
					if (this.current == 'all') {
						this.$figures.not('.' + cl).addClass('hidden');
					} else {
						this.$figures.filter('.' + this.current).addClass('hidden');
						this.$figures.filter('.' + cl).removeClass('hidden');
					}
				}
				this.current = cl;
				var self = this;
				setTimeout(function() {
					self.enabled = true;
				}, 600);
				this.$a.parent().removeClass('current');
				$aLink.parent().addClass('current');
			}
			this.draw();
			return this;
		},
		setEvents: function(self) {
			App.$window.resize(function() {
				self.draw();
			});
			this.$a.click(function(e) {
				e.preventDefault();
				var $this = $(this),
					cl = $this.text().toLowerCase().replace(/ /g, '-');
				if (cl.indexOf('all-') != -1) {
					cl = 'all';
				}
				self.select(cl, $this);
			});
			return this;
		},
		loadImages: function() {
			var $images = $('.illustration-thumb-img'),
				length = $images.length,
				current = 0,
				setScr = function() {

					if (current < length) {
						var $i = $images.eq(current),
							s = $i.attr('srcwait');
						$i.attr('src', s);
					}
				},
				loadNext = function($i) {
					if($i !== null){
						$i.css('opacity','1');
					}
					++current;
					setScr();
				};
			$images.load(function(){
				loadNext($(this));
			}).error(function(){
				loadNext(null);
			});
			setScr();
			return this;
		}
	}
});