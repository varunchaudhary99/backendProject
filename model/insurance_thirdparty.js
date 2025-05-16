const mongoose = require('mongoose');

const CoverageSchema = new mongoose.Schema({
  thirdPartyPerson: {
    type: Boolean,
    required: true
  },
  thirdPartyProperty: {
    type: Boolean,
    required: true
  }
}, { _id: false });

const ThirdPartyPlanSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  planName: {
    type: String,
    required: true,
    trim: true
  },
  coverage: {
    type: CoverageSchema,
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
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  }
});

module.exports = mongoose.model('ThirdPartyPlan', ThirdPartyPlanSchema);
