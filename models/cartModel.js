const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true }, 
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
