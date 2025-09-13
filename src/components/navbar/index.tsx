'use client'
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <nav style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: '#222',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1 }}>eventHub</div>
      <div>
        {!isLoggedIn ? (
          <button
            aria-label="Login"
            onClick={() => setShowLogin(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 18,
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginRight: 8,
            }}
          >
            <span style={{ display: 'inline-block', width: 24, height: 24, background: '#444', borderRadius: '50%' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="#fff" />
                <rect x="6" y="16" width="12" height="4" rx="2" fill="#fff" />
              </svg>
            </span>
            Login
          </button>
        ) : (
          <span style={{ fontSize: 18 }}>Welcome!</span>
        )}
      </div>
      {showLogin && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={() => { setShowLogin(false); setShowSignup(false); }}
        >
          <div
            style={{
              background: '#fff',
              color: '#222',
              borderRadius: 12,
              padding: '2rem',
              minWidth: 320,
              boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            {!showSignup ? (
              <>
                <h2 style={{ marginBottom: '1rem' }}>Login</h2>
                <input
                  type="email"
                  placeholder="Email"
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <button
                  onClick={handleLogin}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
                >
                  Login
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span>Don't have an account? </span>
                  <a
                    href="#"
                    style={{ color: '#222', textDecoration: 'underline', fontWeight: 500 }}
                    onClick={e => { e.preventDefault(); setShowSignup(true); }}
                  >
                    Sign up
                  </a>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: '1rem' }}>Sign Up</h2>
                <input
                  type="email"
                  placeholder="Email"
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
                />
                <button
                  onClick={() => { setShowSignup(false); setShowLogin(false); }}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
                >
                  Sign Up
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <span>Already have an account? </span>
                  <a
                    href="#"
                    style={{ color: '#222', textDecoration: 'underline', fontWeight: 500 }}
                    onClick={e => { e.preventDefault(); setShowSignup(false); }}
                  >
                    Login
                  </a>
                </div>
              </>
            )}
            <button
              onClick={() => { setShowLogin(false); setShowSignup(false); }}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#222' }}
              aria-label="Close login modal"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 600px) {
          nav {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
          }
          div[style*='fontWeight: 700'] {
            font-size: 20px;
          }
          button {
            font-size: 16px;
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
