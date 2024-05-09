const mongoose = require('mongoose')

const  requestmentorSchema = new mongoose.Schema({
    email:String,
    username:String,
    id:String,
    status:{
        type:String,
        enum:['approved','notapproved'],
        default:"notapproved"
    }
},
{
  
    timestamps:true
}
)
module.exports = mongoose.model('Requestmentor',requestmentorSchema,'Requestmentors')