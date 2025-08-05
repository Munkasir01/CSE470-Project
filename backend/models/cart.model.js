const mongoose=require('mongoose');

const CartSchema = mongoose.Schema(
    {  
        medicine_name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);
const Cart= mongoose.model('Cart', CartSchema);

module.exports = Cart;