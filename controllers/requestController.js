const asyncHandler = require('express-async-handler')

const Application = require('../models/applicationModel')
const NGO = require('../models/ngoModel')



// @desc    Get volunteer request by admin
// @route   GET /api/requets/:ngoId
// @access  Private
const getRequests = asyncHandler(async (req, res) => {
    const { ngoId } = req.params;
  
    // Find applications matching the ngoId
    const applications = await Application.find({ ngo: ngoId }).populate('volunteer');
  
    // Check if any applications were found
    if (applications.length === 0) {
      res.status(404);
      throw new Error('Application not found');
    }
  
    // Check if the requester is authorized to access the application
    const authorizedApplications = applications.filter(application => application.admin.toString() === req.admin.id);
  
    // If no authorized applications found, return 401
    if (authorizedApplications.length === 0) {
      res.status(401);
      throw new Error('Not Authorized');
    }
  
    // Return the authorized applications
    res.status(200).json(authorizedApplications);
  });

// @desc    Get Request by Id
// @route   GET /api/requests/:id
// @access  Private
const getRequest = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)
  
    if (!application) {
      res.status(404)
      throw new Error('Application not found')
    }
  
    if (application.admin.toString() !== req.admin.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  
    res.status(200).json(application)
  })
  

// @desc    Update application status to reject
// @route   PUT /api/requests/reject/:id
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
  // @route   PUT /api/requests/:id
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
    getRequests,
    acceptStatus,
    rejectStatus,
    getRequest,
}
  