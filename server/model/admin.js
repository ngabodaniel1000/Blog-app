const mongoose = require("mongoose")
const db = mongoose.connect('mongodb://localhost:27017/ref')
.then(() => {
    console.log('db is connected');
}).catch((err) => {
    console.log(err);
});
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
})

const model = new mongoose.model("users",UserSchema)

module.exports = model