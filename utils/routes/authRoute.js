const express = require('express');
const router = express.Router(); 
const {
  sendOTP,
  verifyOTP,
  profileInfo,
  register,
  login
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
} = require('../../controller/insurerancecontroller');
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

router.post('/admin-login', login);
router.post('/Admin-register',register)
router.post('/send-otp', sendOTP ,verifyToken);
router.post('/logout',verifyToken,(req, res) => {
  console.log('Logging out token:', req.token);
  return res.status(200).json({ message: 'Logged out successfully' });
});
router.post('/verify-otp', verifyOTP);
//router.get('/home', getInsuranceItems);
router.post('/profile', profileInfo,verifyToken);

router.post('/carNumber', carNumber,verifyToken);
router.get('/carBrand', getCarBrands,verifyToken);
router.post('/bikeNumber', bikeNumber,verifyToken);
router.get('/bikeBrand', getBikeBrands,verifyToken);

router.get('/getAllCompanies',verifyToken, getAllCompanies);
router.post('/insurance-addcompany',verifyToken, createCompany);
router.put('/insurance-editcompany/:id',verifyToken, updateCompany);
router.delete('/insurance-deletecompany/:id',verifyToken, deleteCompany);

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
