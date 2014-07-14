export default Ember.Controller.extend({
  actions: {
    claimSubmission: function(submission) {
      var self = this;
      var adapter = self.store.adapterFor('submission');
      var store = self.store;

      var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + submission.get('id');
      var putData = {};

      putData['read'] = 1;
      putData['field_' + submission.get('assigned.field.id')] = 'dana.hartweg@gmail.com';
      putData['field_' + submission.get('status.field.id')] = 'assigned';

      $.ajax({
        url: requestURL,
        type: 'PUT',
        headers: adapter.headers,
        data: putData,
        success: function(response) {
          submission.set('assigned.value', 'dana.hartweg@gmail.com');
          submission.set('status.value', 'assigned');
        },
        error: function(error) {
          console.log('there was an error: ' + error);
        }
      });
    }
  }
});
