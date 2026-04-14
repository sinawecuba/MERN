import React from "react";

function InvoiceItemRow({ item, index, handleChange, removeItem }) {
  return (
    <div className="item-row">
      <input
        type="text"
        name="description"
        placeholder="Item description"
        value={item.description}
        onChange={(e) => handleChange(index, e)}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Qty"
        value={item.quantity}
        min="1"
        onChange={(e) => handleChange(index, e)}
        required
      />

      <input
        type="number"
        name="rate"
        placeholder="Rate"
        value={item.rate}
        min="0"
        step="0.01"
        onChange={(e) => handleChange(index, e)}
        required
      />

      <input type="number" value={item.amount} readOnly />

      <button type="button" onClick={() => removeItem(index)}>
        Remove
      </button>
    </div>
  );
}

export default InvoiceItemRow;