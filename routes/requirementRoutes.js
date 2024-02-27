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
  .get(getRequirement)
  .delete(adminprotect, deleteRequirement)
 




module.exports = router