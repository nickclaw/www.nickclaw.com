/**
 * Object in charge of scrolling
 * @constructor
 */
function Scroller() {

	/** 
	 * scrolls to the given page
	 * @param {Page}
	 */
	this.scrollTo = function(page) {
		isScrolling = true;
		
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

	this.bounceUp = function() {

	}

	this.bounceDown = function() {

	}

	this.bounceRight = function() {

	}

	this.bounceLeft = function() {

	}

}