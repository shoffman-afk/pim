import { useQuery } from "@tanstack/react-query";

import { useState } from 'react';
import { Search, Eye, Filter, Download, Calendar, Clock, User, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  category: 'user' | 'product' | 'material' | 'system';
  level: 'info' | 'warning' | 'error';
}

export default function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  // Mock data for demonstration
  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-27 15:30:22',
      user: 'Jan Kowalski',
      action: 'Utworzył nowy produkt',
      details: 'Suplement Witamina C 1000mg',
      category: 'product',
      level: 'info'
    },
    {
      id: '2',
      timestamp: '2024-01-27 14:15:10',
      user: 'Anna Nowak',
      action: 'Zaktualizował składnik',
      details: 'Kwas askorbinowy - zmieniono standaryzację',
      category: 'material',
      level: 'info'
    },
    {
      id: '3',
      timestamp: '2024-01-27 13:45:33',
      user: 'Piotr Wiśniewski',
      action: 'Zalogował się do systemu',
      details: 'IP: 192.168.1.100',
      category: 'user',
      level: 'info'
    },
    {
      id: '4',
      timestamp: '2024-01-27 12:20:15',
      user: 'System',
      action: 'Błąd synchronizacji',
      details: 'Nie udało się zsynchronizować z bazą zewnętrzną',
      category: 'system',
      level: 'error'
    },
    {
      id: '5',
      timestamp: '2024-01-27 11:05:44',
      user: 'Jan Kowalski',
      action: 'Usunął kategorię produktu',
      details: 'Kategoria: Witaminy rozpuszczalne',
      category: 'product',
      level: 'warning'
    }
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'product': return 'bg-green-100 text-green-800';
      case 'material': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'user': return 'Użytkownik';
      case 'product': return 'Produkt';
      case 'material': return 'Składnik';
      case 'system': return 'System';
      default: return category;
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'info': return 'Info';
      case 'warning': return 'Ostrzeżenie';
      case 'error': return 'Błąd';
      default: return level;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Logi Aktywności</h1>
        <p className="text-gray-600 mt-1">Historia działań wykonanych w systemie</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj w logach..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Wszystkie kategorie</option>
            <option value="user">Użytkownik</option>
            <option value="product">Produkt</option>
            <option value="material">Składnik</option>
            <option value="system">System</option>
          </select>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Wszystkie poziomy</option>
            <option value="info">Info</option>
            <option value="warning">Ostrzeżenie</option>
            <option value="error">Błąd</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Eksportuj
          </button>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Historia aktywności ({filteredLogs.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '15%'}}>Data i czas</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '15%'}}>Użytkownik</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '25%'}}>Akcja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '30%'}}>Szczegóły</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '10%'}}>Kategoria</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '5%'}}>Poziom</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-6 text-center text-gray-500">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p>Brak logów do wyświetlenia</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {log.user}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">
                        {log.details}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${getCategoryColor(log.category)}`}>
                        {getCategoryLabel(log.category)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${getLevelColor(log.level)}`}>
                        {getLevelLabel(log.level)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}