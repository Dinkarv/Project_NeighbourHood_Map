		  		
function initMap() {
// Constructor creates a new map - only center and zoom are required.
		map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.73776, lng: 76.783288},
        zoom: 13,
		styles: styles,
		mapTypeControl: false});

var infowindow = new google.maps.InfoWindow();
	var defaultIcon = makeMarkerIcon("0091ff");
	var highlightedIcon = makeMarkerIcon("FFFF24");
		
		var searchBox = new google.maps.places.SearchBox(
		document.getElementById('places-search'));
		searchBox.setBounds(map.getBounds());

	
        // The following group uses the coordinates array to create an array of markers on initialize.
        for (var i =0; i < locations.length; i++) {
		  // Get the position from the coordinates array.
          var position = locations[i].coordinates;
          var title = locations[i].title;
          // Create a marker per coordinates, and put into markers array.
          var marker = new google.maps.Marker({
            icon: defaultIcon,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
	  marker.addListener('mouseover', function(){
	this.setIcon(highlightedIcon);
	});
	marker.addListener('mouseout',function(){
	this.setIcon(defaultIcon);
	});
	searchBox.addListener('places_changed',function(){
	searchBoxPlaces(this);
	});
	document.getElementById('go-places').addEventListener('click',textSearchPlaces);
	
	
          // Create an onclick event to open an infowindow at each marker.
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
        
		
		document.getElementById('show-listings').addEventListener('click', showListings);
	document.getElementById('hide-listings').addEventListener('click', hideMarkers);
      };
	  
	  function searchBoxPlaces(searchBox){
	hideMarkers(placeMarkers);
	var places = searchBox.getPlaces();
	if(places.length == 0){
	window.alert('we did not find your selected place');
	}
	}
	
	function textSearchPlaces(){
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
	});
	}
	
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
	placeMarkers.push(marker);
	if(place.geometry.viewport){
	bounds.union(place.geometry.viewport);
	}else{
	bounds.extend(place.geometry.location);
	}
	}
	map.fitBounds(bounds);
	}
	
	function showListings(){
		var bounds = new google.maps.LatLngBounds();

		for(var i=0; i< markers.length; i++){
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
		}
		map.fitBounds(bounds);
	}
	
	function hideMarkers(markers){
	for(var i=0; i < markers.length; i++){
	markers[i].setMap(null);
	}
	}
	  //toggle function to give bounce animation when ever list or marker is clicked
      function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
//function to alert the user that map is not available or key is wrong
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
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setContent(null);
          });
        }
      };
	  
	  var viewmodel = {
    //Saving the reference of 'this' to another variable self
    //observable array to save title from normal array
    obserTitle : ko.observableArray(['Rose Garden','Rock Garden','Chandigarh Museum','Indian Coffee House','Sukhna Lake','Elante Mall','PGI']),

    obserTitle1 : ['Rose Garden','Rock Garden','Chandigarh Museum','Indian Coffee House','Sukhna Lake','Elante Mall','PGI'],

    wikiInfo : ko.observable(''),
  //Fetch info from wiki pages using jsonp
   getWikiInfo : function(data){
      // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + data + '&format=json&callback=wikiCallback';

     //Print message in dialogue box that wikipedia is failed to load resources
    var wikiRequestTimeout = setTimeout(function(){
        alert("failed to get wikipedia resources");
   }, 8000);
      $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[2];
            viewmodel.wikiInfo(articleList[0]);
            clearTimeout(wikiRequestTimeout);
        }
    });
},

//shows the details by fetching the info from wiki api and by invoking the click event
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
 query : ko.observable(''),

//Filter function to filter the list and markers on map
 search : function(value) {

// preparing regular expression by concatinating with experssions
    var num = "^"+value+".*$";

//Converting num variable into regular expression
    var re = new RegExp(num,'i');
    viewmodel.obserTitle.removeAll();
//Refining results
    for(var i = 0 ; i < viewmodel.obserTitle1.length ; i++){
      if(viewmodel.obserTitle1[i].match(re)) {
        viewmodel.obserTitle.push(viewmodel.obserTitle1[i]);
        markers[i].setVisible(true);
      }
      else{
        markers[i].setVisible(false);
      }
    }
  }
};


viewmodel.query.subscribe(viewmodel.search);
//Binding values for knockout library
ko.applyBindings(viewmodel);
