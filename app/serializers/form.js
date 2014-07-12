export default DS.RESTSerializer.extend({
  // restructure response json to add type key
  normalizePayload: function(payload) {

    // if loading a specific form, sideload the data
    if ( payload.form ) {

      var fields = payload.form.fields;
      delete payload.form.fields;

      var field_ids = [];
      var submission_ids = [];

      // extract all field ids into new child id array
      for (var i = 0, size = fields.length; i < size; i++) {
        field_ids[i] = fields[i].id;
      };

      // extract all submission ids into new child id array
      for (var i = 0, size = payload.submissions.submissions.length; i < size; i++) {
        submission_ids[i] = payload.submissions.submissions[i].id;
      };

      // assign sideloaded ids
      payload.form.fields = field_ids;
      payload.form.submissions = submission_ids;

      return { form: payload.form, fields: fields, submissions: payload.submissions.submissions };

    } else {

      // otherwise, load all forms
      return payload

    }
  }
})
