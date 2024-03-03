const asyncHandler = require('express-async-handler')

const Application = require('../models/applicationModel')
const NGO = require('../models/ngoModel')


// @desc    Get all volunteer applications of a particular ngo for particular admin
// @route   GET /api/application/:ngoId
// @access  Private
const getApplications = asyncHandler(async (req, res) => {
  const { ngoId } = req.params

  const applications = await Application.find({ ngo: ngoId, admin:req.admin.id}).populate('volunteer')

  res.status(200).json(applications)
})

// @desc    Get volunteer application by volunteer
// @route   GET /api/application/:ngoId
// @access  Private
const getApplication = asyncHandler(async (req, res) => {
  const {ngoId} = req.params
  const application = await Application.find({ ngo:ngoId });

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  if (application.volunteer.toString() !== req.vol.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(application);
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


// @desc    Update application status to reject
// @route   PUT /api/application/reject/:id
// @access  Private
const rejectStatus = asyncHandler(async (req, res) => {
  const applicationId = req.params.id;
  const adminId = req.admin.id; // Assuming req.admin.id contains the ID of the admin

  // Find the application by ID
  const application = await Application.findById(applicationId);

  if (!application) {
    res.status(404).json({ success: false, message: 'Application not found' });
    return;
  }

  // Verify if the application's admin ID matches the ID of the admin making the request
  if (application.admin.toString() !== adminId) {
    res.status(403).json({ success: false, message: 'You are not authorized to update this application' });
    return;
  }

  // Update the application status to "Rejected"
  application.status = 'Rejected';
  await application.save();

  // Application status updated successfully
  res.status(200).json({ success: true, message: 'Application status updated to rejected', application });
});

// @desc    Update application status to accept
// @route   PUT /api/application/:id
// @access  Private
const acceptStatus = asyncHandler(async (req, res) => {
  const applicationId = req.params.id;
  const adminId = req.admin.id; // Assuming req.admin.id contains the ID of the admin

  // Find the application by ID
  const application = await Application.findById(applicationId);

  if (!application) {
    res.status(404).json({ success: false, message: 'Application not found' });
    return;
  }

  // Verify if the application's admin ID matches the ID of the admin making the request
  if (application.admin.toString() !== adminId) {
    res.status(403).json({ success: false, message: 'You are not authorized to update this application' });
    return;
  }

  // Update the application status to "Approved"
  application.status = 'Approved';
  await application.save();

  // Application status updated successfully
  res.status(200).json({ success: true, message: 'Application status updated to approved', application });
});


module.exports = {
  getApplications,
  getApplication,
  createApplication,
  rejectStatus,
  acceptStatus,
}
