SR.define(function(App) {
	return {
		init: function() {
			this.$page = $('.page.home');
			this.$presentation = $('#home-presentation');
			this.$content = $('#home-presentation-content');
			this.heightWindow = 1000;
			return this.setSize().setScroll().setEvents(this);
		},
		setSize: function() {
			this.heightWindow = App.$window.height();
			this.$presentation.height(this.heightWindow);
			return this;
		},
		setScroll: function() {
			var scr = this.$page.scrollTop() * .5;
			scr = (scr > this.heightWindow) ? this.heightWindow : scr;
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
			return this;
		}
	}
});