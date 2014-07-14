export default Ember.Route.extend({
  beforeModel: function() {
    this.store.find('form');
  },

  actions: {
    dismissModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  }
});
