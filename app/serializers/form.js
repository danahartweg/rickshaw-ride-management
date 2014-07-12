export default DS.RESTSerializer.extend({
  // restructure response json to add type key
  normalizePayload: function(payload) {
    // sideload the fields to be loaded as separate records
    var fields = payload.form.fields;
    delete payload.form.fields;

    return { form: payload.form, fields: fields, submissions: payload.submissions.submissions };
  }
})
