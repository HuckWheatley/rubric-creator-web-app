import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user.email.endsWith('@hkis.edu.hk')) {
        await auth.signOut();
        setError('Only HKIS emails (@hkis.edu.hk) are allowed. Please sign out and try with your HKIS account.');
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Pop-up blocked. Please check your browser settings.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="logohkis512.png" width="100" height="100" alt="HKIS Logo" style={styles.logo} />
        <h1 style={styles.title}>HKIS Rubric Creator</h1>
        <p style={styles.subtitle}>Sign in with your HKIS email to get started</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Signing in...' : '🔐 Sign in with Google'}
        </button>

        {error && <div style={styles.error}>{error}</div>}

        <p style={styles.help}>
          You must use your @hkis.edu.hk email address to sign in.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%'
  },
  logo: {
    marginBottom: '20px',
    display: 'block'
  },
  title: {
    fontSize: '28px',
    color: '#012a42',
    margin: '20px 0 10px',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 30px'
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#1f618d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  error: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#fadbd8',
    color: '#922b21',
    borderRadius: '4px',
    fontSize: '14px',
    border: '1px solid #f5b7b1'
  },
  help: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#999'
  }
};

export default Login;
