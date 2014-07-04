var pablocazorla = function(){
	var $window = $(window),
		$header = $('#header-main'),
		$frame = $('#frame'),
		$ajaxDimmer = $('#ajax-dimmer'),

	HEADER = {
		minFixHeight : 160,
		onTop : true,
		direction : 'none',
		prev : -1,
		current : 0,
		fixedHeader : false,

		init : function(){
			var self = this;
			$window.scroll(function(){self.positioner();}).resize(function(){self.positioner();});
		},
		positioner : function(){
			this.current = $window.scrollTop();
			if(this.current > this.prev && this.direction != 'down'){
				this.direction = 'down';
				$header.removeClass('open');
			}
			if(this.current < this.prev && this.direction != 'up'&& this.fixedHeader){
				this.direction = 'up';
				$header.addClass('open');
			}
			if(this.current > this.minFixHeight && !this.fixedHeader){
				this.fixedHeader = true;
				$header.addClass('fixed');
				setTimeout(function(){$header.addClass('animated');},50);
			}
			if(this.current < 1 && this.fixedHeader){
				this.fixedHeader = false;
				$header.removeClass('fixed').removeClass('animated');				
			}
			this.prev = this.current;
		}
	},
	WORKLIST = {
		init : function(){
			this.$workList = $('.work-list');
			this.$figures = this.$workList.find('figure');
			if(this.$figures.length > 0){
				this.set();
			}
		},
		set : function(){
			var self = this,
				setWidth = function(){
					var w =Math.round(self.$workList.width()/3);
					self.$figures.find('img').width(w);
				};
			setWidth();
			$window.resize(setWidth);

			var $menus = $('.header-work').find('.menu-item a'),
				current = 'all',
				enabled = true;

			$menus.click(function(e){
				e.preventDefault();
				if(enabled){
					var cl = $(this).text().toLowerCase().replace(/ /g,'-');
					if(cl.indexOf('all-')!=-1){cl = 'all';}

					if(cl != current){
						enabled = false;
						self.$figures.removeClass('autosize-img');
						if(cl == 'all'){
							self.$figures.addClass('visible');
						}else{
							if(current == 'all'){
								self.$figures.not('.'+cl).removeClass('visible');
							}else{
								self.$figures.filter('.'+current).removeClass('visible');
								self.$figures.filter('.'+cl).addClass('visible');
							}
						}						
						current = cl;
						setTimeout(function(){
							self.$figures.addClass('autosize-img');
							enabled = true;
						},600);
						$menus.parent().removeClass('current');
						$(this).parent().addClass('current');
					}
				}			
			});
		}
	},
	AJAXNAV = {		
		init : function(){
			this.$link = $('.alink, #menu-principal a, .category a, .widget-container a');
			var self = this;
			this.$link.each(function(){
				self.set($(this));
			});
		},
		set : function($this){
			var url = $.trim($this.attr('href'));
			$this.click(function(e){
				e.preventDefault();
				if(url != window.location.href && !$this.parent().hasClass('dropdown')){
					$ajaxDimmer.fadeIn(200);
					$.ajax({
					  url: url + '?async=true',
					  success : function(data){
					  	$frame.addClass('fix').html(data);
					  	$window.scrollTop(0);
						$ajaxDimmer.fadeOut(200,function(){
							$frame.removeClass('fix');
							window.location.href = url;
						});				  	
					  },
					  error : function(){
					  	window.location.href = url;
					  }
					});
				}
			});
		}
	},
	DROPDOWN = {
		init : function(){
			$('.dropdown a').each(function(){
				var $this = $(this),
					open = false,
					overThis = false,
					close = function(){
						if(open && !overThis){
							open = false;
							$this.parent().removeClass('open');
						}
						overThis = false;
					};

				$this.click(function(e){
					e.preventDefault();
					if(!open){
						open = true;
						$this.parent().addClass('open');
						overThis = true;
					}
				});
				$window.click(close).scroll(close).resize(close);
			});
		}
	},
	PREPAINT = {
		init : function(){
			var $pre = $('pre').not('.no-print').addClass('prettyprint');
			$('pre.html').each(function(){
				$(this).text($(this).html());
			});
			
			if($pre.length > 0){
				$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js');
			}
		}		
	};



	HEADER.init();
	WORKLIST.init();
	AJAXNAV.init();
	DROPDOWN.init();
	PREPAINT.init();

	
};
$('document').ready(pablocazorla);