import React, { useState, useEffect } from 'react';
import { transactions } from '../data';
import { calculateTotalSpending, getTopCustomer } from '../utils';
import './CustomerSpending.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const CustomerSpending: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [spending, setSpending] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedFilter = localStorage.getItem('customerFilter');
    if (savedFilter) setFilter(savedFilter);
    setSpending(calculateTotalSpending(transactions));
  }, []);

  useEffect(() => {
    localStorage.setItem('customerFilter', filter);
  }, [filter]);

  const filteredSpending: Record<string, number> = Object.keys(spending)
    .filter(customer => customer.toLowerCase().includes(filter.toLowerCase()))
    .reduce((res, key) => ({ ...res, [key]: spending[key] }), {});

  const topCustomer = getTopCustomer(spending);

  const handleClearFilter = () => {
    setFilter('');
  };

  return (
    <div className="customer-spending-container">
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
      <ul className="spending-list">
        {Object.entries(filteredSpending).map(([customer, amount]) => (
          <li key={customer} className="spending-item">
            <span className="customer-name"><i className="fas fa-user"></i> {customer}:</span>
            <span className="customer-amount">${amount}</span>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default CustomerSpending;




