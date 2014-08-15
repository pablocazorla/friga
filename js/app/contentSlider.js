SR.define(function(App){
	return {
		init : function(){
			$('.content .slider').each(function(){
				var $slider = $(this).addClass('rendered'),
					$imgs = $slider.find('img'),
					length = $imgs.length,
					current = -1, postCurrent = 0,
					$sliderContent = $('<div class="slider-content"></div>'),
					$controls = $('<div class="slider-controls"></div>'),
					$controlsSpans = $(),
					showing = false,
					$arrowLeft = $('<div class="slider-arrow to-left"><span></span></div>'),
					$arrowRight = $('<div class="slider-arrow to-right"><span></span></div>'),
					calculateHeight = function(){
						$sliderContent.css('height',$imgs.eq(current).height()+'px');
					},
					change = function(num,autostop){
						if(num != current && !showing){
							if(autostop && timer != null){
								clearInterval(timer);timer = null;
							}
							showing = true;
							if(num < 0){num = length - 1;}
							if(num >= length){num = 0;}
							postCurrent = current;
							current = num;
							$imgs.eq(current).addClass('current');
							$imgs.eq(postCurrent).removeClass('current').addClass('post-current');
							$controlsSpans.eq(current).addClass('current');
							$controlsSpans.eq(postCurrent).removeClass('current');
							calculateHeight();
							setTimeout(function(){
								$imgs.removeClass('post-current');
								showing = false;
							},790);
						}
					},				
					duration = 7000,
					timer = setInterval(function(){
						change(current+1,false);
					},duration);

				$slider.html('').append($sliderContent.append($imgs)).append($controls).append($arrowLeft).append($arrowRight);		

				for(var i = 0;i< length;i++){
					$('<span title="'+$imgs.eq(i).attr('alt')+'" data-ind="'+i+'"></span>').appendTo($controls).click(function(){
						change(parseInt($(this).attr('data-ind')),true);
					});
				}
				$controlsSpans = $controls.find('span');
				$arrowLeft.click(function(){change(current-1,true);});
				$arrowRight.click(function(){change(current+1,true);});
				change(0);
				App.$window.resize(calculateHeight);
			});
		}
	}
});