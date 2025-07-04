import React from 'react';

const NotFound404Page = () => (
  <div style={{
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1 style={{ fontSize: '4rem', color: '#ff0000', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ color: '#fff' }}>Sorry, we couldn't fetch the data or the page does not exist.</p>
  </div>
);

export default NotFound404Page; 