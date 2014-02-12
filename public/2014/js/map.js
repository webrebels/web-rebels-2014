(function(){

  var map;
  var locations = {
      venue : { title : 'Conference Venue', lat : 59.922807, lng : 10.751388 }
  };

  function showMap() {
      var options = {
          zoom: 15,
          center: new google.maps.LatLng( locations.venue.lat, locations.venue.lng ),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
      };
      map = new google.maps.Map(document.getElementById('map'), options );

      var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          title: locations.venue.title
      });

      google.maps.event.addDomListener( window, 'resize', function() {
          map.setCenter( map.getCenter() );
      });
  }

  // showMap needs to be global for async map loading
  window["showMap"] = showMap;

  function loadMap() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=showMap";
      document.body.appendChild(script);

      
  }
  loadMap();
}());