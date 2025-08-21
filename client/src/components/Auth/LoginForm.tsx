import React, { useState } from 'react';
import { Redirect } from 'wouter';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { isAuthenticated, login, resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      
      if (!success) {
        setError('Nieprawidłowy email lub hasło');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas logowania');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetMessage('');

    try {
      const success = await resetPassword(resetEmail);
      if (success) {
        setResetMessage('Link do resetowania hasła został wysłany na podany adres email.');
      } else {
        setResetMessage('Nie znaleziono użytkownika o podanym adresie email.');
      }
    } catch (err) {
      setResetMessage('Wystąpił błąd podczas resetowania hasła.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'admin@pim.pl', password: 'admin123', role: 'Administrator' },
    { email: 'anna.nowak@pim.pl', password: 'manager123', role: 'Manager' },
    { email: 'piotr.wisniewski@pim.pl', password: 'user123', role: 'Użytkownik' }
  ];

  if (showResetForm) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url(/download.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Resetowanie hasła</h2>
              <p className="text-gray-600">Wprowadź swój adres email</p>
            </div>

            {resetMessage && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                resetMessage.includes('wysłany') 
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {resetMessage.includes('wysłany') ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span className="text-sm">{resetMessage}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Adres email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="jan.kowalski@example.com"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {setShowResetForm(false); setResetMessage('');}}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Powrót
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Wysyłanie...' : 'Wyślij link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/download.jpg)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Logowanie do PIM</h2>
            <p className="text-gray-600">Zaloguj się do systemu zarządzania produktami</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adres email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="jan.kowalski@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Hasło
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Wprowadź hasło"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Zapamiętaj mnie
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Zapomniałeś hasła?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6 relative z-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Konta demonstracyjne</h3>
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">{cred.role}</span>
                  <button
                    onClick={() => setFormData({ email: cred.email, password: cred.password })}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                  >
                    Użyj
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <div>{cred.email}</div>
                  <div>Hasło: {cred.password}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;