SR.define(function(App) {
	return {
		shareLinks: {
			'facebook': {
				'url': 'https://www.facebook.com/sharer/sharer.php?u='
			},
			'twitter': {
				'url': 'https://twitter.com/home?status=',
				'descriptionSeparator': ':%20',
				'width': '635',
				'height': '430'
			},
			'google': {
				'url': 'https://plus.google.com/share?url=',
				'width': '560',
				'height': '580'
			},
			'pinterest': {
				'url': 'https://pinterest.com/pin/create/button/?url=',
				'width': '1000',
				'height': '600'
			}
		},
		init: function() {
			this.url = window.location.href;
			var self = this;
			$('a.share').click(function(e) {
				e.preventDefault();
				self.share($(this));
			});
		},
		share: function($a) {
			var data = $.parseJSON($.trim($a.attr('data-share').replace(/\'/g, '"')));
			if (data != null) {
				data = $.extend({
					'on': '',
					'media': '',
					'description': ''
				}, data);
				var on = data['on'],
					cfg = $.extend({
						'width': '600',
						'height': '360',
						'mediaSeparator': '&media=',
						'descriptionSeparator': '&description=',
						'title': 'Share'
					}, this.shareLinks[on]),
					urlShare,
					windowWidth = App.$window.width(),
					heightWidth = App.$window.height(),
					w = parseInt(cfg['width']),
					h = parseInt(cfg['height']);
				if (windowWidth < (w + 30)) {
					w = windowWidth - 30;
					cfg['width'] = w;
				}
				if (heightWidth < (h + 60)) {
					h = heightWidth - 60;
					cfg['height'] = h;
				}
				var left = Math.round((windowWidth - w) / 2),
					top = Math.round((heightWidth - h) / 2);

				data['description'] = encodeURI(data['description'].replace(/\|/g, "'"));

				switch (on) {
					case 'pinterest':
						urlShare = cfg['url'] + this.url + cfg['mediaSeparator'] + data['media'] + cfg['descriptionSeparator'] + data['description'];
						break;
					case 'twitter':
						urlShare = cfg['url'] + data['description'] + cfg['descriptionSeparator'] + this.url;
						break;
					default:
						urlShare = cfg['url'] + this.url;
				};
				window.open(urlShare, cfg['title'], 'width=' + cfg['width'] + ', height=' + cfg['height'] + ',left=' + left + ',top=' + top);
			}
		}
	}
});