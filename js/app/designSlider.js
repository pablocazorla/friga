SR.define(function(App){
	return {
		hw : 300,
		init : function(){
			this.$slider = $('#design-slider');
			this.$slis = this.$slider.find('.d-slide');
			this.length = this.$slis.length;
			/*
			this.current = 0;
			this.$slis.eq(0).addClass('current');
			this.$slis.eq(1).addClass('next');
			*/
			this.current = 1;
			this.$slis.eq(0).addClass('prev');
			this.$slis.eq(1).addClass('current');
			this.$slis.eq(2).addClass('next');


			this.calculateSize().setEvents(this);
			this.$slider.addClass('animated').fadeIn(400);
			return this;
		},
		calculateSize : function(){
			this.hw = App.$window.height();

			this.$slider.height(this.hw-10);










			return this;
		},
		change : function(direction){
			console.log(direction);
		},
		setEvents : function(self){
			App.$window.resize(function(){self.calculateSize();});


			// Drag ***************************************/
			var dragging = false, ymouseInit,dif,
				$prev = false,
				$current = false;

			this.$slider.on('mousedown', function (e) {
				self.$slider.removeClass('animated');
			    dragging = true;
			    ymouseInit = e.pageY;
			    if((self.current - 1)>=0){$prev = self.$slis.eq(self.current - 1);}
			    $current = self.$slis.eq(self.current);
			});
			App.$window.on('mousemove', function (e) {
			    if(dragging){
			    	dif = 100*(e.pageY - ymouseInit)/self.hw;
			    	if(dif>0 && $prev){
			    		$prev.css('top',(dif-100)+'%');
			    		$current.css('top','');
			    	}else{
			    		if($prev){$prev.css('top','');}
			    		$current.css('top',dif+'%');
			    	}
			    }
			}).on('mouseup', function (e) {
				self.$slider.addClass('animated');
				if($prev){$prev.css('top','')}
				$current.css('top','');
			    dragging = false;
			    $prev = false;
				$current = false;			
			    if(Math.abs(dif)>30){
			    	self.change(-1*Math.abs(dif)/dif);
			    }
			});

			// Scroll ***************************************/
			// Firefox
			this.$slider.on('DOMMouseScroll', function (e) {
			    var d = e.originalEvent.detail,
			    	dir = (d > 0) ? 1 : -1;
				self.change(dir);
			})
			// Other
			.on('mousewheel', function (e) {
			    var d = e.originalEvent.wheelDelta,
			    	dir = (d < 0) ? 1 : -1;
				self.change(dir);
			});
			//
			var keyPressed = false;
			App.$window.on('keydown',function(e) {
				if(!keyPressed){
					keyPressed = true;
					var unicode = e.keyCode? e.keyCode : e.charCode;
					if(unicode == 37 || unicode == 38){
						self.change(-1);
					}
					if(unicode == 39 || unicode == 40){
						self.change(1);
					}
				}				
			}).on('keyup',function(e) {
				if(keyPressed) keyPressed = false;
			})

			return this;
		}
	}
});