import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  modulePrefix: 'appkit',
  Resolver: Resolver['default'],
});

// load error logging when using a development build
if (window.ENV.development) {
  App.reopen({
    LOG_ACTIVE_GENERATION: true,
    LOG_MODULE_RESOLVER: true,
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true,
    LOG_VIEW_LOOKUPS: true,
  });

  Ember.RSVP.configure('onerror', function(error) {
    // ensure unhandled promises raise awareness.
    // may result in false negatives, but visibility is more important
    if (error instanceof Error) {
      Ember.Logger.assert(false, error);
      Ember.Logger.error(error.stack);
    }
  });
};

export default App;
