$(function() {

	var origianl = null,
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
				wHeight = win.height(),
				wWidth = win.width(),
				finalHeight = Math.min(nativeHeight, wHeight - 100),
				finalWidth = Math.min(nativeWidth, wWidth - 100),
				offsetX = wWidth / 2 - finalWidth /2,
				offsetY = wHeight /2 - finalHeight / 2;

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
			} else {
				original = $(this);
				var src = original.css('background-image');
				
				var newImg = new Image();
				newImg.onload = function() {
					nativeWidth = this.width;
					nativeHeight = this.height;
					calculatePosition();
				}
				newImg.src = src.slice(0, src.length - 1).slice(4); // this must be done AFTER setting onload

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
		});

	$(window).resize(calculatePosition);
});