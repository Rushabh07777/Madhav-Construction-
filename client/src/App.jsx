import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { listenAllData, syncAllData } from './services/firebase';
import Dashboard from './pages/Dashboard';
import LabourManagement from './pages/LabourManagement';
import AttendanceHistory from './pages/AttendanceHistory';
import DailyExpenses from './pages/DailyExpenses';
import PersonalExpenses from './pages/PersonalExpenses';
import Settings from './pages/Settings';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 Firebase Listen Starting...");
    
    listenAllData((data) => {
      console.log("📦 Data Received:", data);
      
      // Firebase ડેટા localStorage માં સેવ કરો
      localStorage.setItem('madhav_construction_labours', JSON.stringify(data.labours || []));
      localStorage.setItem('madhav_construction_expenses', JSON.stringify(data.expenses || []));
      localStorage.setItem('madhav_personal_expenses', JSON.stringify(data.personalExpenses || []));
      
      setIsLoading(false);
      setError(null);
    });
  }, []);

  // 📤 Data Sync કરવા માટે function
  const syncData = () => {
    const labours = JSON.parse(localStorage.getItem('madhav_construction_labours') || '[]');
    const expenses = JSON.parse(localStorage.getItem('madhav_construction_expenses') || '[]');
    const personalExpenses = JSON.parse(localStorage.getItem('madhav_personal_expenses') || '[]');
    syncAllData(labours, expenses, personalExpenses);
    console.log("✅ Data Synced to Firebase");
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        background: '#f5f7fb'
      }}>
        <div className="spinner-border text-warning" role="status" style={{ width: '50px', height: '50px' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ color: '#d4a017', fontWeight: 'bold', fontSize: '18px' }}>
          <i className="bi bi-cloud-arrow-down me-2"></i>
          ડેટા લોડ થઈ રહ્યો છે...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>❌ કનેક્શન એરર</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          ફરી પ્રયાસ કરો
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper" style={{ paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<Dashboard syncData={syncData} />} />
          <Route path="/labour" element={<LabourManagement syncData={syncData} />} />
          <Route path="/history" element={<AttendanceHistory />} />
          <Route path="/expenses" element={<DailyExpenses syncData={syncData} />} />
          <Route path="/personal-expenses" element={<PersonalExpenses syncData={syncData} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;