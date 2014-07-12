import ApplicationAdapter from 'appkit/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    return type;
  },

  // always grab the associated submissions when loading the form
  find: function(store, type, id) {
    var baseURL = this.buildURL(type.typeKey, id);

    console.log('finding form');
    
    return new Ember.RSVP.hash({
      form: this.ajax(baseURL, 'GET'),
      submissions: this.ajax(baseURL + '/submission', 'GET')
    });
  }
});
