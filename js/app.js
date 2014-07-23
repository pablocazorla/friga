pc = {};

pc.siteNavigation = {		
	init : function(){
		this.$siteNavigation = $('#site-navigation'),
		this.statusOpen = pc.$body.hasClass('open-site-navigation'),
		this.statusEnabled = true;	
		this.setEvents(this);
		return this;
	},
	open : function(){
		if(this.statusEnabled && !this.statusOpen){
			pc.$body.addClass('open-site-navigation');
			this.statusOpen = true;		
		}
		return this;			
	},
	close : function(){
		if(this.statusEnabled && this.statusOpen){
			pc.$body.removeClass('open-site-navigation');
			this.statusOpen = false;
		}
		return this;
	},
	toggle : function(){
		if(this.statusOpen){
			this.close();
		}else{
			this.open();
		}
		return this;
	},
	enabled : function(){
		this.statusEnabled = true;
		return this;
	},
	disabled : function(){
		this.statusEnabled = false;
		return this;
	},
	setEvents : function(self){
		$('.to-open-site-navigation').click(function(e){
			e.preventDefault();
			self.toggle();
		});
		pc.$window.resize(function(){self.close()});
	}
};
pc.niceScroll = {		
	init : function(){
		this.ready = ($.fn.niceScroll) ? true : false;
		this.$selection = $();
		return this;
	},
	set : function(selection,cfg){
		if(this.ready){
			var sett = cfg || {};
			$(selection).niceScroll(cfg);
			this.$selection = this.$selection.add($(selection));
		}				
		return this;
	},
	remove : function(){
		if(this.ready){
			this.$selection.getNiceScroll().remove();
		}
		return this;
	}
};
pc.galleryIllustration = {
	columns : 4,
	current : 'all',
	enabled : true,
	init : function(){
		this.$gallery = $('.gallery').not('.gridding').addClass('gridding');
		this.$figures = this.$gallery.find('figure');
		this.$a = $('.gallery-menu a');

		this.draw().setEvents(this);					
		return this;
	},
	draw : function(){			
		var posX = 0,
			posY = 0,
			stepX = 100/this.columns, // %
			stepY = Math.round(this.$gallery.width()/this.columns); // px
		this.$figures.not('.hidden').each(function(){
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
		this.$gallery.height(posY + stepY);		
		return this;
	},
	select : function(cl,$aLink){
		if(cl != this.current && this.enabled){
			this.enabled = false;
			
			if(cl == 'all'){
				this.$figures.removeClass('hidden');
			}else{
				if(this.current == 'all'){
					this.$figures.not('.'+cl).addClass('hidden');
				}else{
					this.$figures.filter('.'+this.current).addClass('hidden');
					this.$figures.filter('.'+cl).removeClass('hidden');
				}
			}						
			this.current = cl;
			var self = this;
			setTimeout(function(){
				self.enabled = true;
			},600);
			this.$a.parent().removeClass('current');
			$aLink.parent().addClass('current');
		}
		this.draw();
		return this;
	},
	setEvents : function(self){		
		pc.$window.resize(function(){self.draw();});
		this.$a.click(function(e){
			e.preventDefault();
			var $this = $(this),
				cl = $this.text().toLowerCase().replace(/ /g,'-');
			if(cl.indexOf('all-')!=-1){cl = 'all';}
			self.select(cl,$this);
		});
	}
};
pc.graphLoader = {
	ready : false,
	duration : 300,
	init : function(){
		this.$L = $('#pc-loading-graph');
		this.ready = true;
		return this;
	},
	show : function(){
		if(this.ready){
			this.$L.fadeIn(this.duration);
		}
		return this;
	},
	hide : function(){
		if(this.ready){
			this.$L.fadeOut(this.duration);
		}
		return this;
	}
};
pc.loadIllustrationPost = {
	init : function(){
		
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
		pc.$shell.append(this.$frame);

		this.c = this.$canvas[0].getContext('2d');
		return this;
	},
	load : function(url,urlImgBig,imgThumb,fromLeftOrRight){
		this.$imgSquared.attr('src',this._draw(imgThumb));
		var self = this,
			from = fromLeftOrRight || 'right',
			go = function(){
				window.location.href = url;
			};
		if(from == 'left'){this.$frame.removeClass('right').addClass('left');}

		pc.graphLoader.show();
		this.$frame.animate({'left':0},600,function(){
			self.$framePrev.remove();
			$.ajax({
			  url : url + '?async=1',
			  success : function(data){
			  	self.$frame.append(data).removeClass('right').removeClass('left').addClass('current');
			  	self.$frame.find('a').click(function(e){e.preventDefault();});			  	
			  	self.$img.attr('src',urlImgBig);
			  	self.$img.load(function(){
			  		pc.graphLoader.hide();
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
		return this;
	},
	_draw : function(imgThumb){
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
};
pc.loadPage = {
	init : function(){
		this.$framePrev = $('.frame.current');
		//New Structure
		this.$frame = $('<div class="frame right"></div>');
		pc.$shell.append(this.$frame);
		return this;
	},
	load : function(url,fromLeftOrRight){
		var self = this,
			from = fromLeftOrRight || 'right',
			go = function(){
				window.location.href = url;
			};
		if(from == 'left'){this.$frame.removeClass('right').addClass('left');}
		pc.graphLoader.show();
		$.ajax({
		  url : url + '?async=1',
		  success : function(data){
			self.$frame.animate({'left':0},600,function(){
				self.$framePrev.remove();
				self.$frame.css('opacity','0').removeClass('right').removeClass('left').addClass('current').append(data).find('a').click(function(e){e.preventDefault();});
				pc.graphLoader.hide();
				setTimeout(function(){
					self.$frame.addClass('animated-opacity').css('opacity','1');
				},100);
				setTimeout(go,1000);
			});
		  	
		  	 

		  },		  
		  error : go		   
		});
	}
};

pc.illustrationPost = {
	marginTop : 350,
	fTop : 0,
	wpST : 0,
	difHeight : 0,
	r : 1,
	op : 1,
	settedOp : false,
	ready : false,
	init : function(){
		this.$wp = $('.sub-frame.illustration-post');
		this.$figure = $('.illustration-post-large-image figure');
		this.$wpSummary = this.$wp.find('.summary');
		this.$wpSummaryContent = this.$wpSummary.find('.summary-content');
		this.$toOpacity = this.$wpSummaryContent.add($('.illustration-post-nav').addClass('visible'));
		this.$wp.scrollTop(this.wpST);
		this.setEvents(this);
		return this;
	},
	calculatePosition : function(){
		this.wpST = this.$wp.scrollTop();
		this.fTop = Math.round((this.wpST*this.r - this.marginTop));
		this.fTop = (this.fTop < 0) ? 0 : this.fTop;
		this.op = 1 - (this.wpST*1.2/this.marginTop);
		this.op = (this.op < 0) ? 0 : this.op;
		
		//this.fTop = (this.difHeight < this.fTop) ? this.difHeight : this.fTop;

		if(this.difHeight < this.fTop){
			this.fTop = this.difHeight;
			if(!this.settedOp){
				this.$toOpacity.css('opacity','1');
				this.settedOp = true;
			}			
		}else{
			this.settedOp = false;
			this.$toOpacity.css('opacity',this.op);
		}


		this.$figure.css('top','-'+this.fTop+'px');
		return this;
	},
	calculateSize : function(){
		if(this.ready){
			this.difHeight = this.$figure.height() - pc.$window.height();
			this.marginTop = (this.difHeight > 0) ? Math.round(this.$wpSummaryContent.height() * .8 * this.r) : 10;		
			this.$wpSummary.height(this.$figure.height() + this.marginTop);		
			this.calculatePosition();
		}
		return this;
	},		
	setEvents : function(self){
		this.$wp.scroll(function(){self.calculatePosition();});
		pc.$window.resize(function(){self.calculateSize();});
		var $img = this.$figure.find('img').eq(0);
		if($img[0].complete){
			this.ready = true;this.calculateSize();
		}else{
			$img.load(function(){self.ready = true;self.calculateSize();});
		}		
		return this;
	}
};
pc.commentValidation = {
	init : function(){
		this.$form = $('#commentform');
		this.$statusMessage = $('.statusMessage').text('');
		this.$fieldsets = this.$form.find('fieldset.validate');
		this.$fieldsets.find('input,textarea').val('');
		this.setEvents(this);
	},
	validate : function(){
		var v = true;
		this.$fieldsets.each(function(){
			var $this = $(this).removeClass('error'),
				$i = $this.find('input,textarea'),
				min = $this.attr('data-min'),			
				val = $i.val();

			if(val.length < 3){
				v = false;
				$this.addClass('error');
				$i.focus();
			}else{
				if($this.hasClass('email')){
					if(val.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1){
						v = false;
						$this.addClass('error');
						$i.focus();
					}
				}
			}
		});
		return v;
	},
	setEvents : function(self){

		$('#submit').click(function(e){
			e.preventDefault();
			var v = self.validate();
			if(v){
				self.submitForm();
			}
		});
		$('#clearFields').click(function(e){
			e.preventDefault();
			self.$fieldsets.removeClass('error').find('input,textarea').val('').eq(0).focus();
		});
	},
	submitForm : function(){
		var self = this,
			data = this.$form.serialize(),
			url = this.$form.attr('action');

		this.$statusMessage.text('Processing...');
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			error: function(XMLHttpRequest, textStatus, errorThrown){
				self.$statusMessage.text('Error.');
			},
			success: function(data, textStatus){
				if(data=="success"){
					self.$statusMessage.text('Thanks for your comment.');
				}else{
					self.$statusMessage.text('Please wait a while before posting your next comment');
				}
			}
		});
		return false;
	}
};

pc.init = function(){
	// Common stores
	pc.$window = $(window);
	pc.$body = $('body');
	pc.$shell = $('#shell');

	// Detect current page
	var pageID = $('.page').eq(0).attr('data-id') || '',
		initPerPage = function(a,c){			
			if(a==pageID) c();						
		};
	// ----------------------------------------------------
	// All pages	
	pc.niceScroll.init().set('.niceScroll,.nice-scroll');
	pc.graphLoader.init();
	pc.loadPage.init();
	pc.siteNavigation.init();

	// Specific page
	initPerPage(
		'illustration-list'
		,function(){
			pc.galleryIllustration.init();
			pc.loadIllustrationPost.init();
			$('.gallery figure a').click(function(e){
				e.preventDefault();
				var $this = $(this),
					url = $this.attr('href'),
					urlImgBig = $this.attr('data-imgbig'),
					$img = $this.find('img');
				pc.loadIllustrationPost.load(url,urlImgBig,$img[0],'right');
			});
		}
	);
	initPerPage(
		'illustration-post'
		,function(){
			pc.illustrationPost.init();
			pc.loadIllustrationPost.init();
			pc.commentValidation.init();
			$('a.next-illustration,a.prev-illustration').click(function(e){
				e.preventDefault();
				var $this = $(this),
					direction = ($this.hasClass('prev-illustration')) ? 'left' : 'right';
					url = $this.attr('href'),
					urlImgBig = $this.attr('data-imgbig'),
					$img = $this.find('img');
				pc.loadIllustrationPost.load(url,urlImgBig,$img[0],direction);
			});

			$('a.back-to-illustrations').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				pc.loadPage.load(url,'left');
			});
		}
	);










};
$('document').ready(function(){pc.init();});