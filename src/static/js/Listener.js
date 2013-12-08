/**
 * In charge of listening and function delegation for a Site
 * @constructor
 */
function Listener(manager) {
	this.manager = manager;

	/**
	 * holds events
	 * @dict
	 * @private
	 */
	this.event = {
		'link': [],
		'up': [],
		'down': [],
		'left': [],
		'right': [],
		'statechange': [],
		'viewchange': []
	};

	var self = this;

	/**
	 * adds event listener
	 * @param {string} type
	 * @param {function(string, function(?):?)} fn
	 * @return {Listener}
	 */
	this.on = function(type, fn) {
		if (self.event[type]) {
			self.event[type].push(fn);
		} else {
			throw "Event not supported.";
		}
		return self;
	}

	/** 
	 * calls an event
	 * @param {string} type
	 * @param {?} callee
	 * @param {?} evt
	 */
	this.dispatch = function(type, callee, evt) {
		if (self.event[type]) {
			$.each(self.event[type], function(index, fn) {
				fn.call(callee, evt);
			});
		}
	}

	/**
	 * adds listeners to all events
	 */
	this.addLinkListeners = function() {
		$('#container').delegate('a.internal', 'click', function(evt) {
			evt.preventDefault();
			self.dispatch('link', this, evt);
		});
	}

	/**
	 * adds listener to state change
	 */
	this.addStateListeners = function() {
		$(window).on('statechange', function(evt) {
			self.dispatch('statechange', this, evt);
		});
	}

	/**
	 * adds listeners to keys
	 */
	this.addKeyListeners = function() {
		$('body').on('keyup', function(evt) {
			var code = evt.keyCode;
			if (code === 37) {
				self.dispatch('left', this, evt);
			} else if (code === 38) {
				self.dispatch('up', this, evt);
			} else if (code === 39) {
				self.dispatch('right', this, evt);
			} else if (code === 40) {
				self.dispatch('down', this, evt);
			}
		});
	}

	/**
	 * adds listeners to arrows
	 */
	this.addControlListeners = function() {
		$('#container')
		  .delegate('.down.control, .vertical > .nav .last.control', 'click', function(evt) {
			self.dispatch('down', this, evt);
		}).delegate('.up.control, .vertical > .nav .first.control', 'click', function(evt) {
			self.dispatch('up', this, evt);
		}).delegate('.right.control, .horizontal > .nav .last.control', 'click', function(evt) {
			self.dispatch('right', this, evt);
		}).delegate('.left.control, .horizontal > .nav .first.control', 'click', function(evt) {
			self.dispatch('left', this, evt);
		});
	}

	/**
	 * adds listener to scroll movements
	 */
	this.addScrollListeners = function() {
		$('#container').delegate('.page.main', 'mousewheel touchmove', function(evt) {
			// stop event
			evt.preventDefault();

			if (!isScrolling) {
				var dx = evt.originalEvent.wheelDeltaX; // change in x
				var dy = evt.originalEvent.wheelDeltaY; // change in y
				var current = self.manager.getCurrent(); // get current page

				if (current.up().id === '#'+this.id) {
					if (Math.abs(dy) > Math.abs(dx)) {
						if (dy < 0) {
							self.dispatch('down', this, evt);
						} else if (dy > 0) {
							self.dispatch('up', this, evt);
						}
					}
				}
			}
		});

		$.each(self.manager.root.children, function(index, page) {
			$('#container').delegate('.page.sub', 'mousewheel touchmove', function(evt) {
				evt.preventDefault();
				if (!isScrolling) {
					var dx = evt.originalEvent.wheelDeltaX; // change in x
					var dy = evt.originalEvent.wheelDeltaY; // change in y
					var current = self.manager.getCurrent(); // get current page

					if (current.id === '#'+this.id) {
						if (Math.abs(dy) < Math.abs(dx)) {
							if (dx < 0) {
								self.dispatch('right', this, evt);
							} else if (dx > 0) {
								self.dispatch('left', this, evt);
							}
						}
					}
				}
			});
		});
	}

	this.addResizeListener = function() {
		$(window).on('resize zoom', function(evt) {
			self.dispatch('viewchange', this, evt);
		});
	}

	/**
	 * initializes the listener
	 */
	this.init = function() {
		self.addLinkListeners();
		self.addStateListeners();
		self.addKeyListeners();
		self.addControlListeners();
		self.addScrollListeners();
		self.addResizeListener();
	}
	self.init();
}

