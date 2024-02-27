const express = require('express')
const router = express.Router()
const {
    getRequirement, 
    addRequirements,
    deleteRequirement,
    getRequirements,
} = require('../controllers/requirementController')

 
const { adminprotect } = require('../middleware/adminMiddleware')

router.route('/').post(adminprotect,addRequirements)
router.get('/',getRequirements)

router
  .route('/:id')
  .delete(adminprotect, deleteRequirement)

router
.route('/:admin')
.get(getRequirement)
 




module.exports = router