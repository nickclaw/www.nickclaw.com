
function createVerticalNav(data) {
	var inner = $(document.createElement('div'))
		.addClass('indicators').
		append(
			$(document.createElement('div'))
				.addClass('control first')
				.click(pageUp)
		);

	$(data.children).each(function(index, value) {
			inner.append(
				$(document.createElement('div'))
					.addClass(index===0?'indicator active':'indicator')
					.attr('data-index', index)
					.attr('data-title', value.title)
					.click(function() {
						goToPage(index);
					})
			);
			if (value.children.length > 1) {
				createHorizontalNav(value, index);
			}
		});

	inner.append(
			$(document.createElement('div'))
				.addClass('control last')
				.on('click', pageDown)
		);

	$(data.id).append(
		$(document.createElement('div'))
			.addClass('nav vertical right hidden')
			.append(inner)
	);
}

function createHorizontalNav(data, parent) {
	var inner = $(document.createElement('div'))
		.addClass('indicators').
		append(
			$(document.createElement('div'))
				.addClass('control first')
				.click(pageLeft)
		);

	$(data.children).each(function(index, value) {
			inner.append(
				$(document.createElement('div'))
					.addClass(index===0?'indicator active':'indicator')
					.attr('data-index', index)
					//.attr('data-title', value.title)
					.click(function() {
						goToPage(parent, index);
					})
			);
		});

	inner.append(
			$(document.createElement('div'))
				.addClass('control last')
				.on('click', pageRight)
		);

	$(data.id).append(
		$(document.createElement('div'))
			.addClass('nav horizontal bottom')
			.append(inner)
	);
}

function getCurrentPage() {
	var main = pages.children[pages.currentIndex];
	var sub = main.children[main.currentIndex];

	return {
		'main': main,
		'sub': sub
	}
}

function getRoute() {
	var parts = window.location.pathname.split("/");

	for (var i = 0, main = null; main = pages.children[i]; i++) {
		if (main.url === parts[1]) {
			for (var j = 0, sub = null; sub = main.children[j]; j++) {
				if (sub.url === (parts.length > 2?parts[2]:"")) {
					return {
						'sub': sub,
						'main': main
					};
				}
			}
			return {
				"main": main
			};
		}
	}

	return null;
}

function getCurrentUrl() {
	var current = getCurrentPage();
	var url = window.location.origin;
	url+= "/"+current.main.url;
	if (current.sub.url) {
		url+="/"+current.sub.url;
	}
	console.log(url);
	return url;
}

function pageExists(mainIndex, subIndex) {
	return pages.children[mainIndex] && (
		subIndex === undefined || 
		pages.children[mainIndex].children[subIndex]
	)
}

function goToPage(mainIndex, subIndex) {
	if (subIndex === undefined) {
		subIndex = 0;
	}

	if (pageExists(mainIndex, subIndex)) {
		pages.currentIndex = mainIndex;
		pages.children[mainIndex].currentIndex = subIndex;

		pushState(pages.children[mainIndex].children[subIndex]);
		checkPages();

		// update navs TODO make function
		$(pages.children[mainIndex].id + " .horizontal [data-index]").removeClass('active');
		$(pages.children[mainIndex].id + " .horizontal [data-index=" + subIndex + "]").addClass('active');
		$(pages.id + " .vertical [data-index]").removeClass('active');
		$(pages.id + " .vertical [data-index=" + mainIndex + "]").addClass('active');

	} else {
		throw "No such page.";
	}
}

function pushState(sub) {
	History.pushState(null, sub.title, getCurrentUrl());
}

function checkPages() {
	var current = getCurrentPage();
	if (current.main.index === 0) {
		$('.vertical.nav').addClass('hidden');
	} else {
		$('.vertical.nav').removeClass('hidden');
	}

	if (current.main.children.length > 1) {
		if (current.sub.index === 0) {
			$(current.main.id + " .horizontal.nav").addClass('hidden');
		} else {
			$(current.main.id + " .horizontal.nav").removeClass('hidden')
		}
	}
}

function pageUp() {
	var current = getCurrentPage();

	if (pageExists(current.main.index - 1)) {
		goToPage(current.main.index - 1);
	} else {
		// bounce
	}
}

function pageDown() {
	var current = getCurrentPage();

	if (pageExists(current.main.index + 1)) {
		goToPage(current.main.index + 1);
	} else {
		// bounce
	}
}

function pageLeft() {
	var current = getCurrentPage();

	if (pageExists(current.main.index, current.sub.index - 1)) {
		goToPage(current.main.index, current.sub.index - 1);
	} else {
		// bounce
	}
}

function pageRight() {
	var current = getCurrentPage();

	if (pageExists(current.main.index, current.sub.index + 1)) {
		goToPage(current.main.index, current.sub.index + 1);
	} else {
		// bounce
	}
}

function scrollTo(mainId, subId, mainSettings, subSettings) {
	var container = $('#container');
	container.animate({'scrollTop': container.scrollTop() + $(mainId).offset().top }, mainSettings?mainSettings:{
		'queue': false,
		'easing': 'swing',
		'duration': 500,
		'complete': function() {
			var otherSubs = $('.main:not('+mainId+') .container');
			otherSubs.animate({'scrollLeft': 0 }, {
				'duration': 0
			});
		}
	});

	var subContainer = $(mainId + ' .container');
	subContainer.animate({'scrollLeft': subContainer.scrollLeft() + $(subId).offset().left }, subSettings?subSettings:{
		'easing': 'swing',
		'duration': 400
	});
}

$(window).ready(function() {
	// create navs
	createVerticalNav(pages);

	// go to right page
	var route = getRoute();
	goToPage(route.main.index, route.sub.index);
	scrollTo(route.main.id, route.sub.id, {
		'duration': 0
	}, {
		'duration': 0
	});

	var oldDx = null;
	var oldDy = null;
	var timeout = null;
	var canScroll = true;

	// every time there's a scroll event..
	$('body').on('scroll wheel mousewheel drag', function(evt) {
		// stop event
		evt.preventDefault();
		evt.stopPropagation();


		var dy = evt.originalEvent.deltaY || evt.originalEvent.wheelDeltaY; // change in y
		var absDy = Math.abs(dy); // absolute change in y

		if (oldDy) {
			var ay = dy - oldDy; // acceleration in y
		}
		oldDy = dy;

		var dx = evt.originalEvent.deltaX || evt.originalEvent.wheelDeltaX; // change in x
		var absDx = Math.abs(dx); // absolute change in x

		if (oldDx) {
			var ax = dx - oldDx; // acceleration in x
		}
		oldDx = dx;

		// is accelerating
		if ( ( ay && (dy > 0 && ay > 0) || (dy < 0 && ay < 0) ) ||
			 ( ax && (dx > 0 && ax > 0) || (dx < 0 && ax < 0) ) ) {

			if (canScroll && absDy > absDx && absDy > 50) {
				canScroll = false;
				if (dy < 0) {
					pageUp();
				} else {
					pageDown();
				}
			} else if (canScroll && absDx > absDy && absDx > 25) {
				canScroll = false;
				if (dx < 0) {
					pageLeft();
				} else {
					pageRight();
				}
			}


			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(function() {
				canScroll = true;
				oldDy = null;
				console.log('done');
			}, 100);
		}

	});

	$('body').on('keyup', function(evt) {
		var code = evt.keyCode;
		if (code === 37) {
			pageLeft();
		} else if (code === 38) {
			pageUp();
		} else if (code === 39) {
			pageRight();
		} else if (code === 40) {
			pageDown();
		}
	});

	$(window).resize(function() {
		var current = getCurrentPage();
		scrollTo(current.main.id, current.sub.id, {
			'queue': false,
			'duration': 0
		}, {
			"queue": false,
			'duration': 0
		});
	});

	window.onstatechange = function(evt) {
		var route = getRoute();
		scrollTo(route.main.id, route.sub.id);
	}

	$('.down.arrow').click(pageDown);
	$('.up.arrow').click(pageUp);
	$('.right.arrow').click(pageRight);
	$('.left.arrow').click(pageLeft);
});

