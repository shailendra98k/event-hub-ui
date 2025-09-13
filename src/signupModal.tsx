import React, { useState } from 'react';

interface SignupModalProps {
  setShowSignup: (v: boolean) => void;
  setShowLogin: (v: boolean) => void;
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

const SignupModal: React.FC<SignupModalProps> = ({ setShowSignup, setShowLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/proxy?url=/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setShowSignup(false);
        setShowLogin(false);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (e) {
      setError('Signup failed');
    }
    setLoading(false);
  };

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Sign Up</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: 8, border: '1px solid #ccc' }}
        />
      </div>
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
        onClick={handleSignup}
        disabled={loading}
        style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#222', color: '#fff', fontSize: 18, border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
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
  );
};

export default SignupModal;
