const cloudinary = require("../config/cloudinary"); // Import cloudinary configuration

// Middleware to upload images to Cloudinary
const uploadImagesToCloudinary = async (req, res, next) => {
    try {
        // Handle Cover Image Upload to Cloudinary
        if (req.body.coverImageUrl) {
            const uploadResult = await cloudinary.uploader.upload(req.body.coverImageUrl, {
                folder: "books/cover_images", // Optional: folder in Cloudinary
                public_id: `cover_${Date.now()}`, // Optional: unique public ID
            });
            req.body.coverImageUrl = uploadResult.secure_url; // Store Cloudinary URL
        }

        // Handle Additional Images Upload to Cloudinary
        if (req.body.additionalImages && Array.isArray(req.body.additionalImages)) {
            const additionalImagesUrls = await Promise.all(
                req.body.additionalImages.map(async (imageUrl) => {
                    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
                        folder: "books/additional_images",
                        public_id: `additional_${Date.now()}`,
                    });
                    return uploadResult.secure_url;
                })
            );
            req.body.additionalImages = additionalImagesUrls; // Store Cloudinary URLs
        }

        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        res.status(500).json({
            message: "Failed to upload images to Cloudinary",
            error: error.message,
        });
    }
};

module.exports = uploadImagesToCloudinary;
