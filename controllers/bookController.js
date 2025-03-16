const Book = require("../models/bookModel");
const uploadImagesToCloudinary = require("../middlewares/cloudinaryMiddleware");

class BookController {
    // Add a new book
    static async addBook(req, res) {
        try {
            const bookData = req.body;
            const newBook = await Book.create(bookData);

            res.status(201).json({
                message: "Book added successfully",
                book: newBook,
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed to add book",
                error: error.message,
            });
        }
    }

    // Retrieve all books
    static async getAllBooks(req, res) {
        try {
            const books = await Book.find();
            res.status(200).json({
                message: "Books retrieved successfully",
                books,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve books",
                error: error.message,
            });
        }
    }

    // Retrieve a book by ID
    static async getBookById(req, res) {
        try {
            const {id} = req.params;
            console.log("Book ID:", id);
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({message: "Book not found"});
            }
            res.status(200).json({
                message: "Book retrieved successfully",
                book,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve book",
                error: error.message,
            });
        }
    }

    // Update a book by ID
    static async updateBook(req, res) {
        try {
            const { id } = req.params;
            const bookData = req.body;

            const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
                new: true,
                runValidators: true,
            });

            if (!updatedBook) {
                return res.status(404).json({ message: "Book not found" });
            }

            res.status(200).json({
                message: "Book updated successfully",
                book: updatedBook,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to update book",
                error: error.message,
            });
        }
    }

    // Delete a book by ID
    static async deleteBook(req, res) {
        try {
            const {id} = req.params;
            const deletedBook = await Book.findByIdAndDelete(id);

            if (!deletedBook) {
                return res.status(404).json({message: "Book not found"});
            }

            res.status(200).json({message: "Book deleted successfully"});
        } catch (error) {
            res.status(500).json({
                message: "Failed to delete book",
                error: error.message,
            });
        }
    }
}

module.exports = BookController;
