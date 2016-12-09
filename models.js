																	//***MODELS***//
//Declaring various variables that would b required in the fucntion........
var map;
var markers = [];
var placeMarkers = [];
//Various Locations where we want our markers to be set........
var locations =  [
          {title: 'Rock Garden', coordinates: {lat: 30.7525,lng: 76.8101}, wiki:' '},
          {title: 'Zakir Hussain Rose Garden', coordinates: {lat:  30.7461 , lng:  76.7820 },wiki:' '},
          {title: 'Japanese Garden', coordinates: {lat: 30.7036,lng: 76.7824},wiki:' '},
          {title: 'Indian Coffee House', coordinates: {lat: 30.7405,lng: 76.7805},wiki:' '},
          {title: 'Sukhna Lake', coordinates: {lat: 30.7333304 ,lng: 76.8166634},wiki:' '},
          {title: 'Elante Mall', coordinates: {lat: 30.7056,lng: 76.8013},wiki:' '},
		  {title: 'Postgraduate Institute of Medical Education and Research', coordinates: {lat:  30.7624,lng: 76.7763 },wiki:' '},
	       {title: 'Panjab University', coordinates: {lat: 30.7581,lng: 76.7684},wiki:' '}
		];
//Nightmode style is implemented on the map....
	var styles = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];
