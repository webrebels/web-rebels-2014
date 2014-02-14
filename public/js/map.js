(function(){

  var map;
  var venueLatLng = [59.922807, 10.751388 ];

  function showMap() {
      L.Icon.Default.imagePath = "/img";
      var map = L.map("map").setView(venueLatLng, 15);
      L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
          minZoom: 5
      }).addTo(map);

      L.marker(venueLatLng).addTo(map)
          .bindPopup("Conference Venue:<br/>Scandic Vulkan<br/>Maridalsveien 13 A")
          .openPopup();
  }

  function loadMap() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/js/leaflet.js";
      script.onload = showMap;
      document.body.appendChild(script);
  }
  loadMap();
}());