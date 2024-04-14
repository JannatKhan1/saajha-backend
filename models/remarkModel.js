const mongoose = require('mongoose');


const remarkSchema = mongoose.Schema({
    casee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Case'
    },
    previousDiagnosis: {
        type: String,
    },
    currentDiagnosis: {
        type: String,
    },
    clinicalObservation: {
        type: String,
    },
    developmentalHistory: {
        type: String,
    },
    suggestedInvestigationType: {
        type: String,
    },
    diagnosticTest: {
        type: String,
    },
    testResults: {
        type: String,
    },
    report: {
        type: String,
    },
    advice: {
        type: String,
    },
    presentComplaints: {
        type: String,
    },
    SuggestionsForFurtherInvestigation: {
        type: String,
    },
    
});

module.exports = mongoose.model('Remark', remarkSchema);