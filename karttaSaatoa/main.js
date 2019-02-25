// Valitaan elementit joita halutaan muokata


// Luodaan tyhjä kartta
const mymap = L.map('map');

// Lisätään openstreet map tyhjään karttaan
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// Senter map to certain cordinates
function updateMap(coord) {
    mymap.setView([coord.latitude, coord.longitude], 11)
}


function addYourCurrentPosition(coord){
    L.marker([coord.latitude, coord.longitude]).addTo(mymap);
}

// Global where current location is stored
let myPosition = null;

function ifSuccess(pos) {
    myPosition = pos.coords;

    console.log('Your current position is:')
    console.log(`Latitude : ${myPosition.latitude}`);
    console.log(`Longitude: ${myPosition.longitude}`);
    console.log(`More or less ${myPosition.accuracy} meters.`);

    updateMap(myPosition);
    addYourCurrentPosition(myPosition);
    // TODO here will be added function to find nearest mcdonalds

}

// If there is an error getting the coords this will be run
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


navigator.geolocation.getCurrentPosition(ifSuccess, error, options);

d3.csv('makkarit.csv').then(function(data){
    for(i = 0; i < data.length; i++){
        L.marker([data.])
        console.log(data[i]);
    }

});
