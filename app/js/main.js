/*
 * Model (Data)
 */
var locations = [
    {
        name: 'Siembra Coworking',
        lat: 6.2104954,
        lng: -75.5677766,
    },
    {   
        name: 'Entreviñetas',
        lat: 6.2095819,
        lng: -75.5711447,
    },
    {   
        name: 'Tinkko Coworking',
        lat: 6.2126192,
        lng: -75.5722686,
    },
    {
        name: 'AtomHouse',
        lat: 6.209196,
        lng: -75.573853,
    },
    {
        name: 'NODO Coworking',
        lat: 6.2094639,
        lng: -75.5763566,
    },
    {
        name: 'Quokka Coworking',
        lat: 6.2085062,
        lng: -75.5705925,
    },
    {
        name: 'coworkYA!',
        lat: 6.2100688,
        lng: -75.5687043,
    },
    {
        name: 'Global Express',
        lat: 6.2091942,
        lng: -75.5686613,
    },
    {
        name: 'The Office Coworking',
        lat: 6.2094521,
        lng: -75.5705376,
    },
];



// Define the global scope
var map;
var infowindow;


/*
 * CoWorking space constructor, this contains a Coworking space's data all in one place
 */

var CoworkingSpace = function (aCoworkingSpace) {
    
    var self = this;

    // A CoWorking Space default data
    this.name = ko.observable(aCoworkingSpace.name);
    this.lat = ko.observable(aCoworkingSpace.lat);
    this.long = ko.observable(aCoworkingSpace.lng);
    this.marker = new google.maps.Marker({
        position: {lat: aCoworkingSpace.lat, lng: aCoworkingSpace.lng},
        text: aCoworkingSpace.name,
        title: aCoworkingSpace.name,
        animation: google.maps.Animation.DROP,
    });
    
    // Control the visiblity of a marker
    this.markerIsVisible = ko.observable(true);

    this.loadMarker = ko.computed(function() {
		if(this.markerIsVisible()) {
            this.marker.setMap(map);
		} else if (!this.markerIsVisible()){
            this.marker.setMap(null);
        } else {
            return true;
        }
    }, this);

    // Foursquare "Userless Server Integrations"
    this.fqLat = aCoworkingSpace.lat;
    this.fqLng = aCoworkingSpace.lng;
    this.fqClientId = 'NBZPGBLYTTAJCEHMK01X4JVTIBVQL3WBLE3RHEMN2RRFYU0X';
    this.fqClientSecret = '4AGMLAAI23FD3QZ24OSV3XETM4D1W1NUHVH0KOC3FFF5ZFOT';
    this.fqDate = '20170915';
    this.fqVenue = aCoworkingSpace.name;
    this.fsURL = 'https://api.foursquare.com/v2/venues/search?ll='+ 
                    this.fqLat + ',' + 
                    this.fqLng + '&client_id=' + 
                    this.fqClientId + '&client_secret=' + 
                    this.fqClientSecret + '&v=' + 
                    this.fqDate + '&query=' + 
                    this.fqVenue;
   

    // Get foursquare data!
    var name;
    var address;
    var desc;

    var fqData = $.ajax({
        'type': 'get',
        'url': this.fsURL,
        'success': function(data) {
            var venues = data.response.venues[0];
            // Check that a venue exists in Foursquare
            if (typeof venues !== 'undefined') {
                address = venues.location.address;
                desc = venues.categories[0].name; 
                // Check if there data for a specific property
                if (typeof address === 'undefined') {
                    address = 'No address available yet.';
                }
                // Check if there data for a specific property
                if (typeof desc === 'undefined') {
                    desc = 'No description available yet.';
                }
            }
            // Else tell the user this listing doesn't appear in FQ 
            else {
                address = 'Sorry, there is no data available';
                desc = 'Sorry, there is no data available';
            }
        }
    });

    // Toogle the content window for each marker
    infoWindow = new google.maps.InfoWindow();
    this.marker.addListener('click', function(){
        
        fqData.done(function() {
            infoWindow.setContent(
                '<div id="marker-content">'+
                '<h1 class="marker-name">' + self.name() + '</h1>'+
                '<div id="marker-body-content">'+
                    '<p class="marker-address">' + address + '</p>'+
                    '<p class="marker-desc">' + desc + '</p>'+
                '</div>'+
            '</div>'
            );
            
        });

        fqData.fail(function() {
            alert('Oops! Foursquare seems to be down, please try again.');
        });
    
        infoWindow.open(map, this);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 800);

    });

    // Add a click bind to show the content window
    this.showInfoWindow = function() {

        fqData.done(function() {
            infoWindow.setContent(
                '<div id="marker-content">'+
                '<h1 class="marker-name">' + self.name() + '</h1>'+
                '<div id="marker-body-content">'+
                    '<p class="marker-address">' + address + '</p>'+
                    '<p class="marker-desc">' + desc + '</p>'+
                '</div>'+
            '</div>'
            );
        });

        fqData.fail(function() {
            alert('Oops! Foursquare seems to be down, please try again.');
        });

        infoWindow.open(map, this.marker);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.marker.setAnimation(null);
        }, 800);
    };
 
};



/*
 * Define KO's ViewModel, this holds all the bindings to the view
 */

var viewModel = function() {

    var self = this;

    // Google Maps
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 6.2066054, lng: -75.5727518 },
        scrollwheel: false
    });

    // Create an Observable Array to load items into
    self.locationsArray = ko.observableArray([]);
    for (var i = 0; i < locations.length; i++) {
        self.locationsArray.push(new CoworkingSpace(locations[i]));
    }
    
    // Create an observable that holds the text being typed in search bar
    self.searchFilter = ko.observable("");

    // Create a Computed Observable to filter items in the filtered list view (HTML)
    // Filtering an array: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    self.searchFilterLocation = ko.computed(function() {
        var input = self.searchFilter().toLowerCase();
        var empty = false;
        // Define missing KO functionality in the minified KO file
        var stringStartsWith = function (string, startsWith) {          
            string = string || "";
            if (startsWith.length > string.length)
                return false;
            return string.substring(0, startsWith.length) === startsWith;
        };

		if (input === empty) {
            // Show locations
            self.locationsArray().forEach(function(coworkingSpace){
                coworkingSpace.markerIsVisible(true);
			});
			return self.locationsArray();
		} else {
            // Filter locations
            return ko.utils.arrayFilter(self.locationsArray(), function(coworkingSpace) {
				var result = stringStartsWith(coworkingSpace.name().toLowerCase(), input);
				coworkingSpace.markerIsVisible(result);
				return result;
			});
		}
    }, self);

};


/*
 * Launch the App!
 */

function init() {
    // Activate Materialize CSS' sidenav with jQuery
    $(".button-collapse").sideNav();

    // KO's apply binding
    ko.applyBindings(viewModel);

    console.log('App started!');
}

/* Defining the error handling function for google map */
var errorLoadingGMaps = function () {
    var errorMsg = "";

    errorMsg += '<div class="error-msg">';
    errorMsg += 'Oops! There seems to have been an error loading Google Maps, please try again later.';
    errorMsg += '</div>';

    $("#map").append(errorMsg);
};