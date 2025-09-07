const express =require ('express')
const{  create_new_medicine}= require('../controllers/medicine.controller')
const router = express.Router()



router.post('/post',  create_new_medicine)
// router.get('/', get_all_posted_gigs_by_user)
// router.get('/applicants/:title', get_all_Applicants_by_gig_title)



module.exports = router