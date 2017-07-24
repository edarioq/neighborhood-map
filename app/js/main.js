// Views
$(".button-collapse").sideNav();
$('#search-btn').click(function(click) {
    click.preventDefault();
    console.log('Searching...');
});
$('#clear-locations').click(function(e) {
    e.preventDefault();

});

// Google Maps
var apiKey = 'AIzaSyDuLLIbn5Y68n9iEqJYIceSL6V85AGk0IM';
function initMap() {
    var uluru = { lat: 6.2377022, lng: -75.5780272 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru,
        scrollwheel: false,
    });
    // Create Gmaps searchbox object
    var input = document.getElementById('gmaps-input');
    var searchBox = new google.maps.places.SearchBox(input);
    
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    $('#clear-locations').click(function(e) {
        e.preventDefault();
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
    });
    
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
        return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);
    });
      
}

// Knockout has regular JS arrays that trigger updates to what their bound too
$(function() {

    // Load marker data
    

    // Bind marker data to UI
})

