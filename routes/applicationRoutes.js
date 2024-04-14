const express = require('express')
const router = express.Router()
const {
  createApplication,
  getApplications,
} = require('../controllers/applicationController')

const { protect } = require('../middleware/volunteerMiddleware')


router.route('/:ngoId').post(protect, createApplication)
router.route('/').get(protect,getApplications)

module.exports = router