import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
          color: '#fff',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1>Oops! Something went wrong.</h1>
          <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #2f55ff 0%, #43e97b 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 