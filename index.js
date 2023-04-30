require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

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


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);