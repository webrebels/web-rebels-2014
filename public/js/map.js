(function(){

  var map;
  var locations = {
      venue : { title : 'Conference Venue', lat : 59.922807, lng : 10.751388 }
  };

  function showMap() {
      var map = L.map('map').setView([locations.venue.lat, locations.venue.lng], 15);
      L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 5
      }).addTo(map);

      L.marker([locations.venue.lat, locations.venue.lng]).addTo(map)
          .bindPopup('Conference Venue:<br/>Scandic Vulkan<br/>Maridalsveien 13 A')
          .openPopup();
  }

  // showMap needs to be global for async map loading
  window["showMap"] = showMap;

  function loadMap() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//cdn.leafletjs.com/leaflet-0.7.2/leaflet.js";
      script.onload = showMap;
      document.body.appendChild(script);
  }
  loadMap();
}());