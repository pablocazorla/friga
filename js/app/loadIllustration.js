SR.define(function(App){
	if(typeof ltIE9 == 'undefined'){ltIE9 = false;}
	return {
		init : function(){
			if(!ltIE9){
				this.$framePrev = $('.frame.current');
				//New Structure
				this.$frame = $('<div class="frame right"></div>');
					this.$articleImg = $('<article class="sub-frame illustration-post-large-image"></article>');
						this.$figure = $('<figure></figure>');
							this.$img = $('<img src=""/>');
							this.$imgSquared = $('<img src="" class="squared"/>');			
				this.$canvas = $('<canvas width="1880" height="1880" style="display:none;position:absolute;top:0;left:0;z-index:4000"></canvas>');

				this.$framePrev.append(this.$canvas);
				this.$figure.append(this.$img).append(this.$imgSquared);
				this.$articleImg.append(this.$figure);
				this.$frame.append(this.$articleImg).append(this.$articleContent);
				App.$shell.append(this.$frame);

				this.c = this.$canvas[0].getContext('2d');
			}
			return this;
		},
		load : function(url,urlImgBig,imgThumb,fromLeftOrRight){
			if(!ltIE9){
				App.siteNavigation.close();
				this.$imgSquared.attr('src',this._draw(imgThumb));
				var self = this,
					from = fromLeftOrRight || 'right',
					go = function(){
						window.location.href = url;
					};
				if(from == 'left'){this.$frame.removeClass('right').addClass('left');}

				App.graphLoader.show();
				this.$frame.animate({'left':0},600,function(){
					self.$framePrev.remove();
					$.ajax({
					  url : url + '?async=1',
					  success : function(data){
					  	self.$frame.append(data).removeClass('right').removeClass('left').addClass('current');
					  	self.$frame.find('a').click(function(e){e.preventDefault();});			  	
					  	self.$img.attr('src',urlImgBig);
					  	self.$img.load(function(){
					  		App.graphLoader.hide();
					  		self.$imgSquared.fadeOut(600,function(){
					  			setTimeout(go,500);
					  		});
					  	}).error(go);
					  	setTimeout(function(){
					  		self.$frame.find('.summary-content').addClass('visible');
					  	},100);			  	
					  },
					  error : go			   
					});
				});
			}else{
				window.location.href = url;
			}
			return this;
		},
		_draw : function(imgThumb){
			if(!ltIE9){
				this.c.clearRect(0,0,1880, 1880);
				this.c.scale(.1,.1);
				this.c.drawImage(imgThumb, 0, 0);
				this.c.setTransform(1, 0, 0, 1, 0, 0);

				var imageData = this.c.getImageData(0, 0, 47, 47);
					l = imageData.data.length,
					posX = 0,
					posY = 0,
					wi = Math.ceil(1880/47);
				for(var i = 0;i < l;i += 4){
					rgb = 'rgb('+imageData.data[i]+','+imageData.data[i + 1]+','+imageData.data[i + 2]+')';
					this.c.fillStyle = rgb;
					this.c.fillRect(posX*wi,posY*wi,wi,wi);
					posX++;
					if(posX >= 47){
						posX = 0;
						posY++;
					}
				}
				return this.$canvas[0].toDataURL('image/png');
			}
		}
	}
});