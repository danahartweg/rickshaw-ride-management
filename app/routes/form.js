export default Ember.Route.extend({
  model: function(params){
    return this.store.find('form', params['form_id']);
  },

  actions: {
    displayRequest: function(submission) {
      submission.findSubmissionData();

      var rideDetailController = this.controllerFor('rideDetail');
      rideDetailController.set('model', submission);

      console.log(submission);

      this.render('rideDetail', {
        into: 'application',
        outlet: 'modal',
        controller: rideDetailController,
        view: 'rideDetail'
      });
    }
  }
})
