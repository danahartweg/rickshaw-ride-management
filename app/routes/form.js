export default Ember.Route.extend({
  model: function(params){
    return this.store.find('form', params['form_id']);
  },

  actions: {
    displayRequest: function() {
      console.log('displaying requested ride');
    }
  }
})
