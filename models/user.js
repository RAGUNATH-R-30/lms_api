const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
    username:String,
    name:String,
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
module.exports = mongoose.model('User',userSchema,'users')