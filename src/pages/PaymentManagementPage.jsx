import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export

const PaymentManagementPage = () => {
  // State for the payment data
  const [payments, setPayments] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      paymentMethod: 'Credit Card',
      invoiceNumber: '1',
      subscriptionPlan: 'Premium',
      amount: 450,
      date: '2024-01-01',
      billingPeriod: '01.02.23 - 01.03.24',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      paymentMethod: 'Credit Card',
      invoiceNumber: '188',
      subscriptionPlan: 'Premium',
      amount: 999,
      date: '2024-01-01',
      billingPeriod: '01.02.23 - 01.03.24',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: '54',
      subscriptionPlan: 'Standard',
      amount: 890,
      date: '2024-01-01',
      billingPeriod: '01.02.23 - 01.03.24',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'jemily.davis@example.com',
      paymentMethod: 'PayPal',
      invoiceNumber: '1554',
      subscriptionPlan: 'Premium',
      amount: 450,
      date: '2024-01-01',
      billingPeriod: '01.02.23 - 01.03.24',
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'john.doe@example.com',
      paymentMethod: 'Credit Card',
      invoiceNumber: '12141',
      subscriptionPlan: 'Basic',
      amount: 999,
      date: '2024-01-01',
      billingPeriod: '01.02.23 - 01.03.24',
    },
  ]);

  // Function to handle export to Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(payments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, 'payments.xlsx');
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <div>
          <h1>
            <i className="fa-light fa-credit-card"></i>
            <span className="mr-4">&nbsp; Payment Management</span>
          </h1>
        </div>
      </div>

      {/* Export Button */}
      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="col-md-4 d-flex align-items-end">
            <button
              id="export-btn"
              className="btn custom-btn text-white w-50 ctb"
              onClick={handleExport}
            >
              Export Data <i className="fa-regular fa-file-csv"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover dt-responsive"
                  id="data-table"
                >
                  <thead>
                    <tr>
                      <th>Sr. num</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Payment Method</th>
                      <th>Invoice Numb.</th>
                      <th>Subscription Plan</th>
                      <th>Amount</th>
                      <th>Date (of buy)</th>
                      <th>Billing Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={payment.id}>
                        <td>{index + 1}</td>
                        <td>{payment.name}</td>
                        <td>{payment.email}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{payment.invoiceNumber}</td>
                        <td>{payment.subscriptionPlan}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.date}</td>
                        <td>{payment.billingPeriod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentManagementPage;
