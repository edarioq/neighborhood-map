/*
 * Model
 */

var locations = [
    {
        name: 'Siembra Coworking',
        lat: 6.2104954,
        long: -75.5677766,
    },
    {   
        name: 'Entreviñetas',
        lat: 6.2095819,
        long: -75.5711447,
    },
    {   
        name: 'Tinkko Coworking',
        lat: 6.2126192,
        long: -75.5722686,
    },
    {
        name: 'AtomHouse',
        lat: 6.209196,
        long: -75.573853,
    },
    {
        name: 'NODO Coworking - Astorga',
        lat: 6.2094639,
        long: -75.5763566,
    },
];

/*
 * View
 */
 $(function() {
    $(".button-collapse").sideNav();
 });

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 6.2066054, lng: -75.5727518 },
        scrollwheel: false
    });

    

}   

var locationData = function() {
    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: {lat: locations[i].lat, lng: locations[i].long},
            map: map,
            title: 'Hello World!'
        });
    }
}

var viewModel = function() {
    var self = this;

    self.filterLocation = ko.observable("");

    var locationsArray = ko.observableArray(locations);

    console.log(locationsArray());
};

ko.applyBindings(viewModel);