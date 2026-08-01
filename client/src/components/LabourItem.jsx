import React from 'react';

function LabourItem({ labour, onToggleAttendance, onEdit, onDelete }) {
  const today = new Date().toISOString().split('T')[0];
  const isPresent = (labour.attendance || []).includes(today);
  const attendanceDays = (labour.attendance || []).length;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="fw-bold mb-1">
              <i className="bi bi-person-circle text-primary me-2"></i>
              {labour.name}
            </h6>
            <div className="d-flex gap-3 flex-wrap">
              <span className="badge bg-light text-dark">
                <i className="bi bi-currency-rupee me-1"></i>
                ₹{labour.dailyWage}/દિવસ
              </span>
              <span className="badge bg-info text-white">
                <i className="bi bi-calendar-check me-1"></i>
                {attendanceDays} દિવસ
              </span>
              <span className="badge bg-warning text-dark">
                <i className="bi bi-currency-rupee me-1"></i>
                ₹{labour.totalAmount || 0}
              </span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${isPresent ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => onToggleAttendance(labour.id)}
              title={isPresent ? 'ગેરહાજર કરો' : 'હાજર કરો'}
            >
              <i className={`bi ${isPresent ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>
              {isPresent ? ' હાજર' : ''}
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(labour)}
              title="એડિટ કરો"
            >
              <i className="bi bi-pencil"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(labour.id)}
              title="ડિલીટ કરો"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabourItem;