function PageManager() {
	this.root = null;
	//this.pages = [];
	this.position = [];

	var self = this;

	this.getCurrent = function() {
		var current = self.root;
		for (var i = 0; i < self.position.length; i++) {
			var current = current.children[self.position[i]];
		}
		return current;
	}

	this.route = function(url) {
		url = url?url:(window.location.origin + window.location.pathname);
		var thePage = null;
		self.each(function(page) {
			if (page.url === url || page.url + '/' === url) {
				thePage = page;
				return false;
			}
		});
		return thePage;
	}

	this.setCurrent = function(page) {
		var position = [];
		while (page && page.index !== null) {
			position.unshift(page.index);
			page = page.up();
		}
		self.position = position;
	}

	this.getUp = function() {
		var current = self.getCurrent();
		var parent = current.up().getPreviousSibling();
		if (parent) {
			return parent.children[0]; // todo replace with defaultIndex
		}
		return null;
	}

	this.getDown = function() {
		var current = self.getCurrent();
		var parent = current.up().getNextSibling();
		if (parent) {
			return parent.children[0]; // todo replace with defaultIndex
		}
		return null;
	}

	this.getLeft = function() {
		var current = self.getCurrent();
		return current.getPreviousSibling();
	}

	this.getRight = function() {
		var current = self.getCurrent();
		return current.getNextSibling();
	}

	this.each = function(callback) {
		self.root.each(callback);
	}

	this.init = function() {
		self.root = new Page(null, null, pages);
		var current = self.root;
		while (current.children.length > 0) {
			current = current.children[0]; // todo replace with defaultIndex
			self.position.push(current.index);
		}
	}
	self.init();
}