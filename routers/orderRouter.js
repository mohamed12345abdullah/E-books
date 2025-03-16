const express = require('express');
const Order = require('../models/orderModel'); 

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;

    if (!user || !items || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newOrder = new Order({ user, items, totalAmount });
    await newOrder.save();

    res.status(201).json({ message: 'Order added successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

module.exports = router;
