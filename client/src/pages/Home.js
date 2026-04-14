import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";

function Home() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices");
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      fetchInvoices();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div>
      <InvoiceForm fetchInvoices={fetchInvoices} />

      <div className="invoice-list">
        {invoices.map((invoice) => (
          <div className="invoice-card" key={invoice._id}>
            <h3>{invoice.invoiceNumber}</h3>
            <p><strong>Client:</strong> {invoice.clientName}</p>
            <p><strong>Email:</strong> {invoice.clientEmail}</p>
            <p><strong>Total:</strong> {Number(invoice.total).toFixed(2)}</p>
            <p><strong>Status:</strong> {invoice.status}</p>

            <div className="invoice-actions">
              <Link to={`/invoice/${invoice._id}`}>
                <button>View</button>
              </Link>

              <button onClick={() => deleteInvoice(invoice._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;