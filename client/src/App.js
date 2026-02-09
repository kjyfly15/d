import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Consultation from './components/Consultation';
import History from './components/History';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setCurrentView('consultation');
    }
  }, [token]);

  const handleLogin = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('consultation');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentView('login');
  };

  const renderView = () => {
    if (!token) {
      if (currentView === 'signup') {
        return <Signup onSwitchToLogin={() => setCurrentView('login')} />;
      }
      return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
    }

    if (currentView === 'history') {
      return <History token={token} onBack={() => setCurrentView('consultation')} />;
    }

    return (
      <Consultation
        token={token}
        user={user}
        onLogout={handleLogout}
        onViewHistory={() => setCurrentView('history')}
      />
    );
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;
