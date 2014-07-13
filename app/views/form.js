export default Ember.View.extend({
  map: null,
  submissions: Ember.computed.oneWay('controller.allSubmissions.content.content'),

  domSetup: function() {

    var mapOptions = {
      center: new google.maps.LatLng(35.779059, -78.638714),
      zoom: 10
    };

    this.set('map', new google.maps.Map(this.$('#map-canvas')[0], mapOptions));

  }.on('didInsertElement'),

  addMarkers: function() {
    var submissions = this.get('submissions');

    if (submissions != null) {

      var map = this.get('map');

      for (var i = 0, numMarkers = submissions.length; i < numMarkers; i++) {
        var submission = submissions[i];

        var position = new google.maps.LatLng(submission.get('latitude'), submission.get('longitude'));

        // To add the marker to the map, use the 'map' property
        var marker = new google.maps.Marker({
            position: position,
            map: map
        });
      }
    }
  }.observes('submissions').on('didInsertElement')
})
