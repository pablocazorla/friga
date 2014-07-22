// jQuery Plugins
// pixelLoading
(function($){
	$.fn.pixelLoading = function(options){
		//Settings
		var setting = $.extend({
			precall : function(){},
			callback : function(){}
		}, options);		

		return this.each(function(){			
			var $this = $(this),
			$imgThumb = $this.find('img').eq(0),
			$img = $this.find('img').eq(1),
			absWidthThumb = $imgThumb.attr('width'),
			absHeightThumb = $imgThumb.attr('height'),
			absWidth = $img.attr('width'),
			absHeight = $img.attr('height'),
			mod = absWidth/absHeight,
			$canvasThumb = $('<canvas width="'+absWidthThumb+'" height="'+absHeightThumb+'"></canvas>'),
			$canvas = $('<canvas width="'+absWidth+'" height="'+absHeight+'"></canvas>');
			
			

		var ready = false,
			$result = $(),
			imageData = null,
			c = $canvas[0].getContext('2d'),
			cThumb = $canvasThumb[0].getContext('2d'),
			drawPixel = function(){
				if(!ready){
					cThumb.clearRect(0,0,absWidthThumb, absHeightThumb);
					cThumb.drawImage($imgThumb[0], 0, 0);
					imageData = cThumb.getImageData(0, 0, absWidthThumb, absHeightThumb);
					
					var l = imageData.data.length,
						posX = 0,
						posY = 0,
						wi = Math.ceil(absWidth/absWidthThumb);
					for(var i = 0;i < l;i += 4){
						rgb = 'rgb('+imageData.data[i]+','+imageData.data[i + 1]+','+imageData.data[i + 2]+')';
						c.fillStyle = rgb;
						c.fillRect(posX*wi,posY*wi,wi,wi);
						posX++;
						if(posX >= absWidthThumb){
							posX = 0;
							posY++;
						}
					}
					$result = $('<img class="pixel-loading-result" src="'+$canvas[0].toDataURL('image/png')+'" style="display:none"/>').appendTo($this).fadeIn(200);
				}
				$canvas.add($canvasThumb).remove();
			},
			showImg = function(alreadyCompleted){
				ready = true;
				if(!alreadyCompleted){
					$result.fadeOut(300);
				}else{
					$result.fadeOut(1000);
				}
				setting.callback();
			},
			setSize = function(){
				$this.height(Math.round($this.width()/mod));
			};

		if(!$img[0].complete){					
			$this.append($canvasThumb).append($canvas);
			if(!$imgThumb[0].complete){					
				$imgThumb.load(function(){
					drawPixel();
				});
			}else{
				drawPixel();
			}
			$img.load(function(){
				showImg(false);
			}).error(function(){

			});
		}else{
			showImg(true);
		}
		setSize();
		$(window).resize(setSize);
		setting.precall()
		});
	};
})(jQuery);


$(function() {
	// PCAZ
	PCAZ = {};
// PCAZ Extend
PCAZ.helper = (function(){
	return {
		isReady : function(selection){
			return (selection.length > 0);
		}
	}	
})();








});






