// About Me
SR.define(function(App){
	return {
		init : function(){
			this.scrollLabelVisible = false;
			this.timerScrollDown = null;
			this.$about = $('.about-me').scrollTop(0);
			this.$sections = $('.about-me-img, .about-me section');
			this.$summary = $('#about-me-summary-content');

			var $imgPix = $('#about-me-img-pix');
			setTimeout(function(){
				App.waitImgsForLoad($imgPix,function(){
					var $imgPablo = $('#about-me-img-pablo'),
					src = $imgPablo.attr('data-src');
					$imgPablo.attr('src',src);
					App.waitImgsForLoad($imgPablo,function(){
						$imgPix.css('opacity','0');
					},true);
				},true);				
			},1000);
			this.setSize().scrollLabel().setEvents(this).skillmeter(this);
		},
		setSize : function(){
			var wh = App.$window.height(),
				summaryMargin = Math.round((wh-this.$summary.height())/2);
			this.$sections.css('min-height',wh+'px');
			if(summaryMargin<0){summaryMargin=0;}
			if(summaryMargin>180){summaryMargin=180;}
			this.$summary.css('margin-top',summaryMargin+'px');
			return this;
		},
		setEvents : function(self){
			App.$window.resize(function(){self.setSize();});
			
			self.$about.scroll(function(){				
				if(self.timerScrollDown){
					clearInterval(self.timerScrollDown);self.timerScrollDown=null;
				}
				if(self.scrollLabelVisible){
					$('#scroll-down').fadeOut(250);
				}
			});
			return this;	
		},
		scrollLabel : function(){
			var self = this,
				secondsWait = 3;
				setTimeout(function(){
					this.timerScrollDown = setInterval(function(){
						secondsWait--;
						if(secondsWait==0){
							$('#scroll-down').fadeIn(400);
							self.scrollLabelVisible = true;
							clearInterval(self.timerScrollDown);
							self.timerScrollDown = null;
						}
					},1000);
				},1000);				
			return this;
		},
		skillmeter : function(self){
			$('#skill-meter').each(function(){
				var $canvas = $(this),
					
					pt = 10,
					pb = 10,
					pl = 10,
					pr = 10,

					
					width = $canvas[0].width,
					height = $canvas[0].height,
					percH = .01*(height - pt - pb),
					wCurve = Math.round(width/4),

					c = $canvas[0].getContext('2d'),

					
					amplitude = .5,

					a = Math.round(.25*wCurve*amplitude),
					wm = Math.round(wCurve/2),
					wq = Math.round(wCurve/4),
					hm = 1,h=1,
					drawCurve = function(x,hperc){
						h = percH*hperc;
						hm = h/2
						c.beginPath();
						c.moveTo(pl, height-pb);

						c.lineTo(x-wm,height-pb);


						c.quadraticCurveTo(x-wm+a, height-pb, x-wq, height-pb-hm);

						c.quadraticCurveTo(x-a, height-pb-h, x, height-pb-h);

						c.quadraticCurveTo(x+a, height-pb-h, x+wq, height-pb-hm);

						c.quadraticCurveTo(x+wm-a, height-pb, x+wm, height-pb);

						

						c.lineTo(width-pr,height-pb);
						c.fill();
						c.stroke();
						c.closePath();
					};
			
				c.strokeStyle = "black";
				c.fillStyle = "rgba(0,120,200,.4)";
				c.lineWidth = 2;
				c.lineCap = 'square';

		

				drawCurve(400,50);











			});
			return this;
		}
	}
});