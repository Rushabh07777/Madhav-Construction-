import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'ખાણ-પીણા', 'શાકભાજી', 'કરિયાણું', 'પરિવહન', 
  'બિલ', 'મોબાઇલ રિચાર્જ', 'શોપિંગ', 'દવા',
  'એન્ટરટેઈનમેન્ટ', 'અન્ય'
];

const PAYMENT_MODES = ['રોકડ', 'UPI', 'કાર્ડ', 'નેટ બેંકિંગ'];

function AddPersonalExpenseModal({ show, onClose, onSave, editingExpense }) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('અન્ય');
  const [paymentMode, setPaymentMode] = useState('રોકડ');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setDate(editingExpense.date);
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category || 'અન્ય');
      setPaymentMode(editingExpense.paymentMode || 'રોકડ');
      setNote(editingExpense.note || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setDescription('');
      setAmount('');
      setCategory('અન્ય');
      setPaymentMode('રોકડ');
      setNote('');
    }
  }, [editingExpense, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('કૃપા કરીને ખર્ચનું વર્ણન દાખલ કરો');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert('કૃપા કરીને માન્ય રકમ દાખલ કરો');
      return;
    }

    onSave({
      id: editingExpense?.id,
      date,
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      paymentMode,
      note: note.trim()
    });

    setDescription('');
    setAmount('');
    setCategory('અન્ય');
    setPaymentMode('રોકડ');
    setNote('');
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ borderRadius: '20px' }}>
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">
              {editingExpense ? '✏️ ખર્ચ એડિટ કરો' : '💰 નવો ખર્ચ ઉમેરો'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">📅 તારીખ</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ borderRadius: '12px' }}
                    required
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label fw-semibold">💰 રકમ (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="કેટલા રૂપિયા?"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ borderRadius: '12px' }}
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">📝 વર્ણન</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="શું ખર્ચ કર્યું?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ borderRadius: '12px' }}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">🏷️ કેટેગરી</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">💳 ચુકવણી માધ્યમ</label>
                  <select
                    className="form-select"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  >
                    {PAYMENT_MODES.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">📝 નોંધ (વૈકલ્પિક)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="કોઈ વિશેષ નોંધ..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                રદ કરો
              </button>
              <button type="submit" className="btn btn-primary">
                {editingExpense ? '🔄 અપડેટ કરો' : '➕ ઉમેરો'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPersonalExpenseModal;