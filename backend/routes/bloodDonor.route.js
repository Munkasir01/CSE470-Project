const express =require ('express')
const{Register_as_Donor}= require('../controllers/blood_donor.controller')
const router = express.Router()



router.post('/', Register_as_Donor)



module.exports = router