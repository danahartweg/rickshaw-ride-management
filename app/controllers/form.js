export default Ember.ObjectController.extend({
  allSubmissions: function() {
    return this.get('submissions.content.content');
    // return this.get('submissions').filterProperty('isOpen', true);
  }.property('submissions.@each')
})
