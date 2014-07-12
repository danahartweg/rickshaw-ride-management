export default DS.Model.extend({
  name: DS.attr('string'),
  last_submission_id: DS.attr('number'),
  last_submission_time: DS.attr('date')
});
