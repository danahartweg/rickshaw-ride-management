export default DS.Model.extend({
  name: DS.attr('string'),
  last_submission_id: DS.attr('number'),
  last_submission_time: DS.attr('string'),

  fields: DS.hasMany('field', { async: 'false', embedded: 'always' }),
  submissions: DS.hasMany('submission', { async: 'false', embedded: 'always' })
});
