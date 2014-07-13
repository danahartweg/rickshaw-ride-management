export default Ember.Route.extend({
  model: function(params){
    return this.store.find('form', params['form_id']);
  },

  actions: {
    displayRequest: function(submission_id) {

      var rideDetailController = this.controllerFor('rideDetail');
      rideDetailController.set('model', this.store.find('submission', submission_id));

      this.render('rideDetail', {
        into: 'application',
        outlet: 'modal',
        controller: rideDetailController,
        view: 'rideDetail'
      });
    }
  }
})
