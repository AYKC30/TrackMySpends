const express = require('express');
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const cors = require('cors');
const app = express();

//! Connect to mongoose
mongoose
.connect('mongodb://localhost:27017/mern-expenses')
.then(()=>console.log("Database Connected"))
.catch((e)=> console.log(e));

//! Cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

//! Middlewares
app.use(express.json()); //? Pass incoming json data


//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);


//! Error
app.use(errorHandler);


//! Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));