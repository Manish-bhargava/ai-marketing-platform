import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      <div style={styles.card}>
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt="Profile"
          style={styles.avatar}
        />
        <div style={styles.info}>
          <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role || 'User'}</p>
          <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toDateString() : '—'}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#222',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '24px',
    maxWidth: '600px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginRight: '24px',
    objectFit: 'cover',
  },
  info: {
    fontSize: '16px',
    color: '#333',
  },
};

export default Profile;
