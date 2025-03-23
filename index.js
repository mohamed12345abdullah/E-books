const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDatabase = require('./middlewares/databaseMiddleware');
const setupCommonMiddleware = require('./middlewares/commonMiddleware');
const responseMiddleware = require('./middlewares/responseMiddleware');

const orderRouter = require('./routers/orderRouter'); 
const app = express();


app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



dotenv.config();


// Add the response middleware
// app.use(responseMiddleware);

console.log("runnnn");



setupCommonMiddleware(app);

// Use the database connection middleware
connectDatabase();

// Import user router
const userRouter = require('./routers/userRouter');
app.use("/user", userRouter);

// Import book router
const bookRouter = require('./routers/bookRouter'); 
app.use("/books", bookRouter);

 

// app.use("/cart", cartRouter);

app.use('/orders', orderRouter);


app.get("*",(req,res)=>{
    res.end("server run");
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});












