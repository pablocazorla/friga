$(function() {

// Common stores
var $window = $(window),
	$body = $('body'),
	$shell = $('#shell');

var PCAZ = {};

PCAZ.siteNavigation = (function(){

	$('.to-open-site-navigation').click(function(e){
		e.preventDefault();
		PCAZ.siteNavigation.toggle();
	});


	return {
		$siteNavigation : $('#site-navigation'),
		statusOpen : $body.hasClass('open-site-navigation'),
		statusEnabled : true,
		open : function(){
			if(this.statusEnabled){
				$body.addClass('open-site-navigation');
				this.statusOpen = true;		
			}
			return this;			
		},
		close : function(){
			if(this.statusEnabled){
				$body.removeClass('open-site-navigation');
				this.statusOpen = false;
			}
			return this;
		},
		toggle : function(){
			if(this.statusOpen){
				this.close();
			}else{
				this.open();
			}
			return this;
		},
		enabled : function(){
			this.statusEnabled = true;
			return this;
		},
		disabled : function(){
			this.statusEnabled = false;
			return this;
		}
	}
})();

PCAZ.requestPage = (function(){
	return {
	}
})();

PCAZ.softLoad = (function(){
	return {
	}
})();

PCAZ.niceScroll = (function(){

	var cfg = {},
		ready = ($.fn.niceScroll) ? true : false;

	return {
		init : function(){
			this.set('.niceScroll,.nice-scroll');
			return this;
		},
		set : function(selection){
			if(ready){$(selection).niceScroll(cfg);}			
			return this;
		},
		setting : function(obj){
			cfg = $extend(cfg,obj);
			return this;
		}
	}
})();
PCAZ.niceScroll.init();

PCAZ.gallery = (function(){

	var $gallery = $('.gallery').not('.gridding'),
		$figures = $('.gallery').not('.gridding').find('figure'),
		there = ($figures.length > 0) ? true : false;









	return {
		columns : 4,
		init : function(){
			this.draw();
			$gallery.addClass('gridding');
			this.setEvents();



			return this;
		},
		draw : function(){
			if(there){
				var posX = 0,
					posY = 0,
					stepX = 100/this.columns, // %
					stepY = Math.round($gallery.width()/this.columns); // px

				$figures.not('.hidden').each(function(){

					$(this).css({
						'top' : posX + '%',
						'left' : posY + 'px'
					});
					posX += stepX;

					if(posX >=100){
						posX = 0;
						posY += stepY;
					}
				});
				$gallery.height(posY + stepY);
			}
		},
		setEvents : function(){
			var self = this;
			$window.resize(function(){self.draw();});
		}
	}
})();
PCAZ.gallery.init();









});






