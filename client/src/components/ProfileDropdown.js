import React, { useState } from 'react';

function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div style={{ position: 'relative' }}>
      <img
        src='/path/to/avatar.png'
        alt='avatar'
        style={{ width: 32, height: 32, borderRadius: '50%', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 40, background: '#fff', border: '1px solid #ccc', borderRadius: 8, minWidth: 150
        }}>
          <button style={{ width: '100%', padding: 8, border: 'none', background: 'none', cursor: 'pointer' }}>Account Settings</button>
          <button style={{ width: '100%', padding: 8, border: 'none', background: 'none', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;