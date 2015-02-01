/* jshint browser: true, strict: true */
/* global define */

define('map', function(require, exports) {

    "use strict";

    var mapElement  = document.getElementById('map'),
        venueLatLng = [59.922807, 10.751388],
        map;

    if (mapElement) {
        map = L.map(mapElement);

        map.setView(venueLatLng, 15);

        L.Icon.Default.imagePath = '/img';

        L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 5
        }).addTo(map);

        L.marker(venueLatLng)
            .addTo(map)
            .bindPopup('Conference Venue:<br>Scandic Vulkan<br>Maridalsveien 13 A')
            .openPopup();
    }

});
