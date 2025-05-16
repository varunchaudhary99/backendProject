const mongoose = require('mongoose');

const OndamageInsuranceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  cashlessGarages: {
    type: Number,
    required: true,
    min: 0
  },
  claimSettlementRatio: {
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  zeroDepClaims: {
    type: String, 
    required: true
  },
  startingPrice: {
    type: Number, 
    required: true,
    min: 0
  },
  planUrl: {
    type: String,
    required: true,
    validate: {
      validator: v => /^https?:\/\/.+/.test(v),
      message: props => `${props.value} is not a valid URL`
    }
  }
});

module.exports = mongoose.model('OndamageInsuranceSchema', OndamageInsuranceSchema);
