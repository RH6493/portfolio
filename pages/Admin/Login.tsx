import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    // In a real app, this would verify against a backend
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Try admin / password');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-background w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-text">Admin Access</h1>
          <p className="text-text-muted mt-2">Manage your portfolio content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-text mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary outline-none text-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-surface border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary outline-none text-text"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-text-muted">
          Default: admin / password
        </div>
      </div>
    </div>
  );
};

export default Login;
