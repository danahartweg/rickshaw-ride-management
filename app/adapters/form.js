import ApplicationAdapter from 'appkit/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function(type) {
    return type;
  }
});
