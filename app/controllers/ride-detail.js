export default Ember.Controller.extend({
  phone: function() {
    return this.findProperData('phone');
  }.property().volatile(),

  email: function() {
    return this.findProperData('email');
  }.property().volatile(),

  message: function() {
    return this.findProperData('special_considerations');
  }.property().volatile(),

  findProperData: function(type) {
    var self = this;
    var submissionData = this.get('model.submissionData');

    for (var i = 0, size = submissionData.length; i < size; i++) {
      var item = submissionData[i];

      if (item.get('field.name') === type) {
        return item;
      };
    }
  }
});
