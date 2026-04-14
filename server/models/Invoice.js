const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  clientName: String,
  clientEmail: String,
  issueDate: Date,
  dueDate: Date,
  items: [itemSchema],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);
