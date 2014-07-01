var pablocazorla = function(){
	var $window = $(window),
		$header = $('#header-main'),



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

/*
			.each(function(){
				var $figures = $(this).find('figure'),
					$menus = $('.header-work').find('.menu-item a'),
					current = 'all';

				

			});*/
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
	};



	HEADER.init();
	WORKLIST.init();

	
};
$('document').ready(pablocazorla);