/**
 * is the scroller scrolling?
 * @type {boolean}
 */
var isScrolling = false;

/**
 * Main site object
 * @constructor
 */
function Site() {
	/**
	 * @const {PageManager}
	 */
	this.manager = null;

	/**
	 * @const {Scroller}
	 */
	this.scroller = null;

	/**
	 * @const {Listener}
	 */
	this.listener = null;

	var self = this;

	/** 
	 * goes to the page
	 * @param {Page} page
	 */
	this.goToPage = function(page) {
		History.pushState(null, page.title, page.url);
	}

	/**
	 * goes to the upper page if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.pageUp = function(evt) {
		var newPage = self.manager.getUp();
		if (newPage) {
			self.goToPage(newPage);
		}
	}

	/**
	 * goes to the lower page if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.pageDown = function(evt) {
		var newPage = self.manager.getDown();
		if (newPage) {
			self.goToPage(newPage);
		}
	}

	/**
	 * goes to the left page if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.pageLeft = function(evt) {
		var newPage = self.manager.getLeft();
		if (newPage) {
			self.goToPage(newPage);
		}
	}

	/**
	 * goes to the right page if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.pageRight = function(evt) {
		var newPage = self.manager.getRight();
		if (newPage) {
			self.goToPage(newPage);
		}
	}

	/**
	 * goes to the link if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.onLink = function(evt) {
		var newPage = self.manager.route(this.href);
		if (newPage) {
			self.goToPage(newPage);
		} else {
			// 404
		}
	}

	/**
	 * handles moving page when url changes
	 * @param {?} evt
	 * @param {boolean=} scroll
	 * @this {?}
	 */
	this.onStateChange = function(evt, moveTo) {
		var page = self.manager.route();
		if (page) {
			self.manager.setCurrent(page);
			if (moveTo) {
				self.scroller.moveTo(page);
			} else {
				self.scroller.scrollTo(page);
			}


			// hide or show navs as needed
			if (page.index === 0) {
				$(page.up().id+' .nav.horizontal').addClass('hidden');
			} else {
				$(page.up().id+' .nav.horizontal').removeClass('hidden');
			}
			if (page.up().index === 0) {
				$('.nav.vertical').addClass('hidden');
			} else {
				$('.nav.vertical').removeClass('hidden');
			}

			// change active indicator
			$('#container > .nav [data-index].active').removeClass('active');
			$('#container > .nav [data-index = ' + page.up().index + ']').addClass('active');
			$(page.up().id+' > .nav [data-index].active').removeClass('active');
			$(page.up().id+' > .nav [data-index = ' + page.index + ']').addClass('active');
		} else {
			// 404
		}
	}

	this.onWindowChange = function(evt) {
		evt.preventDefault();
		self.scroller.moveTo(self.manager.getCurrent());
	}

	/**
	 * initializes the site
	 */
	this.init = function() {
		self.manager = new PageManager();
		self.scroller = new Scroller();
		self.onStateChange(null, true); // todo no transition

		self.listener = new Listener(self.manager)
			.on('left', self.pageLeft)
			.on('right', self.pageRight)
			.on('up', self.pageUp)
			.on('down', self.pageDown)
			.on('link', self.onLink)
			.on('statechange', self.onStateChange)
			.on('viewchange', self.onWindowChange);

		$('.sub.page.unloaded').each(function(index, object) {
			$(object).load(object.getAttribute('data-internal'), {'post': true});
		});
	}
	self.init();
}

$(document).ready(function() {
	site = new Site();
});