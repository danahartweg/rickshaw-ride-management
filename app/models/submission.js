export default DS.Model.extend({
  timestamp: DS.attr('string'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  form: DS.belongsTo('form', { async: 'false', embedded: 'always' }),

  submissionData: [],

  findSubmissionData: function() {
    var adapter = this.store.adapterFor('submission');
    var self = this;

    var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + this.get('id');

    return $.ajax({
      url: requestURL,
      type: 'GET',
      headers: adapter.headers,
      success: function(response) {
        self.set('submissionData', response.data);
      },
      error: function(error) {
        console.log('there was an error: ' + error);
      }
    });
  }.on('didLoad')
});
