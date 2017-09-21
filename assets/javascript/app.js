var map = null;
    var geocoder = null;
    var tripName;
    var infowindow;
    var radiusMiles;
    var radiusMeters;
    var tripLat = 32.8456138;
    var tripLng = -96.78309444;
    var startDate;
    var endDate;
    var tripLatLng;
    var locationAddress;
    var dateRangeEventful;


function variableSet() {
        tripName = $('#trip-name-input').val().trim();
        radiusMiles = $('#radius-input').val().trim();
        radiusMeters = radiusMiles*1600;
        startDate = $('#start-date-input').val().trim();
        // endDate = $('#end-date-input').val().trim();
        locationAddress = $('#destination-input').val().trim();
        // dateRangeEventful = "" + startDate + "00" + "-" + endDate+ "00";
        console.log(tripName);
        console.log(locationAddress);
        console.log(radiusMiles);
        console.log(radiusMeters);
        console.log(startDate);
        //console.log(endDate);

/* 

        // google Firebase database
// 

        var config = {
            apiKey: "AIzaSyCG_tJYx0prvIF8juqH03Imu9xNVxIdTFM",
            authDomain: "my-first-firebase-test-cb84c.firebaseapp.com",
            databaseURL: "https://my-first-firebase-test-cb84c.firebaseio.com",
            projectId: "my-first-firebase-test-cb84c",
            storageBucket: "my-first-firebase-test-cb84c.appspot.com",
            messagingSenderId: "749367150277"
        };

        firebase.initializeApp(config);
        var database = firebase.database();

  

   var tripName = "";
    var destination = "";
    var startDate = "";
    var endDate = "";
    var searchRadius = 0;

      $("#add-event-btn").on("click", function() {

  
  tripName = $('#trip-name-input').val().trim();
  destination = $('#destination-input').val().trim();
  startDate = $('#start-date-input').val().trim();
  endDate = $('#end-date-input').val().trim();
  searchRadius = $('#radius-input').val().trim();


        database.ref().push({
        tripName:  tripName,
        destination: locationAddress,
        startDate: startDate,
        // endDate: endDate,
        radiusMiles: radiusMiles,
        radiusMeters: radiusMeters,
    });

return false;
});



database.ref().on("child_added", function(snapshot) {
console.log(snapshot.val());


   tripName = snapshot.val().tripName;
   destination = snapshot.val().destination;
   startDate = snapshot.val().startDate;
   // endDate = snapshot.val().endDate;
   searchRadius = snapshot.val().searchRadius;

}); */


};;
// Google Maps API

   function initMap() {
        var mapCenter = {lat: 32.84561389, lng: -96.78309444};

        map = new google.maps.Map(document.getElementById('map'), {
          center: mapCenter,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
        });
//geocoding language below
        var locationForm = document.getElementById('location-form');

    // Listen for submit
          locationForm.addEventListener('submit', geocode);

          function geocode(e){
      // Prevent actual submit
         e.preventDefault();

      var location = document.getElementById('destination-input').value;

      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyC_nTVvqzEckQ6WzQmCV_POw6a80BmOQPo'
        }
      })
      .then(function(response){
        // Log full response



        tripLat = response.data.results[0].geometry.location.lat;
        tripLng = response.data.results[0].geometry.location.lng;
        var myLatlng = new google.maps.LatLng(tripLat, tripLng);
        map.setCenter(myLatlng);
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          // location: locationAddress,
          location: {lat: 32.84561389, lng: -96.78309444},
          radius:  1000,
          type: ['restaurant', 'amusement_park', 'art_gallery', 'bar', 'cafe', 'zoo', 'museum', ]
        }, callback);
        console.log(tripLat);
        console.log(tripLng);
        console.log(tripLatLng);

            })
      .catch(function(error){
        console.log(error);
      });
    }


}

 function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }






/* commented out HTML

function eventTitles(item, index) {
  $('#eventCardTitle').innerHTML(item.title);
  // $('#testEventful').append(item.description);
  $('#eventCardDate').innerHTML(item.start_time);
  // $('#testEventful').append(item.stop_time);
  $('#eventCardAddress').innerHTML(item.venue_address);
  $('#eventCardURL').innerHTML(item.url);


  console.log(item);
}

*/


function eventTitles(item, index) {
  $('#testEventful').append(item.title);
  $('#testEventful').append(item.description);
  $('#testEventful').append(item.start_time);
  $('#testEventful').append(item.stop_time);
  $('#testEventful').append(item.venue_address);
  $('#testEventful').append(item.url);


  console.log(item);
}



tripLatLng = "" + tripLat +", "+ tripLng;
function eventfulSearch()

{

   var eventfulEvents = {

      app_key: "QbptgGWg8B35m6cv",

     // q: "music",

      location: tripLatLng,

     //commented out the tripLatLong for now
      // location: tripLatLng,

      within: 10,

      "date": "2017092200-2017100200",

      page_size: 10,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", eventfulEvents, function(oData) {
     var eventArray = oData.events.event;
     eventArray.forEach(eventTitles);
           // Note: this relies on the custom toString() methods below

    });

}

// CALENDAR API CODE  CURRENTLY ONLY AN EXAMPLE

$(document).ready(function() {
    
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,listWeek,month'
      },

      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' }
      },

      defaultView: 'listWeek',
      defaultDate: '2017-09-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2017-09-01'
        },
        {
          title: 'Long Event',
          start: '2017-09-07',
          end: '2017-09-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-09-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2017-09-11',
          end: '2017-09-13'
        },
        {
          title: 'Meeting',
          start: '2017-09-12T10:30:00',
          end: '2017-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2017-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2017-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2017-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2017-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2017-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-09-28'
        }
      ]
    });
    
  });