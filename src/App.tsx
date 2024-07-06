import React from 'react';
import './App.css';
import CustomerSpending from './components/CustomerSpending';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Spending Tracker</h1>
        <CustomerSpending />
      </header>
    </div>
  );
};

export default App;
