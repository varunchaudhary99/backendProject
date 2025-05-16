const mongoose = require('mongoose');

const InsuranceCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cashlessGarages: {
    type: Number,
    required: true
  },
  claimsSettled: {
    type: String,
    required: true
  },
  zeroDepClaims: {
    type: String,
    required: false
  },
  comprehensiveClaims: {
    type: String,
    required: false
  },
  startingPriceINR: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceCompany', InsuranceCompanySchema);
