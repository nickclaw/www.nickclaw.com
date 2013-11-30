function Site() {
	this.manager = null;
	this.scroller = null;
	this.listener = null;

	var self = this;

	this.goToPage = function(page) {
		History.pushState(null, page.title, page.url);
	}

	this.pageUp = function(evt) {
		var newPage = self.manager.getUp();
		if (newPage) {
			self.goToPage(newPage);
		} else {
			self.scroller.bounceUp();
		}
	}

	this.pageDown = function(evt) {
		var newPage = self.manager.getDown();
		if (newPage) {
			self.goToPage(newPage);
		} else {
			self.scroller.bounceDown();
		}
	}

	this.pageLeft = function(evt) {
		var newPage = self.manager.getLeft();
		if (newPage) {
			self.goToPage(newPage);
		} else {
			self.scroller.bounceLeft();
		}
	}

	this.pageRight = function(evt) {
		var newPage = self.manager.getRight();
		if (newPage) {
			self.goToPage(newPage);
		} else {
			self.scroller.bounceRight();
		}
	}

	this.onLink = function(link) {
		var newPage = self.manager.route(link.href);
		if (newPage) {
			self.goToPage(newPage);
		} else {
			// 404
		}
	}

	this.onStateChange = function() {
		var page = self.manager.route();
		if (page) {
			self.manager.setCurrent(page);
			self.scroller.scrollTo(page);


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
			$('.nav.vertical [data-index].active').removeClass('active');
			$('.nav.vertical [data-index = ' + page.up().index + ']').addClass('active');
			$(page.up().id+' .nav.horizontal [data-index].active').removeClass('active');
			$(page.up().id+' .nav.horizontal [data-index = ' + page.index + ']').addClass('active');
		} else {
			// 404
		}
	}

	this.init = function() {
		self.manager = new PageManager();
		self.scroller = new Scroller();
		self.onStateChange();


		self.listener = new Listener(self.manager)
			.onLeft(self.pageLeft)
			.onRight(self.pageRight)
			.onUp(self.pageUp)
			.onDown(self.pageDown)
			.onLink(self.onLink)
			.onStateChange(self.onStateChange);
	}
	self.init();
}