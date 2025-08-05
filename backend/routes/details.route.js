const express =require ('express')
const{update_Medicine,  get_Medicine}= require('../controllers/medicine.controller')
const{get_Doctor}= require('../controllers/doctor.controller')
const router = express.Router()



router.get('/medicine/:MedicineName',  get_Medicine)
router.patch('/medicine/:MedicineName',  update_Medicine)

router.get('/doctor/:DoctorId',  get_Doctor)




module.exports = router