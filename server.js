const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

// MongoDB connection
app.use(cors()); 
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/RoadSafety`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the connectDB function
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes after the database is connected
const accidentRoutes = require("./Routes/accidents");
app.use("/api/accidents", accidentRoutes);

// Root route
app.get("/", (req, res) => {
  res.send(`
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <h1>Road Safety Server is Running!</h1>
    </div>
  `);
});

// Start server after database connection is established
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
