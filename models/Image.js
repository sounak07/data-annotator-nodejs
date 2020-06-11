const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ]
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;