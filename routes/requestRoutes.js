const express = require('express')
const router = express.Router()
const {
  getRequest,
  getRequests,
  acceptStatus,
  rejectStatus,
} = require('../controllers/requestController')

const { adminprotect } = require('../middleware/adminMiddleware')

router.route('/:ngoId').get(adminprotect,getRequests)
router.route('/:id').get(adminprotect,getRequest)
router.route('/:id').put(acceptStatus)
router.route('/reject/:id').put(rejectStatus)

module.exports = router