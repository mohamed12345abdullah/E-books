const mongoose = require("mongoose");

// Define the schema for the Book model
const bookSchema = new mongoose.Schema(
    {
        // Title of the book
        title: {
            type: String,
            required: [true, "Book title is required"],
            trim: true,
            maxlength: [100, "Book title cannot exceed 100 characters"], // Increased character limit for flexibility
        },
        // Author of the book
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
            maxlength: [100, "Author name cannot exceed 100 characters"], // Increased character limit for flexibility
        },
        // Description of the book
        description: {
            type: String,
            required: [true, "Book description is required"],
            trim: true,
            maxlength: [500, "Book description cannot exceed 500 characters"], // Extended limit for detailed descriptions
        },
        // Brand of the book (e.g., publisher or series)
        brand: {
            type: String,
            required: [true, "Book brand is required"],
            trim: true,
            maxlength: [100, "Book brand cannot exceed 100 characters"],
        },
        // Tags for categorization or search optimization
        tags: {
            type: [String], // Updated to accept an array of tags
            required: false,
            validate: {
                // Ensure each tag is a string and not excessively long
                validator: function (values) {
                    if (!Array.isArray(values)) return false;
                    return values.every(tag => typeof tag === "string" && tag.length <= 50);
                },
                message: "Each tag must be a string and cannot exceed 50 characters",
            },
        },
        // Original price of the book
        originalPrice: {
            type: Number,
            required: [true, "Original price is required"],
            min: [0, "Price cannot be negative"], // Simplified non-negative validation
        },
        // Discounted price of the book
        discountedPrice: {
            type: Number,
            required: [true, "Discounted price is required"],
            min: [0, "Discounted price cannot be negative"],
            validate: {
                // Ensure discounted price is not greater than the original price
                validator: function (value) {
                    return value <= this.originalPrice;
                },
                message: "Discounted price cannot exceed the original price",
            },
        },
        // Automatically calculate discount percentage
        discountPercentage: {
            type: Number,
            default: function () {
                if (this.originalPrice > 0) {
                    return ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100;
                }
                return 0;
            },
            min: [0, "Discount percentage cannot be negative"],
            max: [100, "Discount percentage cannot exceed 100"],
        },
        // URL of the cover image for the book
        coverImageUrl: {
            type: String,
            required: [true, "Cover image URL is required"],
            validate: {
                validator: function (value) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
                },
                message: "Invalid URL format for cover image",
            },
        },
        // Additional image URLs for the book
        additionalImages: {
            type: [String],
            required: false,
            validate: {
                validator: function (values) {
                    if (!Array.isArray(values)) return false;
                    return values.every(value =>
                        /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value)
                    );
                },
                message: "All additional images must be valid image URLs",
            },
        },
        // Stock availability
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            min: [0, "Stock cannot be negative"], // Ensure stock is non-negative
        },
        // Book's publication date
        publicationDate: {
            type: Date,
            required: [true, "Publication date is required"],
        },
        // Average rating for the book
        averageRating: {
            type: Number,
            min: [0, "Rating cannot be less than 0"],
            max: [5, "Rating cannot exceed 5"], // Limit ratings between 0 and 5
            default: 0, // Default to 0 if no ratings are provided
        },
        // Number of ratings
        ratingsCount: {
            type: Number,
            min: [0, "Ratings count cannot be negative"],
            default: 0,
        },
    },
    {
        timestamps: true, // Enables automatic management of createdAt and updatedAt fields
    }
);

// Export the Book model based on the schema
module.exports = mongoose.model("Book", bookSchema);
