const jwt =require('jsonwebtoken')
const User = require('../model/user_schema')


const verify_token = async (req, res, next) => {

let token  =req.header('Authorization')

   if(token){
    try{
      let payload = jwt.verify(token,process.env.JWT_SECERT)
      let user = await User.findById(payload.id)
     console.log(user)
     req.user = user
       next()
    }catch{
      res.send('Invaild token!')
    }
  
   }
   else{
    res.send('No Access!')
   }

}
 module.exports = verify_token