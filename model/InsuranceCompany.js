const mongoose = require('mongoose');

const InsuranceCompanySchema = new mongoose.Schema({
  id: Number,
      name: String,
      cashlessGarages: Number,
      claimsSettled: String,
      zeroDepClaims: String,
      comprehensiveClaims:String,
      startingPriceINR:String,
     features: {
    type: [String],
  },
  photoUrl: String,
  }
  );

module.exports = mongoose.model('InsuranceCompany', InsuranceCompanySchema);
