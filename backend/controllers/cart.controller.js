const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')
const NotificationModel = require('../models/notification.model'); // Import the Notification model
const CartModel = require('../models/cart.model')
const mongoose = require('mongoose')


const add_to_cart = async (req, res) => {
    console.log("Add to cart invoked");
  
    try {
      const { role, id, Medicine_id } = req.params;
      const { medicine_name, price } = req.body;
  
      // Find the medicine and user
      const medicine = await MedicineModel.findById(Medicine_id);
      const user = await UserModel.findById(id);
  
      if (!medicine) {
        return res.status(400).json({ error: "Medicine not found" });
      }
  
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const userId = user.userId || user._id; // Ensure correct user reference
      const medicineName = medicine_name || medicine.MedicineName;
  
      // Check if the item already exists in the cart
      const existingCartItem = await CartModel.findOne({
        medicine_name: medicineName,
        userId: userId,
      });
  
      if (existingCartItem) {
        return res
          .status(280)
          .json({ alert: "This medicine is already in your cart." });
      }
  
      // Create a new cart item
      const cart = new CartModel({
        medicine_name: medicineName,
        price: price || medicine.price,
        quantity: 1,
        userId: userId,
      });
  
      // Save to the database
      await cart.save();
      res.status(201).json(cart);
    } catch (error) {
      console.error("Error in add_to_cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const get_Cart = async (req, res) => { 
    console.log("Get cart invoked");
    try {
        const { role, id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const userId = user.userId || user._id; // Ensure correct user reference
        const cartItems = await CartModel.find({ userId: userId });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error in get_Cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const update_Cart_Quantity = async (req, res) => {
    console.log("Update cart quantity invoked");
    try {
        const { role, id, Medicine_id } = req.params;
        const { newQuantity } = req.body;

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const medicine = await MedicineModel.findOne({ MedicineName: Medicine_id });
        if (!medicine) {
            return res.status(400).json({ error: "Medicine not found" });
        }

        const userId = user.userId || user._id; // Ensure correct user reference
        const cartItem = await CartModel.findOne({
            medicine_name: Medicine_id,
            userId: userId,
        });

        if (!cartItem) {
            return res.status(400).json({ error: "Cart item not found" });
        }

        // Update quantity and price based on newQuantity
        if (newQuantity === "plus") {
            cartItem.quantity += 1;
            cartItem.price = parseFloat((cartItem.price + medicine.price).toFixed(2));
        } else if (newQuantity === "minus" && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.price = parseFloat((cartItem.price - medicine.price).toFixed(2));
        } else {
            return res.status(400).json({ error: "Invalid operation or quantity cannot be less than 1" });
        }

        // Save the updated cart item
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        console.error("Error in update_Cart_Quantity:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const checkoutCart = async (req, res) => {
  try {
    const { role, id } = req.params;
    const { cartItems } = req.body;

    // Validate user
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Process checkout
    for (const item of cartItems) {
      const medicine = await MedicineModel.findOne({ MedicineName: item.medicine_name });
      if (!medicine) {
        return res.status(400).json({ error: `Medicine ${item.medicine_name} not found` });
      }

      // Check stock
      if (medicine.stock < item.quantity) {
        return res.status(280).json({ alert: `Insufficient stock for ${item.medicine_name}` });
      }

      // Reduce stock
      medicine.stock -= item.quantity;

      // Create a notification if stock is less than 10
      if (medicine.stock < 10) {
        const notification = new NotificationModel({
            Type: "Medicine",
          notification: `Stock for ${medicine.MedicineName} is running low. Only ${medicine.stock} left.`,
        });
        await notification.save();
      }

      await medicine.save();
    }

    // Clear cart
    await CartModel.deleteMany({ userId: user.userId || user._id });

    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error in checkoutCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  

 
  
  
module.exports= {  add_to_cart , get_Cart, update_Cart_Quantity, checkoutCart}

