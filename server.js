const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----- In-memory storage -----
let users = [];
let transactions = [];

// ---------------- AUTH ----------------

// Signup
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = { id: uuid(), name, email, password, balance: 1000 };
  users.push(user);

  res.json({ message: "Account created", user });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid login" });

  res.json({ message: "Login success", user });
});

// ---------------- TRANSACTIONS ----------------

// Send money
app.post("/api/send", (req, res) => {
  const { fromId, toEmail, amount } = req.body;

  const sender = users.find(u => u.id === fromId);
  const receiver = users.find(u => u.email === toEmail);

  if (!sender) return res.status(404).json({ message: "Sender not found" });
  if (!receiver) return res.status(404).json({ message: "Receiver not found" });

  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  sender.balance -= amount;
  receiver.balance += amount;

  const tx = {
    id: uuid(),
    type: "send",
    from: sender.email,
    to: receiver.email,
    amount,
    status: "completed",
    date: new Date()
  };

  transactions.push(tx);

  res.json({ message: "Transfer complete", tx });
});

// History for one user
app.get("/api/history/:email", (req, res) => {
  const email = req.params.email;

  const userTx = transactions.filter(
    t => t.from === email || t.to === email
  );

  res.json(userTx);
});


// Dashboard info
app.get("/api/user/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// ---------------- START SERVER ----------------
app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
