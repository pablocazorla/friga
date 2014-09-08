SR.define(function(App) {
	return {
		init: function() {
			$('.sidebar .widget-container a').click(function(e) {
				e.preventDefault();
				var url = $(this).attr('href');
				App.loadPage.load(url);
			});
			this.ajaxSearch();
		},
		ajaxSearch: function() {
			//?s=krita
			var $input = $('.search-field').val(''),
				$submit = $('.search-submit'),
				send = function() {
					var v = $input.val();
					if (v != '') {
						var url = baseURL + '?s=' + v.replace(/ /g, '+');
						App.loadPage.load(url);
					}
				};

			$submit.click(function(e) {
				e.preventDefault();
				send();
			});
		}
	}
});