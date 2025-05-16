const User = require('../model/user_schema'); 
const CarBrand = require('../model/car_brand'); 
const BikeBrand = require('../model/bike_brand')

// Dummy saveNumber function (replace with real DB logic if needed)
const saveNumber = (number) => {
  console.log('Saving number:', number);
};

// Validate and save car number
const carNumber = (req, res) => {
  const { carNumber } = req.body;

  const carNumberPattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;

  if (!carNumber || !carNumberPattern.test(carNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid car number. Please use format like DL-12-AB-2345'
    });
  }

  saveNumber(carNumber);

  res.status(200).json({
    success: true,
    message: 'Car number validated successfully'
  });
};

// Fetch car brands and save car number to DB if not already present
const getCarBrands = async (req, res) => {
  try {
    const { carNumber } = req.body;

    if (!carNumber) {
      return res.status(400).json({ message: 'carNumber is required' });
    }

    let user = await User.findOne({ carNumber });
    if (!user) {
      user = await User.create({ carNumber });
    }

    const brands = await CarBrand.find().sort({ popularity_rank: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car brands', error: error.message });
  }
};

// Validate and save bike number
const bikeNumber = (req, res) => {
  const { bikeNumber } = req.body;

  const bikeNumberPattern = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;

  if (!bikeNumber || !bikeNumberPattern.test(bikeNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid bike number. Please use format like DL-12-AB-2345'
    });
  }

  saveNumber(bikeNumber);

  res.status(200).json({
    success: true,
    message: 'Bike number validated successfully'
  });
};

// Fetch bike brands and save bike number to DB if not already present
const getBikeBrands = async (req, res) => {
  try {
    const { bikeNumber } = req.body;

    if (!bikeNumber) {
      return res.status(400).json({ message: 'bikeNumber is required' });
    }

    let user = await User.findOne({ bikeNumber });
    if (!user) {
      user = await User.create({ bikeNumber });
    }

    const brands = await BikeBrand.find().sort({ popularity_rank: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bike brands', error: error.message });
  }
};

module.exports = {
  carNumber,
  getCarBrands,
  bikeNumber,
  getBikeBrands
};
