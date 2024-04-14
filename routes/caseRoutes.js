const express = require('express')
const router = express.Router()
const {
  registerCase,
  loginCase,
  getMe,
  getCases,
  getCase,
  updateCase,
  getAll,
} = require('../controllers/caseController')

const { counsellorprotect } = require('../middleware/counsellorMiddleware')
const { caseprotect } = require('../middleware/caseMiddleware')

router.post('/',counsellorprotect, registerCase)
router.post('/login', loginCase)
router.get('/me', caseprotect, getMe)
router.get('/',getCases)
router
  .route('/:id')
  .get(counsellorprotect, getCase)
router.route('/updateCase/:id').put(counsellorprotect, updateCase);


router.get('/getAll/:counsellorId', counsellorprotect, getAll)

module.exports = router