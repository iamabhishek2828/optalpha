import React, { useState, useEffect, useMemo } from 'react';
import { transactions } from '../data';
import { calculateTotalSpending, getTopCustomer } from '../utils';
import './CustomerSpending.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CustomerSpending: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [spending, setSpending] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedFilter = localStorage.getItem('customerFilter');
      if (savedFilter) setFilter(savedFilter);
      setSpending(calculateTotalSpending(transactions));
    } catch (err) {
      setError('Failed to load transactions');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customerFilter', filter);
  }, [filter]);

  const filteredSpending = useMemo(() => {
    return Object.keys(spending)
      .filter(customer => customer.toLowerCase().includes(filter.toLowerCase()))
      .reduce((res, key) => ({ ...res, [key]: spending[key] }), {});
  }, [spending, filter]);

  const topCustomer = useMemo(() => getTopCustomer(spending), [spending]);

  const handleClearFilter = () => {
    setFilter('');
  };

  return (
    <div className="customer-spending-container">
      {error && <div className="error-message">{error}</div>}
      <Header 
        filter={filter} 
        setFilter={setFilter} 
        handleClearFilter={handleClearFilter} 
      />
      <SpendingList filteredSpending={filteredSpending} />
      <TopCustomer topCustomer={topCustomer} spending={spending} />
    </div>
  );
};

const Header: React.FC<{
  filter: string; 
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  handleClearFilter: () => void;
}> = ({ filter, setFilter, handleClearFilter }) => (
  <div className="header">
    <h2>Total Spending per Customer</h2>
    <div className="filter-container">
      <i className="fas fa-filter filter-icon"></i>
      <input
        className="filter-input"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter customers by name"
      />
      {filter && (
        <button className="clear-filter-button" onClick={handleClearFilter}>
          Clear Filter
        </button>
      )}
    </div>
  </div>
);

const SpendingList: React.FC<{ filteredSpending: Record<string, number> }> = ({ filteredSpending }) => (
  <ul className="spending-list">
    {Object.entries(filteredSpending).map(([customer, amount]) => (
      <li key={customer} className="spending-item">
        <span className="customer-name"><i className="fas fa-user"></i> {customer}:</span>
        <span className="customer-amount">${amount}</span>
      </li>
    ))}
  </ul>
);

const TopCustomer: React.FC<{ topCustomer: string | null; spending: Record<string, number> }> = ({ topCustomer, spending }) => (
  <div className="top-customer">
    <h2>Top Customer</h2>
    {topCustomer ? (
      <p className="top-customer-info">
        <span className="customer-name"><i className="fas fa-trophy"></i> {topCustomer}:</span>
        <span className="customer-amount">${spending[topCustomer]}</span>
      </p>
    ) : (
      <p className="no-top-customer">No top customer available</p>
    )}
  </div>
);

export default CustomerSpending;
