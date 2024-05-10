const express = require('express');
const userRouter = require('./routes/userRoutes')
const courseRouter = require('./routes/courseRoutes')
const paymentRouter = require('./routes/paymentRoutes')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    // origin:'http://localhost:5173',
    origin:'https://ragunath-lms.netlify.app'
    credentials:true
}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use("/api/users",userRouter)
app.use("/api/users/course",courseRouter)
app.use('/api/users/payment',paymentRouter)
    
module.exports = app
