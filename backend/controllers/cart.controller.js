const UserModel = require('../models/user.model');
const MedicineModel = require('../models/medicine.model');
const CartModel = require('../models/cart.model');
const Notification = require('../models/notification.model');


// Add to Cart
const add_to_cart = async (req, res) => {
  try {
    const { role, id, Medicine_id } = req.params;

    const medicine = await MedicineModel.findById(Medicine_id);
    const user = await UserModel.findById(id);

    if (!medicine) return res.status(400).json({ error: "Medicine not found" });
    if (!user) return res.status(400).json({ error: "User not found" });

    const userId = user.userId || user._id;

    if (medicine.stock <= 0) return res.status(400).json({ error: "Out of stock" });

    const existingCartItem = await CartModel.findOne({
      medicine_name: medicine.MedicineName,
      userId,
    });

    if (existingCartItem) return res.status(280).json({ alert: "Already in cart" });

    const cart = new CartModel({
      medicine_name: medicine.MedicineName,
      price: medicine.price,
      quantity: 1,
      userId,
      stock: medicine.stock,
    });

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Cart
const get_Cart = async (req, res) => {
  try {
    const { role, id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });

    const userId = user.userId || user._id;
    const cartItems = await CartModel.find({ userId });

    const cartWithStock = await Promise.all(
      cartItems.map(async (item) => {
        const medicine = await MedicineModel.findOne({ MedicineName: item.medicine_name });
        return {
          _id: item._id,
          medicine_name: item.medicine_name,
          quantity: item.quantity,
          price: item.price,
          stock: medicine?.stock ?? item.stock ?? 0,
        };
      })
    );

    res.status(200).json(cartWithStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Cart Quantity
const update_Cart_Quantity = async (req, res) => {
  try {
    const { role, id, Medicine_id } = req.params;
    const { newQuantity } = req.body;

    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });

    const medicine = await MedicineModel.findOne({ MedicineName: Medicine_id });
    if (!medicine) return res.status(400).json({ error: "Medicine not found" });

    const userId = user.userId || user._id;
    const cartItem = await CartModel.findOne({
      medicine_name: Medicine_id,
      userId,
    });
    if (!cartItem) return res.status(400).json({ error: "Cart item not found" });

    if (newQuantity === "plus") {
      if (cartItem.quantity >= medicine.stock)
        return res.status(400).json({ error: "Cannot exceed stock" });
      cartItem.quantity += 1;
    } else if (newQuantity === "minus") {
      if (cartItem.quantity <= 1)
        return res.status(400).json({ error: "Quantity cannot be less than 1" });
      cartItem.quantity -= 1;
    } else {
      return res.status(400).json({ error: "Invalid operation" });
    }

    cartItem.price = parseFloat((medicine.price * cartItem.quantity).toFixed(2));
    cartItem.stock = medicine.stock;

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkoutCart = async (req, res) => {
  try {
    const { role, id } = req.params;
    const { cartItems } = req.body;

    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });

    for (const item of cartItems) {
      const medicine = await MedicineModel.findOne({ MedicineName: item.medicine_name });
      if (!medicine) return res.status(400).json({ error: `Medicine ${item.medicine_name} not found` });

      if (medicine.stock < item.quantity) return res.status(280).json({ alert: `Insufficient stock for ${item.medicine_name}` });

      // Reduce stock
      medicine.stock -= item.quantity;

      if (medicine.stock < 10) {
        const notification = new Notification({
          Type: "Medicine",
          notification: `Stock for ${medicine.MedicineName} is running low. Only ${medicine.stock} left. Please update the stock.`,
          Whom: ["Staff"], // exact string must match enum
        });
        await notification.save();
      }


      await medicine.save();
    }

    // Clear user's cart
    await CartModel.deleteMany({ userId: user.userId || user._id });

    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error in checkoutCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { add_to_cart, get_Cart, update_Cart_Quantity, checkoutCart };
