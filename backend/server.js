import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import authRoutes, { protect, isAdmin } from "./routes/auth.js";
import membersRoutes from "./routes/members.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Passport middleware
app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", membersRoutes); // All routes in members.js will be prefixed with /api

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Example protected route
app.get("/api/admin-only", protect, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin! You have accessed a protected route.",
    user: req.user,
  });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Test the database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
