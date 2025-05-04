// controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name price images');
    
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving orders' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentId } = req.body;
    
    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }
    
    // Calculate order total and verify product availability
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Not enough stock for ${product.name}. Available: ${product.stock}`
        });
      }
      
      // Calculate price
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      
      // Add to order items with price at purchase
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
      
      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }
    
    // Create the order
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      total,
      status: 'pending',
      shippingAddress,
      paymentId
    });
    
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id)
      .populate('items.productId', 'name price images');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if the order belongs to the user or if admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }
    
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if the order belongs to the user or if admin
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to cancel this order' });
    }
    
    // Check if order is in a cancelable state
    if (!['pending', 'processing'].includes(order.status)) {
      return res.status(400).json({ 
        error: `Cannot cancel order in ${order.status} status`
      });
    }
    
    // Update order status
    order.status = 'cancelled';
    await order.save();
    
    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }
    
    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
};