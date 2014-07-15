$(function() {

// Common stores
var $window = $(window),
	$body = $('body'),
	$shell = $('#shell');

var PCAZ = {};

PCAZ.siteNavigation = (function(){

	$('.to-open-site-navigation').click(function(e){
		e.preventDefault();
		PCAZ.siteNavigation.toggle();
	});


	return {
		$siteNavigation : $('#site-navigation'),
		statusOpen : $body.hasClass('open-site-navigation'),
		open : function(){
			console.log('OPEN');
			$body.addClass('open-site-navigation');
			this.statusOpen = true;
		},
		close : function(){
			console.log('OPEN');
			$body.removeClass('open-site-navigation');
			this.statusOpen = false;
		},
		toggle : function(){
			if(this.statusOpen){
				this.close();
			}else{
				this.open();
			}
		}
	}
})();










});






