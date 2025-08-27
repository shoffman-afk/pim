import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  X,
  Package,
  Eye,
  ChevronDown,
  Check
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Components.css';

interface Component {
  id: string;
  title: string;
  category: string;
  activeName: string;
  standardization: string;
  supplier: string;
  producer: string;
  ingredientsList: string;
  notes: string;
  trademark: string;
  expiryDate: string;
  country: string;
  usedInProducts: string[];
  createdAt: string;
  updatedAt: string;
}

// Searchable dropdown component
const SearchableDropdown = ({ 
  label, 
  value, 
  onChange, 
  options, 
  searchValue, 
  onSearchChange, 
  showDropdown, 
  setShowDropdown, 
  placeholder,
  required = false 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  placeholder: string;
  required?: boolean;
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && '*'}
    </label>
    <div className="relative">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          e.stopPropagation();
          onSearchChange(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={(e) => {
          e.stopPropagation();
          onSearchChange(value);
          setShowDropdown(true);
        }}
        onBlur={(e) => {
          e.stopPropagation();
          // Only close if not clicking on dropdown options
          setTimeout(() => {
            if (!document.activeElement?.closest('.dropdown-options')) {
              setShowDropdown(false);
            }
          }, 150);
        }}
        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        autoComplete="off"
      />
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>
      {showDropdown && (
        <div className="dropdown-options absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">Brak wyników</div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur
                  e.stopPropagation();
                  onChange(option);
                  onSearchChange(option);
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{option}</span>
                {value === option && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  </div>
);

// ReactQuill WYSIWYG Editor Component
const WYSIWYGEditor = ({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
}) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet'
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nazwa lista składników
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        style={{ height: '150px', marginBottom: '50px' }}
      />
    </div>
  );
};

const Components: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([
    {
      id: '1',
      title: 'Witamina C (kwas askorbinowy) USP',
      category: 'Witaminy',
      activeName: 'Kwas askorbinowy',
      standardization: 'USP (United States Pharmacopeia)',
      supplier: 'VitaSupply Sp. z o.o.',
      producer: 'PharmaCorp Ltd.',
      ingredientsList: '<p>Kwas askorbinowy 99.5%, stabilizatory, antyutleniacze</p>',
      notes: 'Przechowywać w suchym miejscu',
      trademark: 'VitaC®',
      expiryDate: '2025-12-31',
      country: 'Niemcy',
      usedInProducts: ['Witamina C 1000mg', 'Multi Complex', 'Immune Support', 'Antioxidant Formula'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Witamina D3 (Cholekalcyferol) EP',
      category: 'Witaminy',
      activeName: 'Witamina D3 (Cholekalcyferol)',
      standardization: 'EP (European Pharmacopoeia)',
      supplier: 'EuroVit GmbH',
      producer: 'SunVitamin AG',
      ingredientsList: '<p>Cholekalcyferol, olej słonecznikowy, tokoferole</p>',
      notes: 'Chronić przed światłem',
      trademark: 'SunD3™',
      expiryDate: '2025-06-30',
      country: 'Szwajcaria',
      usedInProducts: ['Witamina D3 4000IU', 'Calcium + D3', 'Bone Support'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Ekstrakt z kurkumy 95% kurkuminy BP',
      category: 'Ekstrakty roślinne',
      activeName: 'Ekstrakt z kurkumy',
      standardization: 'BP (British Pharmacopoeia)',
      supplier: 'HerbalSource Ltd.',
      producer: 'IndiaHerbs Pvt.',
      ingredientsList: '<p>Ekstrakt z korzenia kurkumy (Curcuma longa), kurkumina 95%</p>',
      notes: 'Produkt organiczny',
      trademark: 'CurcuMax®',
      expiryDate: '2025-03-15',
      country: 'Indie',
      usedInProducts: ['Kurkuma Extract', 'Anti-Inflammatory Complex'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Koenzym Q10 (Ubichinon) JP',
      category: 'Koenzym',
      activeName: 'Koenzym Q10',
      standardization: 'JP (Japanese Pharmacopoeia)',
      supplier: 'AsiaSupplements Co.',
      producer: 'JapanBio Inc.',
      ingredientsList: '<p>Ubichinon, lecytyna sojowa, olej ryżowy</p>',
      notes: 'Fermentacja naturalna',
      trademark: 'CoQ10Plus™',
      expiryDate: '2025-09-20',
      country: 'Japonia',
      usedInProducts: ['Koenzym Q10', 'Heart Support', 'Energy Complex'],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      title: 'Omega-3 (EPA/DHA) z ryb morskich',
      category: 'Kwasy tłuszczowe',
      activeName: 'Omega-3 (EPA/DHA)',
      standardization: 'WHO (World Health Organization)',
      supplier: 'NordicFish AS',
      producer: 'OceanPure Ltd.',
      ingredientsList: '<p>Olej z ryb morskich, EPA 18%, DHA 12%, tokoferole</p>',
      notes: 'Certyfikat MSC',
      trademark: 'PureFish®',
      expiryDate: '2025-11-10',
      country: 'Norwegia',
      usedInProducts: ['Omega-3 Premium', 'Brain Support'],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      title: 'Probiotyki Lactobacillus acidophilus',
      category: 'Probiotyki',
      activeName: 'Probiotyki Lactobacillus',
      standardization: 'USP (United States Pharmacopeia)',
      supplier: 'ProBioTech USA',
      producer: 'LiveCultures Corp.',
      ingredientsList: '<p>Lactobacillus acidophilus 10^9 CFU/g, maltodekstryna</p>',
      notes: 'Przechowywać w lodówce',
      trademark: 'LivePro®',
      expiryDate: '2025-01-30',
      country: 'USA',
      usedInProducts: ['Probiotyk Complex', 'Digestive Support', 'Gut Health'],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  // Mock data for dropdowns - in real app these would come from other components
  const availableCategories = ['Witaminy', 'Minerały', 'Ekstrakty roślinne', 'Probiotyki', 'Kwasy tłuszczowe', 'Koenzym'];
  const availableActiveNames = ['Kwas askorbinowy', 'Witamina D3 (Cholekalcyferol)', 'Ekstrakt z kurkumy', 'Koenzym Q10', 'Omega-3 (EPA/DHA)', 'Probiotyki Lactobacillus'];
  const availableStandardizations = ['USP (United States Pharmacopeia)', 'EP (European Pharmacopoeia)', 'BP (British Pharmacopoeia)', 'JP (Japanese Pharmacopoeia)', 'WHO (World Health Organization)'];

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewComponent, setPreviewComponent] = useState<Component | null>(null);

  // Search states for dropdowns
  const [categorySearch, setCategorySearch] = useState('');
  const [activeNameSearch, setActiveNameSearch] = useState('');
  const [standardizationSearch, setStandardizationSearch] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showActiveNameDropdown, setShowActiveNameDropdown] = useState(false);
  const [showStandardizationDropdown, setShowStandardizationDropdown] = useState(false);

  // Edit form search states
  const [editCategorySearch, setEditCategorySearch] = useState('');
  const [editActiveNameSearch, setEditActiveNameSearch] = useState('');
  const [editStandardizationSearch, setEditStandardizationSearch] = useState('');
  const [showEditCategoryDropdown, setShowEditCategoryDropdown] = useState(false);
  const [showEditActiveNameDropdown, setShowEditActiveNameDropdown] = useState(false);
  const [showEditStandardizationDropdown, setShowEditStandardizationDropdown] = useState(false);

  const [newComponent, setNewComponent] = useState({
    title: '',
    category: '',
    activeName: '',
    standardization: '',
    supplier: '',
    producer: '',
    ingredientsList: '',
    notes: '',
    trademark: '',
    expiryDate: '',
    country: ''
  });

  const filteredComponents = components.filter(component =>
    component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.activeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.standardization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateComponent = () => {
    if (!newComponent.title.trim() || !newComponent.category.trim() || 
        !newComponent.activeName.trim() || !newComponent.standardization.trim()) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    const component: Component = {
      id: Date.now().toString(),
      ...newComponent,
      title: newComponent.title.trim(),
      category: newComponent.category.trim(),
      activeName: newComponent.activeName.trim(),
      standardization: newComponent.standardization.trim(),
      supplier: newComponent.supplier.trim(),
      producer: newComponent.producer.trim(),
      ingredientsList: newComponent.ingredientsList.trim(),
      notes: newComponent.notes.trim(),
      trademark: newComponent.trademark.trim(),
      expiryDate: newComponent.expiryDate.trim(),
      country: newComponent.country.trim(),
      usedInProducts: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setComponents([...components, component]);
    setNewComponent({
      title: '',
      category: '',
      activeName: '',
      standardization: '',
      supplier: '',
      producer: '',
      ingredientsList: '',
      notes: '',
      trademark: '',
      expiryDate: '',
      country: ''
    });
    setShowCreateModal(false);
  };

  const handleEditComponent = (component: Component) => {
    setEditingComponent({ ...component });
  };

  const handleSaveEdit = () => {
    if (editingComponent && editingComponent.title.trim() && 
        editingComponent.category.trim() && editingComponent.activeName.trim() && 
        editingComponent.standardization.trim()) {
      const updatedComponent = {
        ...editingComponent,
        title: editingComponent.title.trim(),
        category: editingComponent.category.trim(),
        activeName: editingComponent.activeName.trim(),
        standardization: editingComponent.standardization.trim(),
        supplier: editingComponent.supplier.trim(),
        producer: editingComponent.producer.trim(),
        ingredientsList: editingComponent.ingredientsList.trim(),
        notes: editingComponent.notes.trim(),
        trademark: editingComponent.trademark.trim(),
        expiryDate: editingComponent.expiryDate.trim(),
        country: editingComponent.country.trim(),
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setComponents(components.map(c => 
        c.id === editingComponent.id ? updatedComponent : c
      ));
      setEditingComponent(null);
    }
  };

  const handleDeleteComponent = (componentId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setComponents(components.filter(c => c.id !== componentId));
    }
  };

  const showProductsList = (component: Component) => {
    setSelectedComponent(component);
    setShowProductsModal(true);
  };

  const showPreview = (component: Component) => {
    setPreviewComponent(component);
    setShowPreviewModal(true);
  };

  // Filter functions for searchable dropdowns
  const filteredCategories = availableCategories.filter(category =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredActiveNames = availableActiveNames.filter(name =>
    name.toLowerCase().includes(activeNameSearch.toLowerCase())
  );

  const filteredStandardizations = availableStandardizations.filter(std =>
    std.toLowerCase().includes(standardizationSearch.toLowerCase())
  );

  // Edit form filtered options
  const editFilteredCategories = availableCategories.filter(category =>
    category.toLowerCase().includes(editCategorySearch.toLowerCase())
  );

  const editFilteredActiveNames = availableActiveNames.filter(name =>
    name.toLowerCase().includes(editActiveNameSearch.toLowerCase())
  );

  const editFilteredStandardizations = availableStandardizations.filter(std =>
    std.toLowerCase().includes(editStandardizationSearch.toLowerCase())
  );
  const CreateComponentModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowCategoryDropdown(false);
          setShowActiveNameDropdown(false);
          setShowStandardizationDropdown(false);
        }
      }}
    >
      <div className="bg-white rounded-xl p-6 w-[75vw] max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Dodaj nowy składnik</h3>
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewComponent({
                title: '',
                category: '',
                activeName: '',
                standardization: '',
                supplier: '',
                producer: '',
                ingredientsList: '',
                notes: '',
                trademark: '',
                expiryDate: '',
                country: ''
              });
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tytuł *
            </label>
            <input
              type="text"
              value={newComponent.title}
              onChange={(e) => setNewComponent({ ...newComponent, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Witamina C (kwas askorbinowy) USP"
              autoFocus
            />
          </div>

          <SearchableDropdown
            label="Kategoria Składników"
            value={newComponent.category}
            onChange={(value) => setNewComponent({ ...newComponent, category: value })}
            options={filteredCategories}
            searchValue={categorySearch}
            onSearchChange={setCategorySearch}
            showDropdown={showCategoryDropdown}
            setShowDropdown={setShowCategoryDropdown}
            placeholder="Wybierz lub wyszukaj kategorię"
            required
          />

          <SearchableDropdown
            label="Nazwa Składnika"
            value={newComponent.activeName}
            onChange={(value) => setNewComponent({ ...newComponent, activeName: value })}
            options={filteredActiveNames}
            searchValue={activeNameSearch}
            onSearchChange={setActiveNameSearch}
            showDropdown={showActiveNameDropdown}
            setShowDropdown={setShowActiveNameDropdown}
            placeholder="Wybierz lub wyszukaj nazwę składnika"
            required
          />

          <SearchableDropdown
            label="Standaryzacja"
            value={newComponent.standardization}
            onChange={(value) => setNewComponent({ ...newComponent, standardization: value })}
            options={filteredStandardizations}
            searchValue={standardizationSearch}
            onSearchChange={setStandardizationSearch}
            showDropdown={showStandardizationDropdown}
            setShowDropdown={setShowStandardizationDropdown}
            placeholder="Wybierz lub wyszukaj standaryzację"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dostawca
            </label>
            <input
              type="text"
              value={newComponent.supplier}
              onChange={(e) => setNewComponent({ ...newComponent, supplier: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. VitaSupply Sp. z o.o."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Producent
            </label>
            <input
              type="text"
              value={newComponent.producer}
              onChange={(e) => setNewComponent({ ...newComponent, producer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. PharmaCorp Ltd."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Uwagi
            </label>
            <input
              type="text"
              value={newComponent.notes}
              onChange={(e) => setNewComponent({ ...newComponent, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Przechowywać w suchym miejscu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trademark
            </label>
            <input
              type="text"
              value={newComponent.trademark}
              onChange={(e) => setNewComponent({ ...newComponent, trademark: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. VitaC®"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Ważności
            </label>
            <input
              type="date"
              value={newComponent.expiryDate}
              onChange={(e) => setNewComponent({ ...newComponent, expiryDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kraj
            </label>
            <input
              type="text"
              value={newComponent.country}
              onChange={(e) => setNewComponent({ ...newComponent, country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="np. Niemcy"
            />
          </div>
        </div>

        <div className="mt-4">
          <WYSIWYGEditor
            value={newComponent.ingredientsList}
            onChange={(value) => setNewComponent({ ...newComponent, ingredientsList: value })}
            placeholder="Wprowadź listę składników (obsługuje HTML)"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewComponent({
                title: '',
                category: '',
                activeName: '',
                standardization: '',
                supplier: '',
                producer: '',
                ingredientsList: '',
                notes: '',
                trademark: '',
                expiryDate: '',
                country: ''
              });
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

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[75vw] max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Podgląd składnika</h3>
          <button
            onClick={() => {
              setShowPreviewModal(false);
              setPreviewComponent(null);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {previewComponent && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
                <p className="text-gray-900">{previewComponent.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {previewComponent.category}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa Składnika</label>
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {previewComponent.activeName}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standaryzacja</label>
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {previewComponent.standardization}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dostawca</label>
                <p className="text-gray-900">{previewComponent.supplier || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Producent</label>
                <p className="text-gray-900">{previewComponent.producer || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trademark</label>
                <p className="text-gray-900">{previewComponent.trademark || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Ważności</label>
                <p className="text-gray-900">{previewComponent.expiryDate || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kraj</label>
                <p className="text-gray-900">{previewComponent.country || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uwagi</label>
                <p className="text-gray-900">{previewComponent.notes || '-'}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lista składników</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                {previewComponent.ingredientsList ? (
                  <div dangerouslySetInnerHTML={{ __html: previewComponent.ingredientsList }} />
                ) : (
                  <p className="text-gray-500">Brak danych</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Użyte w produktach</label>
              <div className="space-y-1">
                {previewComponent.usedInProducts.length > 0 ? (
                  previewComponent.usedInProducts.map((product, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                    >
                      {product}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Nie używane w żadnych produktach</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowPreviewModal(false);
              setPreviewComponent(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Zamknij
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
            Produkty zawierające: {selectedComponent?.title}
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
              setSelectedComponent(null);
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
    <div 
      className="space-y-6"
      onClick={() => {
        setShowCategoryDropdown(false);
        setShowActiveNameDropdown(false);
        setShowStandardizationDropdown(false);
        setShowEditCategoryDropdown(false);
        setShowEditActiveNameDropdown(false);
        setShowEditStandardizationDropdown(false);
      }}
    >
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Składniki</h1>
            <p className="text-gray-600">Zarządzaj listą składników z pełnymi informacjami</p>
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
            placeholder="Szukaj składników..."
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
            Lista składników ({filteredComponents.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '30%'}}>Tytuł</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '12%'}}>Kategorie</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '12%'}}>Standaryzacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '24%'}}>Użyte w</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '11%'}}>Data utworzenia</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '11%'}}>Ostatnia aktualizacja</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700" style={{width: '10%'}}>Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredComponents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm ? 'Nie znaleziono składników pasujących do wyszukiwania' : 'Brak składników'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredComponents.map((component) => (
                  <tr key={component.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {component.title}
                        </div>
                        {component.activeName && (
                          <p className="text-sm text-gray-600">{component.activeName}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {component.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {component.standardization}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {component.usedInProducts.length > 0 ? (
                        <div className="space-y-1">
                          {component.usedInProducts.slice(0, 1).map((product, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                            >
                              {product}
                            </span>
                          ))}
                          {component.usedInProducts.length > 1 && (
                            <button
                              onClick={() => showProductsList(component)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                              +{component.usedInProducts.length - 1} więcej
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
                          onClick={() => showPreview(component)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Podgląd"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
      {showPreviewModal && <PreviewModal />}
      {showProductsModal && <ProductsModal />}

      {/* Edit Component Modal */}
      {editingComponent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEditCategoryDropdown(false);
              setShowEditActiveNameDropdown(false);
              setShowEditStandardizationDropdown(false);
            }
          }}
        >
          <div className="bg-white rounded-xl p-6 w-[75vw] max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edytuj składnik</h3>
              <button
                onClick={() => setEditingComponent(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tytuł
                </label>
                <input
                  type="text"
                  value={editingComponent.title}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    title: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              <SearchableDropdown
                label="Kategoria Składników"
                value={editingComponent.category}
                onChange={(value) => setEditingComponent({ ...editingComponent, category: value })}
                options={editFilteredCategories}
                searchValue={editCategorySearch}
                onSearchChange={setEditCategorySearch}
                showDropdown={showEditCategoryDropdown}
                setShowDropdown={setShowEditCategoryDropdown}
                placeholder="Wybierz lub wyszukaj kategorię"
              />

              <SearchableDropdown
                label="Nazwa Składnika"
                value={editingComponent.activeName}
                onChange={(value) => setEditingComponent({ ...editingComponent, activeName: value })}
                options={editFilteredActiveNames}
                searchValue={editActiveNameSearch}
                onSearchChange={setEditActiveNameSearch}
                showDropdown={showEditActiveNameDropdown}
                setShowDropdown={setShowEditActiveNameDropdown}
                placeholder="Wybierz lub wyszukaj nazwę składnika"
              />

              <SearchableDropdown
                label="Standaryzacja"
                value={editingComponent.standardization}
                onChange={(value) => setEditingComponent({ ...editingComponent, standardization: value })}
                options={editFilteredStandardizations}
                searchValue={editStandardizationSearch}
                onSearchChange={setEditStandardizationSearch}
                showDropdown={showEditStandardizationDropdown}
                setShowDropdown={setShowEditStandardizationDropdown}
                placeholder="Wybierz lub wyszukaj standaryzację"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dostawca
                </label>
                <input
                  type="text"
                  value={editingComponent.supplier}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    supplier: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Producent
                </label>
                <input
                  type="text"
                  value={editingComponent.producer}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    producer: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uwagi
                </label>
                <input
                  type="text"
                  value={editingComponent.notes}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    notes: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trademark
                </label>
                <input
                  type="text"
                  value={editingComponent.trademark}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    trademark: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Ważności
                </label>
                <input
                  type="date"
                  value={editingComponent.expiryDate}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    expiryDate: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kraj
                </label>
                <input
                  type="text"
                  value={editingComponent.country}
                  onChange={(e) => setEditingComponent({ 
                    ...editingComponent, 
                    country: e.target.value 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <WYSIWYGEditor
                value={editingComponent.ingredientsList}
                onChange={(value) => setEditingComponent({ 
                  ...editingComponent, 
                  ingredientsList: value 
                })}
                placeholder="Wprowadź listę składników (obsługuje HTML)"
              />
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

export default Components;