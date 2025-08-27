import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  Info
} from 'lucide-react';

interface AdditionalInfo {
  id: string;
  name: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

const AdditionalInfo: React.FC = () => {
  const [additionalInfos, setAdditionalInfos] = useState<AdditionalInfo[]>([
    {
      id: '1',
      name: 'Nie stosować u dzieci, kobiet w ciąży i w trakcie laktacji.',
      usedInProducts: ['Suplement Witamina C', 'Magnez + B6', 'Kurkuma Premium'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: '*Korzystne działanie występuje w przypadku spożywania 3 g kreatyny dziennie.',
      usedInProducts: ['Protein Complex', 'BCAA Energy'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Przechowywać w suchym miejscu w temperaturze pokojowej.',
      usedInProducts: ['Multivitamina Complex', 'Omega-3 Fish Oil', 'Probiotyki Daily'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Nie przekraczać zalecanej dziennej porcji.',
      usedInProducts: ['Suplement Witamina D3', 'Cynk Complex'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'Suplement diety nie może być stosowany jako substytut zróżnicowanej diety.',
      usedInProducts: ['Ginkgo Forte', 'Brain Boost'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'W przypadku przyjmowania leków skonsultuj się z lekarzem.',
      usedInProducts: ['Wapń + D3'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState<AdditionalInfo | null>(null);
  const [newInfoName, setNewInfoName] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<AdditionalInfo | null>(null);

  const filteredInfos = additionalInfos.filter(info =>
    info.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateInfo = () => {
    if (!newInfoName.trim()) {
      alert('Proszę wprowadzić treść informacji prawnej');
      return;
    }

    const info: AdditionalInfo = {
      id: Date.now().toString(),
      name: newInfoName.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setAdditionalInfos([...additionalInfos, info]);
    setNewInfoName('');
    setShowCreateModal(false);
  };

  const handleEditInfo = (info: AdditionalInfo) => {
    setEditingInfo({ ...info });
  };

  const handleSaveEdit = () => {
    if (editingInfo && editingInfo.name.trim()) {
      const updatedInfo = {
        ...editingInfo,
        name: editingInfo.name.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setAdditionalInfos(additionalInfos.map(i => 
        i.id === editingInfo.id ? updatedInfo : i
      ));
      setEditingInfo(null);
    }
  };

  const handleDeleteInfo = (infoId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setAdditionalInfos(additionalInfos.filter(i => i.id !== infoId));
    }
  };

  const showProductsList = (info: AdditionalInfo) => {
    setSelectedInfo(info);
    setShowProductsModal(true);
  };

  const CreateInfoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nową informację</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewInfoName('');
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treść informacji prawnej *
            </label>
            <textarea
              value={newInfoName}
              onChange={(e) => setNewInfoName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="np. Nie stosować u dzieci, kobiet w ciąży i w trakcie laktacji."
              rows={3}
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewInfoName('');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj informację
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
            Produkty używające tej informacji: {selectedInfo?.name}
          </h3>
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedInfo(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {selectedInfo?.usedInProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Brak produktów</p>
          ) : (
            selectedInfo?.usedInProducts.map((product, index) => (
              <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-yellow-800 font-medium">{product}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowProductsModal(false);
              setSelectedInfo(null);
            }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dodatkowe informacje</h1>
            <p className="text-gray-600">Zarządzaj listą informacji prawnych produktów</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj informację</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj informacji prawnych..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Additional Info Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista informacji prawnych ({filteredInfos.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Informacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInfos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono informacji pasujących do wyszukiwania' : 'Brak informacji prawnych'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInfos.map((info) => (
                  <tr key={info.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <h3 className="text-sm font-medium text-gray-900 max-w-md">
                        {info.name}
                      </h3>
                    </td>
                    <td className="py-4 px-6">
                      {info.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {info.usedInProducts.slice(0, 2).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {info.usedInProducts.length > 2 && (
                            <button
                              onClick={() => showProductsList(info)}
                              className="text-xs text-yellow-600 hover:text-yellow-800 font-medium underline"
                            >
                              +{info.usedInProducts.length - 2} więcej
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nie używane</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(info.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {info.updatedAt !== info.createdAt ? (
                        <span className="text-blue-600 font-medium">
                          {new Date(info.updatedAt).toLocaleDateString('pl-PL')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditInfo(info)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInfo(info.id)}
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
      {showCreateModal && <CreateInfoModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Additional Info Modal */}
      {editingInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj informację</h3>
              <button
                onClick={() => setEditingInfo(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Treść informacji prawnej
                </label>
                <textarea
                  value={editingInfo.name}
                  onChange={(e) => setEditingInfo({ 
                    ...editingInfo, 
                    name: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingInfo(null)}
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

export default AdditionalInfo;