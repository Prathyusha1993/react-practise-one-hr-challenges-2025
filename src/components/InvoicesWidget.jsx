import React, { useState } from "react";
import { Table } from "react-bootstrap";

function InvoicesWidget({ invoices, setInvoices, transactions }) {
  const [showInputForm, setShowInputForm] = useState(false);
  const [newInputInvoice, setNewInputInvoice] = useState({
    client: "",
    creation_date: "",
    referenceNo: "",
    amount: 0,
  });
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInputInvoice({ ...newInputInvoice, [name]: value });
  };

  const handleAddInvoiceClick = () => {
    setShowInputForm(true);
  };

  const handleAddSaveClick = () => {
    const invoiceToAdd = { ...newInputInvoice };
    setInvoices([...invoices,invoiceToAdd]);
    setNewInputInvoice({
        client: "",
        creation_date: "",
        referenceNo: "",
        amount: 0,
    })
    setShowInputForm(false);
  };

  const handleDeleteClick = (refNo) => {
    alert(`Are you sure you want to delete invoice with reference number ${refNo}?`);
    setInvoices((prev) => prev.filter(inv => inv.referenceNo !== refNo));
  }

  const getInvoiceStatus = (invoice, transactions) => {
    return transactions.some(
      (trans) =>
        trans.referenceNo === invoice.referenceNo &&
        trans.amount === invoice.amount &&
        new Date(trans.date) > new Date(invoice.creation_date)
    )
      ? "PAID"
      : "NOT PAID";
  };

  const handleEditClick = (refNo) => {
    setEditingInvoiceId(refNo);
  }

  const handleEditInputChange = (e, refNo) => {
    const {name, value} = e.target;
    setInvoices((prev) => prev.map(inv => inv.referenceNo === refNo ? {...inv, [name]:value} : inv))
  };

  const handleSaveEditClick = (refNo) => {
    setEditingInvoiceId(null);
  };

  return (
    <div style={{ margin: "40px 40px 40px 40px" }}>
      <div style={{ float: "right", marginBottom: "13px" }}>
        <button
          style={{ background: "none", border: "1px solid black" }}
          onClick={handleAddInvoiceClick}
        >
          {showInputForm ? 'Cancel' : 'Add Invoice'}
        </button>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Client</th>
            <th>Creation Date</th>
            <th>Reference Number</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.referenceNo}>
              <td>{editingInvoiceId === invoice.referenceNo ? (<input type='text' name='client' value={invoice.client} onChange={(e) => handleEditInputChange(e, invoice.referenceNo)}/>) : invoice.client}</td>
              <td>{editingInvoiceId === invoice.referenceNo ? (<input type='date' name='creation_date' value={invoice.creation_date} onChange={(e) => handleEditInputChange(e, invoice.referenceNo)}/>) : invoice.creation_date}</td>
              <td>{invoice.referenceNo}</td>
              <td>{getInvoiceStatus(invoice, transactions)}</td>
              <td>{editingInvoiceId === invoice.referenceNo ? (<input type='number' name='amount' value={invoice.amount} onChange={(e) => handleEditInputChange(e, invoice.referenceNo)}/>) : invoice.amount}</td>
              <td>
                {editingInvoiceId === invoice.referenceNo ? (<button
                  style={{
                    textDecoration: "none",
                    border: "1px solid black",
                    background: "none",
                  }}
                  onClick={() => handleSaveEditClick(invoice.referenceNo)}
                >
                  Save
                </button>) : (<button
                  style={{
                    textDecoration: "none",
                    border: "1px solid black",
                    background: "none",
                  }}
                  onClick={() => handleEditClick(invoice.referenceNo)}
                >
                  Edit
                </button>)}
                
                <button
                  style={{
                    textDecoration: "none",
                    marginLeft: "10px",
                    border: "1px solid black",
                    background: "none",
                  }}
                  onClick={() => handleDeleteClick(invoice.referenceNo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showInputForm && (
        <tr>
          <td>
            <input
              type='text'
              name='client'
              value={newInputInvoice.client}
              onChange={handleInputChange}
              placeholder="Enter Client"
            />
          </td>
          <td>
            <input
              type='date'
              name='creation_date'
              value={newInputInvoice.creation_date}
              onChange={handleInputChange}
              placeholder="Enter date"
            />
          </td>
          <td>
            <input
              type='text'
              name='referenceNo'
              value={newInputInvoice.referenceNo}
              onChange={handleInputChange}
              placeholder="Enter Reference No"
            />
          </td>
          <td>
            <input
              type='number'
              name='amount'
              value={newInputInvoice.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
            />
          </td>
          <td>
            <button onClick={handleAddSaveClick} style={{background:'none'}}>Save</button>
          </td>
        </tr>
      )}
    </div>
  );
}

export default InvoicesWidget;
