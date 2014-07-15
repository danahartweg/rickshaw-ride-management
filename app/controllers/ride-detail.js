export default Ember.Controller.extend({
  needs: 'user',
  currentUser: Ember.computed.oneWay('controllers.user.model'),

  actions: {
    claimSubmission: function(submission) {
      var self = this;
      var adapter = self.store.adapterFor('submission');
      var store = self.store;

      var requestURL = adapter.host + '/' + adapter.namespace + '/submission/' + submission.get('id');
      var putData = {};

      putData['read'] = 1;

      // random bug would sometimes not assign the field id, hardcoded temporarily
      putData['field_26537172'] = self.get('currentUser.name');
      putData['field_' + submission.get('status.field.id')] = 'assigned';

      $.ajax({
        url: requestURL,
        type: 'PUT',
        headers: adapter.headers,
        data: putData,
        success: function(response) {
          if (submission.get('assigned.value') !== undefined) {
            submission.set('assigned.value', self.get('currentUser.name'));
          };

          submission.set('status.value', 'assigned');
        },
        error: function(error) {
          console.log('there was an error: ' + error);
        }
      });
    }
  }
});
