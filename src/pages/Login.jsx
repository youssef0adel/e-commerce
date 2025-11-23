import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) { 
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); 
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log('Login attempt with:', form);

    try {
      const result = await apiService.login(form);
      console.log('Login response:', result);
      
      if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        const user = {
          id: '1', 
          name: form.email.split('@')[0],
          email: form.email
        };
        login(user);
        navigate('/');
      } else {
        setError('Login failed: No access token received');
      }
    } catch (error) {
      console.error('Login error details:', error);
      if (error.message.includes('401') || error.message.includes('Invalid credentials')) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (error.message.includes('400') || error.message.includes('Please provide email and password')) {
        setError('Please provide both email and password.');
      } else if (error.message.includes('Network Error')) {
        setError('Network error. Please check if the server is running.');
      } else {
        setError(`Login failed: ${error.message}`);
      }
    } finally 
    {
      setLoading(false);
    }
  }

  return (
    <div className="row justify-content-center py-5 m-0">
      <div className="col-md-6">
        <h4>Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input 
              name="email" 
              type="email"
              value={form.email} 
              onChange={handleChange} 
              className="form-control" 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input 
              name="password" 
              type="password" 
              value={form.password} 
              onChange={handleChange} 
              className="form-control" 
              required 
              placeholder="Enter your password"
            />
          </div>
          <button 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ?'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}