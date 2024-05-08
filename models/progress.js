const mongoose =require('mongoose')

const progressSchema = new mongoose.Schema({
    user_id:String,
    course_id:String,
    section_1_progress:Array,
    section_2_progress:Array,
    section_3_progress:Array,
    quiz_progress:{}
},
{
    timestamps: true,
  })
module.exports = mongoose.model("UserProgress",progressSchema,"UserProgresses")