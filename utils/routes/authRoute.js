const express = require('express');
const router = express.Router(); 
const {
  sendOTP,
  verifyOTP,
  getInsuranceItems,
  profileInfo
} = require('../../controller/authcontroller');
const {carNumber,
  getCarBrands,
  bikeNumber,
  getBikeBrands,
} = require('../../controller/vehical_controller');
const {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../../controller/Insurerancecontroller');
const {getonDamage ,
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan
}= require('../../controller/ondamagecontroller');
const {thirdpartygetAllPlans,
    thirdpartycreatePlan,
    thirdpartyupdatePlan,
    thirdpartydeletePlan
 }= require('../../controller/thirdpartycontroller');
const {verifyToken} = require('../../controller/authcontroller') 

router.post('/send-otp', sendOTP);
router.post('/api/logout', verifyToken)
router.post('/verify-otp', verifyOTP);
//router.get('/home', getInsuranceItems);
router.post('/profile', profileInfo);

router.post('/carNumber', carNumber);
router.get('/carBrand', getCarBrands);
router.post('/bikeNumber', bikeNumber);
router.get('/bikeBrand', getBikeBrands);

router.get('/getAllCompanies', getAllCompanies);
router.post('/insurance-addcompany', createCompany);
router.put('/insurance-editcompany', updateCompany);
router.delete('/insurance-deletecompany', deleteCompany);

router.get('/ondamage', getAllPlans);
router.post('/ondamage-addplan', createPlan);
router.put('/ondamage-editplan', updatePlan);
router.delete('/ondamage-deleteplan', deletePlan);

router.get('/thirdparty', thirdpartygetAllPlans);
router.post('/thirdparty-addplan', thirdpartycreatePlan);
router.put('/thirdparty-editplan/:company', thirdpartyupdatePlan);
router.delete('/thirdparty-deleteplan/:company', thirdpartydeletePlan);
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
