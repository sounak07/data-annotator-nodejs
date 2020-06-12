const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AnnotationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  userEmail: {
    type: String,
    ref: "users"
  },
  annotations: [
    {
      imageId: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      details: {
        type: String,
        required: true
      }
    }
  ]
});

var Annotation = mongoose.model('annotation', AnnotationSchema);

module.exports = Annotation;