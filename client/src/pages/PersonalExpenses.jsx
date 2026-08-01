import React, { useState, useEffect } from 'react';
import { 
  getPersonalExpenses, 
  addPersonalExpense, 
  updatePersonalExpense, 
  deletePersonalExpense,
  getTodayTotalPersonalExpense,
  getWeeklyTotalPersonalExpense,
  getMonthlyTotalPersonalExpense
} from '../services/personalExpenseService';
import { addPersonalExpenseToFirebase, deletePersonalExpenseFromFirebase } from '../services/firebase';
import PersonalExpenseList from '../components/PersonalExpenseList';
import AddPersonalExpenseModal from '../components/AddPersonalExpenseModal';
import BackButton from '../components/BackButton';

function PersonalExpenses({ syncData }) {  // ← props માં syncData ઉમેરો
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getPersonalExpenses();
    setExpenses(data);
    
    const today = new Date();
    setTodayTotal(getTodayTotalPersonalExpense());
    setWeeklyTotal(getWeeklyTotalPersonalExpense());
    setMonthlyTotal(getMonthlyTotalPersonalExpense(today.getMonth(), today.getFullYear()));
  };

  const handleAddExpense = (expenseData) => {
    if (editingExpense) {
      // Update Personal Expense
      updatePersonalExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      // Add Personal Expense
      const newExpense = {
        id: Date.now().toString(),
        date: expenseData.date || new Date().toISOString().split('T')[0],
        description: expenseData.description,
        amount: parseFloat(expenseData.amount) || 0,
        category: expenseData.category || 'અન્ય',
        paymentMode: expenseData.paymentMode || 'રોકડ',
        note: expenseData.note || '',
        createdAt: new Date().toISOString()
      };
      
      // 🔥 Firebase માં સેવ કરો
      addPersonalExpenseToFirebase(newExpense);
      
      // Local Storage માં સેવ કરો
      addPersonalExpense(newExpense);
    }
    
    loadData();
    setShowModal(false);
    
    // ✅ Firebase Sync કરો
    if (syncData) {
      syncData();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('શું તમે ખરેખર આ ખર્ચને ડિલીટ કરવા માંગો છો?')) {
      // 🔥 Firebase માંથી ડિલીટ કરો
      // Note: Firebase માં index based delete છે, એટલે આપણે સરળતા માટે localStorage delete કરીશું
      // અને પછી sync કરીશું
      
      deletePersonalExpense(id);
      loadData();
      
      // ✅ Firebase Sync કરો (આખો ડેટા ફરી સેવ થશે)
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
      <BackButton title="👤 મારો દૈનિક ખર્ચ" />

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

      {/* Stats Cards */}
      <div className="row g-2 mb-3">
        <div className="col-4">
          <div className="card shadow-sm p-2 text-center">
            <small className="text-secondary">આજનો ખર્ચ</small>
            <h5 className="fw-bold text-danger mb-0">₹{todayTotal}</h5>
          </div>
        </div>
        <div className="col-4">
          <div className="card shadow-sm p-2 text-center">
            <small className="text-secondary">અઠવાડિયાનો</small>
            <h5 className="fw-bold text-warning mb-0">₹{weeklyTotal}</h5>
          </div>
        </div>
        <div className="col-4">
          <div className="card shadow-sm p-2 text-center">
            <small className="text-secondary">મહિનાનો</small>
            <h5 className="fw-bold text-success mb-0">₹{monthlyTotal}</h5>
          </div>
        </div>
      </div>

      <PersonalExpenseList 
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddPersonalExpenseModal 
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

export default PersonalExpenses;  // ← default export છે તેની ખાતરી કરો