const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BlockSchema = new mongoose.Schema({
    index: {
		type: Number,
        index: true
    },
    timestamp: {
      type: String,
      default: Date.now()
    },
  
visibilty :{
    type: Boolean,
    default: true
},

data :[{
    from :{
        from : String,
        default: ''
    },
    to: {
        type: String,
        default: ''
    },
  file: {
        type: String,
        default: ''
    }
}],

previousHash: {
    type: Date,
    default: ''
  },
  nonce: {
    type: Number ,
    default: ''
  },
  
});