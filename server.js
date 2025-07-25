const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Route files
const books = require("./routes/books");
const borrowers = require("./routes/borrowers");

// Mount routers
app.use("/api/v1/borrowers", borrowers);
app.use("/api/v1/books", books);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bold.yellow)
);
