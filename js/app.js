// jQuery Plugins
// pixelLoading
(function($){
  $.fn.pixelLoading = function(options){
		//Settings
		var setting = $.extend({
      		duration : 200
		}, options);		
	
		return this.each(function(){			
			var $this = $(this),
				urlThumb = $this.attr('data-pixelloading');
			if(urlThumb != undefined && urlThumb != ''){
				var $canvas = $('<canvas height="5000"></canvas>'),
					$canvasThumb = $('<canvas width="38" height="500" class="canvas-thumb"></canvas>');

				$this.wrap('<div class="pixel-loading-wrap"></div>').before($canvas).before($canvasThumb);

				var $wrapper = $this.parent(),
					thumbImg = new Image(),
					cThumb = $canvasThumb[0].getContext('2d'),
					c = $canvas[0].getContext('2d'),
					width = 1880,
					imageData = null,
					rgb = 'rgb(0,0,0)',
					heightThumb = 500,
					setThumbData = function(){
						cThumb.clearRect(0,0,38, 500);
						cThumb.drawImage(thumbImg, 0, 0);
						imageData = cThumb.getImageData(0, 0, 38, heightThumb);
					},
					draw = function(){
						if(imageData){
							width = $wrapper.width();
							$canvas[0].width = width;
							c.clearRect(0,0,width, 5000);

							var l = imageData.data.length,
								posX = 0,
								posY = 0,
								wi = Math.ceil(width/38);
							for(var i = 0;i < l;i += 4){
								rgb = 'rgb('+imageData.data[i]+','+imageData.data[i + 1]+','+imageData.data[i + 2]+')';
								c.fillStyle = rgb;
								c.fillRect(posX*wi,posY*wi,wi,wi);
								posX++;
								if(posX >= 38){
									posX = 0;
									posY++;
								}
							}
						}
					},
					loadedImg = function(){
						setTimeout(function(){
							$this.addClass('to-show');
							setTimeout(function(){
								$canvas.add($canvasThumb).remove();
							},2000);
						},4000);
						
					}
				//if(!$this[0].complete){
					thumbImg.src = urlThumb;
					thumbImg.onload = function(){
						heightThumb = thumbImg.height;
						setThumbData();
						draw();
						$(window).resize(draw);
					}
					//$this.load(loadedImg);
				//}else{
					loadedImg();
				//}
				
			}
		});
	};
})(jQuery);


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
})().set('.niceScroll,.nice-scroll');

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
				$figures.find('img').pixelLoading();
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
		$wpSummary,$wpSummaryContent,$figure, marginTop = 350,fTop = 0,wpST = 0,difHeight,r = .9,op = 1,
		ready = PCAZ.helper.isReady($wp);


	return {
		init : function(){
			if(ready){
				$figure = $('.work-post-large-image figure');

				$figure.find('img').pixelLoading();


				$wpSummary = $wp.find('.summary');
				$wpSummaryContent = $wpSummary.find('.summary-content');				
				$wp.scrollTop(wpST);
				this.calculateSize().setEvents(this);
			}
			return this;
		},
		calculatePosition : function(){
			wpST = $wp.scrollTop();
			fTop = Math.round((wpST*r - marginTop));
			fTop = (fTop < 0) ? 0 : fTop;

			op = 1 - (wpST/marginTop);
			op = (op < 0) ? 0 : op;

			$wpSummaryContent.css('opacity',op);

			fTop = (difHeight < fTop) ? difHeight : fTop;

			$figure.css('top','-'+fTop+'px');

			return this;
		},
		calculateSize : function(){
			difHeight = $figure.height() - $window.height();

			marginTop = (difHeight > 0) ? Math.round($wpSummaryContent.height() * .8 * r) : 10;
			
			
			$wpSummary.height($figure.height() + marginTop);
			
			this.calculatePosition();
			return this;
		},		
		setEvents : function(self){
			$wp.scroll(function(){self.calculatePosition();});
			$window.resize(function(){self.calculateSize();});
			return this;
		}
	}
})().init();






});






