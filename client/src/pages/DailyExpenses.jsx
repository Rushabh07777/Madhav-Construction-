import React, { useState, useEffect } from 'react';
import { 
  getExpenses, 
  addExpense, 
  updateExpense, 
  deleteExpense,
  getTodayTotalExpense,
  getMonthlyTotalExpense
} from '../services/expenseService';
import { deleteExpenseFromFirebase } from '../services/firebase';
import ExpenseList from '../components/ExpenseList';
import AddExpenseModal from '../components/AddExpenseModal';
import BackButton from '../components/BackButton';

function DailyExpenses({ syncData }) {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getExpenses();
    setExpenses(data);
    
    const today = new Date();
    setTodayTotal(getTodayTotalExpense());
    setMonthlyTotal(getMonthlyTotalExpense(today.getMonth(), today.getFullYear()));
  };

  const handleAddExpense = (expenseData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      const newExpense = {
        id: Date.now().toString(),
        date: expenseData.date || new Date().toISOString().split('T')[0],
        description: expenseData.description,
        amount: parseFloat(expenseData.amount) || 0,
        category: expenseData.category || 'અન્ય',
        createdAt: new Date().toISOString()
      };
      
      addExpense(newExpense);
    }
    
    loadData();
    setShowModal(false);
    
    if (syncData) {
      syncData();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('શું તમે ખરેખર આ ખર્ચને ડિલીટ કરવા માંગો છો?')) {
      deleteExpense(id);
      deleteExpenseFromFirebase(id);
      loadData();
      
      if (syncData) {
        syncData();
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  return (
    <div className="container py-4 pb-5">
      <BackButton title="🏗️ સાઈટ ખર્ચ" />

      <div className="d-flex justify-content-end mb-3">
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingExpense(null);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle me-1"></i>
          ઉમેરો
        </button>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-6">
          <div className="card shadow-sm p-2 text-center">
            <small className="text-secondary">આજનો ખર્ચ</small>
            <h5 className="fw-bold text-danger mb-0">₹{todayTotal}</h5>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow-sm p-2 text-center">
            <small className="text-secondary">આ મહિનાનો ખર્ચ</small>
            <h5 className="fw-bold text-warning mb-0">₹{monthlyTotal}</h5>
          </div>
        </div>
      </div>

      <ExpenseList 
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddExpenseModal 
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingExpense(null);
        }}
        onSave={handleAddExpense}
        editingExpense={editingExpense}
      />
    </div>
  );
}

export default DailyExpenses;