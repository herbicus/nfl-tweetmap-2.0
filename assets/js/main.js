if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};

var currentLat;
var currentLong;

var NFLtweetMapAPI = (function(options) {

	var shared = {},
		options = options || {},
		API_BASE = window.location.href.replace(/\/[^\/]+.html\??(.*)/, '/')
	
	// MAP STUFF

	var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(33.813046, -84.36177599999996);
		var mapOptions = {
		zoom: 8,
		center: latlng
	}
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var image = 'assets/img/icon.png';

	// SETUP ADDRESS SEARCH

	function codeAddress() {
		var resultType = $("option:selected").val();

		var address = resultType;

		// var address = $('input[name="address"]').val();
		console.log(address);

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					icon: image,
					position: results[0].geometry.location
				});

				currentLat = results[0].geometry.location.k;
				currentLong = results[0].geometry.location.D;

				var radius = "20mi";

				$.ajax({
					url: "twitter-proxy.php?op=search",
					data: {
						result_type: "recent",
						geocode: currentLat+","+currentLong+","+radius,
						include_entities: true,
						count: 100
					},
					success:  function(data) {
						// console.log(data);
						updateUI(data);
					},
					dataType: 'json'
				});


			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

	// UPDATE UI FUNCTION

	function updateUI(data) {

		var data = data.statuses;

		var tweets = "";

		// LOOP THROUGH TWEETS, APPEND TWEETS THAT AREN'T RETWEETS TO DIV

		for (var i = 0; i < data.length; i++) {

			var retweet = data[i].text.search("RT ");

			if (retweet == 0) {
				//do nothing...
			} else {

				var text = data[i].text;

			    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
			    text = text.replace(exp, "<a href='$1' target='_blank'>$1</a>");

				var tweet = '<div class="user-wrap"><div>' + "<a href='http://twitter.com/" + data[i].user.screen_name + 
				"' target='_blank'>" + '<img class="profile" src="' + data[i].user.profile_image_url + '">' + 
				"<span id='user'>" + "&#64;" + data[i].user.screen_name + "</span></a></div>" + "<p>" + text + "</p><hr></div>";

				tweets += tweet;
			};

		};

		$("#tweetBox").html(tweets);

	};

	function init() {

		codeAddress();

	    // EVENT HANDLER

		$('input[name="Geocode"]').on('click', function(){

			$(".user-wrap").remove();

			codeAddress();

			return false;

		});
	};

	google.maps.event.addDomListener(window, 'load', init);
	
	shared.init = init;
	shared.codeAddress = codeAddress;

	return shared;

}());

$(document).ready(function() {
	NFLtweetMapAPI.init();
});