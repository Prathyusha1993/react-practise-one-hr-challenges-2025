import React from 'react'

function SummaryWidget({ transactions, invoices }) {
    const threshoold = 1000;
    const totalBalance = transactions.reduce((total, current) => total + current.amount, 0);
    const totalBalanceColor = totalBalance > threshoold ? 'green' : totalBalance > 0 ? 'yellow' :'red';

  return (
    <div style={{textAlign:'center', marginTop:'30px'}}>
        <h5 style={{color: totalBalanceColor}}>Total Balance: {totalBalance.toFixed(2)}</h5>
        <h5>Invoices Created(last 30 days): {invoices.length}</h5>
    </div>
  )
}

export default SummaryWidget;