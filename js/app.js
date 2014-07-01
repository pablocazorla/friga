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
			$('.work-list').each(function(){
				var $figures = $(this).find('figure'),
					$menus = $('.header-work').find('.menu-item a'),
					current = 'all';

				$menus.click(function(e){
					e.preventDefault();
					var cl = $(this).text().toLowerCase().replace(/ /g,'-');
					if(cl.indexOf('all-')!=-1){cl = 'all';}

					if(cl != current){
						if(cl == 'all'){
							$figures.slideDown(250);
						}else{
							if(current == 'all'){
								$figures.not('.'+cl).slideUp(250);
							}else{
								$figures.filter('.'+current).slideUp(250);
								$figures.filter('.'+cl).slideDown(250);
							}
						}						
						current = cl;
						$menus.parent().removeClass('current');
						$(this).parent().addClass('current');
					}					
				});

			});
		}
	};



	HEADER.init();
	WORKLIST.init();

	
};
$('document').ready(pablocazorla);