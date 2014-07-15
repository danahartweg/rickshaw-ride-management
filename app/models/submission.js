export default DS.Model.extend({
  timestamp: DS.attr('string'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  marker: null,

  form: DS.belongsTo('form', { async: 'false', embedded: 'always' }),

  submissionData: null,

  hasMessage: function() {
    return ( this.get('message.value.length') > 0 ) ? true : false;
  }.property('message.value'),

  isAssigned: function() {
    return ( this.get('status.value') === 'assigned' ) ? true : false;
  }.property('status.value'),

  phone: function() {
    return this.findProperData('phone');
  }.property(),

  email: function() {
    return this.findProperData('email');
  }.property(),

  message: function() {
    return this.findProperData('special_considerations');
  }.property(),

  assigned_person: function() {
    return this.findProperData('assigned');
  }.property(),

  status: function() {
    return this.findProperData('status');
  }.property(),

  findProperData: function(type) {
    var submissionData = this.get('submissionData');

    for (var i = 0, size = submissionData.length; i < size; i++) {
      var item = submissionData[i];
      
      if (item.get('field.name') === type.toString()) {
        return item;
      };
    }
  },

  navigateURL: function() {
    return 'https://www.google.com/maps/dir/Current+Location/' + this.get('latitude') + ',' + this.get('longitude');
  }.property('latitude', 'longitude'),

  // setMarkerIcon: function() {
  //   // if the marker is assigned, change the icon
  //   if (this.get('isAssigned') === true) {
  //     this.get('marker').setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
  //   };
  // }.observes('marker').on('didCreate'),

  createEmptyArray: function() {
    this.set('submissionData', new Ember.A());
  }.on('init'),

  findSubmissionData: function() {
    var self = this;
    var adapter = this.store.adapterFor('submission');
    var store = this.store;

    var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + self.get('id');

    return $.ajax({
      url: requestURL,
      type: 'GET',
      headers: adapter.headers,
      success: function(response) {
        for (var i = 0, size = response.data.length; i < size; i++) {
          var data = response.data[i];

          var newData = store.createRecord('submissionData', {
            value: data.value,
            field: store.find('field', data.field)
          });

          self.get('submissionData').addObject(newData);
        };
      },
      error: function(error) {
        console.log('there was an error: ' + error);
      }
    });
  }.on('didLoad')
});
