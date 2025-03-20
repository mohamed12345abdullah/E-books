const handleCartError = (err, req, res, next) => {
  console.error("Cart Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: Object.values(err.errors).map(error => error.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format",
      details: "The provided ID format is incorrect",
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
    details: err.message || "An unexpected error occurred",
  });
};

module.exports = { handleCartError };
