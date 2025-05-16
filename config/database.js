const mongoose = require('mongoose')
require('dotenv').config()
const InsuranceItem = require('../model/insuranceItems');
const homeItemJson = require('../config/insureanceItem.json')
const profileInfo = require('../model/profile_schema')
const profileJson = require('../config/profile.json')
const CarBrand = require('../model/car_number_schema')
const carBrandJson = require('../config/car_brand.json')
const BikeBrand = require('../model/bike_number_schema')
const bikeBrandJson = require('../config/bike_brand.json')
const InsuranceComapny = require('../model/InsuranceCompany')
const insuranceComapnyJson = require('../config/insurancecompanies')
const OnDamage = require('../model/ondamage_schema')
const onDamageJson = require('../config/onDamage.json')
const Thirdparty = require('../model/insurance_thirdparty')
const thirdpartyJson = require('../config/thirdparty.json')

let connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
         console.log("Database Succcessfully connected")
         await InsuranceComapny.create(homeItemJson)
         await profileInfo.create(profileJson)
         await CarBrand.create(carBrandJson)
         await BikeBrand.create(bikeBrandJson)
         await InsuranceComapny.create(insuranceComapnyJson)
         await OnDamage.create(onDamageJson)
         await Thirdparty.create(thirdpartyJson)
         await InsuranceItem.deleteMany({});
    } catch(error){
        console.log(error)
    }
}

module.exports = connectDB