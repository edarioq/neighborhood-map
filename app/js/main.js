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
        name: 'NODO Coworking - Astorga',
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
        name: 'Global Express Travel & Business Center',
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

/*
 * CoWorking space constructor, this contains and binds a Coworking space's data in one place
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

    // Add information and animations to a marker when clicked
    var contentString =
        '<div id="marker-content">'+
            '<h1 class="marker-name">' + this.name() + '</h1>'+
            '<div id="marker-body-content">'+
                '<p>' + this.name() + ': Is some text describing this location.</p>'+
            '</div>'+
        '</div>';

    this.infoWindow = new google.maps.InfoWindow({
        maxWidth: 400,
        content: contentString
    });

    this.marker.addListener('click', function(){
        self.infoWindow.open(map, this);
        this.setAnimation(google.maps.Animation.BOUNCE);
    });
        
    

};


/*
 * Define KO's ViewModel
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

    // Add a click bind to show the content window
    this.showInfoWindow = function() {
        this.infoWindow.open(map, this.marker);
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

};


/*
 * Launch the App!
 */

function init() {
    $(".button-collapse").sideNav();
    ko.applyBindings(viewModel);
    console.log('App started!');
}
