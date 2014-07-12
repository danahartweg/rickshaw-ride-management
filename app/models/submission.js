export default DS.Model.extend({
  timestamp: DS.attr('date'),

  latitude: DS.attr('number'),
  longitude: DS.attr('number'),

  data: DS.attr(),

  form: DS.belongsTo('form')
});
