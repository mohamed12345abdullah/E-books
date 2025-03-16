const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((error) => console.error("MongoDB connection error:", error));
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDatabase;
