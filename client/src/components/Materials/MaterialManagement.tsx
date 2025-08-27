import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Save,
  X
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  category: string;
  supplier: string;
  unit: string;
  price: number;
  stock: number;
  minStock: number;
  isActive: boolean;
  createdAt: string;
}

const MaterialManagement: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Stal nierdzewna 304',
      category: 'Metale',
      supplier: 'MetalCorp Sp. z o.o.',
      unit: 'kg',
      price: 12.50,
      stock: 500,
      minStock: 100,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Plastik ABS',
      category: 'Tworzywa sztuczne',
      supplier: 'PlasticWorld',
      unit: 'kg',
      price: 8.75,
      stock: 250,
      minStock: 50,
      isActive: true,
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Drewno bukowe',
      category: 'Drewno',
      supplier: 'WoodSupply Ltd.',
      unit: 'm³',
      price: 450.00,
      stock: 15,
      minStock: 5,
      isActive: true,
      createdAt: '2024-01-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: '',
    supplier: '',
    unit: '',
    price: 0,
    stock: 0,
    minStock: 0
  });

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateMaterial = () => {
    if (!newMaterial.name || !newMaterial.category || !newMaterial.supplier) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    const material: Material = {
      id: Date.now().toString(),
      ...newMaterial,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setMaterials([...materials, material]);
    setNewMaterial({
      name: '',
      category: '',
      supplier: '',
      unit: '',
      price: 0,
      stock: 0,
      minStock: 0
    });
    setShowCreateModal(false);
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial({ ...material });
  };

  const handleSaveEdit = () => {
    if (editingMaterial) {
      setMaterials(materials.map(m => m.id === editingMaterial.id ? editingMaterial : m));
      setEditingMaterial(null);
    }
  };

  const handleDeleteMaterial = (materialId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setMaterials(materials.filter(m => m.id !== materialId));
    }
  };

  const handleToggleMaterialStatus = (materialId: string) => {
    setMaterials(materials.map(m => 
      m.id === materialId ? { ...m, isActive: !m.isActive } : m
    ));
  };

  const CreateMaterialModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nowy surowiec</h3>
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa *
            </label>
            <input
              type="text"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategoria *
            </label>
            <input
              type="text"
              value={newMaterial.category}
              onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dostawca *
            </label>
            <input
              type="text"
              value={newMaterial.supplier}
              onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jednostka
              </label>
              <input
                type="text"
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="kg, szt, m³"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cena
              </label>
              <input
                type="number"
                step="0.01"
                value={newMaterial.price}
                onChange={(e) => setNewMaterial({ ...newMaterial, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stan magazynowy
              </label>
              <input
                type="number"
                value={newMaterial.stock}
                onChange={(e) => setNewMaterial({ ...newMaterial, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimalny stan
              </label>
              <input
                type="number"
                value={newMaterial.minStock}
                onChange={(e) => setNewMaterial({ ...newMaterial, minStock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateMaterial}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj surowiec
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Zarządzanie surowcami</h1>
            <p className="text-gray-600">Twórz i zarządzaj bazą surowców oraz ich stanami magazynowymi</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj surowiec</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj surowców..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filtruj</span>
          </button>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Surowiec</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Kategoria</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Dostawca</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Cena</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Stan</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMaterials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{material.name}</div>
                        <div className="text-sm text-gray-500">{material.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{material.category}</td>
                  <td className="py-4 px-6 text-gray-900">{material.supplier}</td>
                  <td className="py-4 px-6 text-gray-900">{material.price.toFixed(2)} zł</td>
                  <td className="py-4 px-6">
                    <div className="text-gray-900">{material.stock}</div>
                    <div className={`text-xs ${
                      material.stock <= material.minStock 
                        ? 'text-red-600' 
                        : 'text-gray-500'
                    }`}>
                      Min: {material.minStock}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleToggleMaterialStatus(material.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        material.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {material.isActive ? 'Aktywny' : 'Nieaktywny'}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMaterial(material)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edytuj"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(material.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Usuń"
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
      </div>

      {/* Modals */}
      {showCreateModal && <CreateMaterialModal />}

      {/* Edit Material Inline Form */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[75vw] relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj surowiec</h3>
              <button
                onClick={() => setEditingMaterial(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa</label>
                <input
                  type="text"
                  value={editingMaterial.name}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                <input
                  type="text"
                  value={editingMaterial.category}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dostawca</label>
                <input
                  type="text"
                  value={editingMaterial.supplier}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cena</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingMaterial.price}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stan</label>
                  <input
                    type="number"
                    value={editingMaterial.stock}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingMaterial(null)}
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

export default MaterialManagement;