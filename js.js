
												//***Various Functions***//
function initMap() {
// Constructor creates a new map - only center and zoom are required.
		map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.73776, lng: 76.783288},
        zoom: 13,
		styles: styles,
		mapTypeControl: false});

var infowindow = new google.maps.InfoWindow();
//creating marker images and styles..
	var defaultIcon = makeMarkerIcon("0091ff");
	var highlightedIcon = makeMarkerIcon("FFFF24");
		//Search box is created for various searches in the city..
		var searchBox = new google.maps.places.SearchBox(
		document.getElementById('places-search'));
		searchBox.setBounds(map.getBounds());

	
        for (var i =0; i < locations.length; i++) {
		  // Get the position from the coordinates array.
          var position = locations[i].coordinates;
          var title = locations[i].title;
          // Marker is created for each coordinate to detail it..
          var marker = new google.maps.Marker({
            icon: defaultIcon,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Creating Markers..
          markers.push(marker);
		  //Creating mouseover marker image..
	  marker.addListener('mouseover', function(){
	this.setIcon(highlightedIcon);
	});
	//Creating markerout images..
	marker.addListener('mouseout',function(){
	this.setIcon(defaultIcon);
	});
	searchBox.addListener('places_changed',function(){
	searchBoxPlaces(this);
	});
	//document.getElementById('go-places').addEventListener('click',textSearchPlaces);
	
	
          // Onclick event to open infowindow on each marker..
          marker.addListener('click', function() {
			   var sel = this;
           populateInfoWindow(this, infowindow);
           toggleBounce(this);
           setTimeout(function(){
             sel.setAnimation(null);
           },2000);
			  
			  
            populateInfoWindow(this, infowindow);
          });
         // bounds.extend(markers[i].position);
        }
		var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        
		
		//document.getElementById('show-listings').addEventListener('click', showListings);
	document.getElementById('hide-listings').addEventListener('click', hideMarkers);
	//document.getElementById('hide-listings').addEventListener('click', hideListings);
      };
	  
	  //Function to find the selected place in the search box...
	  function searchBoxPlaces(searchBox){
	hideMarkers(placeMarkers);
	var places = searchBox.getPlaces();
	if(places.length == 0){
	window.alert('we did not find your selected place');
	}
	}
	
	//Creating markers for places.......
	function createMarkersForPlaces(places){
	var bounds = new google.maps.LatLngBounds();
	for(var i=0; i < places.length; i++){
	var place = places[i];
	var icon = {
	url: place.icon,
	size: new google.maps.Size(35, 35),
	origin: new google.maps.Point(0,0),
	anchor: new google.maps.Point(15,34),
	scaledSize: new google.maps.Size(25,25)
	};
		var marker = new google.maps.Marker({
	map: map,
	icon: icon,
	title: place.name,
	position: place.geometry.location,
	id: place.id
	});
	//tiredof writing comments for each line.....
	placeMarkers.push(marker);
	if(place.geometry.viewport){
	bounds.union(place.geometry.viewport);
	}else{
	bounds.extend(place.geometry.location);
	}
	}
	map.fitBounds(bounds);
	}
	//Hidemarker funciton to hide markers......
//working with hideMarker function() but hidemarkers then 
	function hideMarkers(markers){
	for(var i=0; i < markers.length; i++){
	markers[i].setMap(null);
	}
}
	  //Bounce function to give bounce to marker when clicked......
      function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
//fxn to alert tht internet connection is not write or something is wrong with google map api's...............
      function googleError(){
        alert("Map is unable to load ");
    }
	//function to create image of marker icon colorfull...
	function makeMarkerIcon(markerColor){
		var markerImage = new google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
		new google.maps.Size(21,34),
		new google.maps.Point(0,0),
		new google.maps.Point(10,34),
		new google.maps.Size(21,34));
		return markerImage;
		}
	 
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position................
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker......//
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // to make sure if marker is cleared....//
          infowindow.addListener('closeclick',function(){
            infowindow.setContent(null);
          });
        }
      };
																		//VIEWMODEL//
	  
	  var viewmodel = {
    //observable array is used here to store data from normal array..
    obserTitle : ko.observableArray(['Rock Garden','Zakir Hussain Rose Garden','Japanese Garden','Indian Coffee House','Sukhna Lake','Elante Mall','Postgraduate Institute of Medical Education and Research','Panjab University']),

    obserTitle1 : ['Rock Garden','Zakir Hussain Rose Garden','Japanese Garden','Indian Coffee House','Sukhna Lake','Elante Mall','Postgraduate Institute of Medical Education and Research','Panjab University'],
//knockout is used to observ on wikiInfo..
    wikiInfo : ko.observable(''),
	
//getting data from wikipedia..
//concept from the class videos tutorial..
   getWikiInfo : function(data){
    
// URL of wikipedia to load data..
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + data + '&format=json&callback=wikiCallback';

//If wikipedia couldnot load the data then failure message is shown..
    var wikiRequestTimeout = setTimeout(function(){
        alert("TimeOut!! Couldnot fetch data from wikipedia");
   }, 8000);
      $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        //jsonp: "callback",
        success: function( response ) {
            var articleList = response[2];
            viewmodel.wikiInfo(articleList[0]);
            clearTimeout(wikiRequestTimeout);
        }
    });
},

//shows the markers when clicked on this button..
show_listings: 	function(){
		var bounds = new google.maps.LatLngBounds();

		for(var i=0; i< markers.length; i++){
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
		}
		map.fitBounds(bounds);
	},
	
hide_listings: 
//button function to hide markers..
	function (){
	for(var i=0; i < markers.length; i++){
	markers[i].setMap(null);
	}
},	

	
	//button function which clicked goes to selected places..
	go_places: function(){
		var bounds = map.getBounds();
		hideMarkers(placeMarkers);
		var placesService = new google.maps.places.PlacesService(map);
		placesService.textSearch({
		query: document.getElementById('places-search').value,
		bounds: bounds
	}, function(results, status){
	if(status == google.maps.places.PlacesServiceStatus.OK){
	createMarkersForPlaces(results);
	}
	//But this doesnot work....
	else{
		alert("Enter a valid ");
	}
	});
	},
	

//wiki info is shown in this by fetching from website..
  showDetails : function(data){
    var click = 0;
  var largeInfo = new google.maps.InfoWindow();
     for(var j = 0 ; j < markers.length ; j++){
      markers[j].setAnimation(null);
      if(markers[j].title === data){
        click = j;
        populateInfoWindow(markers[j],largeInfo);
        viewmodel.getWikiInfo(markers[j].title);
        markers[j].setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      setTimeout(function(){
             markers[click].setAnimation(null);
      },2000);
},

//num variable to store response from input
//query observes the input from user..
//which is stored in value as value: q
//concept understood from knockout website..
 q : ko.observable(''),

//Filter function to filter the list and markers on map..
 search : function(value) {

// concatinating the xpression wid value..
    var num = "^"+value+".*$";

//to perform search matching purposes..
//w3schools.com for reference..
    var rx = new RegExp(num,'i');
    viewmodel.obserTitle.removeAll();
//fucntion is applied for refinement..
    for(var i = 0 ; i < viewmodel.obserTitle1.length ; i++){
      if(viewmodel.obserTitle1[i].match(rx)) {
        viewmodel.obserTitle.push(viewmodel.obserTitle1[i]);
        markers[i].setVisible(true);
      }
      else{
        markers[i].setVisible(false);
      }
    }
  }
};


viewmodel.q.subscribe(viewmodel.search);
//Binding values for knockout library
ko.applyBindings(viewmodel);
