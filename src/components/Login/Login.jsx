import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, signupUser, clearError, selectAuthLoading, selectAuthError, selectCurrentUser } from '../../store/authSlice';
import Button from '../Button/Button';
import './Login.css';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return setLocalError('Please fill in all fields');
    }

    setLocalError('');
    dispatch(clearError());
    
    if (isSignup) {
      dispatch(signupUser({ email, password }));
    } else {
      dispatch(loginUser({ email, password }));
    }
  }

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-background-shape"></div>
      <h1 className="login-page-title">Log In</h1>
      
      <div className="login-container">
        {(localError || authError) && <div className="login-error">{localError || authError}</div>}
        
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
              setLocalError('');
              dispatch(clearError());
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

