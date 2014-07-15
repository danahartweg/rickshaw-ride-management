export default DS.Model.extend({
  timestamp: DS.attr('string'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  form: DS.belongsTo('form', { async: 'false', embedded: 'always' }),

  submissionData: null,

  hasMessage: function() {
    return ( this.get('message.value.length') > 0 ) ? true : false;
  }.property('message.value'),

  isAssigned: function() {
    return ( this.get('assigned.value.length') > 0 ) ? true : false;
  }.property('assigned.value'),

  phone: function() {
    return this.findProperData('phone');
  }.property(),

  email: function() {
    return this.findProperData('email');
  }.property(),

  message: function() {
    return this.findProperData('special_considerations');
  }.property(),

  assigned: function() {
    return this.findProperData('assigned');
  }.property(),

  status: function() {
    return this.findProperData('status');
  }.property(),

  findProperData: function(type) {
    var submissionData = this.get('submissionData');

    for (var i = 0, size = submissionData.length; i < size; i++) {
      var item = submissionData[i];

      if (item.get('field.name') === type) {
        return item;
      };
    }
  },

  navigateURL: function() {
    return 'https://www.google.com/maps/dir/Current+Location/' + this.get('latitude') + ',' + this.get('longitude');
  }.property('latitude'),

  createEmptyArray: function() {
    this.submissionData = [];
  }.on('init'),

  findSubmissionData: function() {
    var self = this;
    var adapter = self.store.adapterFor('submission');
    var store = self.store;

    var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + self.get('id');

    return $.ajax({
      url: requestURL,
      type: 'GET',
      headers: adapter.headers,
      success: function(response) {
        response.data.forEach(function(data){
          var newData = store.createRecord('submissionData', {
            value: data.value,
            field: store.find('field', data.field)
          });

          self.get('submissionData').addObject(newData);
        });
      },
      error: function(error) {
        console.log('there was an error: ' + error);
      }
    });
  }.on('didLoad')
});
