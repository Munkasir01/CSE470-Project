const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    medicine_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    stock: { type: Number, required: true }, // Save stock at the time of adding
  },
  { timestamps: true }
);

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
