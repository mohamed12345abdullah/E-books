// Handle book-related errors
exports.handleBookError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid book ID format' });
    }

    // Catch any other unexpected errors
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
};
