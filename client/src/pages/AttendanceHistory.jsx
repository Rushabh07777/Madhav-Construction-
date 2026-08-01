import React, { useState, useEffect } from 'react';
import { getLabours } from '../services/labourService';
import BackButton from '../components/BackButton';

function AttendanceHistory() {
  const [labours, setLabours] = useState([]);
  const [selectedLabour, setSelectedLabour] = useState(null);

  useEffect(() => {
    setLabours(getLabours());
  }, []);

  const getAttendanceDates = (labour) => {
    return (labour.attendance || []).sort((a, b) => new Date(b) - new Date(a));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('gu-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="container py-4 pb-5">
      <BackButton title="📖 હાજરીનો ઇતિહાસ" />

      <div className="row g-3">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-3">લેબર પસંદ કરો</h6>
              {labours.length === 0 ? (
                <p className="text-secondary text-center py-3">કોઈ લેબર નથી</p>
              ) : (
                <div className="list-group">
                  {labours.map(labour => (
                    <button
                      key={labour.id}
                      className={`list-group-item list-group-item-action ${selectedLabour?.id === labour.id ? 'active' : ''}`}
                      onClick={() => setSelectedLabour(labour)}
                    >
                      <div className="d-flex justify-content-between">
                        <span>{labour.name}</span>
                        <span className="badge bg-info">
                          {(labour.attendance || []).length} દિવસ
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body">
              {selectedLabour ? (
                <>
                  <h6 className="fw-bold mb-2">
                    {selectedLabour.name}
                    <span className="badge bg-warning ms-2">
                      ₹{selectedLabour.totalAmount || 0}
                    </span>
                  </h6>
                  <p className="text-secondary small">
                    દૈનિક વેતન: ₹{selectedLabour.dailyWage} | 
                    કુલ દિવસ: {(selectedLabour.attendance || []).length}
                  </p>
                  <hr />
                  <div className="attendance-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {getAttendanceDates(selectedLabour).length === 0 ? (
                      <p className="text-secondary text-center py-3">હજુ સુધી કોઈ હાજરી નથી</p>
                    ) : (
                      getAttendanceDates(selectedLabour).map((date, index) => (
                        <div key={index} className="d-flex justify-content-between py-2 border-bottom">
                          <span>
                            <i className="bi bi-calendar-check text-success me-2"></i>
                            {formatDate(date)}
                          </span>
                          <span className="badge bg-success">હાજર</span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-5 text-secondary">
                  <i className="bi bi-person fs-1 d-block mb-3"></i>
                  <p>ડાબી બાજુથી લેબર પસંદ કરો</p>
                  <small>જેથી તેની હાજરીનો ઇતિહાસ જોઈ શકાય</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHistory;