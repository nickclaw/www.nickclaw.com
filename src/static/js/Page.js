/**
 * Represents one page
 * @constructor
 */
function Page(parent, index, name, data) {
	/**
	 * page id (format: '#abc')
	 * @type {string}
	 */
	this.id = ""

	/**
	 * the pages full url
	 * @type {string}
	 */
	this.url = "";

	/**
	 * the pages title
	 * @type {string}
	 */
	this.title = "";

	/**
	 * the pages parent or null
	 * @type {?Page}
	 */
	this.parent = null;

	/**
	 * this pages children
	 * @type {Array.<Page>}
	 */
	this.children = [];

	/**
	 * this pages index in it's parent
	 * @type {?number}
	 */
	this.index = null;

	/**
	 * the pages navvar if it has one
	 * @type {?Object}
	 */
	//this.nav = null;

	var self = this;

	/**
	 * returns the parent page or null
	 * @return {?Page} the parent page
	 */
	this.up = function() {
		return this.parent;
	}

	/** 
	 * searches for children using callback
	 * @param {function(number, Page):boolean} testFn
	 * @return {?Page} the matching child
	 */
	this.down = function(testFn) {
		var chosen = null;
		$(self.children).each(function(index, child) {
			if (testFn(index, child)) {
				chosen = child;
				return false;
			}
		});
		return chosen;
	}

	/**
	 * returns next sibling or null
	 * @return {?Page} the next sibling
	 */
	this.getNextSibling = function() {
		if (self.parent) {
			return self.parent.children[self.index + 1];
		} else {
			return null;
		}
	}

	/**
	 * returns previos sibling or null
	 * @return {?Page} the previous sibling
	 */
	this.getPreviousSibling = function() {
		if (self.parent) {
			return self.parent.children[self.index - 1];
		} else {
			return null;
		}
	}

	/**
	 * iterates over all child leaves
	 * @param {function(Page)} callback called for every leaf Page
	 * @param {Page=} root where to start searching (defaults to self)
	 */
	this.each = function(callback, root) {
		root = root || self;
		if (root.children.length > 0) {
			$.each(root.children, function(index, page) {
				return self.each(callback, page);
			});
		} else {
			return callback(root);
		}
	}

	/** 
	 * initializes the page
	 * @param {?Page} parent the parent page
	 * @param {number} index the index of the page
	 * @param {Object} data the pages data
	 */
	this.init = function(parent, index, name, data) {
		self.id = (parent?parent.id + '_':'#') + name;
		self.title = data.title || "";
		self.url = (parent?parent.url:'') + (parent && data.url?'/':'') + (data.url?data.url:'');
		self.parent = parent;
		self.index = index;
		//self.nav = $(data.id+' > .nav')

		if (data.children !== undefined) {
			var index = 0;
			$.each(data.children, function(key, child) {
				self.children.push(new Page(self, index++, key, child));
			});
		}
	}
	self.init(parent, index, name, data);
}

