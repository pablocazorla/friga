SR.define(function(App){
	return {
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
	}
});