pc = {};

pc.siteNavigation = {		
	init : function(){
		this.$siteNavigation = $('#site-navigation'),
		this.statusOpen = pc.$body.hasClass('open-site-navigation'),
		this.statusEnabled = true;	
		this.setEvents(this).setPageLoading();
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
		return this;
	},
	setPageLoading : function(){
		this.$siteNavigation.find('a').click(function(e){
			e.preventDefault();
			var url = $(this).attr('href');
			pc.loadPage.load(url);
		});
		return this;
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
		pc.siteNavigation.close();
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
		pc.siteNavigation.close();
		var self = this,
			from = fromLeftOrRight || 'right',
			go = function(){
				window.location.href = url;
			};
		if(from == 'left'){this.$frame.removeClass('right').addClass('left');}
		pc.graphLoader.show();

		var symb = '?';
		if(url.indexOf('?')!=-1){symb = '&';}

		$.ajax({
		  url : url + symb + 'async=1',
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
		this.$postNavigation = $('.post-navigation');
		this.$toOpacity = this.$wpSummaryContent.add(this.$postNavigation);
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
		

		if(this.difHeight < this.fTop){
			this.fTop = this.difHeight;
			if(!this.settedOp){
				this.$toOpacity.css('opacity','1');
				this.settedOp = true;
				this.$postNavigation.css('right','0');
			}			
		}else{
			this.settedOp = false;
			this.$toOpacity.css('opacity',this.op);
			if(this.op == 0){
				this.$postNavigation.css('right','-60px');
			}
			if(this.op == 1){
				this.$postNavigation.css('right','0');
			}
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
		this.$statusMessage = $('#statusMessage').html('');
		this.$fieldsets = this.$form.find('fieldset.validate');
		this.$fieldsets.find('input,textarea').val('');
		this.$i = this.$form.find('input[type=text],input[type=email],textarea').removeAttr('disabled');
		this.$adding = $('#adding-comment');
		this.$addingError = $('#adding-comment-error');
		this.$ul = $('#commentlist');
		this.$ulTitle = $('#commentlist-title');
		this.numComments = this.$ul.find('>li').length;
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
		$('.link-to-comments').click(function(e){
			e.preventDefault();
			var top = $('#comments-panel').offset().top;
			$('.sub-frame').eq(0).animate({'scrollTop':top+'px'},Math.round(top/3),function(){
				setTimeout(function(){window.location.hash = '#comments-panel';},1000);
			});
		});

		return this
	},
	submitForm : function(){
		var self = this,
			data = this.$form.serialize(),
			url = this.$form.attr('action');

		this.$i.attr('disabled','true');
		this.$addingError.hide();
		this.$adding.fadeIn(300,function(){
			$.ajax({
				type: 'post',
				url: url,
				data: data,
				error: function(){
					self.$adding.hide();
					self.$addingError.show();
					self.$i.removeAttr('disabled');
				},
				success: function(data){
					$(data).find('#commentlist li').last().hide().appendTo(self.$ul).fadeIn(600);
					self.$adding.fadeOut(300);
					self.$i.removeAttr('disabled').filter('textarea').val('').focus();

					self.numComments++;
					var plural = (self.numComments > 1) ? 's':'';
					self.$ulTitle.html(self.numComments+' comment'+plural);
				}
			});
		});
		return false;
	}
};

pc.socialComment = {
	init : function(imgToLoad){
		this.$commentTabs = $('#comment-tabs');
		if(this.$commentTabs.length > 0){
			this.tabs().preRender();
			var self = this,
				itl = imgToLoad || '';
			pc.waitImgsForLoad(itl,function(){
				self.loadPlugins();
			});
		}
		return this;
	},
	tabs : function(){
		//tabs
		this.$commentTabs.each(function(){
			var $this = $(this),
				$controls = $this.find('.controls'),
				$a = $controls.find('a'),
				$contentTabs = $this.find('.content-tab'),
				current = '',
				select = function($link){
					var i = $link.attr('href');
					if(i != current){
						current = i;
						$a.parent().removeClass('active');
						$link.parent().addClass('active');
						$controls.removeClass('gplus-tab facebook-tab wordpress-tab').addClass(current.substr(1));
						$contentTabs.hide();
						$(current).show();
					}
				};
			select($a.eq(0));
			$a.click(function(e){
				e.preventDefault();
				select($(this));
			});
		});
		return this;
	},
	preRender : function(){
		var widthComments = window.comment_tab_width || 750,
			url = window.location.href;

		//GPLUS
		$('#gplus-tab').html('<div class="g-comments" data-width="'+widthComments+'" data-href="'+url+'" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD">Loading Google+ Comments ...</div>');

		//FACEBOOK
    	$('#fb-comments').html('<div class="fb-comments" data-width="'+widthComments+'" data-href="'+url+'" data-num-posts="20" data-colorscheme="light" data-mobile="auto"></div>');

		return this;
	},
	loadPlugins : function(){
		//GPLUS
    	$.getScript('//apis.google.com/js/plusone.js?callback=gpcb');

    	//FACEBOOK
		$.getScript('//connect.facebook.net/en_US/all.js#xfbml=1',function(){
			FB.init();
			FB.XFBML.parse();
		});
    	
    	return this;
	}
};
pc.waitImgsForLoad = function(selection,callback){
	var $selection = $(selection),
		numTotal = $selection.length,
		count = 0,
		ready = false,
		detectLoaded = function(){
			count++;
			if(count>=numTotal && !ready){
				ready = true;
				callback();
			}
		}
	$selection.each(function(){
		var $img = $(this);
		if($img[0].complete){			
			detectLoaded();
		}else{
			$img.load(detectLoaded).error(detectLoaded);
		}
	});
	detectLoaded();
};

pc.sidebar = {
	init : function(){
		$('.sidebar .widget-container a').click(function(e){
			e.preventDefault();
			var url = $(this).attr('href');
			pc.loadPage.load(url);
		});
		this.ajaxSearch();
	},
	ajaxSearch : function(){
		//?s=krita
		var $input = $('.search-field').val(''),
			$submit = $('.search-submit'),
			send = function(){
				var v = $input.val();
				if(v != ''){
					var url = baseURL + '?s=' + v.replace(/ /g,'+');
					pc.loadPage.load(url);
				}
			};

		$submit.click(function(e){
			e.preventDefault();
			send();
		});
	}
};
https://www.facebook.com/sharer/sharer.php?u=http://www.google.com
pc.prettyprint = {
	init : function(){
		var somePre = false;
		$('pre').not('.no-print').each(function(){
			var $this = $(this).addClass('prettyprint');
			$this.text($this.html());
			somePre = true;
		});
		if(somePre){$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');}
	}
};
pc.socialShare = {
	shareLinks : {
		'facebook': {
			'url':'https://www.facebook.com/sharer/sharer.php?u='
		},
		'twitter': {
			'url':'https://twitter.com/home?status=',
			'descriptionSeparator':':%20',
			'width':'635',
			'height':'430'
		},					
		'google': {
			'url':'https://plus.google.com/share?url=',
			'width':'560',
			'height':'580'
		},
		'pinterest' : {
			'url':'https://pinterest.com/pin/create/button/?url=',
			'width':'1000',
			'height':'600'			
		}				
	},
	init : function(){
		this.url = window.location.href;			
		var self = this;
		$('a.share').click(function(e){
			e.preventDefault();
			self.share($(this));
		});			
	},
	share : function($a){
		var data = $.parseJSON($.trim($a.attr('data-share').replace(/\'/g,'"')));
		if(data != null){
			 data = $.extend({
				'on':'',
				'media':'',
				'description':''
			 },data);			
			var on = data['on'],
				cfg = $.extend({
					'width':'600',
					'height':'360',
					'mediaSeparator':'&media=',
					'descriptionSeparator':'&description=',
					'title':'Share'
				},this.shareLinks[on]), urlShare,
				windowWidth = pc.$window.width(),
				heightWidth = pc.$window.height(),
				w = parseInt(cfg['width']),
				h = parseInt(cfg['height']);
			if(windowWidth < (w+30)){w = windowWidth-30;cfg['width']=w;}
			if(heightWidth < (h+60)){h = heightWidth-60;cfg['height']=h;}
			var left = Math.round((windowWidth - w)/2),
				top = Math.round((heightWidth - h)/2);

			data['description'] = encodeURI(data['description'].replace(/\|/g,"'"));

			switch(on){
				case 'pinterest':
					urlShare = cfg['url']+this.url+cfg['mediaSeparator']+data['media']+cfg['descriptionSeparator']+data['description'];
					break;
				case 'twitter':
					urlShare = cfg['url']+data['description']+cfg['descriptionSeparator']+this.url;
					break;
				default:
					urlShare = cfg['url']+this.url;
			};
			window.open(urlShare,cfg['title'],'width='+cfg['width']+', height='+cfg['height']+',left='+left+',top='+top);
		}
	}
};

pc.init = function(){
	window.$ = jQuery;
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
	pc.socialShare.init();

	$('.post-navigation').addClass('visible');

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
			pc.socialComment.init('.illustration-post-large-image img,.post-navigation img,.content img');
			$('a.next-post,a.prev-post').click(function(e){
				e.preventDefault();
				var $this = $(this),
					direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href'),
					urlImgBig = $this.attr('data-imgbig'),
					$img = $this.find('img');
				pc.loadIllustrationPost.load(url,urlImgBig,$img[0],direction);
			});

			$('a.back-to-grid').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				pc.loadPage.load(url,'left');
			});
		}
	);
	initPerPage(
		'blog-list'
		,function(){
			pc.sidebar.init();
			$('a.alink,.alink-content a,.blog-list-nav a').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				pc.loadPage.load(url);
			});
			$('a.next-post,a.prev-post').click(function(e){
				e.preventDefault();
				var $this = $(this),
					direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href');
				pc.loadPage.load(url,direction);
			});
		}
	);
	initPerPage(
		'blog-post'
		,function(){
			pc.sidebar.init();
			pc.commentValidation.init();
			pc.socialComment.init('.content img');
			pc.prettyprint.init();
			$('a.next-post,a.prev-post').click(function(e){
				e.preventDefault();
				var $this = $(this),
					direction = ($this.hasClass('prev-post')) ? 'left' : 'right';
					url = $this.attr('href');
				pc.loadPage.load(url,direction);
			});
			$('a.back-to-grid').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				pc.loadPage.load(url,'left');
			});
		}
	);










};
jQuery('document').ready(function(){pc.init();});