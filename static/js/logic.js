var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    Street: street
  };
  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    Stations: bikeStations
  };
  
  // Create the map object with options.
  var bikeMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [street, bikeStations]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(bikeMap);
}
// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  var stationMarkers = [];
  // Loop through the stations array.
  for (let i=0; i<stations.length; i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    var location = [stations[i].lat, stations[i].lon];
    var marker = L.marker(location).bindPopup("<h1>" + stations[i].name + "</h1>");
    // Add the marker to the bikeMarkers array.
    stationMarkers.push(marker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  var bikeStations = L.layerGroup(stationMarkers);

  createMap(bikeStations);
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
const url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

d3.json(url).then(function(data) {
  createMarkers(data);
});