import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <Card className="auth-card animate-fade-in" shadow="heavy" padding="large">
        <div className="auth-header">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-secondary text-center">Sign in to continue your mental health journey</p>
        </div>

        {errors.general && (
          <div className="error-banner">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            className="w-full mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" color="primary" />
                Signing In.....
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="auth-footer">
          <p className="text-center text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
export default Login;