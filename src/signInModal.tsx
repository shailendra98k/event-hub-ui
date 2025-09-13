import React, { useState } from 'react';
import SignupModal from './signupModal';
import {cookies} from "next/headers";
import { useUser } from './context/UserContext';

interface SignInModalProps {
  showSignup: boolean;
  setShowSignup: (v: boolean) => void;
  setShowLogin: (v: boolean) => void;
  handleLogin: () => void;
}

const modalStyle = {
  background: '#fff',
  color: '#222',
  borderRadius: 12,
  padding: '2rem',
  minWidth: 320,
  boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
  position: 'relative' as const,
};

const SignInModal: React.FC<SignInModalProps> = ({ showSignup, setShowSignup, setShowLogin, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserInfo } = useUser();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/proxy?url=/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // If token is present, set cookie using document.cookie
        if (data.token) {
          document.cookie = `jwtToken=${data.token}; path=/; SameSite=Strict;`;
        }
        // Set user info in context
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userRole: data.userRole,
        });
        handleLogin();
        setShowLogin(false);

      } else {
        setError(data.message || 'Login failed');
      }
    } catch (e) {
      setError('Login failed');
    }
    setLoading(false);
  };

  return (
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
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        {!showSignup ? (
          <>
            <h2 style={{ marginBottom: '1rem' }}>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: 8, border: '1px solid #ccc' }}
            />
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button
              onClick={handleSignIn}
              disabled={loading}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Signing In...' : 'Login'}
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
          <SignupModal setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
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
  );
};

export default SignInModal;
