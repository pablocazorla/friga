SR.define(function(App){
	return {		
		init : function(){
			this.$siteNavigation = $('#site-navigation'),
			this.statusOpen = App.$body.hasClass('open-site-navigation'),
			this.statusEnabled = true;	
			this.setEvents(this).setPageLoading();
			return this;
		},
		open : function(){
			if(this.statusEnabled && !this.statusOpen){
				App.$body.addClass('open-site-navigation');
				this.statusOpen = true;		
			}
			return this;			
		},
		close : function(){
			if(this.statusEnabled && this.statusOpen){
				App.$body.removeClass('open-site-navigation');
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
			App.$window.resize(function(){self.close()});
			return this;
		},
		setPageLoading : function(){
			this.$siteNavigation.find('a').click(function(e){
				e.preventDefault();
				var url = $(this).attr('href');
				App.loadPage.load(url);
			});
			return this;
		}
	}
});