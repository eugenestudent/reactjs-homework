import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import './Login.css';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    try {
      setError('');
      setLoading(true);
      
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    }

    setLoading(false);
  }

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-background-shape"></div>
      <h1 className="login-page-title">Log In</h1>
      
      <div className="login-container">
        {error && <div className="login-error">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-actions">
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit'}
            </Button>
            <Button 
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="login-toggle">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <button 
            className="toggle-button"
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

