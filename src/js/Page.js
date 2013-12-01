function Page(parent, index, data) {
	this.id = ""
	this.url = "";
	this.title = "";
	this.parent = null;
	this.index = null;
	this.children = [];
	this.nav = null;

	var self = this;

	this.up = function() {
		return this.parent;
	}

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

	this.getNextSibling = function() {
		if (self.parent) {
			return self.parent.children[self.index + 1];
		} else {
			return null;
		}
	}

	this.getPreviousSibling = function() {
		if (self.parent) {
			return self.parent.children[self.index - 1];
		} else {
			return null;
		}
	}

	this.each = function(callback, root) {
		root = root || self;
		if (root.children.length > 0) {
			$.each(root.children, function(index, page) {
				return self.each(callback, page);
			});
		} else {
			return callback.call(this, root);
		}
	}

	this.init = function(parent, index, data) {
		self.id = data.id || "";
		self.title = data.title || "";
		self.url = (parent?parent.url:'') + (parent && data.url?'/':'') + (data.url?data.url:'');
		self.parent = parent;
		self.index = index;
		self.nav = $(data.id+' > .nav')

		if (data.children !== undefined) {
			$(data.children).each(function(index, child) {
				self.children.push(new Page(self, index, child));
			});
		}
	}
	self.init(parent, index, data);
}