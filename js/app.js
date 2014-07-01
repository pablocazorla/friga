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
this.fixedHeader = false;
			this.setEvents();
		},
		setEvents : function(){
			
			var self = this;

			$window.scroll(function(){self.positioner();}).resize(function(){self.positioner();});



		},
		positioner : function(){
			console.log(this.current);
			this.current = $window.scrollTop();

			if(this.current > this.prev && this.direction != 'down'){
				this.direction = 'down';
				$header.removeClass('open');
				console.log('oculto');
			}
			if(this.current < this.prev && this.direction != 'up'&& this.fixedHeader){
				this.direction = 'up';
				$header.addClass('open');
				console.log('muestro');
			}

			if(this.current > this.minFixHeight && !this.fixedHeader){
				this.fixedHeader = true;
				$header.addClass('fixed');
				console.log('fijo');
			}
			if(this.current < 1 && this.fixedHeader){
				this.fixedHeader = false;
				$header.removeClass('fixed');
				console.log('suelto');
			}



			this.prev = this.current;
		}
	}



	HEADER.init();

	
};
$('document').ready(pablocazorla);