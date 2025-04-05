const mongoose = require("mongoose");
const {Schema} = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlenght: 30
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 8
  },
})

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);


module.exports = {
  User,
  Account,
};



