export default DS.Model.extend({
  timestamp: DS.attr('date'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  form: DS.belongsTo('form', { async: 'false' })
});
