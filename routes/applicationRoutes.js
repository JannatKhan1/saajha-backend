const express = require('express')
const router = express.Router()
const {
  createApplication,
  getApplication,
} = require('../controllers/applicationController')

const { protect } = require('../middleware/volunteerMiddleware')


router.route('/:ngoId').post(protect, createApplication)
router.route('/:ngoId').get(protect,getApplication)

module.exports = router