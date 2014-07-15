export default Ember.ObjectController.extend({
  needs: 'user',
  currentUser: Ember.computed.oneWay('controllers.user.model'),
  
  allSubmissions: function() {
    return this.get('submissions.content.content');
    // return this.get('submissions').filterProperty('isOpen', true);
  }.property('submissions.@each')
})
