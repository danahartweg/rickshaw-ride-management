export default Ember.Route.extend({
  actions: {
    dismissModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  }
});
