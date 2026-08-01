import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center mb-3">
      {showBack && (
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => navigate(-1)}
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            border: '1px solid #d0d9e8'
          }}
        >
          <i className="bi bi-arrow-left fs-5"></i>
        </button>
      )}
      <h4 className="fw-bold mb-0">
        {title}
      </h4>
    </div>
  );
}

export default BackButton;