const express = require('express')
const router = express.Router()
const {
  addRemarks,  
  viewRemarks, 
  getRemarks,
} = require('../controllers/remarkController')

const { counsellorprotect } = require('../middleware/counsellorMiddleware')
const { caseprotect } = require('../middleware/caseMiddleware')

//Version 3
router.route('/:caseId').post(counsellorprotect, addRemarks);

router.route('/:caseId').get(getRemarks);

router.route('/case/:caseId').get(caseprotect, viewRemarks);

module.exports = router