/**
 * Manages multiple page objects, knows current page
 * @constructor
 */
function PageManager() {
	/**
	 * @type {Page}
	 */
	this.root = null;

	/**
	 * @type {Array.<number>}
	 */
	this.position = [];

	var self = this;

	/** 
	 * gets the current page
	 * @return {Page} the current page
	 */
	this.getCurrent = function() {
		var current = self.root;
		for (var i = 0; i < self.position.length; i++) {
			var current = current.children[self.position[i]];
		}
		return current;
	}

	/**
	 * gets the page given a url. Current url is used if url is not defined
	 * @param {string=} url
	 * @return {Page} the urls page
	 */
	this.route = function(url) {
		url = url?url:window.location.pathname;
		var thePage = null;
		self.each(function(page) {
			if (page.url === url || page.url + '/' === url) {
				thePage = page;
				return false;
			}
		});
		return thePage;
	}

	/**
	 * sets the current page
	 * @param {Page} page
	 */
	this.setCurrent = function(page) {
		var position = [];
		while (page && page.index !== null) {
			position.unshift(page.index);
			page = page.up();
		}
		self.position = position;
	}

	/**
	 * returns the page above the current one
	 * @return {?Page} the page above
	 */
	this.getUp = function() {
		var current = self.getCurrent();
		var parent = current.up().getPreviousSibling();
		if (parent) {
			return parent.children[0]; // todo replace with defaultIndex
		}
		return null;
	}

	/**
	 * returns the page below the current one
	 * @return {?Page} the page below
	 */
	this.getDown = function() {
		var current = self.getCurrent();
		var parent = current.up().getNextSibling();
		if (parent) {
			return parent.children[0]; // todo replace with defaultIndex
		}
		return null;
	}

	/**
	 * returns the page left of the current one
	 * @return {?Page} the page on the left
	 */
	this.getLeft = function() {
		var current = self.getCurrent();
		return current.getPreviousSibling();
	}

	/**
	 * returns the page right of the current one
	 * @return {?Page} the page on the right
	 */
	this.getRight = function() {
		var current = self.getCurrent();
		return current.getNextSibling();
	}

	/**
	 * calls callback on every page
	 * @param {function(Page)} callback
	 */
	this.each = function(callback) {
		self.root.each(callback);
	}

	/**
	 * initializes the manager
	 */
	this.init = function() {
		self.root = new Page(null, null, 'container', pages.container);
		var current = self.root;
		while (current.children.length > 0) {
			current = current.children[0]; // todo replace with defaultIndex
			self.position.push(current.index);
		}
	}
	self.init();
}

