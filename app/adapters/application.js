export default DS.RESTAdapter.extend({
  host: 'https://www.formstack.com',
  namespace: 'api/v2',

  headers: {
    'Authorization': 'Bearer ' + $.cookie('FORMSTACK_AUTH_TOKEN')
  }
});
