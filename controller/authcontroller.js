const User = require('../model/user_schema');
const jwt = require('jsonwebtoken');
const { generateOTP, saveOTP, verifyOTP: verifyUserOTP } = require('../utils/user_otp');
const AdminUser = require('../model/admin_user')
 const bcrypt = require('bcrypt')
 require('dotenv').config();
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

  req.token = token;
  next(); 
};
const signToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'fallbackSecretKey';

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new AdminUser({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    
    const token = await signToken({ userId: savedUser._id });

    
    res.status(201).json({ message: 'User registered successfully', user: savedUser, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    let { inp_email, inp_password } = req.body;
  
    let admin_user = await AdminUser.findOne({email: inp_email.toLowerCase()});

    if (!admin_user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let isValidPWD = await bcrypt.compare(inp_password, admin_user.password);

    if (!isValidPWD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    let payload = { id: admin_user.id };
    let token = await signToken(payload); // Await the signed token

    res.json({ token });
      console.log('Generated token:', token);
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error logging in' });
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
  verifyToken,
  login,
  register
};
