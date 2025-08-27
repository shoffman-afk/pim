import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  FileText
} from 'lucide-react';

interface Standardization {
  id: string;
  name: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

const Standardization: React.FC = () => {
  const [standardizations, setStandardizations] = useState<Standardization[]>([
    {
      id: '1',
      name: 'USP (United States Pharmacopeia)',
      usedInProducts: ['Witamina C 1000mg', 'Magnez B6', 'Omega-3 Premium'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'EP (European Pharmacopoeia)',
      usedInProducts: ['Probiotyk Complex', 'Kurkuma Extract'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'BP (British Pharmacopoeia)',
      usedInProducts: ['Witamina D3 4000IU'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'JP (Japanese Pharmacopoeia)',
      usedInProducts: ['Koenzym Q10', 'Ashwagandha'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'WHO (World Health Organization)',
      usedInProducts: [],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStandardization, setEditingStandardization] = useState<Standardization | null>(null);
  const [newStandardizationName, setNewStandardizationName] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedStandardization, setSelectedStandardization] = useState<Standardization | null>(null);

  const filteredStandardizations = standardizations.filter(standardization =>
    standardization.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateStandardization = () => {
    if (!newStandardizationName.trim()) {
      alert('Proszę wprowadzić nazwę standaryzacji');
      return;
    }

    const standardization: Standardization = {
      id: Date.now().toString(),
      name: newStandardizationName.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setStandardizations([...standardizations, standardization]);
    setNewStandardizationName('');
    setShowCreateModal(false);
  };

  const handleEditStandardization = (standardization: Standardization) => {
    setEditingStandardization({ ...standardization });
  };

  const handleSaveEdit = () => {
    if (editingStandardization && editingStandardization.name.trim()) {
      const updatedStandardization = {
        ...editingStandardization,
        name: editingStandardization.name.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setStandardizations(standardizations.map(s => 
        s.id === editingStandardization.id ? updatedStandardization : s
      ));
      setEditingStandardization(null);
    }
  };

  const handleDeleteStandardization = (standardizationId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setStandardizations(standardizations.filter(s => s.id !== standardizationId));
    }
  };

  const showProductsList = (standardization: Standardization) => {
    setSelectedStandardization(standardization);
    setShowProductsModal(true);
  };

  const CreateStandardizationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nową standaryzację</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewStandardizationName('');
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa standaryzacji *
            </label>
            <input
              type="text"
              value={newStandardizationName}
              onChange={(e) => setNewStandardizationName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. USP, EP, BP..."
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewStandardizationName('');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateStandardization}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj standaryzację
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
            Produkty używające: {selectedStandardization?.name}
          </h3>
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedStandardization(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {selectedStandardization?.usedInProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak produktów</p>
          ) : (
            selectedStandardization?.usedInProducts.map((product, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-blue-800 font-medium">{product}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedStandardization(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Standaryzacja składników</h1>
            <p className="text-gray-600">Zarządzaj listą standaryzacji stosowanych dla składników</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj standaryzację</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj standaryzacji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Standardizations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista standaryzacji ({filteredStandardizations.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Standaryzacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStandardizations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono standaryzacji pasujących do wyszukiwania' : 'Brak standaryzacji'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStandardizations.map((standardization) => (
                  <tr key={standardization.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {standardization.name}
                      </h3>
                    </td>
                    <td className="py-4 px-6">
                      {standardization.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {standardization.usedInProducts.slice(0, 2).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {standardization.usedInProducts.length > 2 && (
                            <button
                              onClick={() => showProductsList(standardization)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                              +{standardization.usedInProducts.length - 2} więcej
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nie używane</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {new Date(standardization.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {standardization.updatedAt !== standardization.createdAt ? (
                        <span className="text-blue-600 font-medium">
                          {new Date(standardization.updatedAt).toLocaleDateString('pl-PL')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStandardization(standardization)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStandardization(standardization.id)}
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
      {showCreateModal && <CreateStandardizationModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Standardization Modal */}
      {editingStandardization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj standaryzację</h3>
              <button
                onClick={() => setEditingStandardization(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa standaryzacji
                </label>
                <input
                  type="text"
                  value={editingStandardization.name}
                  onChange={(e) => setEditingStandardization({ 
                    ...editingStandardization, 
                    name: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingStandardization(null)}
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

export default Standardization;