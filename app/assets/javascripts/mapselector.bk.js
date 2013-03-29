


google.maps.event.addDomListener(window, "load", function() {
  //
  // initialize map
  //
  var latlong;
  var map;
  $.get("/photos/100.json", function(data) {
    latlong = data
    var map = new google.maps.Map(document.getElementById("mapdiv"), {
      center: new google.maps.LatLng(latlong.latitude, latlong.longitude),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      draggable: true,
      map: map
    });
    //
    // intercept map and marker movements
    //
    google.maps.event.addListener(map, "idle", function() {
      marker.setPosition(map.getCenter());
      document.getElementById("mapoutput").innerHTML = "<a href=\"https://maps.google.com/maps?q=" + encodeURIComponent(map.getCenter().toUrlValue()) + "\" target=\"_blank\" style=\"float: right;\">Go to maps.google.com</a>Latitude: " + map.getCenter().lat().toFixed(6) + "<br>Longitude: " + map.getCenter().lng().toFixed(6);
    });
    google.maps.event.addListener(marker, "dragend", function(mapEvent) {
      map.panTo(mapEvent.latLng);
    });
    //
    // initialize geocoder
    //
    var geocoder = new google.maps.Geocoder();
    google.maps.event.addDomListener(document.getElementById("mapform"), "submit", function(domEvent) {
      if (domEvent.preventDefault){
        domEvent.preventDefault();
      } else {
        domEvent.returnValue = false;
      }
      geocoder.geocode({
        address: document.getElementById("mapinput").value
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var result = results[0];
          document.getElementById("mapinput").value = result.formatted_address;
          if (result.geometry.viewport) {
            map.fitBounds(result.geometry.viewport);
          }
          else {
            map.setCenter(result.geometry.location);
          }
        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
          alert("Sorry, the geocoder failed to locate the specified address.");
        } else {
          alert("Sorry, the geocoder failed with an internal error.");
        }
      });
    });
  })
      
  //
  // initialize marker
  //
  
});
