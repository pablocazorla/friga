SR.define(function(App){
	return {
		init : function(){
		
			this.$framePrev = $('.frame.current');
			//New Structure
			this.$frame = $('<div class="frame right"></div>');
			App.$shell.append(this.$frame);
			
			return this;
		},
		load : function(url,fromLeftOrRight){
			
			App.siteNavigation.close();
			var self = this,
				from = fromLeftOrRight || 'right',
				go = function(){
					window.location.href = url;
				};
			if(from == 'left'){this.$frame.removeClass('right').addClass('left');}
			App.graphLoader.show();

			var symb = '?';
			if(url.indexOf('?')!=-1){symb = '&';}

			$.ajax({
			  url : url + symb + 'async=1',
			  success : function(data){
				self.$frame.animate({'left':0},600,function(){
					self.$framePrev.remove();
					self.$frame.css('opacity','0').removeClass('right').removeClass('left').addClass('current').append(data).find('a').click(function(e){e.preventDefault();});
					App.graphLoader.hide();
					setTimeout(function(){
						self.$frame.addClass('animated-opacity').css('opacity','1');
					},100);
					setTimeout(go,1000);
				});
			  },		  
			  error : go		   
			});
			
		}
	}
});