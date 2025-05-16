const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  gender: { type: String, default: "" },
  email: { type: String, default: "" },
  city: { type: String, default: "" },
  mobile: { type: String, required: true },
  dob: { type: String, default: "" },
  isProfileData: { type: Number, default: 0 }
}, {
  timestamps: true 
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;