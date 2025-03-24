// const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel");

class CartController {
  static async addToCart(req, res) {
    const id=req.id;
    const {bookId, quantity} = req.body;

    try {
      const user = await User.findOne({ _id:id});
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
      if(!bookId ){
        return res.status(400).json({ status: "error", message: "bookId is required" });
      }
      if(!quantity){
        return res.status(400).json({ status: "error", message: "quantity is required" });
      }
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ status: "error", message: "Book not found" });
      }

     
      const cart = user.cart; 

      const existingItem = cart.find(item => item.book == bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
        await user.save();
        return res.status(200).json({ status: "success", message: "Book added to cart", cart });
      }


      cart.push({
        book: bookId,
        quantity
      });

      await user.save();

      res.status(200).json({ status: "success", message: "Book added to cart", cart });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }



  }

  static async getCart(req, res) {
    try {
      const id=req.id;
      const cart = await User.findOne({ _id:id},{cart:1}).populate("cart.book"); 
      console.log("cart is ",cart);
      if (!cart) {
        return res.status(404).json({ status: "error", message: "Cart not found" });
      }

      res.status(200).json({ status: "success", message: "Cart found", data: cart.cart });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }

  static async removeFromCart(req, res) {
    const id=req.id;
    const {bookId} = req.body;
    console.log("bookId body is ",bookId);
    try {
      const user = await User.findOne({ _id:id});
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      if(!bookId){
        return res.status(400).json({ status: "error", message: "bookId is required" });
      }
      

      
      user.cart.forEach(item => {
        console.log("book is ",item._id);

        // console.log("bookId is ",b);
        if (item._id.toString() == bookId.toString()) {
          // user.cart.pull(item);
          console.log("true");
          return;
        }
      });
      console.log("cart is ",user.cart);
      await user.save();

      res.status(200).json({ status: "success", message: "Book removed from cart", data: user.cart });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Something went wrong", details: error.message });
    }
  }

}

module.exports = CartController;
