export default Ember.View.extend({
  map: null,
  submissions: Ember.computed.oneWay('controller.allSubmissions'),

  domSetup: function() {

    var self = this;

    // for now, default to raleigh coords
    var mapOptions = {
      center: new google.maps.LatLng(35.779059, -78.638714),
      zoom: 12
    };

    this.set('map', new google.maps.Map(this.$('#map-canvas')[0], mapOptions));

  }.on('didInsertElement'),

  addMarkers: function() {
    var submissions = this.get('submissions');

    if (submissions !== undefined && submissions !== null) {
      var self = this;

      var submissions = this.get('submissions');
      var map = this.get('map');

      for (var i = 0, numMarkers = submissions.length; i < numMarkers; i++) {
        var submission = submissions[i];

        var position = new google.maps.LatLng(submission.get('latitude'), submission.get('longitude'));

        // To add the marker to the map, use the 'map' property
        submission.set('marker', new google.maps.Marker({
            position: position,
            map: map
        }));

        submission.get('marker').submission_id = submission.id;

        // add marker click event
        google.maps.event.addListener(submission.get('marker'), 'click', function() {
          map.setZoom(14);
          map.panTo(this.getPosition());

          self.controller.send('displayRequest', this.submission_id);
        });
      }
    }
  }.observes('submissions').on('didInsertElement'),

  addUserMaker: function() {
    var user = this.get('controller.currentUser');

    // add the user marker to the map once it has been located
    if (user.get('latitude') !== null && user.get('longitude') !== null) {

      var map = this.get('map');

      var position = new google.maps.LatLng(user.get('latitude'), user.get('longitude'));

      // center the map to the user's location
      map.panTo(position);

      // add location marker to the map
      var marker = new google.maps.Marker({
        position: position,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6
        },
        draggable: false,
        map: map
      });
    }
  }.observes('controller.currentUser.longitude', 'controller.currentUser.latitude').on('didInsertElement')
})
