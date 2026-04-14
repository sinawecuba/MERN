const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");

router.get("/", async (req, res) => {
  const data = await Invoice.find().sort({ createdAt: -1 });
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const data = await Invoice.findById(req.params.id);
  res.json(data);
});

router.post("/", async (req, res) => {
  const invoice = new Invoice(req.body);
  const saved = await invoice.save();
  res.json(saved);
});

router.delete("/:id", async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
