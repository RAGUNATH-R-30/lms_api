const express = require('express')
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/auth')


paymentRouter.post('/checkout',auth.isAuth,paymentController.checkout)
paymentRouter.post('/verification',auth.isAuth,paymentController.verification)

module.exports = paymentRouter