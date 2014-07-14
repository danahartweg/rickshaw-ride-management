export default DS.Model.extend({
  timestamp: DS.attr('string'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  form: DS.belongsTo('form', { async: 'false', embedded: 'always' }),

  submissionData: null,

  createEmptyArray: function() {
    this.submissionData = [];
  }.on('init'),

  findSubmissionData: function() {
    var adapter = this.store.adapterFor('submission');
    var store = this.store;
    var self = this;

    var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + this.get('id');

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

        // self.assignAdditionalProperties();
      },
      error: function(error) {
        console.log('there was an error: ' + error);
      }
    });
  }.on('didLoad')
});
