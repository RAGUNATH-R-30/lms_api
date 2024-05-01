const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    course_id:String,
    video_id:String,
    video_url:String
})

module.exports = mongoose.model("Video",videoSchema,"Videos")