import React, { useState } from "react";
import axios from "axios";
import InvoiceItemRow from "./InvoiceItemRow";

function InvoiceForm({ fetchInvoices }) {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    issueDate: "",
    dueDate: "",
    tax: 0,
    status: "Pending",
    items: [
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
  });

  const handleMainChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;

    const quantity = Number(updatedItems[index].quantity);
    const rate = Number(updatedItems[index].rate);
    updatedItems[index].amount = quantity * rate;

    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const subtotal = formData.items.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const total = subtotal + Number(formData.tax || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/invoices", {
        ...formData,
        subtotal,
        total,
      });

      setFormData({
        invoiceNumber: "",
        clientName: "",
        clientEmail: "",
        issueDate: "",
        dueDate: "",
        tax: 0,
        status: "Pending",
        items: [{ description: "", quantity: 1, rate: 0, amount: 0 }],
      });

      fetchInvoices();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={formData.invoiceNumber}
        onChange={handleMainChange}
        required
      />

      <input
        type="text"
        name="clientName"
        placeholder="Client Name"
        value={formData.clientName}
        onChange={handleMainChange}
        required
      />

      <input
        type="email"
        name="clientEmail"
        placeholder="Client Email"
        value={formData.clientEmail}
        onChange={handleMainChange}
        required
      />

      <input
        type="date"
        name="issueDate"
        value={formData.issueDate}
        onChange={handleMainChange}
        required
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleMainChange}
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleMainChange}
      >
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
        <option value="Overdue">Overdue</option>
      </select>

      <h3>Invoice Items</h3>

      {formData.items.map((item, index) => (
        <InvoiceItemRow
          key={index}
          item={item}
          index={index}
          handleChange={handleItemChange}
          removeItem={removeItem}
        />
      ))}

      <button type="button" onClick={addItem}>
        Add Item
      </button>

      <input
        type="number"
        name="tax"
        placeholder="Tax"
        value={formData.tax}
        step="0.01"
        min="0"
        onChange={handleMainChange}
      />

      <div className="totals">
        <p><strong>Subtotal:</strong> {subtotal.toFixed(2)}</p>
        <p><strong>Total:</strong> {total.toFixed(2)}</p>
      </div>

      <button type="submit">Save Invoice</button>
    </form>
  );
}

export default InvoiceForm;