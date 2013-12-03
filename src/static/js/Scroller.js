/**
 * Object in charge of scrolling
 * @constructor
 */
function Scroller() {

	var self = this;

	/** 
	 * scrolls to the given page
	 * @param {Page} page
	 */
	this.scrollTo = function(page) {
		isScrolling = true;
		didBounce = false;
		
		var container = $('#container');
		container.animate({
			'scrollTop': container.scrollTop() + $(page.up().id).offset().top
		}, {
			'queue': false,
	 		'easing': 'swing',
		 	'duration': 500,
		 	'complete': function() {
		 		isScrolling = false;
		 		$('.main:not('+page.up().id+') .container').animate({
		 			'scrollLeft':0
		 		}, {
		 			'duration': 0,
		 			'queue': false
		 		})
		 	}
		});

		var subContainer = $(page.up().id + ' .container');
		subContainer.animate({
			'scrollLeft': subContainer.scrollLeft() + $(page.id).offset().left
		}, {
			'easing': 'swing',
			'queue': false,
			'duration': 400
		});
	}

	/**
	 * moves to the given page
	 * @param {Page} page
	 */
	this.moveTo = function(page) {
		var container = $('#container');
		container.scrollTop(container.scrollTop() + $(page.up().id).offset().top);

		var subContainer = $(page.up().id + ' .container');
		subContainer.scrollLeft(subContainer.scrollLeft() + $(page.id).offset().left);

		$('.main:not('+ page.up().id +') .container').scrollLeft(0);
	}
}