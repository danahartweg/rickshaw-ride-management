export default Ember.View.extend({
  map: null,
  submissions: Ember.computed.oneWay('controller.allSubmissions.content.content'),

  domSetup: function() {

    var self = this;

    // for now, default to raleigh coords
    var mapOptions = {
      center: new google.maps.LatLng(35.779059, -78.638714),
      zoom: 12
    };

    this.set('map', new google.maps.Map(this.$('#map-canvas')[0], mapOptions));

    // attempt to geolocate client
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var position = new google.maps.LatLng(pos.coords.latitude,
                                          pos.coords.longitude);

        // center the map to the current location
        self.get('map').panTo(position);

        // add current location marker to the map
        var marker = new google.maps.Marker({
          position: position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          },
          draggable: false,
          map: self.get('map')
        });
      });
    };

  }.on('didInsertElement'),

  addMarkers: function() {
    var self = this;
    var submissions = this.get('submissions');

    if (submissions != null) {

      var map = this.get('map');

      for (var i = 0, numMarkers = submissions.length; i < numMarkers; i++) {
        var submission = submissions[i];

        var position = new google.maps.LatLng(submission.get('latitude'), submission.get('longitude'));

        // To add the marker to the map, use the 'map' property
        submission.set('marker', new google.maps.Marker({
            position: position,
            map: map
        }));

        // add marker click event
        google.maps.event.addListener(submission.get('marker'), 'click', function() {
          map.setZoom(14);
          map.panTo(this.getPosition());

          self.controller.send('displayRequest', submission);
        });
      }
    }
  }.observes('submissions').on('didInsertElement')
})
