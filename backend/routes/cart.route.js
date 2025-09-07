const express =require ('express')
// const{update_Medicine,  get_Medicine}= require('../controllers/medicine.controller')
// const{get_Doctor}= require('../controllers/doctor.controller')
const { add_to_cart, get_Cart ,update_Cart_Quantity, checkoutCart}= require('../controllers/cart.controller')
const router = express.Router()



router.get('/:role/:id',  get_Cart)
router.put('/change/:role/:id/:Medicine_id',  update_Cart_Quantity)

router.post('/checkout/:role/:id', checkoutCart);
router.post('/:role/:id/:Medicine_id',  add_to_cart)






module.exports = router