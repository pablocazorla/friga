SR.define(function(App){
	return {
		init : function(){
			var somePre = false;
			$('pre').not('.no-print').each(function(){
				var $this = $(this).addClass('prettyprint');
				$this.text($this.html());
				somePre = true;
			});
			if(somePre){$.getScript('//google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert');}
		}
	}
});