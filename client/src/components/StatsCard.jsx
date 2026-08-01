import React from 'react';

function StatsCard({ totalLabours, todayPresent, todayAmount }) {
  return (
    <div className="card shadow-sm p-3 mt-3">
      <div className="row text-center">
        <div className="col-4">
          <h3 className="mb-0">👷</h3>
          <h4 className="fw-bold mb-0">{totalLabours}</h4>
          <small className="text-secondary">કુલ લેબર</small>
        </div>
        <div className="col-4 border-start border-end">
          <h3 className="mb-0">✅</h3>
          <h4 className="fw-bold mb-0">{todayPresent}</h4>
          <small className="text-secondary">આજે હાજર</small>
        </div>
        <div className="col-4">
          <h3 className="mb-0">💰</h3>
          <h4 className="fw-bold mb-0">₹{todayAmount}</h4>
          <small className="text-secondary">આજનો હિસાબ</small>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;