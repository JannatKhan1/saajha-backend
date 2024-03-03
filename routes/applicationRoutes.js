const express = require('express')
const router = express.Router()
const {
  createApplication,
  getApplication,
  getApplications,
  acceptStatus,
  rejectStatus,
} = require('../controllers/applicationController')

const { protect } = require('../middleware/volunteerMiddleware')
const { adminprotect } = require('../middleware/adminMiddleware')

router.route('/:ngoId').get(adminprotect,getApplications)
router.route('/:ngoId').post(protect, createApplication)
router.route('/:id').get(getApplication)
router.route('/:id').put(adminprotect,acceptStatus)
router.route('/reject/:id').put(adminprotect,rejectStatus)

module.exports = router