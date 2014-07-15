export default Ember.Object.extend({
  name: null,

  latitude: null,
  longitude: null,

  setCurrentLocation: function() {
    console.log(this.get('id'))
    console.log('running locate routine');
    var self = this;

    // attempt to geolocate the current user
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        self.set('latitude', pos.coords.latitude);
        self.set('longitude', pos.coords.longitude);

        console.log(self.get('latitude'));
        console.log(self.get('longitude'));
      });
    };
  }.on('create'),

  setCookie: function() {
    $.cookie('FORMSTACK_USER', this.get('name'));
  }.observes('name').on('init')
})
