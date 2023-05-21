require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is connected to db and running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Error connecting to database: ${error.message}`);
});

// Setting for CORS middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);