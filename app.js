let map;
//argument didn't matter zzzz
function haversine_distance(marker1, marker2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = marker1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = marker2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (marker2.position.lng()-marker1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}









//in edit

function initMap() {

  
//mapcreation  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 56.1304, lng: -106.3468 },
    zoom: 4,
  });

  

/*
  var emily = { lat: 45.4215, lng: -75.6972 }



  new google.maps.Marker({
    position: emily,
    map,
    title: "emily is cool",

  });
  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">Emily</h1>' +
  '<div id="bodyContent">' +
  "<p><b>Cool Kid</b>, also referred to as <b>cs emily or bb emily</b></p>"

  "</div>" +
  "</div>";
const infowindow = new google.maps.InfoWindow({
  content: contentString,
});



//emily ottawa for honorary marker- will be commented out later.

var marker = new google.maps.Marker({position: emily, map: map});


marker.addListener("click", () => {
  infowindow.open({
    anchor: marker,
    map,
    shouldFocus: false,
  });
});
*/


//dennis
const dennis = { lat: 43.6532, lng: -79.3832 }



new google.maps.Marker({
  position: dennis,
  map,
  title: "dennis is cool",

});


const contentString1 =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Dennis</h1>' +
'<div id="bodyContent">' +
"<p><b>Cool Kid</b>, also referred to as <b>cs Dennis or EUDennis</b></p>"

"</div>" +
"</div>";


const infowindow1 = new google.maps.InfoWindow({
content: contentString1,
});

var marker1 = new google.maps.Marker({position: dennis, map: map});


marker1.addListener("click", () => {
infowindow1.open({
  anchor: marker1,
  map,
  shouldFocus: false,
});
});

//browns
const browns = { lat: 43.6491, lng: -79.4844 }



new google.maps.Marker({
  position: browns,
  map,
  title: "dennis is cool",

});


const contentString2 =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Browns sports</h1>' +
'<div id="bodyContent">' +
"<p><b></b>First place I ever had my racket strung. A bit pricey <b>(right next to Jane station)</b></p>"

"</div>" +
"</div>";


const infowindow2 = new google.maps.InfoWindow({
content: contentString2,
});

var marker2 = new google.maps.Marker({position: browns, map: map});


marker2.addListener("click", () => {
infowindow2.open({
  anchor: marker2,
  map,
  shouldFocus: false,
});
});

const epic = { lat: 43.734027, lng: -79.282724 }



new google.maps.Marker({
  position: epic,
  map,
  title: "dennis is cool",

});


const contentString3 =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Epic sports</h1>' +
'<div id="bodyContent">' +
"<p><b></b>Big Dropin Center. Very popular place to play and Jamie is a cool dude. <b>(Warden station -> take the 17 to Bertrand)</b></p>"

"</div>" +
"</div>";


const infowindow3 = new google.maps.InfoWindow({
content: contentString3,
});

var marker3 = new google.maps.Marker({position: epic, map: map});


marker3.addListener("click", () => {
infowindow3.open({
  anchor: marker3,
  map,
  shouldFocus: false,
});
});



const everyday = { lat: 43.83165, lng: -79.32951 }



new google.maps.Marker({
  position: everyday,
  map,
  title: "dennis is cool",

});


const contentString4 =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Everyday Badminton</h1>' +
'<div id="bodyContent">' +
"<p><b></b>Badminton center- offers some lessons as well. Not very expensive. <b>(Also ping pong can be played here)</b></p>"

"</div>" +
"</div>";


const infowindow4 = new google.maps.InfoWindow({
content: contentString4,
});

var marker4 = new google.maps.Marker({position: everyday, map: map});


marker4.addListener("click", () => {
infowindow4.open({
  anchor: marker4,
  map,
  shouldFocus: false,
});
});

//input stuff
document.getElementById("button1").addEventListener("click", inpput);

function inpput(){


  //debug
  var latnew = parseFloat(document.getElementById("lat").value);
  var lngnew = parseFloat(document.getElementById("lng").value);
  var x = latnew + lngnew;

  //document.write(x);

  //document.write(latnew);   
  //document.write(lngnew);

  //document.write(emily);


  var userlocation = new google.maps.Marker({
    position: {lat: latnew, lng: lngnew},
    map,
    title: "dennis is cool",
  


  });


const dest = new Array(marker1, marker2, marker3, marker4);


//uh distance matrix ig?
var d2 = haversine_distance(userlocation, marker1);
var mkfin = marker1;
for(let i = 0; i<dest.length; i++){
  if (d2>=haversine_distance(userlocation, dest[i])){
    d2 = haversine_distance(userlocation, dest[i]);
    mkfin = dest[i];
  }        
  else{
    d2 = d2;
  }                                                                              
}



// Draw a line showing the straight distance between the markers
//working now
var line = new google.maps.Polyline({path: [userlocation.position, mkfin.position], map: map});

// Calculate and display the distance between markers
//var distance = haversine_distance(marker, marker1);
document.getElementById('msg').innerHTML = "Closest distance is to: " + mkfin.position + " and is " + d2.toFixed(2) + " miles.";
}




}