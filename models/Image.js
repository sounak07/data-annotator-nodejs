const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
  Images: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      imageName: {
        type: String,
        default: "none",
        required: true
      },
      imageData: {
        type: String,
        required: true
      }
    }
  ]
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;