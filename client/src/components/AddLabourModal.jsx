import React, { useState, useEffect } from 'react';

function AddLabourModal({ show, onClose, onSave, editingLabour }) {
  const [name, setName] = useState('');
  const [dailyWage, setDailyWage] = useState('');

  useEffect(() => {
    if (editingLabour) {
      setName(editingLabour.name);
      setDailyWage(editingLabour.dailyWage.toString());
    } else {
      setName('');
      setDailyWage('');
    }
  }, [editingLabour, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('કૃપા કરીને લેબરનું નામ દાખલ કરો');
      return;
    }
    if (!dailyWage || parseFloat(dailyWage) <= 0) {
      alert('કૃપા કરીને માન્ય દૈનિક વેતન દાખલ કરો');
      return;
    }

    onSave({
      id: editingLabour?.id,
      name: name.trim(),
      dailyWage: parseFloat(dailyWage)
    });
    
    setName('');
    setDailyWage('');
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px' }}>
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">
              {editingLabour ? '✏️ લેબર એડિટ કરો' : '👷 નવો લેબર ઉમેરો'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">લેબરનું નામ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="દા.ત. રમેશ પટેલ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: '12px' }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">દૈનિક વેતન (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="દા.ત. 500"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value)}
                  style={{ borderRadius: '12px' }}
                  min="1"
                  step="1"
                  required
                />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                રદ કરો
              </button>
              <button type="submit" className="btn btn-primary">
                {editingLabour ? '🔄 અપડેટ કરો' : '➕ ઉમેરો'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLabourModal;