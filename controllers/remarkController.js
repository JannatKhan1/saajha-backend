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
    const remarks = await Remark.find({casee: caseId});
    const casee = await Case.findById(caseId).populate('counsellor')
    
    if (!remarks) {
      res.status(404)
      throw new Error('Remark not found')
    }

    if (!casee) {
        res.status(404)
        throw new Error('Case not found')
      }

  
    const response = {
      counsellorName: casee.counsellor.name,
      developmentalHistory: remarks.developmentalHistory,
      presentComplaints: remarks.presentComplaints,
      advice: remarks.advice,
      previousDiagnosis: remarks.previousDiagnosis,
      currentDiagnosis: remarks.currentDiagnosis,
      clinicalObservation: remarks.clinicalObservation,
      suggestedInvestigationType: remarks.suggestedInvestigationType,
      diagnosticTest: remarks.diagnosticTest,
      testResults: remarks.testResults,
      report: remarks.report,
      SuggestionsForFurtherInvestigation: remarks.SuggestionsForFurtherInvestigation,
    };
  
    res.status(200).json(response)
  })

// @desc    Get all case remarks by counsellor
// @route   GET /api/remarks/:id
// @access  Private
const getRemarks = asyncHandler(async (req, res) => {
    const remarks = await Case.findById(req.params.id);
  
  
    if (remarks.length === 0) {
      res.status(404);
      throw new Error('Remark not found');
    }
  
    const authorizedRemarks = remarks.filter(remark => remark.counsellor.toString() === req.counsellor.id);
  
  
    if (authorizedRemarks.length === 0) {
      res.status(401);
      throw new Error('Not Authorized');
    }
  
    const response = {
      developmentalHistory: authorizedRemarks.developmentalHistory,
      presentComplaints: authorizedRemarks.presentComplaints,
      advice: authorizedRemarks.advice,
      previousDiagnosis: authorizedRemarks.previousDiagnosis,
      currentDiagnosis: authorizedRemarks.currentDiagnosis,
      clinicalObservation: authorizedRemarks.clinicalObservation,
      suggestedInvestigationType: authorizedRemarks.suggestedInvestigationType,
      diagnosticTest: authorizedRemarks.diagnosticTest,
      testResults: authorizedRemarks.testResults,
      report: authorizedRemarks.report,
      SuggestionsForFurtherInvestigation: authorizedRemarks.SuggestionsForFurtherInvestigation,
    };
  
    res.status(200).json(response)
  });

module.exports = {
    addRemarks,
    viewRemarks,
    getRemarks,
}