import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LabourManagement from './pages/LabourManagement';
import AttendanceHistory from './pages/AttendanceHistory';
import DailyExpenses from './pages/DailyExpenses';
import PersonalExpenses from './pages/PersonalExpenses';
import Settings from './pages/Settings';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper" style={{ paddingBottom: '70px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/labour" element={<LabourManagement />} />
          <Route path="/history" element={<AttendanceHistory />} />
          <Route path="/expenses" element={<DailyExpenses />} />
          <Route path="/personal-expenses" element={<PersonalExpenses />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <MobileBottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;