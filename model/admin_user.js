const mongoose = require('mongoose')


let AdminUserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('AdminUser',AdminUserSchema)