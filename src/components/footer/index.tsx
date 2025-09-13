import React from 'react';

const cities = ['New York', 'London', 'Paris', 'Tokyo', 'Berlin', 'Sydney'];

const Footer: React.FC = () => (
  <footer style={{
    width: '100%',
    background: '#222',
    color: '#fff',
    padding: '2rem 0',
    textAlign: 'center',
    borderTop: '1px solid #333',
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 99,
  }}>
    <div style={{ marginBottom: '1rem', fontWeight: 600, fontSize: 18 }}>
      Cities in our network:
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: '2rem' }}>
      {cities.map(city => (
        <span key={city} style={{ background: '#333', borderRadius: 8, padding: '0.5rem 1rem', fontSize: 16 }}>{city}</span>
      ))}
    </div>
    <div style={{ marginBottom: '1rem' }}>

      <a
        href="/venues/register"
        style={{
          background: '#fff',
          color: '#222',
          fontWeight: 500,
          fontSize: 16,
          padding: '0.5rem 1rem',
          borderRadius: 8,
          textDecoration: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          transition: 'background 0.2s',
          cursor: 'pointer',
        }}
      >
        Register Your Venue
      </a>
    </div>
    <div style={{ fontSize: 14, color: '#aaa', marginTop: '1rem' }}>
      &copy; {new Date().getFullYear()} eventHub. All rights reserved.
    </div>
  </footer>
);

export default Footer;
