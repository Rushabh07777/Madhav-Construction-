import React, { useState } from 'react';

const CATEGORY_COLORS = {
  'ખાણ-પીણા': 'danger',
  'શાકભાજી': 'success',
  'કરિયાણું': 'warning',
  'પરિવહન': 'info',
  'બિલ': 'secondary',
  'મોબાઇલ રિચાર્જ': 'primary',
  'શોપિંગ': 'pink',
  'દવા': 'danger',
  'એન્ટરટેઈનમેન્ટ': 'purple',
  'અન્ય': 'light'
};

const CATEGORY_ICONS = {
  'ખાણ-પીણા': '🍽️',
  'શાકભાજી': '🥬',
  'કરિયાણું': '🛒',
  'પરિવહન': '🚗',
  'બિલ': '📄',
  'મોબાઇલ રિચાર્જ': '📱',
  'શોપિંગ': '🛍️',
  'દવા': '💊',
  'એન્ટરટેઈનમેન્ટ': '🎬',
  'અન્ય': '📌'
};

function PersonalExpenseList({ expenses, onEdit, onDelete }) {
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPaymentMode, setFilterPaymentMode] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('gu-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredExpenses = expenses.filter(exp => {
    let match = true;
    if (filterDate) match = match && exp.date === filterDate;
    if (filterCategory) match = match && exp.category === filterCategory;
    if (filterPaymentMode) match = match && exp.paymentMode === filterPaymentMode;
    return match;
  });

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-wallet2 fs-1 text-secondary"></i>
        <p className="text-secondary mt-3">હજુ સુધી કોઈ ખર્ચ નથી</p>
        <small className="text-muted">નવો ખર્ચ ઉમેરવા "➕ ઉમેરો" બટન દબાવો</small>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="card shadow-sm p-3 mb-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="તારીખ ફિલ્ટર"
              style={{ borderRadius: '12px' }}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ borderRadius: '12px' }}
            >
              <option value="">બધી કેટેગરી</option>
              {Object.keys(CATEGORY_COLORS).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterPaymentMode}
              onChange={(e) => setFilterPaymentMode(e.target.value)}
              style={{ borderRadius: '12px' }}
            >
              <option value="">બધાં માધ્યમ</option>
              <option value="રોકડ">રોકડ</option>
              <option value="UPI">UPI</option>
              <option value="કાર્ડ">કાર્ડ</option>
              <option value="નેટ બેંકિંગ">નેટ બેંકિંગ</option>
            </select>
          </div>
        </div>
        {(filterDate || filterCategory || filterPaymentMode) && (
          <div className="mt-2 text-end">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                setFilterDate('');
                setFilterCategory('');
                setFilterPaymentMode('');
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i>
              ફિલ્ટર સાફ કરો
            </button>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="alert alert-warning d-flex justify-content-between align-items-center">
        <span className="fw-bold">📊 કુલ ખર્ચ:</span>
        <span className="fw-bold fs-5">₹{totalAmount}</span>
      </div>

      {/* Expense List */}
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-4 text-secondary">
          <i className="bi bi-search fs-3 d-block mb-2"></i>
          <p>આ ફિલ્ટર સાથે કોઈ ખર્ચ નથી</p>
        </div>
      ) : (
        filteredExpenses.map(expense => (
          <div key={expense.id} className="card shadow-sm mb-2">
            <div className="card-body py-2">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="badge bg-light text-dark">
                      {formatDate(expense.date)}
                    </span>
                    <span className={`badge bg-${CATEGORY_COLORS[expense.category] || 'light'} text-dark`}>
                      {CATEGORY_ICONS[expense.category] || '📌'} {expense.category}
                    </span>
                    <span className="badge bg-info text-dark">
                      💳 {expense.paymentMode}
                    </span>
                  </div>
                  <div className="mt-1">
                    <strong>{expense.description}</strong>
                    {expense.note && (
                      <span className="text-secondary ms-2 small">
                        <i className="bi bi-pencil me-1"></i>
                        {expense.note}
                      </span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold text-primary fs-5">₹{expense.amount}</span>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(expense)}
                    title="એડિટ કરો"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(expense.id)}
                    title="ડિલીટ કરો"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PersonalExpenseList;