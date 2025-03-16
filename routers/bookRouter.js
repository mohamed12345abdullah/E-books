const express = require("express");
const BookController = require("../controllers/bookController");
const { addBookValidation, getBookByIdValidation } = require("../middlewares/bookValidationMiddleware");
const { calculateDiscountPercentage } = require("../middlewares/bookBusinessLogicMiddleware");
const { handleBookError } = require("../middlewares/bookErrorMiddleware");

const Router = express.Router();

// Route for adding a new book
Router.post("/add", addBookValidation, calculateDiscountPercentage, BookController.addBook);

// Route for getting all books
Router.get("/all", BookController.getAllBooks);

// Route for getting a book by ID
Router.get("/get/:id", getBookByIdValidation, BookController.getBookById);

// Route for updating a book by ID
Router.put("/update/:id", addBookValidation, calculateDiscountPercentage, BookController.updateBook);

// Route for deleting a book by ID
Router.delete("/delete/:id", BookController.deleteBook);

// Global error handling
Router.use(handleBookError);

module.exports = Router;
