export default Ember.View.extend({
  domSetup: function() {
    var controller = this.get('controller');
    var modal = $('#modal');

    modal.foundation('reveal', {
      animation: 'fade',
      dismiss_modal_class: 'button'
    });

    modal.foundation('reveal', 'open');

    // make sure the modal will be dismissed whenever it is hidden
    modal.on('closed', function () {
      // fire the modal disconnect when the animation has completed
      controller.send('dismissModal');
    });
  }.on('didInsertElement')
});
