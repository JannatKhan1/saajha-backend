const asyncHandler = require('express-async-handler')

const Application = require('../models/applicationModel')
const NGO = require('../models/ngoModel')

// @desc    Get volunteer application by volunteer
// @route   GET /api/application/:ngoId
// @access  Private
const getApplication = asyncHandler(async (req, res) => {
  const { ngoId } = req.params;

  // Find applications matching the ngoId
  const applications = await Application.find({ ngo: ngoId });

  // Check if any applications were found
  if (applications.length === 0) {
    res.status(404);
    throw new Error('Application not found');
  }

  // Check if the requester is authorized to access the application
  const authorizedApplications = applications.filter(application => application.volunteer.toString() === req.vol.id);

  // If no authorized applications found, return 401
  if (authorizedApplications.length === 0) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Return the authorized applications
  res.status(200).json(authorizedApplications);
});




// @desc    Create new volunteer application
// @route   POST /api/application/:ngoId
// @access  Private
const createApplication = asyncHandler(async (req, res) => {
  const { description } = req.body
  const { ngoId } = req.params;

  if (!description) {
    res.status(400)
    throw new Error('Please add a description')
  }
   
  try {
    // Fetch the NGO from the database to get the adminId
    const ngo = await NGO.findById(ngoId);

    if (!ngo) {
      res.status(404);
      throw new Error('NGO not found');
    }

    const application = await Application.create({
      description,
      ngo: ngoId,
      admin: ngo.admin, // Use the admin ID from the NGO model
      volunteer: req.vol.id,
      status: 'Applied',
    });

    res.status(201).json(application);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
    
  }
})


module.exports = {
  getApplication,
  createApplication,
  
}
