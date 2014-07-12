export default Ember.Route.extend({
  init: function() {
    this.store.find('form');
    this._super();
  }
});
