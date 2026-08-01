import React from 'react';
import LabourItem from './LabourItem';

function LabourList({ labours, onToggleAttendance, onEdit, onDelete }) {
  if (labours.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-people fs-1 text-secondary"></i>
        <p className="text-secondary mt-3">હજુ સુધી કોઈ લેબર ઉમેરવામાં આવી નથી</p>
        <small className="text-muted">નવો લેબર ઉમેરવા "➕ ઉમેરો" બટન દબાવો</small>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {labours.map(labour => (
        <LabourItem
          key={labour.id}
          labour={labour}
          onToggleAttendance={onToggleAttendance}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default LabourList;