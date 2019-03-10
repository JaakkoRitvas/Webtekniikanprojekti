// We will select the element
const navigoi = document.querySelector('#navigoi a');

// We will create and map
const map = L.map('map');

// Adding openstreetmap to an empty container
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Setting up some options
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Custom icon for all the Mc Donald's
const mcPinPoint = L.icon({
    iconUrl: 'mcpinpoint.png',
    iconSize: [41, 60],
    iconAnchor: [21, 59],
    popupAnchor: [5, -60]

});

// function to add your own location to map
function addYourCurrentPosition(coord) {
    L.marker([coord.latitude, coord.longitude]).addTo(map);
}

// Senter map to certain cordinates
function updateMap(crd) {
    map.setView([crd.latitude, crd.longitude], 11);
}

// This will add a marker to map whit certain information
function addMarker(crd, teksti, ikoni) {
    L.marker([crd.latitude, crd.longitude], {icon: ikoni}).addTo(map)
        .bindPopup(teksti).on('popupopen', function () {
        navigoi.href = `https://www.google.com/maps/dir/?api=1&origin=${myLocation.latitude},${myLocation.longitude}&destination=${crd.latitude},${crd.longitude}&travelmode=driving`;
    });
}

// Global variable for your own location
let myLocation = null;

// Funktio that will be run after the location data is found
function success(pos) {
    myLocation = pos.coords;

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${myLocation.latitude}`);
    console.log(`Longitude: ${myLocation.longitude}`);
    console.log(`More or less ${myLocation.accuracy} meters.`);

    updateMap(myLocation);
    addYourCurrentPosition(myLocation);
    haeLatauspisteet();

}

// In case off error this will activate
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
// Start the navigation
navigator.geolocation.getCurrentPosition(success, error, options);

// This will add the restaurants to map from the json table using addMarker
function haeLatauspisteet() {

    d3.json('makkarit5.json').then(function (data) {
        console.log(data);
        for(i = 0; i < data.length; i++){
            const ravintolanNimi = data[i].nimi;
            const koordit = {
                latitude: data[i].latitude,
                longitude: data[i].longitude,
            };
            addMarker(koordit, ravintolanNimi, mcPinPoint)
        }
    })

}