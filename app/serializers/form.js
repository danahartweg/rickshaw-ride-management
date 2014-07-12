export default DS.RESTSerializer.extend({
  // restructure response json to add type key
  normalizePayload: function(payload) {

    // if loading a specific form, sideload the data
    if ( payload.form ) {

      var fields = payload.form.fields;
      delete payload.form.fields;

      return { form: payload.form, fields: fields, submissions: payload.submissions.submissions };

    } else {

      // otherwise, load all forms
      return payload

    }
  }
})
