

const mongoose = require('mongoose');

const InsuranceCompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cashlessGarages: Number,
  claimsSettled: String,
  zeroDepClaims: String,
  comprehensiveClaims: String,
  startingPriceINR: String,
  features: [String],
  photoUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('InsuranceCompany', InsuranceCompanySchema);
