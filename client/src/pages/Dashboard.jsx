import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLabours, getTodayAttendance, getTodayTotalAmount } from '../services/labourService';
import { getTodayTotalExpense } from '../services/expenseService';
import { getTodayTotalPersonalExpense } from '../services/personalExpenseService';
import logo from '../assets/logo.png';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLabours: 0,
    todayPresent: 0,
    todayAmount: 0,
    todayExpense: 0,
    todayPersonalExpense: 0
  });
  const today = new Date().toLocaleDateString('gu-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  useEffect(() => {
    const labours = getLabours();
    const todayPresent = getTodayAttendance();
    const todayAmount = getTodayTotalAmount();
    const todayExpense = getTodayTotalExpense();
    const todayPersonalExpense = getTodayTotalPersonalExpense();
    setStats({
      totalLabours: labours.length,
      todayPresent: todayPresent.length,
      todayAmount: todayAmount,
      todayExpense: todayExpense,
      todayPersonalExpense: todayPersonalExpense
    });
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center">
        <img src={logo} width="130" alt="MADHAV CONSTRUCTION" className="mb-3" />
        <h2 className="fw-bold" style={{ color: '#d4a017' }}>
          માધવ કોન્સ્ટ્રશન 
        </h2>
        <p className="text-secondary">
          <i className="bi bi-calendar3 me-1"></i>
          {today}
        </p>
      </div>

      <div className="card shadow-sm p-3 mt-3">
        <div className="row text-center">
          <div className="col-3">
            <h5 className="mb-0">👷</h5>
            <h4 className="fw-bold mb-0">{stats.totalLabours}</h4>
            <small className="text-secondary">કુલ લેબર</small>
          </div>
          <div className="col-3 border-start">
            <h5 className="mb-0">✅</h5>
            <h4 className="fw-bold mb-0">{stats.todayPresent}</h4>
            <small className="text-secondary">આજે હાજર</small>
          </div>
          <div className="col-3 border-start">
            <h5 className="mb-0">💰</h5>
            <h4 className="fw-bold mb-0 text-success">₹{stats.todayAmount}</h4>
            <small className="text-secondary">હિસાબ</small>
          </div>
          <div className="col-3 border-start">
            <h5 className="mb-0">💸</h5>
            <h4 className="fw-bold mb-0 text-danger">₹{stats.todayExpense}</h4>
            <small className="text-secondary">સાઈટ ખર્ચ</small>
          </div>
        </div>
        <div className="row text-center mt-2 pt-2 border-top">
          <div className="col-12">
            <h5 className="mb-0">👤</h5>
            <h4 className="fw-bold mb-0 text-primary">₹{stats.todayPersonalExpense}</h4>
            <small className="text-secondary">મારો આજનો ખર્ચ</small>
          </div>
        </div>
      </div>

      <div className="row mt-4 g-3">
        <div className="col-6">
          <button 
            className="btn btn-primary w-100 py-3 shadow-sm"
            onClick={() => navigate('/labour')}
          >
            <i className="bi bi-people-fill me-2"></i>
            લેબર
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-success w-100 py-3 shadow-sm"
            onClick={() => navigate('/labour')}
          >
            <i className="bi bi-calendar-check me-2"></i>
            હાજરી
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-warning w-100 py-3 shadow-sm"
            onClick={() => navigate('/labour')}
          >
            <i className="bi bi-currency-rupee me-2"></i>
            હિસાબ
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-danger w-100 py-3 shadow-sm"
            onClick={() => navigate('/expenses')}
          >
            <i className="bi bi-building me-2"></i>
            સાઈટ ખર્ચ
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-info w-100 py-3 shadow-sm text-white"
            onClick={() => navigate('/personal-expenses')}
          >
            <i className="bi bi-person-wallet me-2"></i>
            મારો ખર્ચ
          </button>
        </div>
        <div className="col-6">
          <button 
            className="btn btn-dark w-100 py-3 shadow-sm"
            onClick={() => navigate('/settings')}
          >
            <i className="bi bi-gear me-2"></i>
            સેટિંગ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;