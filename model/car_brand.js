const mongoose = require('mongoose');

let carBrandSchema = new mongoose.Schema({
  id: Number, // Using provided _id as a number
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

const CarBrand = mongoose.model('CarBrand', carBrandSchema);