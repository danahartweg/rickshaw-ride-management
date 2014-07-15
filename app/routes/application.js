import User from 'appkit/models/user';

export default Ember.Route.extend({
  beforeModel: function() {    
    // query for all forms
    this.store.find('form');
  },

  renderTemplate: function() {
    this.render('application');

    // prompt for user name on initial sartup
    var userName = $.cookie('FORMSTACK_USER');

    var userController = this.controllerFor('user');
    userController.set('model', User.create({ name: userName }));

    // if there was no existing user name, prompt for one
    if (userName === undefined) {
      this.render('userName', {
        into: 'application',
        outlet: 'modal',
        controller: userController,
        view: 'modal'
      });
    };
  },

  actions: {
    dismissModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  }
});
