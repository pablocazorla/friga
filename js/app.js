$(function() {

	// Common stores
var $window = $(window),
	$body = $('body'),
	$shell = $('#shell'),

	

	// PCAZ
	PCAZ = {};

// PCAZ Extend
PCAZ.helper = (function(){
	return {
		isReady : function(selection){
			return (selection.length > 0);
		}
	}	
})();

PCAZ.siteNavigation = (function(){
	var $siteNavigation = $('#site-navigation'),
		statusOpen = $body.hasClass('open-site-navigation'),
		statusEnabled = true,
		ready = PCAZ.helper.isReady($siteNavigation);

	return {		
		init : function(){			
			this.setEvents(this);
			return this;
		},
		open : function(){
			if(ready && statusEnabled && !statusOpen){
				$body.addClass('open-site-navigation');
				statusOpen = true;		
			}
			return this;			
		},
		close : function(){
			if(ready && statusEnabled && statusOpen){
				$body.removeClass('open-site-navigation');
				statusOpen = false;
			}
			return this;
		},
		toggle : function(){
			if(statusOpen){
				this.close();
			}else{
				this.open();
			}
			return this;
		},
		enabled : function(){
			statusEnabled = true;
			return this;
		},
		disabled : function(){
			statusEnabled = false;
			return this;
		},
		setEvents : function(self){
			$('.to-open-site-navigation').click(function(e){
				e.preventDefault();
				self.toggle();
			});
			$window.resize(function(){self.close()});
		}
	}
})().init();

PCAZ.niceScroll = (function(){
	var cfg = {},
		ready = ($.fn.niceScroll) ? true : false;
	return {
		$selection : $(),
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
})();//.set('.niceScroll,.nice-scroll');

PCAZ.gallery = (function(){
	var $gallery = $('.gallery').not('.gridding'),
		$figures = $gallery.find('figure'),
		$a = $('.gallery-menu a'),
		ready = PCAZ.helper.isReady($figures),
		columns = 4,
		current = 'all',
		enabled = true;
		
	return {
		init : function(){
			if(ready){
				$gallery.addClass('gridding');
				this.draw().setEvents();
			}		
			return this;
		},
		draw : function(){			
			var posX = 0,
				posY = 0,
				stepX = 100/columns, // %
				stepY = Math.round($gallery.width()/columns); // px
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
			
			return this;
		},
		select : function(cl,$aLink){
			if(cl != current && enabled){
				enabled = false;
				
				if(cl == 'all'){
					$figures.removeClass('hidden');
				}else{
					if(current == 'all'){
						$figures.not('.'+cl).addClass('hidden');
					}else{
						$figures.filter('.'+current).addClass('hidden');
						$figures.filter('.'+cl).removeClass('hidden');
					}
				}						
				current = cl;
				setTimeout(function(){
					enabled = true;
				},600);
				$a.parent().removeClass('current');
				$aLink.parent().addClass('current');
			}
			this.draw();
			return this;
		},
		setEvents : function(){
			var self = this;
			$window.resize(function(){self.draw();});

			$a.click(function(e){
				e.preventDefault();
				var $this = $(this),
					cl = $this.text().toLowerCase().replace(/ /g,'-');
				if(cl.indexOf('all-')!=-1){cl = 'all';}
				self.select(cl,$this);
			});
		}
	}
})().init();

PCAZ.loader = (function(){
	return {
		init : function(){
			this.setEvents(this);
			return this;
		},
		load : function(url, from){
			var dir = from || 'right',
				duration = 600,
				refreshHref = function(){
					setTimeout(function(){
						window.location.href = url;
					},duration);
				};
			PCAZ.niceScroll.remove();
			PCAZ.siteNavigation.close();
			var $currentFrame = $('.frame.current');
			var $nextFrame = $('<div class="frame '+dir+'"></div>').appendTo($shell).animate({
				'left':0
			},duration, function(){
				$currentFrame.remove();
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
			return this;
		},
		setEvents : function(self){
			$('a.load-from-right').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				self.load(url);
			});
			return this;
		}
	}
})().init();

PCAZ.workpost = (function(){

	var $wp = $('.sub-frame.work-post'),
		$wpSummary = $wp.find('.summary'),
		$wpSummaryContent = $wp.find('.summary-content'),
		$wi = $('.sub-frame.work-post-large-image'),
		$wiImg = $wi.find('img'),
		ready = PCAZ.helper.isReady($wp),
		marginTop = 350,
		windowHeight = 0,
		current = 'wp',
		wpPrevTop = 0,
		wiPrevTop = 0,
		step = 0;


	return {
		init : function(){
			if(ready){				
				this.calculateSize().setEvents(this);
			}
			return this;
		},
		calculatePosition : function(){
			switch(current){
				case 'wp':
					var wpTop = $wp.scrollTop(),
						toDown = (wpTop >= marginTop && step == 0 && wpPrevTop < wpTop)
						toTop = (wpTop <= marginTop && step == 2 && wpPrevTop > wpTop);
						

					if(toDown){
						//$wp.animate({'scrollTop':wpTop+'px'},50);
						
						step = 1;
						console.log('Va a WI: '+step);
						this.toggleCurrent();
					}
					if(toTop){
						//$wp.animate({'scrollTop':wpTop+'px'},50);
						
						step = 1;
						console.log('Va a WI: '+step);
						this.toggleCurrent();
					}




					wpPrevTop = wpTop;
					break;
				case 'wi':
					var wiTop = $wi.scrollTop(),
						difTop = ($wiImg.height() - windowHeight)-1,
						toDown = (wiTop >= difTop && step == 1 && wiPrevTop < wiTop),
						toTop = (wiTop <= 0 && step == 1 && wiPrevTop > wiTop);
						

					if(toDown){
						//$wp.animate({'scrollTop':wpTop+'px'},50);
						
						step = 2;
						console.log('Va a WP: '+step);
						this.toggleCurrent();
					}
					if(toTop){
						//$wp.animate({'scrollTop':wpTop+'px'},50);
						
						step = 0;
						console.log('Va a WP: '+step);
						this.toggleCurrent();
					}
					wiPrevTop = wiTop;
					break;
				default : break;
			}




			return this;
		},
		calculateSize : function(){
			marginTop = Math.round($wpSummaryContent.height() * 1);
			windowHeight = $window.height();

			$wpSummary.height(windowHeight + marginTop);

			this.calculatePosition()
			return this;
		},
		toggleCurrent : function(){
			if(current == 'wp'){
				current = 'wi';
				$wi.removeClass('behind');
				$wp.addClass('behind');
			}else{
				current = 'wp';
				$wp.removeClass('behind');
				$wi.addClass('behind');
			}
			return this;
		},
		setEvents : function(self){
			$wp.add($wi).scroll(function(){self.calculatePosition();});
			$window.resize(function(){self.calculateSize();});
			return this;
		}
	}
})().init();




});






