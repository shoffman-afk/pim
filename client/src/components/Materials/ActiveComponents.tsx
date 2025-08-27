import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  Beaker
} from 'lucide-react';

interface ActiveComponent {
  id: string;
  name: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

const ActiveComponents: React.FC = () => {
  const [activeComponents, setActiveComponents] = useState<ActiveComponent[]>([
    {
      id: '1',
      name: 'Kwas askorbinowy',
      usedInProducts: ['Witamina C 1000mg', 'Multi Complex', 'Immune Support'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Witamina D3 (Cholekalcyferol)',
      usedInProducts: ['Witamina D3 4000IU', 'Calcium + D3'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Ekstrakt z kurkumy',
      usedInProducts: ['Kurkuma Extract', 'Anti-Inflammatory Complex'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Koenzym Q10',
      usedInProducts: ['Koenzym Q10', 'Heart Support'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'Omega-3 (EPA/DHA)',
      usedInProducts: ['Omega-3 Premium', 'Brain Support'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'Probiotyki Lactobacillus',
      usedInProducts: ['Probiotyk Complex'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState<ActiveComponent | null>(null);
  const [newComponentName, setNewComponentName] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ActiveComponent | null>(null);

  const filteredComponents = activeComponents.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateComponent = () => {
    if (!newComponentName.trim()) {
      alert('Proszę wprowadzić nazwę składnika aktywnego');
      return;
    }

    const component: ActiveComponent = {
      id: Date.now().toString(),
      name: newComponentName.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setActiveComponents([...activeComponents, component]);
    setNewComponentName('');
    setShowCreateModal(false);
  };

  const handleEditComponent = (component: ActiveComponent) => {
    setEditingComponent({ ...component });
  };

  const handleSaveEdit = () => {
    if (editingComponent && editingComponent.name.trim()) {
      const updatedComponent = {
        ...editingComponent,
        name: editingComponent.name.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setActiveComponents(activeComponents.map(c => 
        c.id === editingComponent.id ? updatedComponent : c
      ));
      setEditingComponent(null);
    }
  };

  const handleDeleteComponent = (componentId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setActiveComponents(activeComponents.filter(c => c.id !== componentId));
    }
  };

  const showProductsList = (component: ActiveComponent) => {
    setSelectedComponent(component);
    setShowProductsModal(true);
  };

  const CreateComponentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nowy składnik aktywny</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewComponentName('');
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa składnika aktywnego *
            </label>
            <input
              type="text"
              value={newComponentName}
              onChange={(e) => setNewComponentName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Kwas askorbinowy, Witamina D3..."
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewComponentName('');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateComponent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj składnik
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
            Produkty zawierające: {selectedComponent?.name}
          </h3>
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedComponent(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {selectedComponent?.usedInProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak produktów</p>
          ) : (
            selectedComponent?.usedInProducts.map((product, index) => (
              <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-800 font-medium">{product}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedComponent(null);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nazwa składnika aktywnego</h1>
            <p className="text-gray-600">Zarządzaj listą nazw składników aktywnych</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj składnik</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj składników aktywnych..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Components Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista składników aktywnych ({filteredComponents.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Składnik aktywny</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700 w-1/5">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComponents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono składników pasujących do wyszukiwania' : 'Brak składników aktywnych'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredComponents.map((component) => (
                  <tr key={component.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {component.name}
                      </h3>
                    </td>
                    <td className="py-4 px-6">
                      {component.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {component.usedInProducts.slice(0, 2).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {component.usedInProducts.length > 2 && (
                            <button
                              onClick={() => showProductsList(component)}
                              className="text-xs text-green-600 hover:text-green-800 font-medium underline"
                            >
                              +{component.usedInProducts.length - 2} więcej
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nie używane</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {new Date(component.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {component.updatedAt !== component.createdAt ? (
                        <span className="text-blue-600 font-medium">
                          {new Date(component.updatedAt).toLocaleDateString('pl-PL')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditComponent(component)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComponent(component.id)}
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
      {showCreateModal && <CreateComponentModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Component Modal */}
      {editingComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj składnik aktywny</h3>
              <button
                onClick={() => setEditingComponent(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa składnika aktywnego
                </label>
                <input
                  type="text"
                  value={editingComponent.name}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    name: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingComponent(null)}
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

export default ActiveComponents;