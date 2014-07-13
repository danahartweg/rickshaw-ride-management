export default Ember.Controller.extend({
  submissionData: function() {
    return this.get('model.submissionData');
  }.property('model.submissionData')
});
