import React, { useState, useEffect } from 'react';
import { getLabours, addLabour, updateLabour, deleteLabour, toggleAttendance } from '../services/labourService';
import StatsCard from '../components/StatsCard';
import LabourList from '../components/LabourList';
import AddLabourModal from '../components/AddLabourModal';
import BackButton from '../components/BackButton';

function LabourManagement() {
  const [labours, setLabours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLabour, setEditingLabour] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    todayPresent: 0,
    todayAmount: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getLabours();
    setLabours(data);
    updateStats(data);
  };

  const updateStats = (data) => {
    const today = new Date().toISOString().split('T')[0];
    const present = data.filter(l => (l.attendance || []).includes(today));
    const amount = present.reduce((sum, l) => sum + (l.dailyWage || 0), 0);
    setStats({
      total: data.length,
      todayPresent: present.length,
      todayAmount: amount
    });
  };

  const handleAddLabour = (labourData) => {
    if (editingLabour) {
      updateLabour(editingLabour.id, labourData);
      setEditingLabour(null);
    } else {
      addLabour(labourData);
    }
    loadData();
    setShowModal(false);
  };

  const handleToggleAttendance = (id) => {
    toggleAttendance(id);
    loadData();
  };

  const handleDelete = (id) => {
    if (window.confirm('શું તમે ખરેખર આ લેબરને ડિલીટ કરવા માંગો છો?')) {
      deleteLabour(id);
      loadData();
    }
  };

  const handleEdit = (labour) => {
    setEditingLabour(labour);
    setShowModal(true);
  };

  return (
    <div className="container py-4 pb-5">
      <BackButton title="👷 લેબર મેનેજમેન્ટ" />
      
      <div className="d-flex justify-content-end mb-3">
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingLabour(null);
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle me-1"></i>
          ઉમેરો
        </button>
      </div>

      <StatsCard 
        totalLabours={stats.total}
        todayPresent={stats.todayPresent}
        todayAmount={stats.todayAmount}
      />

      <LabourList 
        labours={labours}
        onToggleAttendance={handleToggleAttendance}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddLabourModal 
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingLabour(null);
        }}
        onSave={handleAddLabour}
        editingLabour={editingLabour}
      />
    </div>
  );
}

export default LabourManagement;