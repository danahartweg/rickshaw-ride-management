export default DS.Model.extend({
  name: DS.attr('string'),

  form: DS.belongsTo('form', { async: 'false' })
})
