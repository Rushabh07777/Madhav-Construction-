import React, { useState } from 'react';
import { downloadBackup, uploadBackup } from '../utils/backup';
import BackButton from '../components/BackButton';

function Settings() {
  const [backupStatus, setBackupStatus] = useState('');

  const handleBackup = () => {
    try {
      downloadBackup();
      setBackupStatus('✅ બેકઅપ સફળ!');
      setTimeout(() => setBackupStatus(''), 3000);
    } catch (error) {
      setBackupStatus('❌ બેકઅપ નિષ્ફળ');
    }
  };

  const handleRestore = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (window.confirm('શું તમે ખરેખર બધો ડેટા રિસ્ટોર કરવા માંગો છો? હાલનો ડેટા ડિલીટ થઈ જશે!')) {
      uploadBackup(file)
        .then((success) => {
          if (success) {
            setBackupStatus('✅ ડેટા રિસ્ટોર થયો! પેજ રિફ્રેશ થશે.');
            setTimeout(() => window.location.reload(), 2000);
          } else {
            setBackupStatus('❌ રિસ્ટોર નિષ્ફળ');
          }
        })
        .catch(() => setBackupStatus('❌ ફાઇલ વાંચવામાં ભૂલ'));
    }
  };

  return (
    <div className="container py-4 pb-5">
      <BackButton title="⚙️ સેટિંગ્સ" />

      <div className="card shadow-sm p-3 mb-3">
        <h6 className="fw-bold">📦 ડેટા બેકઅપ</h6>
        <p className="text-secondary small">તમારો બધો ડેટા JSON ફાઇલમાં સેવ કરો</p>
        <button className="btn btn-primary w-100" onClick={handleBackup}>
          <i className="bi bi-download me-2"></i>
          બેકઅપ ડાઉનલોડ કરો
        </button>
      </div>

      <div className="card shadow-sm p-3 mb-3">
        <h6 className="fw-bold">🔄 ડેટા રિસ્ટોર</h6>
        <p className="text-secondary small">બેકઅપ ફાઇલમાંથી ડેટા રિસ્ટોર કરો</p>
        <input
          type="file"
          className="form-control"
          accept=".json"
          onChange={handleRestore}
          style={{ borderRadius: '12px' }}
        />
      </div>

      {backupStatus && (
        <div className={`alert ${backupStatus.includes('✅') ? 'alert-success' : 'alert-danger'} mt-3`}>
          {backupStatus}
        </div>
      )}

      <div className="card shadow-sm p-3">
        <h6 className="fw-bold">ℹ️ એપ વિશે</h6>
        <p className="small text-secondary mb-1">
          <strong>નામ:</strong> MADHAV CONSTRUCTION
        </p>
        <p className="small text-secondary mb-1">
          <strong>વર્ઝન:</strong> 1.0.0
        </p>
        <p className="small text-secondary mb-0">
          <strong>સ્ટોરેજ:</strong> localStorage (Offline)
        </p>
      </div>
    </div>
  );
}

export default Settings;