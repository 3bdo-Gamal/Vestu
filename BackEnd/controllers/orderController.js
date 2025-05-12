// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentId } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cart.items.map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price
    }));

    const total = items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0);

    const order = new Order({
      userId,
      items,
      total,
      shippingAddress,
      paymentId
    });

    await order.save();

    // Optionally clear cart
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    console.error("❌ Error creating order:", err.message);
    res.status(500).json({ message: 'Failed to create order' });
  }
};
