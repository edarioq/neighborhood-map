// Mobile nav
$(".button-collapse").sideNav();

// Google Maps
var apiKey = 'AIzaSyDuLLIbn5Y68n9iEqJYIceSL6V85AGk0IM';

function initMap() {
    var uluru = { lat: 6.2377022, lng: -75.5780272 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
    });

}

