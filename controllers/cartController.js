const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel");

class CartController {
  static async addToCart(req, res) {
    try {
      const { user, bookId, quantity } = req.body;

      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ status: "error", message: "Book not found" });

      let cart = await Cart.findOne({ user });

      if (!cart) {
        cart = new Cart({ user, items: [] });
      }

      const existingItem = cart.items.find(item => item.book.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }

      await cart.save();
      res.status(201).json({ status: "success", message: "Book added to cart successfully", cart });

    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }

  static async getCart(req, res) {
    try {
      const { user } = req.params;
      const cart = await Cart.findOne({ user }).populate("items.book");

      if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

      res.json({ status: "success", cart });

    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }

  static async removeFromCart(req, res) {
    try {
      const { user, bookId } = req.body;
      const cart = await Cart.findOne({ user });

      if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

      cart.items = cart.items.filter(item => item.book.toString() !== bookId);
      await cart.save();

      res.json({ status: "success", message: "Book removed from cart", cart });

    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }

  static async purchaseCart(req, res) {
    try {
      const { user } = req.body;
      const cart = await Cart.findOne({ user }).populate("items.book");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ status: "error", message: "Cart is empty" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of cart.items) {
        if (item.quantity > item.book.stock) {
          return res.status(400).json({ status: "error", message: `Not enough stock for ${item.book.title}` });
        }

        totalAmount += item.book.price * item.quantity;
        orderItems.push({
          book: item.book._id,
          quantity: item.quantity,
          price: item.book.price,
        });

        item.book.stock -= item.quantity;
        await item.book.save();
      }

      await Cart.updateOne({ user }, { items: [] });

      const newOrder = new Order({ user, items: orderItems, totalAmount });
      await newOrder.save();

      res.json({ status: "success", message: "Books purchased successfully", order: newOrder });

    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }
}

module.exports = CartController;
