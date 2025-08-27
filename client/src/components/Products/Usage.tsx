import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  Target
} from 'lucide-react';

interface Usage {
  id: string;
  name: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

const Usage: React.FC = () => {
  const [usages, setUsages] = useState<Usage[]>([
    {
      id: '1',
      name: 'Wzmocnienie odporności',
      usedInProducts: ['Suplement Witamina C', 'Suplement Witamina D3', 'Multivitamina Complex', 'Probiotyki Daily'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Wsparcie układu kostnego',
      usedInProducts: ['Wapń + D3', 'Magnez + B6', 'Kolagen Plus'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Poprawa kondycji fizycznej',
      usedInProducts: ['Protein Complex', 'BCAA Energy', 'Pre-Workout'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Wsparcie układu trawiennego',
      usedInProducts: ['Probiotyki Daily', 'Digestive Care'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'Poprawa funkcji poznawczych',
      usedInProducts: ['Brain Boost', 'Ginkgo Forte'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'Zdrowie serca',
      usedInProducts: ['Omega-3 Fish Oil'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUsage, setEditingUsage] = useState<Usage | null>(null);
  const [newUsageName, setNewUsageName] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedUsage, setSelectedUsage] = useState<Usage | null>(null);

  const filteredUsages = usages.filter(usage =>
    usage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUsage = () => {
    if (!newUsageName.trim()) {
      alert('Proszę wprowadzić nazwę zastosowania');
      return;
    }

    const usage: Usage = {
      id: Date.now().toString(),
      name: newUsageName.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setUsages([...usages, usage]);
    setNewUsageName('');
    setShowCreateModal(false);
  };

  const handleEditUsage = (usage: Usage) => {
    setEditingUsage({ ...usage });
  };

  const handleSaveEdit = () => {
    if (editingUsage && editingUsage.name.trim()) {
      const updatedUsage = {
        ...editingUsage,
        name: editingUsage.name.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setUsages(usages.map(u => 
        u.id === editingUsage.id ? updatedUsage : u
      ));
      setEditingUsage(null);
    }
  };

  const handleDeleteUsage = (usageId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setUsages(usages.filter(u => u.id !== usageId));
    }
  };

  const showProductsList = (usage: Usage) => {
    setSelectedUsage(usage);
    setShowProductsModal(true);
  };

  const CreateUsageModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nowe zastosowanie</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewUsageName('');
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa zastosowania *
            </label>
            <input
              type="text"
              value={newUsageName}
              onChange={(e) => setNewUsageName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Wzmocnienie odporności, Wsparcie układu kostnego..."
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewUsageName('');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateUsage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj zastosowanie
          </button>
        </div>
      </div>
    </div>
  );

  const ProductsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            Produkty o zastosowaniu: {selectedUsage?.name}
          </h3>
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedUsage(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {selectedUsage?.usedInProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak produktów</p>
          ) : (
            selectedUsage?.usedInProducts.map((product, index) => (
              <div key={index} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-teal-800 font-medium">{product}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedUsage(null);
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Zastosowanie</h1>
            <p className="text-gray-600">Zarządzaj listą zastosowań produktów</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj zastosowanie</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj zastosowań..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Usages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista zastosowań ({filteredUsages.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/6">Zastosowanie</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-2/6">Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/6">Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/6">Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/6">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono zastosowań pasujących do wyszukiwania' : 'Brak zastosowań'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsages.map((usage) => (
                  <tr key={usage.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {usage.name}
                      </h3>
                    </td>
                    <td className="py-4 px-6">
                      {usage.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {usage.usedInProducts.slice(0, 2).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {usage.usedInProducts.length > 2 && (
                            <button
                              onClick={() => showProductsList(usage)}
                              className="text-xs text-teal-600 hover:text-teal-800 font-medium underline"
                            >
                              +{usage.usedInProducts.length - 2} więcej
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nie używane</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {new Date(usage.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {usage.updatedAt !== usage.createdAt ? (
                        <span className="text-blue-600 font-medium">
                          {new Date(usage.updatedAt).toLocaleDateString('pl-PL')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUsage(usage)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUsage(usage.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Usuń"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateUsageModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Usage Modal */}
      {editingUsage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj zastosowanie</h3>
              <button
                onClick={() => setEditingUsage(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa zastosowania
                </label>
                <input
                  type="text"
                  value={editingUsage.name}
                  onChange={(e) => setEditingUsage({ 
                    ...editingUsage, 
                    name: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingUsage(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Anuluj</span>
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Zapisz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usage;