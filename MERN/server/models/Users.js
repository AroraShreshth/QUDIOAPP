const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
		type: String,
        index: true
    },
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    email: {
    type: String,
    default: '',
    index: true
  },
  password: {
    type: String,
    default: ''
  },
  gender:{
    type: String,
    default:'Not Defined'
},
visibilty :{
    type: Boolean,
    default: true
},
// currentTeams :[{
//   id:{
//     type:String}
//   }],
// skills :[{
//     id :{
//         type : String,
//         default: ''
//     },
//     title: {
//         type: String,
//         default: ''
//     }
// }],
// upvotes: {
//     type: Number,
//     deafult: 0
// },
signUpDate: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  // linkedin: {
  //   type:String
  // }
  userType: {
    type: String,
    default: 'P'
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);