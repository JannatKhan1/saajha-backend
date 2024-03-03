const express = require('express')
const router = express.Router()
const {
  getApplications,
  acceptStatus,
  rejectStatus,
} = require('../controllers/applicationController')

const { adminprotect } = require('../middleware/adminMiddleware')

router.route('/:ngoId').get(adminprotect,getApplications)
router.route('/:id').put(adminprotect,acceptStatus)
router.route('/reject/:id').put(adminprotect,rejectStatus)

module.exports = router