var Router = Ember.Router.extend();

Router.map(function () {
  this.resource('forms');
  this.resource('form', { path: '/form/:form_id' });
});

export default Router;
