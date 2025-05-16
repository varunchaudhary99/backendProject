const User = require('../model/user_schema');
const jwt = require('jsonwebtoken');
const { generateOTP, saveOTP, verifyOTP: verifyUserOTP } = require('../utils/user_otp');
const InsuranceItem = require('../model/insuranceItems');

// Send OTP
const sendOTP = async (req, res) => {
 const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });

  const otp = generateOTP();
  saveOTP(mobile, otp);
  console.log(`OTP for ${mobile}: ${otp}`);

  res.json({ message: 'OTP sent successfully ${otp }'});
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ error: 'mobile and OTP required' });

  if (!verifyUserOTP(mobile, otp)) {
    return res.status(401).json({ error: 'Invalid or expired OTP' });
  }

  let user = await User.findOne({ mobile });
  if (!user) user = await User.create({ mobile });

  const token = jwt.sign({ id: user._id, mobile: user.mobile }, 'jwt_token', { expiresIn: '1d' });

  res.json({ message: 'Login successful', token });
};




const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Invalid token' });

  
console.log('Logging out token:', req.token);
  
  
  res.status(200).json({ message: 'Logged out successfully' });
  req.token = token;

  next();
};




// Get Insurance Items
const getInsuranceItems = async (req, res) => {
  try {
    const items = await InsuranceItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Profile Info
const profileInfo = async (req, res) => {
  const requestTime = new Date();
  try {
    const responseData = {
      status: 200,
      message: "Success",
      cached: false,
      data: {
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        city: "",
        mobile: "",
        dob: "",
        isProfileData: 0
      },
      requestTime: requestTime.toISOString(),
      responseTime: new Date().toISOString(),
      timeTaken: "192ms"
    };

    res.json({ data: responseData });
  } catch (error) {
    console.error('Error fetching profile info:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  profileInfo,
  verifyToken
};
