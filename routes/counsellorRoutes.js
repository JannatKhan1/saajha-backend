const express = require('express')
const router = express.Router()
const {
  registerCounsellor,
  loginCounsellor,
  getMe,
  getCounsellors, //Version 3
  updateCounsellor, //versrion 3
} = require('../controllers/counsellorController')

const { counsellorprotect } = require('../middleware/counsellorMiddleware')
const { adminprotect } = require('../middleware/adminMiddleware')

router.post('/',adminprotect, registerCounsellor)

router.post('/login', loginCounsellor)

//Version 3
router.get('/adminView',adminprotect, getCounsellors)
router.route('/updateCounsellor/:id').put(counsellorprotect, updateCounsellor);

router.get('/me', counsellorprotect, getMe)

module.exports = router