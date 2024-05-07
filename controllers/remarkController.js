const asyncHandler = require('express-async-handler')

const Remark = require('../models/remarkModel')
const Case = require('../models/caseModel')

// @desc    Add remarks
// @route   POST /api/remark/:caseId
// @access  Private
const addRemarks = asyncHandler(async (req, res) => {
    const remarks = { 
        developmentalHistory: req.body.developmentalHistory,
        presentComplaints: req.body.presentComplaints,
        advice: req.body.advice, 
        previousDiagnosis: req.body.previousDiagnosis,
        currentDiagnosis: req.body.currentDiagnosis,
        clinicalObservation: req.body.clinicalObservation,
        suggestedInvestigationType: req.body.suggestedInvestigationType,
        diagnosticTest: req.body.diagnosticTest,
        testResults: req.body.testResults,
        report: req.body.report,
        SuggestionsForFurtherInvestigation: req.body.SuggestionsForFurtherInvestigation
      };
    
    const { caseId } = req.params;
    
    if (!remarks) {
        res.status(400)
        throw new Error('Please add remarks')
      }
    try {
    
        const casee = await Case.findById(caseId);
    
        if (!casee) {
          res.status(404);
          throw new Error('Case not found');
        }
    
        const remark = await Remark.create({
            developmentalHistory: req.body.developmentalHistory,
            presentComplaints: req.body.presentComplaints,
            advice: req.body.advice, 
            previousDiagnosis: req.body.previousDiagnosis,
            currentDiagnosis: req.body.currentDiagnosis,
            clinicalObservation: req.body.clinicalObservation,
            suggestedInvestigationType: req.body.suggestedInvestigationType,
            diagnosticTest: req.body.diagnosticTest,
            testResults: req.body.testResults,
            report: req.body.report,
            SuggestionsForFurtherInvestigation: req.body.SuggestionsForFurtherInvestigation,
            casee: caseId,
        });
    
        res.status(201).json(remark);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
        
      } 
  });


  // @desc    View assigned counsellor and remarks by case ID
  // @route   GET /api/remark/case/:caseId
  // @access  Private
  const viewRemarks = asyncHandler(async (req, res) => {
    const { caseId } = req.params;
    const remarks = await Remark.find({ casee: caseId });
    const casee = await Case.findById(caseId).populate('counsellor');
    
    if (!casee) {
        res.status(404);
        throw new Error('Case not found');
    }

    // Check if remarks exist
    if (!remarks || remarks.length === 0) {
        res.status(404);
        throw new Error('Remarks not found');
    }

    // Map remarks to extract the required fields
    const mappedRemarks = remarks.map(remark => ({
        developmentalHistory: remark.developmentalHistory,
        presentComplaints: remark.presentComplaints,
        advice: remark.advice,
        previousDiagnosis: remark.previousDiagnosis,
        currentDiagnosis: remark.currentDiagnosis,
        clinicalObservation: remark.clinicalObservation,
        suggestedInvestigationType: remark.suggestedInvestigationType,
        diagnosticTest: remark.diagnosticTest,
        testResults: remark.testResults,
        report: remark.report,
        SuggestionsForFurtherInvestigation: remark.SuggestionsForFurtherInvestigation
    }));

    // Extract counsellor name
    const counsellorName = casee.counsellor.name;

    // Construct response object
    const response = {
        counsellorName,
        remarks: mappedRemarks
    };

    res.status(200).json(response);
});

// @desc    Get all case remarks by counsellor
// @route   GET /api/remarks/:id
// @access  Private
const getRemarks = asyncHandler(async (req, res) => {
    const { caseId } = req.params;
    const remarks = await Remark.find({casee: caseId});
  
  
    if (remarks.length === 0) {
      res.status(404);
      throw new Error('Remark not found');
    }

      res.status(200).json(remarks)
  });

module.exports = {
    addRemarks,
    viewRemarks,
    getRemarks,
}