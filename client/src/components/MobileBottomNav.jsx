import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid #eef3f9',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '8px 0',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      zIndex: 1000
    }}>
      <button
        className="btn btn-link text-decoration-none"
        onClick={() => navigate('/')}
        style={{
          color: isActive('/') ? '#d4a017' : '#6b7a8f',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          border: 'none',
          background: 'transparent'
        }}
      >
        <i className="bi bi-house-door fs-5"></i>
        <span>હોમ</span>
      </button>

      <button
        className="btn btn-link text-decoration-none"
        onClick={() => navigate('/labour')}
        style={{
          color: isActive('/labour') ? '#d4a017' : '#6b7a8f',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          border: 'none',
          background: 'transparent'
        }}
      >
        <i className="bi bi-people-fill fs-5"></i>
        <span>લેબર</span>
      </button>

      <button
        className="btn btn-link text-decoration-none"
        onClick={() => navigate('/expenses')}
        style={{
          color: isActive('/expenses') ? '#d4a017' : '#6b7a8f',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          border: 'none',
          background: 'transparent'
        }}
      >
        <i className="bi bi-building fs-5"></i>
        <span>સાઈટ</span>
      </button>

      <button
        className="btn btn-link text-decoration-none"
        onClick={() => navigate('/personal-expenses')}
        style={{
          color: isActive('/personal-expenses') ? '#d4a017' : '#6b7a8f',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          border: 'none',
          background: 'transparent'
        }}
      >
        <i className="bi bi-person-wallet fs-5"></i>
        <span>મારો ખર્ચ</span>
      </button>

      <button
        className="btn btn-link text-decoration-none"
        onClick={() => navigate('/settings')}
        style={{
          color: isActive('/settings') ? '#d4a017' : '#6b7a8f',
          fontSize: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          border: 'none',
          background: 'transparent'
        }}
      >
        <i className="bi bi-gear fs-5"></i>
        <span>સેટિંગ</span>
      </button>
    </nav>
  );
}

export default MobileBottomNav;