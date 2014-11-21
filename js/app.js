// App
;
(function() {
	var browser = {},
		uAgent = navigator.userAgent || navigator.vendor || window.opera,
		ua = uAgent.toLowerCase();
	browser.mozilla = /mozilla/.test(ua) && !/webkit/.test(ua);
	browser.webkit = /webkit/.test(ua);
	browser.opera = /opera/.test(ua);
	browser.msie = /msie/.test(ua);
	browser.ios = (ua.match(/ipad/i) || ua.match(/iphone/i) || ua.match(/ipod/i));
	browser.android = ua.match(/android/i);

	if (typeof pageID === 'undefined') {
		pageID = 'all';
	}
	var PC = {};
	PC.tryMobile = function() {
		if (browser.ios) {
			PC.$body.addClass('mobile').addClass('mobile-ios');
		}
		if (browser.android) {
			PC.$body.addClass('mobile').addClass('mobile-android');
		}
	};
	PC.header = function() {
		var $header = $('#site-navigation'),
			$sidebar = $('.aside-sidebar'),
			fixed = false,
			open = false,
			currentScroll = PC.$scroll.scrollTop(),
			prevScroll = PC.$scroll.scrollTop() - 10,
			disableMenu = false,
			setStatus = function() {
				currentScroll = PC.$scroll.scrollTop();
				if (prevScroll < currentScroll) { // Down
					if (open) {
						open = false;
						$header.removeClass('open');
						$sidebar.addClass('close');
					}
					if (currentScroll > 70 && !fixed) {
						fixed = true;
						$header.addClass('fixed')
						setTimeout(function() {
							$header.addClass('animated');
						}, 50);
					}
					if (currentScroll > 70 && !disableMenu) {
						disableMenu = true;
						$header.addClass('disableMenu');
					}
				} else if (prevScroll > currentScroll) { // Up
					if (!open) {
						open = true;
						$header.addClass('open');
						$sidebar.removeClass('close');
					}
					if (currentScroll < 2 && fixed) {
						fixed = false;
						$header.removeClass('fixed').removeClass('animated');
					}
					if (disableMenu) {
						disableMenu = false;
						$header.removeClass('disableMenu');
					}
				}



				prevScroll = currentScroll;
			}
		if (currentScroll > 70) {
			$sidebar.addClass('close');
		}
		setStatus();
		PC.$window.scroll(setStatus);
	};
	PC.contentSlider = function() {
		$('.content .slider').each(function() {
			var $slider = $(this).addClass('rendered'),
				$imgs = $slider.find('img'),
				length = $imgs.length,
				current = -1,
				postCurrent = 0,
				$sliderContent = $('<div class="slider-content"></div>'),
				$controls = $('<div class="slider-controls"></div>'),
				$controlsSpans = $(),
				showing = false,
				$arrowLeft = $('<div class="slider-arrow to-left"><span></span></div>'),
				$arrowRight = $('<div class="slider-arrow to-right"><span></span></div>'),
				calculateHeight = function() {
					$sliderContent.css('height', $imgs.eq(current).height() + 'px');
				},
				change = function(num, autostop) {
					if (num != current && !showing) {
						if (autostop && timer != null) {
							clearInterval(timer);
							timer = null;
						}
						showing = true;
						if (num < 0) {
							num = length - 1;
						}
						if (num >= length) {
							num = 0;
						}
						postCurrent = current;
						current = num;
						$imgs.eq(current).addClass('current');
						$imgs.eq(postCurrent).removeClass('current').addClass('post-current');
						$controlsSpans.eq(current).addClass('current');
						$controlsSpans.eq(postCurrent).removeClass('current');
						calculateHeight();
						setTimeout(function() {
							$imgs.removeClass('post-current');
							showing = false;
						}, 790);
					}
				},
				duration = 7000,
				timer = setInterval(function() {
					change(current + 1, false);
				}, duration);

			$slider.html('').append($sliderContent.append($imgs)).append($controls).append($arrowLeft).append($arrowRight);

			for (var i = 0; i < length; i++) {
				$('<span title="' + $imgs.eq(i).attr('alt') + '" data-ind="' + i + '"></span>').appendTo($controls).click(function() {
					change(parseInt($(this).attr('data-ind')), true);
				});
			}
			$controlsSpans = $controls.find('span');
			$arrowLeft.click(function() {
				change(current - 1, true);
			});
			$arrowRight.click(function() {
				change(current + 1, true);
			});
			change(0);
			PC.$window.resize(calculateHeight);
		});
	};
	PC.waitImgsForLoad = function(selection, callback, notError) {
		var ne = notError || false,
			$selection = $(selection),
			numTotal = $selection.length,
			count = 0,
			ready = false,
			detectLoaded = function() {
				count++;
				if (count >= numTotal && !ready) {
					ready = true;
					callback();
				}
			}
		if (numTotal > 0) {
			$selection.each(function() {
				var $img = $(this);
				if ($img[0].complete) {
					detectLoaded();
				} else {
					$img.load(function() {
						detectLoaded();
					});
					if (!ne) {
						$img.error(detectLoaded);
					}
				}
			});
		} else {
			callback();
		}
	};
	PC.nicescroll = function() {
		var ready = ($.fn.niceScroll) ? true : false;
		if (ready) {
			PC.$html.niceScroll({
				cursoropacitymin: .5,
				cursorcolor: "#999",
				cursorborder: "none",
				cursorborderradius: "1px",
				cursorfixedheight: 100
			});
		} else {
			PC.$html.css('overflow', 'auto');
		}
	};
	PC.home = function() {
		PC.$html.scrollTop(0);

		var modVideo = 846 / 476,
			$presentation = $('#home-presentation'),
			$content = $('#home-presentation-content'),
			$videocontainer = $('#home-presentation-videocontainer'),
			$text = $('#home-presentation-text'),
			$textWrap = $('#home-presentation-text-wrap'),
			height = 1000,
			setSize = function() {
				height = PC.$window.height() - 65;
				$presentation.height(height);
				var widthWin = $presentation.width(),
					modWin = widthWin / height,
					widthVideo = '100%',
					leftVideo = '0';
				if (modWin < modVideo) {
					var w = (height * modVideo);
					widthVideo = w + 'px';
					leftVideo = -.5 * (w - widthWin) + 'px';
				}
				$videocontainer.css({
					width: widthVideo,
					left: leftVideo
				});

				var textHeight = $textWrap.height();
				$text.css({
					'top': (.5 * (height - textHeight)) + 'px'
				});
			},
			setScroll = function() {
				var scr = (PC.$scroll.scrollTop() - 60) * .5;
				scr = (scr > height) ? height : scr;
				$content.css('top', scr + 'px');
			};
		setSize();
		setScroll();

		PC.$window.resize(setSize).scroll(setScroll);

		$textWrap.animate({
			opacity: 1
		}, 600);

		$('#goto-last-work').click(function(e) {
			e.preventDefault();

			var hr = $(this).attr('href'),
				sc = $(hr).offset().top;
			$('html,body').animate({
				'scrollTop': sc + 'px'
			}, 800);
		});
	};
	PC.illustrationList = function() {
		var columns = 4,
			current = 'all',
			enabled = true,
			$gallery = $('.gallery').not('.gridding').addClass('gridding'),
			$figures = $gallery.find('figure'),
			$a = $('.gallery-menu a'),
			loadImages = function() {
				var $images = $('.illustration-thumb-img'),
					length = $images.length,
					current = 0,
					setScr = function() {

						if (current < length) {
							var $i = $images.eq(current),
								s = $i.attr('srcwait');
							$i.attr('src', s);
						}
					},
					loadNext = function($i) {
						if ($i !== null) {
							$i.css('opacity', '1');
						}
						++current;
						setScr();
					};
				$images.load(function() {
					loadNext($(this));
				}).error(function() {
					loadNext(null);
				});
				setScr();
			},
			draw = function() {
				var windowWidth = PC.$window.width();
				columns = 4;
				if (windowWidth < 1400) {
					columns = 3;
				}
				if (windowWidth < 820) {
					columns = 2;
				}
				if (windowWidth < 500) {
					columns = 1;
				}
				var posX = 0,
					posY = 0,
					stepX = 100 / columns, // %
					stepY = Math.round($gallery.width() / columns); // px
				$figures.not('.hidden').each(function() {
					$(this).css({
						'width': stepX + '%',
						'height': stepY + 'px',
						'left': posX + '%',
						'top': posY + 'px'
					});
					posX += stepX;

					if (posX >= 100) {
						posX = 0;
						posY += stepY;
					}
				});
				$gallery.height(posY + stepY);
			},
			select = function(cl, $aLink) {
				if (cl != current && enabled) {
					enabled = false;

					if (cl == 'all') {
						$figures.removeClass('hidden');
					} else {
						if (current == 'all') {
							$figures.not('.' + cl).addClass('hidden');
						} else {
							$figures.filter('.' + current).addClass('hidden');
							$figures.filter('.' + cl).removeClass('hidden');
						}
					}
					current = cl;
					setTimeout(function() {
						enabled = true;
					}, 600);
					$a.parent().removeClass('current');
					$aLink.parent().addClass('current');
				}
				draw();
			};

		loadImages();
		draw();

		PC.$window.resize(draw);
		$a.click(function(e) {
			e.preventDefault();
			var $this = $(this),
				cl = $this.text().toLowerCase().replace(/ /g, '-');
			if (cl.indexOf('all-') != -1) {
				cl = 'all';
			}
			select(cl, $this);
		});
	};
	PC.illustrationPost = function() {
		PC.$html.scrollTop(0);
		var $postNavigation = $('.post-navigation').addClass('visible'),
			$figure = $('.illustration-post-large-image figure'),
			$image = $figure.find('img').eq(0),
			$summary = $('.illustration-post .summary'),
			limitToHideStart = 80,
			limitToHideEnd = 300,
			$elementsToHide = $('.summary-content-col'),
			limitSegment = limitToHideEnd - limitToHideStart,
			heightImage = 5000,
			heightWindow = PC.$window.height(),
			loaded = false,
			calculatePosition = function() {
				var op = 1;
				var scl = PC.$scroll.scrollTop();

				if (scl <= limitToHideStart) {
					op = 1;
				} else if (scl > limitToHideStart && scl <= limitToHideEnd) {
					op = 1 - (scl - limitToHideStart) / limitSegment;
				} else if (scl > limitToHideEnd) {
					op = 0;
				}
				$elementsToHide.css('opacity', op);
				if (scl > limitToHideEnd) {
					var posY = (scl - limitToHideEnd);
					var difHeigth = heightImage - heightWindow;
					if (posY > difHeigth) {
						posY = (difHeigth > 0) ? difHeigth : 0;
					}
					$figure.css('top', -posY + 'px');
				}
			},
			calculateSize = function() {
				heightWindow = PC.$window.height(),
					heightImage = (loaded) ? $image.height() : heightWindow;
				$summary.height(heightImage + limitToHideEnd - 50);
			},
			timerScrollDown = null,
			scrollLabel = function() {
				var $scrollDown = $('#scroll-down'),
					secondsWait = 6,
					secondsRestart = 10,
					showing = false,
					show = function() {
						$scrollDown.fadeIn(400);
						showing = true;
					},
					hide = function() {
						if (showing) {
							$scrollDown.fadeOut(400);
							secondsWait = secondsRestart;
							showing = false;
						}
					};
				timerScrollDown = setInterval(function() {
					secondsWait--;
					if (secondsWait == 0) {
						show();
					}
				}, 1000);
				PC.$window.scroll(hide);
				return this;
			};
		scrollLabel();
		calculateSize();
		calculatePosition();
		if ($image[0].complete) {
			loaded = true;
			calculateSize();
			calculatePosition();
		} else {
			$image.load(function() {
				loaded = true;
				calculateSize();
				calculatePosition();
			});
		}
		PC.$window.resize(function() {
			calculateSize();
			calculatePosition();
		}).scroll(function() {
			calculatePosition();
			if (timerScrollDown) {
				clearInterval(timerScrollDown);
				timerScrollDown = null;
			}
		});

		var $wip = $('.wipSlider');
		if ($wip.length > 0) {
			$.getScript(baseTemplateURL + '/js/libs/jquery.wipSlider.min.js', function() {
				$wip.wipSlider();
			});
		}
		var somePre = false;
		$('pre').not('.no-print').each(function() {
			var $this = $(this).addClass('prettyprint');
			$this.text($this.html());
			somePre = true;
		});
		if (somePre) {
			$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');
		}

		PC.socialComments('.illustration-post-large-image img,.content img');
		PC.commentValidation();
	};
	PC.blogList = function() {
		//
	};
	PC.blogPost = function() {
		var $wip = $('.wipSlider');
		if ($wip.length > 0) {
			$.getScript(baseTemplateURL + '/js/libs/jquery.wipSlider.min.js', function() {
				$wip.wipSlider();
			});
		}
		var somePre = false;
		$('pre').not('.no-print').each(function() {
			var $this = $(this).addClass('prettyprint');
			$this.text($this.html());
			somePre = true;
		});
		if (somePre) {
			$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');
		}
		PC.socialComments('.content img');
		PC.commentValidation();
	};
	PC.designPost = function() {
		var $wip = $('.wipSlider');
		if ($wip.length > 0) {
			$.getScript(baseTemplateURL + '/js/libs/jquery.wipSlider.min.js', function() {
				$wip.wipSlider();
			});
		}
		var somePre = false;
		$('pre').not('.no-print').each(function() {
			var $this = $(this).addClass('prettyprint');
			$this.text($this.html());
			somePre = true;
		});
		if (somePre) {
			$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');
		}
		PC.socialComments('.content img');
		PC.commentValidation();
	};
	PC.socialComments = function(imgToLoad) {
		var $commentTabs = $('#comment-tabs'),
			tabs = function() {
				//tabs
				$commentTabs.each(function() {
					var $this = $(this),
						$controls = $this.find('.controls'),
						$a = $controls.find('a'),
						$contentTabs = $this.find('.content-tab'),
						current = '',
						select = function($link) {
							var i = $link.attr('href');
							if (i != current) {
								current = i;
								$a.parent().removeClass('active');
								$link.parent().addClass('active');
								$controls.removeClass('gplus-tab facebook-tab wordpress-tab').addClass(current.substr(1));
								$contentTabs.hide();
								$(current).show();
							}
						};
					select($a.eq(0));
					$a.click(function(e) {
						e.preventDefault();
						select($(this));
					});
				});
			},
			preRender = function() {
				var widthComments = window.comment_tab_width || 750,
					url = window.location.href;
				//GPLUS
				$('#gplus-tab').html('<div class="g-comments" data-width="' + widthComments + '" data-href="' + url + '" data-first_party_property="BLOGGER" data-view_type="FILTERED_POSTMOD">Loading Google+ Comments ...</div>');
				//FACEBOOK
				$('#fb-comments').html('<div class="fb-comments" data-width="' + widthComments + '" data-href="' + url + '" data-num-posts="20" data-colorscheme="light" data-mobile="auto"></div>');
			},
			loadPlugins = function() {
				//GPLUS
				$.getScript('//apis.google.com/js/plusone.js?callback=gpcb');
				//FACEBOOK
				$.getScript('//connect.facebook.net/en_US/all.js#xfbml=1', function() {
					FB.init();
					FB.XFBML.parse();
				});
			};
		if ($commentTabs.length > 0) {
			tabs();
			preRender();
			var self = this,
				itl = imgToLoad || '';
			PC.waitImgsForLoad(itl, function() {
				setTimeout(function() {
					loadPlugins();
				}, 50);
			});
		}
	};
	PC.commentValidation = function() {
		var $form = $('#commentform'),
			$statusMessage = $('#statusMessage').html(''),
			$fieldsets = $form.find('fieldset.validate');
		$fieldsets.find('input,textarea').val('');
		var $i = $form.find('input[type=text],input[type=email],textarea').removeAttr('disabled'),
			$adding = $('#adding-comment'),
			$addingError = $('#adding-comment-error'),
			$ul = $('#commentlist'),
			$ulTitle = $('#commentlist-title'),
			numComments = $ul.find('>li').length,
			validate = function() {
				var v = true;
				$fieldsets.each(function() {
					var $this = $(this).removeClass('error'),
						$inp = $this.find('input,textarea'),
						min = $this.attr('data-min'),
						val = $inp.val();

					if (val.length < 3) {
						v = false;
						$this.addClass('error');
						$inp.focus();
					} else {
						if ($this.hasClass('email')) {
							if (val.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1) {
								v = false;
								$this.addClass('error');
								$inp.focus();
							}
						}
					}
				});
				return v;
			},
			submitForm = function() {
				var data = $form.serialize(),
					url = $form.attr('action');
				$i.attr('disabled', 'true');
				$addingError.hide();
				$adding.fadeIn(300, function() {
					$.ajax({
						type: 'post',
						url: url,
						data: data,
						error: function() {
							$adding.hide();
							$addingError.show();
							$i.removeAttr('disabled');
						},
						success: function(data) {
							$(data).find('#commentlist li').last().hide().appendTo($ul).fadeIn(600);
							$adding.fadeOut(300);
							$i.removeAttr('disabled').filter('textarea').val('').focus();

							numComments++;
							var plural = (numComments > 1) ? 's' : '';
							$ulTitle.html(numComments + ' comment' + plural);
						}
					});
				});
				return false;
			};
		$('#submit').click(function(e) {
			e.preventDefault();
			var v = validate();
			if (v) {
				submitForm();
			}
		});
		$('#clearFields').click(function(e) {
			e.preventDefault();
			$fieldsets.removeClass('error').find('input,textarea').val('').eq(0).focus();
		});
		$('.link-to-comments').click(function(e) {
			e.preventDefault();
			var top = $('#comments-panel').offset().top;
			$('.sub-frame').eq(0).animate({
				'scrollTop': top + 'px'
			}, Math.round(top / 3), function() {
				setTimeout(function() {
					window.location.hash = '#comments-panel';
				}, 1000);
			});
		});
	};
	PC.socialShare = function() {
		var shareLinks = {
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
			url = window.location.href,
			share = function($a) {
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
						}, shareLinks[on]),
						urlShare,
						windowWidth = PC.$window.width(),
						heightWidth = PC.$window.height(),
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
							urlShare = cfg['url'] + url + cfg['mediaSeparator'] + data['media'] + cfg['descriptionSeparator'] + data['description'];
							break;
						case 'twitter':
							urlShare = cfg['url'] + data['description'] + cfg['descriptionSeparator'] + url;
							break;
						default:
							urlShare = cfg['url'] + url;
					};
					window.open(urlShare, cfg['title'], 'width=' + cfg['width'] + ', height=' + cfg['height'] + ',left=' + left + ',top=' + top);
				}
			};

		$('a.share').click(function(e) {
			e.preventDefault();
			share($(this));
		});
	};
	PC.skechbook = function() {
		$('.sketchbook').each(function() {
			var $this = $(this),
				$pages = $this.find('>.sk-page'),
				next = 0,
				last = $pages.length,
				$btnPrev = $('<div class="sk-btn sk-btn-prev ready disabled" title="Previous sketch"></div>'),
				$btnNext = $('<div class="sk-btn sk-btn-next" title="Next sketch"><span>Turn the page</span></div>'),
				$btnRestart = $('<div id="sketchbook-restart" class="button red" title="Start the Sketchbook from the beginning">Restart Sketchbook</div>'),
				btnNextReady = false,
				transitionEvent = (function() {
					var t, el = document.createElement('fakeelement');
					transitions = {
						'transition': 'transitionend',
						'OTransition': 'oTransitionEnd',
						'MozTransition': 'transitionend',
						'WebkitTransition': 'webkitTransitionEnd'
					}
					for (t in transitions) {
						if (el.style[t] !== undefined) {
							return transitions[t];
						}
					}
				})(),
				moving = false,
				setupPages = function() {
					$pages.each(function(index) {
						var $fases = $(this).append('<div class="sk-shadow"></div>').find('.sk-face');
						$fases.eq(0).addClass('face-front');
						$fases.eq(1).addClass('face-back');
					}).addClass('sk-right').eq(0).addClass('sk-visible');
					$this.addClass('rendered');
				},
				change = function(direction) {
					if (!moving) {
						var invalidMove = false;
						if ((next == last && direction == 1) || (next == 0 && direction == -1)) {
							invalidMove = true;
						}
						if (!invalidMove) {
							moving = true;
							if (direction == 1) {
								var aNext = next - 1,
									bNext = next,
									cNext = next + 1,
									$a = $pages.eq(aNext),
									$b = $pages.eq(bNext),
									$c = $pages.eq(cNext);
								$b.removeClass('sk-right sk-visible').addClass('sk-over sk-pos-right sk-right-to-center');
								if (cNext <= last) {
									$c.addClass('sk-visible');
								}
								setTimeout(function() {
									$b.removeClass('sk-pos-right').addClass('sk-pos-center sk-animated1');
								}, 100);
								var ends = [

										function() {
											$b.removeClass('sk-right-to-center sk-pos-center sk-animated1').addClass('sk-left-to-center sk-pos-left sk-animated2');
										},
										function() {
											if (aNext > 0) {
												$a.removeClass('sk-visible');
											}
											$b.removeClass('sk-over sk-left-to-center sk-pos-left sk-animated2').addClass('sk-left sk-visible').unbind(transitionEvent);
											next++;
											$btnPrev.removeClass('disabled');
											if (next >= last) {
												$btnNext.addClass('disabled');
											}
											moving = false;
										}
									],
									endsInd = 0;
								$b.bind(transitionEvent, function() {
									ends[endsInd]();
									endsInd++;
								});
							} else {
								var aNext = next - 2,
									bNext = next - 1,
									cNext = next,
									$a = $pages.eq(aNext),
									$b = $pages.eq(bNext),
									$c = $pages.eq(next);
								if (aNext > 0) {
									$a.addClass('sk-visible');
								}
								$b.removeClass('sk-left sk-visible').addClass('sk-over sk-pos-left sk-left-to-center');
								setTimeout(function() {
									$b.removeClass('sk-pos-left').addClass('sk-pos-center sk-animated1');
								}, 100);
								var ends = [

										function() {
											$b.removeClass('sk-left-to-center sk-pos-center sk-animated1').addClass('sk-right-to-center sk-pos-right sk-animated2');
										},
										function() {
											if (cNext <= last) {
												$c.removeClass('sk-visible');
											}
											$b.removeClass('sk-over sk-right-to-center sk-pos-right sk-animated2').addClass('sk-right sk-visible').unbind(transitionEvent);
											next--;
											$btnNext.removeClass('disabled');
											if (next <= 0) {
												$btnPrev.addClass('disabled');
											}
											moving = false;
										}
									],
									endsInd = 0;
								$b.bind(transitionEvent, function() {
									ends[endsInd]();
									endsInd++;
								});
							}

						}
					}
				};

			$this.append($btnPrev).append($btnRestart).append($btnNext);
			$btnPrev.click(function() {
				change(-1);
			});
			$btnNext.click(function() {
				change(1);
			}).hover(function() {
				if (!btnNextReady) {
					btnNextReady = true;
					$btnNext.addClass('ready').find('span').animate({
						'opacity': 0,
						'right': '300%'
					}, 250, function() {
						$(this).hide();
					});
				}
			});

			$btnRestart.click(function() {
				$pages.fadeOut(300, function() {
					$pages.removeClass('sk-left sk-visible').addClass('sk-right').eq(0).addClass('sk-visible');
					$btnNext.removeClass('disabled');
					$btnPrev.addClass('disabled');
					next = 0;
					$pages.fadeIn(300);
				});
			});

			setupPages();
		});
		// loadImages
		var $images = $('.sketchbook-img'),
			length = $images.length,
			current = 0,
			setScr = function() {

				if (current < length) {
					var $i = $images.eq(current),
						s = $i.attr('srcwait');
					$i.attr('src', s);
				}
			},
			loadNext = function() {
				$images.eq(current).siblings('.loading-sketch-banner').hide();
				++current;
				setScr();
			};
		$images.load(loadNext).error(loadNext);
		setScr();
	};
	PC.designList = function() {
		var backColors = [
				'5a7880',
				'5a8074',
				'76805a',
				'806c56',
				'756a80'
			],
			idColor = -1,
			getbackColor = function() {
				var bc = '#' + backColors[++idColor];
				idColor = (idColor >= (backColors.length - 1)) ? -1 : idColor;
				return bc;
			},
			$ctrl,
			timerToScroll = null,
			hw = 300,
			moving = false,
			timming = 800,
			ended = false,
			scrollTop = 0,
			isLtIE8 = (typeof document.attachEvent === "object") ? true : false,

			$slider = $('#design-slider'),
			$slis = $slider.find('.d-slide').each(function() {
				$(this).css('background-color', getbackColor());
			}),
			length = $slis.length,
			$more = $('#design-more,#footer-main'),
			$article = $slider.parent(),
			current = 0,
			$scrollDown = $('#scroll-down'),
			calculateSizeForContent = function() {
				$slis.each(function() {
					var h = .5 * (hw - $(this).find('.d-slide-anim-ramp').height());
					h = (h < 10) ? 10 : h;
					$(this).find('.d-slide-anim,.d-slide-text').css('top', h + 'px');
				});
			},
			calculateSize = function() {
				hw = PC.$window.height() - 60;
				$slider.height(hw);
				calculateSizeForContent();
			},
			renderCtrl = function() {
				var str = '<div id="design-slider-control">',
					cl = 'current';
				for (var i = 0; i < length; i++) {
					if (i > 0) {
						cl = '';
					}
					str += '<span class="' + cl + '" rel="' + i + '"></span>';
				}
				str += '</div>';
				$ctrl = $(str);
				$ctrl.appendTo($slider);
			},
			change = function(direction) {
				if (!moving && scrollTop == 0) {
					var gou = current + direction;
					if (gou >= 0 && gou < length) {
						if (timerToScroll != null) {
							$scrollDown.fadeOut(200);
							timerToScroll = null;
						}
						moving = true;
						current = gou;
						if (direction > 0) {
							$slis.filter('.prev').removeClass('prev');
							$slis.eq(current - 1).removeClass('current').addClass('prev animated');
							$slis.eq(current).removeClass('next').addClass('current');
							if ((current + 1) < length) {
								$slis.eq(current + 1).addClass('next')
							}
						} else {
							$slis.filter('.next').removeClass('next');
							$slis.eq(current).removeClass('prev').addClass('current animated');
							$slis.eq(current + 1).removeClass('current').addClass('next');
							if ((current - 1) >= 0) {
								$slis.eq(current - 1).addClass('prev')
							}
						}
						setTimeout(function() {
							moving = false;
							$slis.filter('.animated').removeClass('animated');
							ended = ((current + 1) == length) ? true : false;

							if (ended) {
								$more.show();
								$article.scrollTop(0);
							} else {
								$more.hide();
							}
						}, timming);
						$ctrl.find('span').removeClass('current').eq(current).addClass('current');
					}
				}
			},
			setEvents = function() {

				$slis.find('img').load(function() {
					calculateSizeForContent();
				});


				var setScrollTop = function() {
					scrollTop = $article.scrollTop();
				};
				PC.$window.resize(function() {
					calculateSize();
					setScrollTop();
				});

				// Drag ***************************************/
				var dragging = false,
					ymouseInit, dif,
					$prev = false,
					$current = false;
				$slider.on('mousedown', function(e) {
					setScrollTop();
					if (!dragging && scrollTop == 0 && !moving && !isLtIE8) {
						dragging = true;
						ymouseInit = e.pageY;
						if ((current - 1) >= 0) {
							$prev = $slis.eq(current - 1);
						}
						$current = $slis.eq(current);
					}
				});
				PC.$window.on('mousemove', function(e) {
					if (dragging) {
						dif = 100 * (e.pageY - ymouseInit) / hw;
						if (dif > 0 && $prev) {
							$prev.css('top', (dif - 100) + '%');
							$current.css('top', '');
						} else {
							if ($prev) {
								$prev.css('top', '');
							}
							if (dif <= 0 && !ended) {
								$current.css('top', dif + '%');
							}
						}
					}
				}).on('mouseup', function(e) {
					if (dragging) {
						if (Math.abs(dif) > 30) {
							if ($prev) {
								$prev.css('top', '');
							}
							$current.css('top', '');
							dragging = false;
							$prev = false;
							$current = false;
							if (ended && dif <= 0) {} else {
								change(-1 * Math.abs(dif) / dif);
							}
						} else {
							moving = true;
							if (dif > 0 && $prev) {
								$prev.animate({
									'top': '-100%'
								}, 200, function() {
									$prev.css('top', '');
									dragging = false;
									$prev = false;
									$current = false;
									moving = false;
								});
							} else {
								if (dif <= 0) {
									$current.animate({
										'top': '0%'
									}, 200, function() {
										$current.css('top', '');
										dragging = false;
										$prev = false;
										$current = false;
										moving = false;
									});
								}
							}
						}
					}
				});
				// Scroll ***************************************/
				// Firefox
				$slider.on('DOMMouseScroll', function(e) {
						setScrollTop();
						if (!dragging && scrollTop == 0 && !moving) {
							var d = e.originalEvent.detail,
								dir = (d > 0) ? 1 : -1;
							change(dir);
						}

					})
					// Other
					.on('mousewheel', function(e) {
						setScrollTop();
						if (!dragging && scrollTop == 0 && !moving) {
							var d = e.originalEvent.wheelDelta,
								dir = (d < 0) ? 1 : -1;
							change(dir);
						}
					});
				//
				var keyPressed = false;
				PC.$window.on('keydown', function(e) {
					if (!dragging && !keyPressed && scrollTop == 0 && !moving && !isLtIE8) {
						keyPressed = true;
						var unicode = e.keyCode ? e.keyCode : e.charCode;
						if (unicode == 37 || unicode == 38) {
							setScrollTop();
							change(-1);
						}
						if (unicode == 39 || unicode == 40) {
							setScrollTop();
							change(1);
						}
					}
				}).on('keyup', function(e) {
					if (keyPressed) keyPressed = false;
				});
			};

		PC.$html.scrollTop(0);
		$slis.eq(0).addClass('current');
		$slis.eq(1).addClass('next');

		$slider.fadeIn(400, function() {
			$('#design-loading').hide();
		});

		setTimeout(function() {
			calculateSize();
		}, 50);
		timerToScroll = setTimeout(function() {
			$scrollDown.fadeIn(400);
			timerToScroll = 'waitHide';
		}, 5000);

		calculateSize();
		renderCtrl();

		setEvents();

	};
	PC.skillmeter = (function() {
		var
			isCanvasSupported = function() {
				var elem = document.createElement('canvas');
				return !!(elem.getContext && elem.getContext('2d'));
			},
			drawLine = function(c, x0, y0, x1, y1) {
				c.beginPath();
				c.moveTo(x0, y0);
				c.lineTo(x1, y1);
				c.stroke();
				c.closePath();
			},
			drawString = function(c, text, posX, posY) {
				var lines = text.split("\n");
				c.save();
				c.translate(posX, posY);
				for (i = 0; i < lines.length; i++) {
					c.fillText(lines[i], 0, i * 14);
				}
				c.restore();
			},
			cnv, $cnv, c, about, width, height, basex, basey, perc, val, iconSprite, timer, $wrap, mod = 90 / 35,
			$controls, $arrows, current, autoplay = null,
			wCurve, amplitude, wCurveMed, wCurveQuart,
			g = {
				x: null,
				y: null,
				w: null,
				h: null,
				pt: 35,
				pr: 20,
				pb: 155,
				pl: 20
			},
			d, dataLimit, lengthTotal,
			dataTitles = ['My Illustration skills', 'My Design skills', 'My skills for Traditional Artwork', 'Software I use', 'Technologies I know'],
			data = [
				[{
					'label': 'Digital\npainting',
					'color': 'rgba(255,0,0,',
					'val': 100
				}, {
					'label': 'Matte-painting',
					'color': 'rgba(255,120,0,',
					'val': 50
				}, {
					'label': 'Fantasy\n& books',
					'color': 'rgba(222,167,0,',
					'val': 80
				}, {
					'label': 'Characters',
					'color': 'rgba(58,165,0,',
					'val': 90
				}, {
					'label': 'Concept Art',
					'color': 'rgba(0,162,255,',
					'val': 70
				}, {
					'label': 'Speed-painting',
					'color': 'rgba(108,36,255,',
					'val': 60
				}],
				[{
					'label': 'Web Design',
					'color': 'rgba(0,150,255,',
					'val': 100
				}, {
					'label': 'UX Analysis',
					'color': 'rgba(0,189,116,',
					'val': 60
				}, {
					'label': 'Interactive\napps',
					'color': 'rgba(104,176,0,',
					'val': 75
				}, {
					'label': 'Infographics',
					'color': 'rgba(223,184,0,',
					'val': 95
				}, {
					'label': '3D modeling',
					'color': 'rgba(255,114,0,',
					'val': 50
				}, {
					'label': 'Icons & logos',
					'color': 'rgba(255,24,0,',
					'val': 65
				}, {
					'label': 'Advertising',
					'color': 'rgba(255,0,126,',
					'val': 75
				}],
				[{
					'label': 'Oil on canvas',
					'color': 'rgba(255,48,0,',
					'val': 100
				}, {
					'label': 'Drawing',
					'color': 'rgba(58,165,0,',
					'val': 90
				}, {
					'label': 'Watercolor',
					'color': 'rgba(0,144,255,',
					'val': 60
				}, {
					'label': 'Pencils',
					'color': 'rgba(224,169,0,',
					'val': 40
				}, {
					'label': 'Sketches',
					'color': 'rgba(255,107,27,',
					'val': 80
				}],
				[{
					'label': 'Adobe\nPhotoshop',
					'color': 'rgba(0,70,174,',
					'val': 100
				}, {
					'label': 'Adobe\nIllustrator',
					'color': 'rgba(255,180,0,',
					'val': 65
				}, {
					'label': 'Krita',
					'color': 'rgba(210,0,255,',
					'val': 90
				}, {
					'label': 'Blender 3D',
					'color': 'rgba(255,126,0,',
					'val': 45
				}, {
					'label': 'SublimeText\n(for coding)',
					'color': 'rgba(47,168,0,',
					'val': 70
				}],
				[{
					'label': 'HTML5',
					'color': 'rgba(255,102,0,',
					'val': 90
				}, {
					'label': 'CSS3',
					'color': 'rgba(0,162,255,',
					'val': 100
				}, {
					'label': 'Javascript',
					'color': 'rgba(219,196,0,',
					'val': 80
				}, {
					'label': 'JQuery',
					'color': 'rgba(0,95,238,',
					'val': 90
				}, {
					'label': 'Wordpress',
					'color': 'rgba(0,126,179,',
					'val': 50
				}, {
					'label': 'Web Mobile',
					'color': 'rgba(47,168,0,',
					'val': 75
				}, {
					'label': 'GIT',
					'color': 'rgba(159,0,241,',
					'val': 30
				}]
			];

		return {
			init: function() {
				cnv = document.getElementById('skill-meter');
				$cnv = $(cnv);
				if (cnv != null && isCanvasSupported()) {
					$wrap = $('.skill-meter-wrap');
					$arrows = $('.skill-meter-arrow').show();
					current = 0;
					$controls = $('.skill-meter-controls');
					var spctrl = '';
					for (var i = 0; i < data.length; i++) {
						spctrl += '<div data-ind="' + i + '" class="smc bubble"><span class="bubble-msg">' + dataTitles[i] + '</span></div>';
					}
					$controls.html(spctrl);
					c = cnv.getContext('2d');
					c.lineCap = 'round';
					iconSprite = new Image();
					iconSprite.src = baseTemplateURL + '/img/skill-sprite.png';
					this.changeData(0).setEvents(this);
				} else {
					$cnv.html('<img style="display:block" src="' + baseTemplateURL + '/img/skillmeter-replace.png"/>');
				}
			},
			onresize: function() {
				width = $wrap.width();
				height = 350;
				$cnv.attr({
					width: width,
					height: height
				});
				if (width < 660) {
					dataLimit = 5;
				} else if (width < 500) {
					dataLimit = 4;
				} else {
					dataLimit = 20;
				}

				g.x = g.pl;
				g.y = g.pt;
				g.w = width - g.pl - g.pr;
				g.h = height - g.pt - g.pb;

				lengthTotal = (d.length > dataLimit) ? dataLimit : d.length;

				wCurve = Math.round(2 * g.w / (lengthTotal + 1));
				wCurveMed = Math.round(.5 * wCurve);
				wCurveQuart = Math.round(.25 * wCurve);
				amplitude = .5 * wCurveQuart;
				basey = g.y + g.h;
				perc = .01 * g.h;
				this.draw();
				var self = this;
				return this;
			},
			changeData: function(num) {
				current = num;
				if (current >= data.length) {
					current = 0;
				}
				if (current < 0) {
					current = data.length - 1;
				}
				$controls.find('.smc').removeClass('current').eq(current).addClass('current');
				d = data[current];
				this.onresize();
				return this;
			},
			draw: function() {
				if (timer != null) {
					clearInterval(timer);
					timer = null;
				};
				var self = this,
					v = 0,
					curr = 0,
					acc = .05,
					stepReady = [],
					stepValue = [],
					stepAlpha = [];

				for (var i = 0; i < d.length; i++) {
					stepReady.push(false);
					stepValue.push(0);
					stepAlpha.push(0);
				};
				timer = setInterval(function() {
					c.clearRect(0, 0, width, height);
					self.drawBase();
					c.lineWidth = 3;
					stepReady[curr] = true;
					for (var i = 0; i < lengthTotal; i++) {
						if (stepReady[i]) {
							c.strokeStyle = d[i].color + '.6)';
							c.fillStyle = d[i].color + '.4)';
							if (stepValue[i] != d[i].val) {
								stepValue[i] += acc * (d[i].val - stepValue[i]);
								stepValue[i] = Math.round(stepValue[i] * 100) / 100;
								if ((d[i].val - stepValue[i]) < 0.1) {
									stepValue[i] = d[i].val;
								}
							}
							self.drawCurve(i, stepValue[i]);
							if ((stepValue[i] / d[i].val) > .5 && typeof stepReady[i + 1] != 'undefined') {
								stepReady[i + 1] = true;
							}
							// icon
							if (stepAlpha[i] < 1) {
								stepAlpha[i] += .02;
								c.globalAlpha = stepAlpha[i];
							}
							c.drawImage(iconSprite, i * 24, current * 24, 24, 24, basex - 12, basey + 15, 24, 24);
							c.fillStyle = "#333";
							c.textAlign = 'center';
							c.font = "11px sans-serif";
							drawString(c, d[i].label, basex, basey + 56);
							c.globalAlpha = 1;
						}
					}
					if (stepValue[d.length - 1] == d[d.length - 1].val) {
						clearInterval(timer);
						timer = null;
					}
				}, 15);
			},
			drawCurve: function(i, v) {
				if (v > 0) {
					val = Math.round(v * perc);
					basex = g.x + (i + 1) * wCurveMed;
					c.beginPath();
					c.moveTo(basex - wCurveMed, basey);
					c.quadraticCurveTo(basex - wCurveMed + amplitude, basey, basex - wCurveQuart, basey - Math.round(.5 * val));
					c.quadraticCurveTo(basex - amplitude, basey - val, basex, basey - val);
					c.quadraticCurveTo(basex + amplitude, basey - val, basex + wCurveQuart, basey - Math.round(.5 * val));
					c.quadraticCurveTo(basex + wCurveMed - amplitude, basey, basex + wCurveMed, basey);
					c.fill();
					c.stroke();
					c.closePath();
				}
			},
			drawBase: function() {
				c.lineWidth = 1;
				c.strokeStyle = '#888';
				for (var i = 0; i < d.length; i++) {
					basex = g.x + (i + 1) * wCurveMed;
					drawLine(c, basex, g.y - 10, basex, basey + 10);
				}
				//dashed:
				var dashCount = 50,
					dash = Math.round(basey / dashCount);
				c.lineWidth = dash;
				c.strokeStyle = '#FFF';
				for (var i = 0; i < dashCount; i += 2) {
					var by = basey - (i * dash);
					drawLine(c, g.x, by, g.x + g.w, by);
				}
				c.lineWidth = 1;
				c.strokeStyle = '#DDD';
				drawLine(c, g.x, g.y, g.x + g.w, g.y);
				drawLine(c, g.x, g.y + (.5 * g.h), g.x + g.w, g.y + (.5 * g.h));
				drawLine(c, g.x, g.y + g.h, g.x + g.w, g.y + g.h);
				var ih = 76;
				var r = 15;
				c.strokeStyle = '#999';
				c.beginPath();
				c.moveTo(g.x + wCurveQuart, g.y + g.h + ih);
				c.quadraticCurveTo(g.x + wCurveQuart, g.y + g.h + ih + r, g.x + wCurveQuart + r, g.y + g.h + ih + r);
				c.lineTo(width / 2 - r, g.y + g.h + ih + r);
				c.quadraticCurveTo(width / 2, g.y + g.h + ih + r, width / 2, g.y + g.h + ih + 2 * r);
				c.quadraticCurveTo(width / 2, g.y + g.h + ih + r, width / 2 + r, g.y + g.h + ih + r);
				c.lineTo(g.x + g.w - wCurveQuart - r, g.y + g.h + ih + r);
				c.quadraticCurveTo(g.x + g.w - wCurveQuart, g.y + g.h + ih + r, g.x + g.w - wCurveQuart, g.y + g.h + ih);
				c.stroke();
				c.closePath();
				// text
				c.fillStyle = "#999";
				c.font = "10px sans-serif";
				c.textAlign = 'left';
				c.fillText('100%', g.x, g.y - 4);
				c.fillText('50%', g.x, g.y + (.5 * g.h) - 4);
				c.textAlign = 'right';
				c.fillText('100%', g.x + g.w, g.y - 4);
				c.fillText('50%', g.x + g.w, g.y + (.5 * g.h) - 4);
				// Base
				c.fillStyle = "#777";
				c.font = "italic 18px sans-serif";
				c.textAlign = 'center';
				c.fillText(dataTitles[current], width / 2, g.y + g.h + ih + 50);
			},
			setEvents: function(self) {
				PC.$window.resize(function() {
					self.onresize();
				});
				$controls.find('.smc').click(function() {
					if (autoplay != null) {
						clearInterval(autoplay);
						autoplay = null;
					}
					var n = parseInt($(this).attr('data-ind'));
					if (n != current) {
						self.changeData(n);
					}
				});
				$arrows.click(function() {
					if (autoplay != null) {
						clearInterval(autoplay);
						autoplay = null;
					}
					var n = parseInt($(this).attr('data-ind'));
					self.changeData(current + n);
				});
				autoplay = setInterval(function() {
					self.changeData(current + 1);
				}, 10000);
				return this;
			}
		};
	})();
	PC.aboutme = function() {
		var $sections = $('.about-me section'),
			$summary = $('#about-me-summary-content'),
			$aboutTabs = $('.about-tab'),
			$imgPablo = $('#about-me-img-pablo'),
			$contact = $('#contact'),
			$contactContent = $('#contact-container'),
			contactBlurried = false,
			detectContactBlurried = function() {
				var posY = $contact.offset().top - PC.$scroll.scrollTop();
				if (posY < $contact.height() && !contactBlurried) {
					$imgPablo.addClass('blur');
					contactBlurried = true;
				};
				if (posY > $contact.height() && contactBlurried) {
					$imgPablo.removeClass('blur');
					contactBlurried = false;
				};
			},
			setSize = function() {
				var wh = PC.$window.height() - 60,
					summaryMargin = Math.round((wh - $summary.height()) / 2);
				$sections.css('min-height', wh + 60 + 'px');
				$sections.eq(0).css('min-height', wh + 'px');
				if (summaryMargin < 0) {
					summaryMargin = 0;
				}
				if (summaryMargin > 180) {
					summaryMargin = 180;
				}
				$summary.css('margin-top', summaryMargin + 'px');

				detectContactBlurried();
				var contactMargin = ($contact.height() - $contactContent.height()) / 2 - 20;
				if (contactMargin < 20) {
					contactMargin = 20;
				}
				$contactContent.css('margin-top', contactMargin + 'px');
			};

		PC.$window.resize(function() {
			setSize();
		}).scroll(function() {
			detectContactBlurried();
		});
		$aboutTabs.click(function() {

			var n = parseInt($(this).attr('data-ind')),
				posY = Math.round($sections.eq(n).offset().top)
			$('html,body').animate({
				'scrollTop': posY + 'px'
			}, Math.round(PC.$window.height() * .8));
		});
		setSize();
		PC.skillmeter.init();

		PC.$html.scrollTop(0);
		if (window.location.hash.indexOf('contact') !== -1) {
			$('.about-tab.for-contact').click();
		}
	};
	PC.init = function() {
		// STORE
		PC.$window = $(window);
		PC.$html = $('html');
		//
		if (browser.webkit) {
			PC.$scroll = PC.$window;
		} else {
			PC.$scroll = PC.$html;
		}

		PC.$body = $('body');

		// COMMON
		PC.tryMobile();
		PC.nicescroll();
		$('.post-navigation').each(function() {
			var $this = $(this),
				l = $this.find('a').length;
			if (l < 4) {
				$this.addClass('for-' + l);
			}

		}).addClass('visible');
		PC.socialShare();

		// PER PAGE
		switch (pageID) {
			case 'home':
				PC.home();
				break;
			case 'illustration-list':
				PC.illustrationList();
				break;
			case 'illustration-post':
				PC.illustrationPost();
				break;
			case 'blog-list':
				PC.blogList();
				break;
			case 'blog-post':
				PC.blogPost();
				break;
			case 'design-post':
				PC.designPost();
				break;
			case 'sketch-list':
				PC.skechbook();
				break;
			case 'design-list':
				PC.designList();
				break;
			case 'about-me':
				PC.aboutme();
				break;
			default:
				//
		}
		// COMMON
		PC.header();
	};

	$('document').ready(function() {
		PC.init();
	});
})();