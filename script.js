// Simple example: handle the contact form submission
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks! We received your message and will reach out shortly.");
});

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ In production, store this in environment variables
const JWT_SECRET = "super_secret_key_change_me";

// Demo admin (store in DB later)
const adminUser = {
  username: "admin",
  // password: admin123 (hashed)
  passwordHash: "$2b$10$4Y6L8mKxGeC2JYy0sX6pqu.0xg6xg5sYf1Gm7MZB0bBrqZyR1bQZ2"
};

// -------- LOGIN -----------
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, adminUser.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// -------- AUTH MIDDLEWARE --------
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// -------- PROTECTED ROUTE (Dashboard Data) --------
app.get("/api/admin/summary", auth, (req, res) => {
  res.json({
    users: 128,
    transactions: 542,
    revenue: 23150,
    status: "ok"
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
