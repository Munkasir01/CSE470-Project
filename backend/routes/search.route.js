const express =require ('express')
const{ get_all_patients, get_all_medicine ,get_all_Doctors}= require('../controllers/search.controller')
const router = express.Router()

router.get('/patients', get_all_patients)
router.get('/doctors', get_all_Doctors)

router.get('/medicine', get_all_medicine)





module.exports = router