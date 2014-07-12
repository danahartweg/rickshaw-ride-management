export default DS.Model.extend({
  name: DS.attr('string'),

  belongsTo: DS.belongsTo('form')
})
