import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  Shapes
} from 'lucide-react';

interface Form {
  id: string;
  name: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

const Form: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      name: 'Kapsułki',
      usedInProducts: ['Suplement Witamina C', 'Suplement Witamina D3', 'Multivitamina Complex', 'Omega-3 Fish Oil'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Tabletki',
      usedInProducts: ['Magnez + B6', 'Wapń + D3', 'Cynk Complex'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Proszek',
      usedInProducts: ['Kurkuma Premium', 'Ashwagandha Root', 'Ginkgo Forte'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Płyn',
      usedInProducts: ['Probiotyki Daily', 'Digestive Care'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'Żel',
      usedInProducts: ['Brain Boost'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'Krople',
      usedInProducts: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [newFormName, setNewFormName] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateForm = () => {
    if (!newFormName.trim()) {
      alert('Proszę wprowadzić nazwę postaci');
      return;
    }

    const form: Form = {
      id: Date.now().toString(),
      name: newFormName.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setForms([...forms, form]);
    setNewFormName('');
    setShowCreateModal(false);
  };

  const handleEditForm = (form: Form) => {
    setEditingForm({ ...form });
  };

  const handleSaveEdit = () => {
    if (editingForm && editingForm.name.trim()) {
      const updatedForm = {
        ...editingForm,
        name: editingForm.name.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setForms(forms.map(f => 
        f.id === editingForm.id ? updatedForm : f
      ));
      setEditingForm(null);
    }
  };

  const handleDeleteForm = (formId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setForms(forms.filter(f => f.id !== formId));
    }
  };

  const showProductsList = (form: Form) => {
    setSelectedForm(form);
    setShowProductsModal(true);
  };

  const CreateFormModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nową postać</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewFormName('');
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa postaci *
            </label>
            <input
              type="text"
              value={newFormName}
              onChange={(e) => setNewFormName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Kapsułki, Tabletki, Proszek..."
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewFormName('');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj postać
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
            Produkty w postaci: {selectedForm?.name}
          </h3>
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedForm(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {selectedForm?.usedInProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak produktów</p>
          ) : (
            selectedForm?.usedInProducts.map((product, index) => (
              <div key={index} className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <span className="text-indigo-800 font-medium">{product}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedForm(null);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Postać</h1>
            <p className="text-gray-600">Zarządzaj listą postaci produktów</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj postać</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj postaci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Forms Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista postaci ({filteredForms.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Postać</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredForms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Shapes className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono postaci pasujących do wyszukiwania' : 'Brak postaci'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredForms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {form.name}
                      </h3>
                    </td>
                    <td className="py-4 px-6">
                      {form.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {form.usedInProducts.slice(0, 2).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {form.usedInProducts.length > 2 && (
                            <button
                              onClick={() => showProductsList(form)}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                            >
                              +{form.usedInProducts.length - 2} więcej
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nie używane</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(form.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {form.updatedAt !== form.createdAt ? (
                        <span className="text-blue-600 font-medium">
                          {new Date(form.updatedAt).toLocaleDateString('pl-PL')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditForm(form)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteForm(form.id)}
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
      {showCreateModal && <CreateFormModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Form Modal */}
      {editingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj postać</h3>
              <button
                onClick={() => setEditingForm(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa postaci
                </label>
                <input
                  type="text"
                  value={editingForm.name}
                  onChange={(e) => setEditingForm({ 
                    ...editingForm, 
                    name: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingForm(null)}
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

export default Form;