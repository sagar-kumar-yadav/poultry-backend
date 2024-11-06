import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// dotenv configuration
dotenv.config();

// database configuration
connectDatabase();

// Initialize Express
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://poultry-backend-pdpi.onrender.com",
  "https://aadarshudyoug.netlify.app"
];

// middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to poultry app</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
