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
		$selection : $(),
		init : function(){
			this.set('.niceScroll,.nice-scroll');
			return this;
		},
		set : function(selection){
			if(ready){
				$(selection).niceScroll(cfg);
				this.$selection = this.$selection.add($(selection));
			}				
			return this;
		},
		setting : function(obj){
			cfg = $extend(cfg,obj);
			return this;
		},
		remove : function(){
			if(ready){
				this.$selection.getNiceScroll().remove();
			}
			return this;
		}
	}
})();
PCAZ.niceScroll.init();

PCAZ.gallery = (function(){
	var $gallery,$figures,there = false;

	$gallery = $('.gallery').not('.gridding').eq(0).each(function(){
		$figures = $(this).find('figure');
		there = ($figures.length > 0) ? true : false;
	});
		
	return {
		columns : 4,
		current : 'all',
		enabled : true,
		init : function(){
			if(there){
				this.$a = $('.gallery-menu a');
				this.draw();
				$gallery.addClass('gridding');
				this.setEvents();
			}
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
						'left' : posX + '%',
						'top' : posY + 'px'
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
		select : function(cl,$a){

			if(cl != this.current && this.enabled){
				this.enabled = false;
				
				if(cl == 'all'){
					$figures.removeClass('hidden');
				}else{
					if(this.current == 'all'){
						$figures.not('.'+cl).addClass('hidden');
					}else{
						$figures.filter('.'+this.current).addClass('hidden');
						$figures.filter('.'+cl).removeClass('hidden');
					}
				}						
				this.current = cl;
				var self = this;
				setTimeout(function(){
					self.enabled = true;
				},600);
				this.$a.parent().removeClass('current');
				$a.parent().addClass('current');
			}
			this.draw();

		},
		setEvents : function(){
			var self = this;
			$window.resize(function(){self.draw();});

			this.$a.click(function(e){
				e.preventDefault();
				var $this = $(this),
					cl = $this.text().toLowerCase().replace(/ /g,'-');
				if(cl.indexOf('all-')!=-1){cl = 'all';}
				self.select(cl,$this);
			});
		}
	}
})();
PCAZ.gallery.init();

PCAZ.loader = (function(){
	


	$('a.load-from-right').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		PCAZ.loader.load(url);
	});




	return {
		load : function(url, from){
			var dir = from || 'right',
				duration = 600,
				refreshHref = function(){
					setTimeout(function(){
						window.location.href = url;
					},duration);
				};

			PCAZ.niceScroll.remove();
			var $nextFrame = $('<div class="frame '+dir+'"></div>').appendTo($shell).animate({
				'left':0
			},duration, function(){
				$('.frame.current').remove();
				$nextFrame.removeClass(dir).addClass('current');
			});

			$.ajax({
			  url : url + '?async=1',
			  success : function(data){
			  	$nextFrame.html(data);
			  },
			  complete : function(data){
			  	refreshHref();
			  },
			  error : function(data){
			  	refreshHref();
			  }		  
			});





		}
	}
})();







});






