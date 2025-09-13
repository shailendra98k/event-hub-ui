'use client'
import React, {useEffect, useState} from 'react';
import SignInModal from '../../signInModal';
import { useUser } from '@/context/UserContext';

const Navbar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userInfo } = useUser();

    useEffect(() => {
        if(userInfo && userInfo.firstName) {
            setIsLoggedIn(true);
        }
    }, [userInfo]);

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
          <span style={{ fontSize: 18 }}>Welcome {userInfo?.firstName || 'Guest'}</span>
        )}
      </div>
      {showLogin && (
        <SignInModal
          showSignup={showSignup}
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          handleLogin={handleLogin}
        />
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
