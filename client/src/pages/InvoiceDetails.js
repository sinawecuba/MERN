import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoices/${id}`);
        setInvoice(res.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <p>Loading invoice...</p>;
  }

  return (
    <div className="invoice-details">
      <h2>Invoice {invoice.invoiceNumber}</h2>
      <p><strong>Client:</strong> {invoice.clientName}</p>
      <p><strong>Email:</strong> {invoice.clientEmail}</p>
      <p>
        <strong>Issue Date:</strong>{" "}
        {new Date(invoice.issueDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(invoice.dueDate).toLocaleDateString()}
      </p>
      <p><strong>Status:</strong> {invoice.status}</p>

      <h3>Items</h3>
      {invoice.items.map((item, index) => (
        <div key={index} className="detail-item">
          <p>{item.description}</p>
          <p>Qty: {item.quantity}</p>
          <p>Rate: {item.rate}</p>
          <p>Amount: {item.amount}</p>
        </div>
      ))}

      <h3>Summary</h3>
      <p><strong>Subtotal:</strong> {Number(invoice.subtotal).toFixed(2)}</p>
      <p><strong>Tax:</strong> {Number(invoice.tax).toFixed(2)}</p>
      <p><strong>Total:</strong> {Number(invoice.total).toFixed(2)}</p>

      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default InvoiceDetails;