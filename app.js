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

function input_marker(lati, long, titler, description){

  const location = { lat: lati, lng: long }
  const name = titler; 

  new google.maps.Marker({
  position: location,
  map,
  title: name,

  });


  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  '</div>' +
  '<h1 id="firstHeading" class="firstHeading">'+ titler +'</h1>' +
  '<div id="bodyContent">' +
  '<p><b>'+ titler +'</b> '+ description +'</p>'

  '</div>' +
  '</div>';


  const infowindow = new google.maps.InfoWindow({
  content: contentString,
  });

  var marker = new google.maps.Marker({position: location, map: map, title:name});


  marker.addListener("click", () => {
  infowindow.open({
  anchor: marker,
  map,
      shouldFocus: false,
  });
  });

  return marker;

}


//https://docs.google.com/spreadsheets/d/1sveiClSsYniK71ry7Kc4IaCkaUtIsQbifyji3m28SGM/edit?usp=sharing

const output = document.querySelector('.output');
const url = 'https://docs.google.com/spreadsheets/d/'
const ssid = '1sveiClSsYniK71ry7Kc4IaCkaUtIsQbifyji3m28SGM';
const query1 = `/gviz/tq?`;

const endpoint1 = `${url}${ssid}${query1}`;
//output.textContent = endpoint1;

fetch(endpoint1).then(res=>res.text()).then(data =>{
  const temp = (data.substr(47).slice(0,-2));
  console.log(temp);
  const json = JSON.parse(temp);
  console.log(json);

  console.log(json.table.rows);


  const rows = json.table.rows; 
  const col = json.table.columns; 

  rows.forEach((row)=>{
    //console.log(row.c[0].v);
    dest.push(input_marker(row.c[2].v, row.c[3].v, row.c[1].v, row.c[4].v));
    
    const temp1 = row.c;
    temp1.forEach((cell)=>{
      console.log(cell);

    });
    
  })

})
// iterate through arrays of data

//input function 

function initMap() {

//mapcreation  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 56.1304, lng: -106.3468 },
    zoom: 4,
  });

//geocode?
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  document.getElementById("submit").addEventListener("click", () => {
  geocodeLatLng(geocoder, map, infowindow);
  });
  function geocodeLatLng(geocoder, map, infowindow) {
  const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);

        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
  }

//array for locations
dest = new Array();
//console.log("test");
//console.log(dest.length);
//console.log(dest.length);

/*
dest.push(input_marker(43.6532, -79.3832, "Dennis' Badminton Stringing Service", "A cool badminton stringer named Dennis"));
dest.push(input_marker(43.6491, -79.4844, "Brown's Sports", "A sports shop next to Jane Station"));
dest.push(input_marker(43.734027, -79.282724, "Epic Sports", "A very popular dropin center with badminton stringing as well"));
dest.push(input_marker(43.83165, -79.32951, "Everyday Badminton", "A smaller dropin center with stringing services"));
dest.push(input_marker(43.625460, -79.508115, "ATR Sports", "A racket sport focused sports shop"));
dest.push(input_marker(43.819981, -79.331324, "JJ's Sports", "A very popular spot for stringing"));
*/

//input stuff

document.getElementById("button1").addEventListener("click", inpput);

var userlocation;
var line;
function inpput(){

  //polyline.setMap(null);
  //userlocation.setMap(null);
  //line.setMap(null);
  //debug
  var latnew = parseFloat(document.getElementById("lat").value);
  var lngnew = parseFloat(document.getElementById("lng").value);
  var x = latnew + lngnew;

  //document.write(x);

  //document.write(latnew);   
  //document.write(lngnew);

  //document.write(emily);


    userlocation = new google.maps.Marker({
    position: {lat: latnew, lng: lngnew},
    map,
    title: "dennis is cool",
  


  });

//uh distance matrix ig?
var d2 = haversine_distance(userlocation, dest[1]);
var mkfin = dest[1];
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
//delete old line?
line = new google.maps.Polyline({path: [userlocation.position, mkfin.position], map: map});

// Calculate and display the distance between markers
//var distance = haversine_distance(marker, marker1);
document.getElementById('msg').innerHTML = "Closest stringer is: " + mkfin.title + " at " + mkfin.position + " and is " + d2.toFixed(2)*1.60934 + " km away.";

//testing
  }




}