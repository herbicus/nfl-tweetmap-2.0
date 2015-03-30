console.log("utilities.js loaded");

var myUtilitiesAPI = (function(options) {
	var shared = {},
		options = options || {}

	// -------------------------------------
	//   SHUFFLE (array)
	// -------------------------------------
	// -------------------------------------
	// -------------------------------------


	Array.prototype.shuffle = function() {
		var input = this;

		for (var i = input.length -1; i >= 0; i--) {

			var randomIndex = Math.floor(Math.random()*(i+1));
			var itemAtIndex = input[randomIndex];

			input[randomIndex] = input[i];
			input[i] = itemAtIndex;
		}
		return input;
	}

	// ----------- END SHUFFLE -------------

	// -------------------------------------
	//   PRELOADER (images)
	// -------------------------------------
	// -------------------------------------
	// -------------------------------------

	var AceLoadImages = AceLoadImages || function(a, d, z) {
		a instanceof Array || (a = [a]);
		for (var e = a.length, f = 0, g = e; g--;) {
			var b = document.createElement("img");
			b.onload = function() {
				f++; 
				f >= e && isFunction(d) && d(z)
			};
			b.src = a[g]; 
		}
	}

	var isFunction = isFunction || function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
	}

	// UNCOMMENT BELOW - images HAVE to be images
	// AceLoadImages([
	// 	'assets/img/myImage1.png',
	// 	'assets/img/myImage2.jpg',
	// 	'assets/img/myImage3.gif'
	// ], imagesAreLoaded);

	// function imagesAreLoaded() {
	// 	// WHATERVER YOU WANT IT TO DO - usually an animation/transition
	//   	TweenMax.to(".myOverlayImage" , 0.5, {
	//   		autoAlpha: 0,
	//   		display: "none",
	//   		ease: Back.easeInOut
	//   	});
	// }

	// ----------- END PRELOADER -------------

	// init
	var init = function() {

	};
	
	shared.init = init;

	return shared;
}());

$(document).ready(function() {
	myUtilitiesAPI.init();

});
