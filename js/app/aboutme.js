// About Me
SR.define(function(App){
	var skillmeter;
	(function(){
		var 
		isCanvasSupported = function(){
			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		},
		drawLine = function(c,x0,y0,x1,y1){
			c.beginPath();
			c.moveTo(x0, y0);
			c.lineTo(x1,y1);
			c.stroke();
			c.closePath();
		},
		drawString = function(c, text, posX, posY) {
			var lines = text.split("\n");
			c.save();
			c.translate(posX, posY);
			for (i = 0; i < lines.length; i++) {
		 		c.fillText(lines[i],0, i*14);
			}
			c.restore();
		},
		cnv,$cnv,c,about,width,height,basex,basey,perc,val,iconSprite,timer,$wrap,mod=90/35,$controls,$arrows,current,
		wCurve,amplitude,wCurveMed,wCurveQuart,
		g = {
			x : null, y : null, w : null, h : null,
			pt : 35, pr : 20, pb : 155, pl : 20
		},
		d,
		dataTitles = ['My Illustration skills','My Design skills','My skills for Traditional Artwork','Software I use','Technologies I know'],
		data = [
			[
				{'label':'Digital\npainting', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Matte-painting', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Fantasy\n& books', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Characters', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Concept Art', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Speed-painting', 'color':'rgba(255,107,27,','val': 30}
			],
			[
				{'label':'Web Design', 'color':'rgba(255,107,27,','val': 30},
				{'label':'UX Analysis', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Interactive\napps', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Infographics', 'color':'rgba(255,107,27,','val': 30},
				{'label':'3D modeling', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Icons & logos', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Advertising', 'color':'rgba(255,107,27,','val': 30}
			],
			[
				{'label':'Oil on canvas', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Drawing', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Watercolor', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Pencils', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Sketches', 'color':'rgba(255,107,27,','val': 30}
			],
			[
				{'label':'Adobe\nPhotoshop', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Adobe\nIllustrator', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Krita', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Blender 3D', 'color':'rgba(255,107,27,','val': 30},
				{'label':'SublimeText\n(for coding)', 'color':'rgba(255,107,27,','val': 30}
			],
			[
				{'label':'HTML5', 'color':'rgba(255,107,27,','val': 30},
				{'label':'CSS3', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Javascript', 'color':'rgba(255,107,27,','val': 30},
				{'label':'JQuery', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Wordpress', 'color':'rgba(255,107,27,','val': 30},
				{'label':'Web Mobile', 'color':'rgba(255,107,27,','val': 30},
				{'label':'GIT', 'color':'rgba(255,107,27,','val': 30}
			]
		];
		
		skillmeter = {		
			init : function(){
				cnv = document.getElementById('skill-meter');
				$cnv = $(cnv);
				if(cnv != null && isCanvasSupported()){
					$wrap = $('.skill-meter-wrap');					
					$arrows = $('.skill-meter-arrow');
					current = 0;
					$controls = $('.skill-meter-controls');
					var spctrl = '';
					for(var i = 0;i < data.length;i++){
						spctrl += '<span data-ind="'+i+'" title="'+dataTitles[i]+'"></span>';
					}
					$controls.html(spctrl);
					c = cnv.getContext('2d');
					c.lineCap = 'round';
					iconSprite = new Image();
					iconSprite.src = baseTemplateURL+'/img/skill-sprite.png';
					this.changeData(0).setEvents(this);
				}
			},
			onresize : function(){
				width = $wrap.width();
				height = 350;
				$cnv.attr({
					width:width,
					height:height
				});
				g.x = g.pl;
				g.y = g.pt;
				g.w = width - g.pl - g.pr;
				g.h = height - g.pt - g.pb;
				wCurve = Math.round(2*g.w/(d.length+1));
				wCurveMed = Math.round(.5*wCurve);
				wCurveQuart = Math.round(.25*wCurve);
				amplitude = .5*wCurveQuart;
				basey = g.y+g.h;
				perc = .01*g.h;
				this.draw();
				var self = this;
				return this;
			},
			changeData : function(num){
				current = num;
				if(current>= data.length){current=0;}
				if(current < 0){current=data.length-1;}
				$controls.find('span').removeClass('current').eq(current).addClass('current');
				d = data[current];
				this.onresize();
				return this;
			},
			draw : function(){
				if(timer != null){clearInterval(timer);timer = null;};
				var self = this,
					v = 0,
					curr = 0,
					acc = .05,
					stepReady = [],
					stepValue = [],
					stepAlpha = [];
				for(var i = 0;i<d.length;i++){
					stepReady.push(false);
					stepValue.push(0);
					stepAlpha.push(0);
				};
				timer = setInterval(function(){
					c.clearRect(0,0,width,height);
					self.drawBase();
					c.lineWidth = 3;
					stepReady[curr] = true;
					for(var i = 0;i<d.length;i++){
						if(stepReady[i]){
							c.strokeStyle = d[i].color +'.6)';
							c.fillStyle = d[i].color +'.4)';
							if(stepValue[i] != d[i].val){
								stepValue[i] +=	acc*(d[i].val - stepValue[i]);
								stepValue[i] = Math.round(stepValue[i]*100)/100;
								if((d[i].val-stepValue[i])<0.1){
									stepValue[i] = d[i].val;
								}
							}
							self.drawCurve(i,stepValue[i]);
							if((stepValue[i]/d[i].val)>.5 && typeof stepReady[i+1] != 'undefined'){
								stepReady[i+1] = true;
							}
							// icon
							if(stepAlpha[i]<1){
								stepAlpha[i] += .02;
								c.globalAlpha = stepAlpha[i];
							}
							c.drawImage(iconSprite, i*24, current*24,24,24,basex-12,basey+15,24,24);
							c.fillStyle = "#333";
							c.textAlign = 'center';
							c.font = "11px sans-serif";
							drawString(c,d[i].label, basex, basey+56);
							c.globalAlpha = 1;
						}						
					}
					if(stepValue[d.length-1] == d[d.length-1].val){
						clearInterval(timer);timer = null;
					}
				},15);				
			},
			drawCurve : function(i,v){
				if(v>0){
					val = Math.round(v * perc);
					basex = g.x + (i+1)*wCurveMed;
					c.beginPath();
					c.moveTo(basex - wCurveMed,basey);
					c.quadraticCurveTo(basex - wCurveMed + amplitude, basey, basex - wCurveQuart, basey - Math.round(.5*val));
					c.quadraticCurveTo(basex - amplitude, basey - val, basex, basey - val);
					c.quadraticCurveTo(basex + amplitude, basey - val, basex + wCurveQuart, basey - Math.round(.5*val));
					c.quadraticCurveTo(basex + wCurveMed - amplitude, basey, basex + wCurveMed, basey);
					c.fill();
					c.stroke();
					c.closePath();
				}				
			},
			drawBase : function(){
				c.lineWidth = 1;
				c.strokeStyle = '#888';
				for(var i = 0;i<d.length;i++){
					basex = g.x + (i+1)*wCurveMed;
					drawLine(c,basex,g.y-10,basex,basey+10);
				}
				//dashed:
				var dashCount = 50,
					dash = Math.round(basey/dashCount);
				c.lineWidth = dash;
				c.strokeStyle = '#FFF';
				for(var i = 0;i<dashCount;i+=2){
					var by = basey-(i*dash);
					drawLine(c,g.x,by,g.x+g.w,by);
				}				
				c.lineWidth = 1;
				c.strokeStyle = '#DDD';
				drawLine(c,g.x,g.y,g.x+g.w,g.y);
				drawLine(c,g.x,g.y+(.5*g.h),g.x+g.w,g.y+(.5*g.h));
				drawLine(c,g.x,g.y+g.h,g.x+g.w,g.y+g.h);
				var ih = 76;
				var r = 15;
				c.strokeStyle = '#999';
				c.beginPath();
				c.moveTo(g.x + wCurveQuart,g.y+g.h+ih);
				c.quadraticCurveTo(g.x + wCurveQuart,g.y+g.h+ih+r,g.x + wCurveQuart + r,g.y+g.h+ih+r);				
				c.lineTo(width/2-r,g.y+g.h+ih+r);
				c.quadraticCurveTo(width/2,g.y+g.h+ih+r,width/2,g.y+g.h+ih+2*r);
				c.quadraticCurveTo(width/2,g.y+g.h+ih+r,width/2+r,g.y+g.h+ih+r);
				c.lineTo(g.x + g.w - wCurveQuart - r,g.y+g.h+ih+r);
				c.quadraticCurveTo(g.x + g.w - wCurveQuart,g.y+g.h+ih+r,g.x + g.w - wCurveQuart,g.y+g.h+ih);
				c.stroke();
				c.closePath();
				// text
				c.fillStyle = "#999";				
				c.font = "10px sans-serif";
				c.textAlign = 'left';
				c.fillText('100%',g.x, g.y-4);
				c.fillText('50%',g.x, g.y+(.5*g.h)-4);
				c.textAlign = 'right';
				c.fillText('100%',g.x+g.w, g.y-4);
				c.fillText('50%',g.x+g.w, g.y+(.5*g.h)-4);
				// Base
				c.fillStyle = "#777";				
				c.font = "italic 18px sans-serif";
				c.textAlign = 'center';
				c.fillText(dataTitles[current],width/2, g.y+g.h+ih+50);
			},
			setEvents : function(self){
				App.$window.resize(function(){self.onresize();});
				$controls.find('span').click(function(){
					var n = parseInt($(this).attr('data-ind'));
					if(n!=current){
						self.changeData(n);
					}					
				});
				$arrows.click(function(){
					var n = parseInt($(this).attr('data-ind'));
					self.changeData(current+n);
				});
				return this;
			}
		};
	})();

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
			this.setSize().scrollLabel().setEvents(this);
			skillmeter.init(this);
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
		}
	}
});