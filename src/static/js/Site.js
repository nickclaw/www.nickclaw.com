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
		console.log('going to '+page.url);
		History.replaceState(null, page.title, (page.url?page.url:'/'));
	}

	/**
	 * goes to the upper page if possible
	 * @param {?} evt
	 * @this {?}
	 */
	this.pageUp = function(evt) {
		console.log('page up');
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
		console.log('page down');
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
		console.log('page left');
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
		console.log('page right');
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
		var newPage = self.manager.route(this.pathname);
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
		console.log(window.location.pathname);
		var page = self.manager.route();
		if (page) {
			self.manager.setCurrent(page);
			if (moveTo) {
				self.scroller.moveTo(page);
			} else {
				self.scroller.scrollTo(page);
			}


			// hide or show navs as needed
			$('.main.page > .nav').addClass('hidden');
			if (page.index !== 0) {
				$(page.up().id+' > .nav').removeClass('hidden');
			}

			if (page.up().index === 0) {
				$('#container > .nav').addClass('hidden');
			} else {
				$('#container > .nav').removeClass('hidden');
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
		$('.page.unloaded').each(function(index, object) {
			$(object).load('/get', {
				'path': object.id
			}, function handle(responseText, status, xhr) {
				if (xhr.status === 200) {
					$(this).removeClass('unloaded')
						.addClass('loaded')
				} else {
					$(this).addClass('error');
				}
			});
		});

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
	}
	self.init();
}

$(document).ready(function() {
	site = new Site();
});