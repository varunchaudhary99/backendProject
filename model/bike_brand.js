const mongoose = require('mongoose');

let bikeBrandSchema = new mongoose.Schema({
  _id: Number,
  make: {
    type: String,
    required: true,
  },
  make_id: {
    type: Number,
    required: true,
  },
  popularity_rank: {
    type: Number,
    required: true,
  },
  make_logo_url: {
    type: String,
    required: true,
  }
});

const BikeBrand = mongoose.model('BikeBrand', bikeBrandSchema);