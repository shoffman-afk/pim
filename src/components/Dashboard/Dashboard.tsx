import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, TrendingUp, AlertTriangle, FileText, BarChart3, Download, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Użytkownicy',
      value: mockUsers.length,
      icon: Users,
      color: 'blue',
      href: '/users'
    },
    {
      title: 'Produkty',
      value: '2,847',
      icon: Package,
      color: 'green',
      href: '/products'
    },
    {
      title: 'Surowce',
      value: '1,234',
      icon: Package,
      color: 'purple',
      href: '/materials/components'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Dodano nowy produkt',
      details: 'Laptop Dell XPS 13',
      time: '2 minuty temu',
      user: 'Anna Nowak'
    },
    {
      id: 2,
      action: 'Zaktualizowano ceny',
      details: '15 produktów w kategorii Electronics',
      time: '1 godzinę temu',
      user: 'Piotr Wiśniewski'
    },
    {
      id: 3,
      action: 'Utworzono nowego użytkownika',
      details: 'Marek Kowalski - Specjalista',
      time: '3 godziny temu',
      user: 'Jan Kowalski'
    },
    {
      id: 4,
      action: 'Wygenerowano raport',
      details: 'Miesięczny raport sprzedaży',
      time: '5 godzin temu',
      user: 'Anna Nowak'
    },
    {
      id: 5,
      action: 'Zaktualizowano stan magazynowy',
      details: 'Stal nierdzewna 304 - dodano 200 kg',
      time: '6 godzin temu',
      user: 'Piotr Wiśniewski'
    }
  ];

  const reports = [
    {
      id: 1,
      title: 'Raport miesięczny',
      description: 'Podsumowanie produktów i surowców',
      date: '2024-01-20',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Analiza stanów magazynowych',
      description: 'Przegląd dostępności surowców',
      date: '2024-01-19',
      type: 'Excel'
    },
    {
      id: 3,
      title: 'Raport użytkowników',
      description: 'Aktywność i uprawnienia',
      date: '2024-01-18',
      type: 'PDF'
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        border: 'border-orange-200'
      }
    };
    return colors[color as keyof typeof colors][type];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Welcome Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Witaj ponownie, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Oto przegląd Twojego systemu PIM na dzisiaj.
          </p>
        </div>

        {/* Admin Announcement Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                📢 Ogłoszenie od Administracji
              </h2>
              <p className="text-gray-700 mb-3">
                <strong>Planowana konserwacja systemu:</strong> W najbliższą niedzielę (28.01) między 02:00-06:00 system będzie niedostępny z powodu aktualizacji bezpieczeństwa.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Opublikowano: 22.01.2024
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Zobacz więcej ogłoszeń
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color, 'bg')}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Link
                  to={stat.href}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${getColorClasses(stat.color, 'text')} hover:bg-gray-50`}
                  title={`Przejdź do ${stat.title}`}
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Ostatnia aktywność</h2>
              <Link
                to="/logs"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Zobacz wszystkie aktywności
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.details}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>{activity.user}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Helpdesk */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Centrum pomocy</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Zobacz wszystkie artykuły
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">🚀 Pierwsze kroki w systemie PIM</h3>
                <p className="text-sm text-gray-600 mb-2">Dowiedz się jak rozpocząć pracę z systemem zarządzania produktami</p>
                <span className="text-xs text-blue-600 font-medium">Przewodnik • 5 min czytania</span>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">👥 Zarządzanie użytkownikami i uprawnieniami</h3>
                <p className="text-sm text-gray-600 mb-2">Jak tworzyć konta użytkowników i przydzielać odpowiednie uprawnienia</p>
                <span className="text-xs text-green-600 font-medium">Tutorial • 8 min czytania</span>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">📦 Katalog produktów i surowców</h3>
                <p className="text-sm text-gray-600 mb-2">Kompleksowy przewodnik po dodawaniu i zarządzaniu produktami</p>
                <span className="text-xs text-purple-600 font-medium">Dokumentacja • 12 min czytania</span>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-2">📊 Raporty i analityka</h3>
                <p className="text-sm text-gray-600 mb-2">Jak generować i interpretować raporty systemowe</p>
                <span className="text-xs text-orange-600 font-medium">FAQ • 6 min czytania</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Potrzebujesz pomocy?</h4>
                    <p className="text-gray-600 text-xs">Skontaktuj się z naszym zespołem wsparcia</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Kontakt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;