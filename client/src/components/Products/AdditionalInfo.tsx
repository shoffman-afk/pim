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
    if (newInfoName.trim()) {
      const newInfo: AdditionalInfo = {
        id: Date.now().toString(),
        name: newInfoName.trim(),
        usedInProducts: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setAdditionalInfos([...additionalInfos, newInfo]);
      setNewInfoName('');
      setShowCreateModal(false);
    }
  };

  const handleEditInfo = () => {
    if (editingInfo && newInfoName.trim()) {
      setAdditionalInfos(additionalInfos.map(info =>
        info.id === editingInfo.id
          ? { ...info, name: newInfoName.trim(), updatedAt: new Date().toISOString().split('T')[0] }
          : info
      ));
      setEditingInfo(null);
      setNewInfoName('');
    }
  };

  const handleDeleteInfo = (id: string) => {
    setAdditionalInfos(additionalInfos.filter(info => info.id !== id));
  };

  const openCreateModal = () => {
    setNewInfoName('');
    setShowCreateModal(true);
  };

  const openEditModal = (info: AdditionalInfo) => {
    setEditingInfo(info);
    setNewInfoName(info.name);
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingInfo(null);
    setNewInfoName('');
  };

  const showProductsInInfo = (info: AdditionalInfo) => {
    setSelectedInfo(info);
    setShowProductsModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Info className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Dodatkowe informacje</h1>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          data-testid="button-create-additional-info"
        >
          <Plus className="w-4 h-4" />
          <span>Dodaj informację</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj dodatkowych informacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="input-search-additional-info"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Informacja
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Używana w produktach
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data utworzenia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ostatnia aktualizacja
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInfos.map((info) => (
                <tr key={info.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-md">
                    {info.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => showProductsInInfo(info)}
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                      data-testid={`button-show-products-${info.id}`}
                    >
                      {info.usedInProducts.length} produktów
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {info.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {info.updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(info)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                        data-testid={`button-edit-additional-info-${info.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInfo(info.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                        data-testid={`button-delete-additional-info-${info.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInfos.length === 0 && (
          <div className="text-center py-12">
            <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Brak dodatkowych informacji</p>
            <p className="text-gray-400">
              {searchTerm ? 'Spróbuj zmienić kryteria wyszukiwania' : 'Dodaj pierwszą informację prawną'}
            </p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingInfo ? 'Edytuj informację' : 'Dodaj nową informację'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treść informacji prawnej
                </label>
                <textarea
                  value={newInfoName}
                  onChange={(e) => setNewInfoName(e.target.value)}
                  placeholder="np. Nie stosować u dzieci, kobiet w ciąży i w trakcie laktacji."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  data-testid="textarea-additional-info-content"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  data-testid="button-cancel-modal"
                >
                  Anuluj
                </button>
                <button
                  onClick={editingInfo ? handleEditInfo : handleCreateInfo}
                  disabled={!newInfoName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  data-testid="button-save-additional-info"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingInfo ? 'Zapisz zmiany' : 'Dodaj informację'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Modal */}
      {showProductsModal && selectedInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Produkty używające tej informacji
              </h3>
              <button
                onClick={() => setShowProductsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                data-testid="button-close-products-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 font-medium">Informacja:</p>
              <p className="text-sm text-gray-600 mt-1">{selectedInfo.name}</p>
            </div>
            <div className="space-y-2">
              {selectedInfo.usedInProducts.length > 0 ? (
                selectedInfo.usedInProducts.map((product, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-900">{product}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Ta informacja nie jest jeszcze używana w żadnym produkcie.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;