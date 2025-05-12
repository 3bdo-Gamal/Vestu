const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.json({ items: [] });

    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Error fetching cart:", err.message);
    res.status(500).json({ message: "Error fetching cart" });
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added/updated in cart successfully" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.json({ items: updatedCart ? updatedCart.items : [] });
  } catch (err) {
    console.error("❌ Error removing from cart:", err.message);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
