$(function() {

	var original = null,
		open = null,
		nativeWidth = null,
		nativeHeight = null;

	function closeImage() {
		if (open) {
			open.remove();
			$('#overlay').removeClass('visible');
			open = original = nativeWidth = nativeHeight = null;
		}
	}

	function calculatePosition() {
		if (open) {
			var win = $(window),
				maxHeight = win.height(),
				maxWidth = win.width(),
				scaleFactor = Math.min(maxHeight * .9 / nativeHeight, maxWidth * .9 / nativeWidth, 1),
				finalWidth = nativeWidth * scaleFactor,
				finalHeight = nativeHeight * scaleFactor,
				offsetX = maxWidth / 2 - finalWidth /2,
 				offsetY = maxHeight /2 - finalHeight / 2;

			open.css({
					left : offsetX,
					top : offsetY,
					width: finalWidth,
					"padding-top" : finalHeight,
					opacity: 1,
					"border-radius": 20
				});
		}
	}

	$(document.body)
		.on('click', '.image.zoom, .overlay', function(evt) {
			if (open) {
				closeImage();
			} else if (!isScrolling) {
				original = $(this);
				
				// preload image and get width
				var newImg = new Image();
				newImg.onload = function() {
					nativeWidth = this.width;
					nativeHeight = this.height;
					calculatePosition();
				}
				newImg.src = /url\("?(.*?)"?\)/.exec(original.css('background-image'))[1];

				$('#overlay').addClass('visible');
				open = $(this)
					.clone()
					.addClass('zoomed')
					.css({
						left : original.offset().left - 11,
						top : original.offset().top - 11,
						width : original.width(),
						"padding-top": original.width(),
						"background-image": original.css('background-image'),
						"border-radius": "50%"
					})
					.appendTo(document.body);
			}
		})
		.on('click', '#overlay', closeImage)
		.on('keydown', function(evt) {
			evt.keyCode === 27 && closeImage();
		});;

	$(window).resize(calculatePosition)
});