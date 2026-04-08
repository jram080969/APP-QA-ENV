const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const DATA_FILE = "data.json";

// Read data
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Write data
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ROOT (optional for browser)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// GET ALL
app.get("/policies", (req, res) => {
  const policies = readData();
  res.json(policies);
});

// GET BY ID
app.get("/policies/:id", (req, res) => {
  const policies = readData();
  const policy = policies.find(p => p.id == req.params.id);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  res.json(policy);
});

// POST
app.post("/policies", (req, res) => {
  let policies = readData();

  const newPolicy = {
    id: policies.length + 1,
    policyNumber: "POL" + (policies.length + 1),
    ...req.body
  };

  policies.push(newPolicy);
  writeData(policies);

  res.status(201).json(newPolicy);
});

// PATCH (partial update enabled)
app.patch("/policies/:id", (req, res) => {
  let policies = readData();
  const policy = policies.find(p => p.id == req.params.id);

  if (!policy) return res.status(404).json({ message: "Policy not found" });

  // Merge only provided fields into existing policy
  Object.assign(policy, req.body);

  writeData(policies);
  res.json(policy);
});

// DELETE
app.delete("/policies/:id", (req, res) => {
  let policies = readData();
  const index = policies.findIndex(p => p.id == req.params.id);

  if (index === -1) return res.status(404).json({ message: "Policy not found" });

  const deleted = policies.splice(index, 1);
  writeData(policies);

  res.json({ message: "Deleted successfully", deleted });
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});