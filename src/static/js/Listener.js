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
		$('#container').on('click', 'a.internal', function(evt) {
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
		  .on('click', '.down.control, > .nav .last.control', function(evt) {
			self.dispatch('down', this, evt);
		}).on('click', '.up.control, > .nav .first.control', function(evt) {
			self.dispatch('up', this, evt);
		}).on('click', '.right.control, .horizontal > .nav .last.control', function(evt) {
			self.dispatch('right', this, evt);
		}).on('click', '.left.control, .horizontal > .nav .first.control', function(evt) {
			self.dispatch('left', this, evt);
		});
	}

	/**
	 * adds listener to scroll movements
	 */
	this.addScrollListeners = function() {
		$('#container').on('mousewheel wheel', '.page.main', function(evt) {
			// stop event
			evt.preventDefault();


			if (!isScrolling) {

				var dx = evt.originalEvent.wheelDeltaX || - evt.originalEvent.deltaX || 0; // change in x
				var dy = evt.originalEvent.wheelDeltaY || - evt.originalEvent.deltaY || 0; // change in y
				var current = self.manager.getCurrent(); // get current page

				if (current.up().id === '#'+this.id) {

					if (Math.abs(dy) > Math.abs(dx)) {
						if (dy < -20) {
							self.dispatch('down', this, evt);
						} else if (dy > 20) {
							self.dispatch('up', this, evt);
						}
					}
				}
			}
		});

		$('#container').on('mousewheel wheel', '.page.sub', function(evt) {
			evt.preventDefault();
			if (!isScrolling) {
				var dx = evt.originalEvent.wheelDeltaX || - evt.originalEvent.deltaX || 0; // change in x
				var dy = evt.originalEvent.wheelDeltaY || - evt.originalEvent.deltaY || 0; // change in y
				var current = self.manager.getCurrent(); // get current page

				if (current.id === '#'+this.id) {
					if (Math.abs(dy) < Math.abs(dx)) {
						if (dx < -20) {
							self.dispatch('right', this, evt);
						} else if (dx > 20) {
							self.dispatch('left', this, evt);
						}
					}
				}
			}
		});
	}

	this.addTouchListeners = function() {
		var startPosition = null;

		$("#container")
			.on('mousedown touchstart', '.page.main', function(evt) {
				$(document.body).addClass('grabbing');
				startPosition = {
					x : evt.originalEvent.clientX || evt.originalEvent.touches[0].clientX,
					y : evt.originalEvent.clientY || evt.originalEvent.touches[0].clientY
				};
			})
			.on('contextmenu', '.page.main', function(evt) {
					$(this).trigger('touchend');
			})
			.on('mousemove touchmove', '.page.main', function(evt) {
				if ($(evt.originalEvent.target).not('a') && startPosition) {
					var dx = startPosition.x - ( evt.originalEvent.clientX || evt.originalEvent.touches[0].clientX ),
						dy = startPosition.y - ( evt.originalEvent.clientY || evt.originalEvent.touches[0].clientY );

					if (Math.abs(dy) < Math.abs(dx)) {
						if (dx < -60) {
							self.dispatch('left', this, evt);
							$(this).trigger('mouseup');
						} else if (dx > 60) {
							self.dispatch('right', this, evt);
							$(this).trigger('mouseup');
						}
					} else if (Math.abs(dx) < Math.abs(dy)) {
						if (dy < -60) {
							self.dispatch('up', this, evt);
							$(this).trigger('mouseup');
						} else if (dy > 60) {
							self.dispatch('down', this, evt);
							$(this).trigger('mouseup');
						}
					}
				}
			}).on('mouseup touchend', '.page.main', function(evt) {
				$(document.body).removeClass('grabbing');
				startPosition = null;
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
		self.addTouchListeners();
		self.addResizeListener();
	}
	self.init();
}

