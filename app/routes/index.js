export default Ember.Route.extend({  
  redirect: function() {
    // temporary hard coded redirect to the main form
    // should store this in a config var
    this.transitionTo('form', 1783348);
  }
});
