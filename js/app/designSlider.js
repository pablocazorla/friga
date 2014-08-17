SR.define(function(App){
	return {
		init : function(){
			this.$slider = $('#design-slider');
			this.$slis = this.$slider.find('.d-slide');




			this.calculateSize().setEvents(this);
			return this;
		},
		calculateSize : function(){
			var hw = App.$window.height();

			this.$slider.height(hw-10);










			return this;
		},
		change : function(direction){
			console.log(direction);
		},
		setEvents : function(self){
			App.$window.resize(function(){self.calculateSize();});


			// Drag ***************************************/
			var dragging = false, ymouseInit;
			this.$slider.on('mousedown', function (e) {
			    dragging = true;
			    ymouseInit = e.pageY;
			});
			App.$window.on('mousemove', function (e) {
			    if(dragging){

			    }
			}).on('mouseup', function (e) {
			    dragging = false;
			    var dif = e.pageY - ymouseInit;
			    if(Math.abs(dif)>70){
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