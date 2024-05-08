const mongoose = require('mongoose')

const  adminSchema = new mongoose.Schema({
    email:String,
    username:String,
    passwordHash:String,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    mycourses:[]

},
{
  
    timestamps:true
}
)
module.exports = mongoose.model('Admin',adminSchema,'Admins')