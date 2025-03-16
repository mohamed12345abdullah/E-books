// Calculate discount percentage for a new book
exports.calculateDiscountPercentage = (req, res, next) => {
    if (req.body.originalPrice > 0) {
        req.body.discountPercentage = ((req.body.originalPrice - req.body.discountedPrice) / req.body.originalPrice) * 100;
    } else {
        req.body.discountPercentage = 0;
    }
    next();
};
