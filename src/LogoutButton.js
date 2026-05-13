import React from 'react';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      style={{
        padding: '8px 16px',
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#a93226'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#c0392b'}
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
