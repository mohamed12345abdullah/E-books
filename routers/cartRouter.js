const express = require('express');
const Cart = require('../models/cartModel');
const Book = require('../models/bookModel');
const Order = require('../models/orderModel');

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { user, bookId, quantity } = req.body;

    if (!user || !bookId || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

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

    res.status(201).json({ message: 'Book added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

router.get('/:user', async (req, res) => {
  try {
    const { user } = req.params;

    const cart = await Cart.findOne({ user }).populate('items.book');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});


router.delete('/remove', async (req, res) => {
  try {
    const { user, bookId } = req.body;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.book.toString() !== bookId);
    await cart.save();

    res.json({ message: 'Book removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});


router.post('/buy', async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await Cart.findOne({ user }).populate('items.book');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (item.quantity > item.book.stock) {
        return res.status(400).json({ error: `Not enough stock for book: ${item.book.title}` });
      }

      totalAmount += item.book.price * item.quantity;
      orderItems.push({
        book: item.book._id,
        quantity: item.quantity,
        price: item.book.price
      });

      item.book.stock -= item.quantity;
      await item.book.save();
    }

    cart.items = [];
    await cart.save();

    const newOrder = new Order({
      user,
      items: orderItems,
      totalAmount
    });
    await newOrder.save();

    res.json({ message: 'Books purchased successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

module.exports = router;
