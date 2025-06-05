import { useState } from 'react'
import SummaryWidget from './components/SummaryWidget';
import { transactions, mockInvoices } from './data/mockData';
import InvoicesWidget from './components/InvoicesWidget';
import CountryList from './restComponents/CountryList';

function App() {
  const [invoices, setInvoices] = useState(mockInvoices);

  return (
    <>
      {/* <h1 style={{display:'flex', justifyContent:'center'}}>Financial Dashboard</h1>
      <SummaryWidget transactions={transactions} invoices={invoices} />
      <InvoicesWidget invoices={invoices} setInvoices={setInvoices} transactions={transactions} /> */}

      <h1 style={{display:'flex', justifyContent:'center'}}>Rest Countries API</h1>
      <CountryList />
    </>
  )
}

export default App
