function Listener(manager) {
	this.manager = manager;	
	this.up = null;
	this.down = null;
	this.right = null;
	this.left = null;
	this.link = null;
	this.stateChange = null;

	var self = this;

	this.onUp = function(fn) {
		self.up = fn;
		return self;
	}
	this.onDown = function(fn) {
		self.down = fn;
		return self;
	}
	this.onLeft = function(fn) {
		self.left = fn;
		return self;
	}
	this.onRight = function(fn) {
		self.right = fn;
		return self;
	}
	this.onLink = function(fn) {
		self.link = fn;
		return self;
	}
	this.onStateChange = function(fn) {
		self.stateChange = fn;
		return self;
	}

	this.addLinkListeners = function() {
		$('a.internal').click(function(evt) {
			evt.preventDefault();
			if (self.link) {
				self.link(this);
			}
		});
	}

	this.addStateListeners = function() {
		$(window).on('statechange', function(evt) {
			if (self.stateChange) {
				self.stateChange();
			}
		});
	}

	this.addKeyListeners = function() {
		$('body').on('keyup', function(evt) {
			var code = evt.keyCode;
			if (code === 37 && self.left) {
				self.left();
			} else if (code === 38 && self.up) {
				self.up();
			} else if (code === 39 && self.right) {
				self.right();
			} else if (code === 40 && self.down) {
				self.down();
			}
		});
	}

	this.addArrowListeners = function() {
		$('.down.arrow.control').click(self.down);
		$('.up.arrow.control').click(self.up);
		$('.right.arrow.control').click(self.right);
		$('.left.arrow.control').click(self.left);
	}

	this.addScrollListeners = function() {
		var mainSelector = self.manager.root.children.map(function(child) {return child.id;}).join(', ');
		$(mainSelector).on('mousewheel touchmove', function(evt) {
			// stop event
			evt.preventDefault();

			if (!isScrolling) {
				var dx = evt.originalEvent.wheelDeltaX; // change in x
				var dy = evt.originalEvent.wheelDeltaY; // change in y
				var current = self.manager.getCurrent(); // get current page

				if (current.up().id === '#'+this.id) {
					if (Math.abs(dy) > Math.abs(dx)) {
						if (dy < 0) {
							self.down();
						} else if (dy > 0) {
							self.up();
						}
					}
				}
			}
		});

		$.each(self.manager.root.children, function(index, page) {
			var selector = page.children.map(function(child){return child.id;}).join(', ');
			$(selector).on('mousewheel touchmove', function(evt) {
					evt.preventDefault();
					if (!isScrolling) {
						var dx = evt.originalEvent.wheelDeltaX; // change in x
						var dy = evt.originalEvent.wheelDeltaY; // change in y
						var current = self.manager.getCurrent(); // get current page

						if (current.id === '#'+this.id) {
							if (Math.abs(dy) < Math.abs(dx)) {
								if (dx < 0) {
									self.right();
								} else if (dx > 0) {
									self.left();
								}
							}
						}
					}
				});
		});
	}

	this.init = function() {
		self.addLinkListeners();
		self.addStateListeners();
		self.addKeyListeners();
		self.addScrollListeners();
	}
	self.init();
}

