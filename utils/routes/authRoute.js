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
router.post('/logout',verifyToken)
router.post('/verify-otp', verifyOTP);
//router.get('/home', getInsuranceItems);
router.post('/profile', profileInfo,verifyToken);

router.post('/carNumber', carNumber,verifyToken);
router.get('/carBrand', getCarBrands,verifyToken);
router.post('/bikeNumber', bikeNumber,verifyToken);
router.get('/bikeBrand', getBikeBrands,verifyToken);

router.get('/getAllCompanies', getAllCompanies,verifyToken);
router.post('/insurance-addcompany', createCompany,verifyToken);
router.put('/insurance-editcompany/:id', updateCompany,verifyToken);
router.delete('/insurance-deletecompany/:id', deleteCompany,verifyToken);

router.get('/ondamage', getAllPlans,verifyToken);
router.post('/ondamage-addplan', createPlan,verifyToken);
router.put('/ondamage-editplan', updatePlan,verifyToken);
router.delete('/ondamage-deleteplan', deletePlan,verifyToken);

router.get('/thirdparty', thirdpartygetAllPlans,verifyToken);
router.post('/thirdparty-addplan', thirdpartycreatePlan,verifyToken);
router.put('/thirdparty-editplan/:company', thirdpartyupdatePlan,verifyToken);
router.delete('/thirdparty-deleteplan/:company', thirdpartydeletePlan,verifyToken);
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
