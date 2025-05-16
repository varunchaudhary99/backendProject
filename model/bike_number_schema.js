const mongoose = require('mongoose');

const BikeNumberSchema = new mongoose.Schema({
  bikeNumber: {
    type: String,
    required: true,
    match: /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/, 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BikeNumber', BikeNumberSchema);