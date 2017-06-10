function initMap() { var mitte = {lat: 52.514, lng: 13.392}; var map = new 
google.maps.Map(document.getElementById('map'), { zoom: 15, center: mitte, 
mapTypeControl: false, zoomControl: true, zoomControlOptions: { position: 
google.maps.ControlPosition.RIGHT_CENTER
},
scaleControl: true, streetViewControl: true, streetViewControlOptions: { 
position: google.maps.ControlPosition.RIGHT_CENTER
}
});
// set a marker like this: var marker = new google.maps.Marker({
   position: mitte, //this is a location stored in a var see above
 map: map //referring to set marker on this map as defined above
 });
}
