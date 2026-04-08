const express = require("express");
const app = express();
app.use(express.json());

let policies = []; // simple in-memory store

// POST - create
app.post("/policies", (req, res) => {
  const newPolicy = {
    id: policies.length + 1,
    policyNumber: "POL" + (policies.length + 1), // auto-generate
    ...req.body
  };
  policies.push(newPolicy);
  res.status(201).json(newPolicy);
});

// GET - read
app.get("/policies/:id", (req, res) => {
  const policyId = parseInt(req.params.id);
  const policy = policies.find(p => p.id === policyId);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  res.json(policy);
});

// PATCH - update
app.patch("/policies/:id", (req, res) => {
  const policyId = parseInt(req.params.id);
  const policy = policies.find(p => p.id === policyId);
  if (!policy) return res.status(404).json({ message: "Policy not found" });
  Object.assign(policy, req.body);
  res.json({ message: "Policy updated successfully", policy });
});

// DELETE - remove
app.delete("/policies/:id", (req, res) => {
  const policyId = parseInt(req.params.id);
  const index = policies.findIndex(p => p.id === policyId);
  if (index === -1) return res.status(404).json({ message: "Policy not found" });
  policies.splice(index, 1);
  res.json({ message: "Policy deleted successfully", id: policyId });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));