const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true }, 
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, 
      quantity: { type: Number, required: true }, 
      price: { type: Number, required: true } 
    }
  ],
  totalAmount: { type: Number, required: true }, 
  orderDate: { type: Date, default: Date.now } 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
