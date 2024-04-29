const express = require('express');
const userRouter = require('./routes/userRoutes')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use("/api/users",userRouter)
    
module.exports = app
