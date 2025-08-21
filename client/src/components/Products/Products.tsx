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
  RefreshCw,
  Globe,
  ShoppingCart,
  Power
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategories: string[];
  usage: string[];
  subtitle1: string;
  subtitle2: string;
  featuresTitle: string;
  features?: string[];
  qualityGuaranteeTitle?: string;
  qualityGuaranteeText?: string;
  images?: string[];
  bulkPackageQuantity?: number;
  unitGrossWeight?: number;
  unitPackageHeight?: number;
  unitPackageWidth?: number;
  unitPackageDepth?: number;
  bulkPackageHeight?: number;
  bulkPackageWidth?: number;
  bulkPackageDepth?: number;
  unitsPerLayer?: number;
  unitsPerPallet?: number;
  status: 'active' | 'inactive' | 'pending';
  // New product department fields
  postac?: string; // Form/Shape
  marka?: string; // Brand
  iloscDziennychPorcji?: string; // Daily portions/applications
  iloscNetto?: string; // Net quantity
  wagaNetto?: number; // Net weight in grams
  kategoriaZywnosci?: string; // Food category
  zalecanyWiek?: string; // Recommended age
  kraj?: 'Polska' | 'Niemcy'; // Country
  ean?: string; // EAN code
  cenaSugerowana?: number; // Suggested price
  waluta?: 'PLN' | 'GBP' | 'EUR' | 'USD'; // Currency
  vat?: number; // VAT percentage
  bloz?: string; // BLOZ number
  gisLink?: string; // GIS Link
  gisNumer?: string; // GIS Number
  createdAt: string;
  updatedAt: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Suplement Witamina C 1000mg',
      category: 'Witaminy i minerały',
      subcategories: ['Witaminy rozpuszczalne w wodzie', 'Antyoksydanty'],
      usage: ['Wzmocnienie odporności', 'Wsparcie układu immunologicznego'],
      subtitle1: 'Najwyższej jakości witamina C',
      subtitle2: 'Wspiera naturalną odporność organizmu',
      featuresTitle: 'Dlaczego warto wybrać naszą witaminę C?',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Suplement Witamina D3 4000IU',
      category: 'Witaminy i minerały',
      subcategories: ['Witaminy rozpuszczalne w tłuszczach'],
      usage: ['Wsparcie układu kostnego', 'Wzmocnienie odporności'],
      subtitle1: 'Witamina słońca w najlepszej formie',
      subtitle2: 'Wspiera zdrowie kości i zębów',
      featuresTitle: 'Korzyści z suplementacji witaminą D3',
      status: 'pending',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: '3',
      name: 'Multivitamina Complex',
      category: 'Witaminy i minerały',
      subcategories: ['Kompleksy witaminowe', 'Minerały'],
      usage: ['Wzmocnienie odporności', 'Wsparcie metabolizmu'],
      subtitle1: 'Kompletny zestaw witamin i minerałów',
      subtitle2: 'Wszystko czego potrzebujesz w jednej kapsułce',
      featuresTitle: 'Kompleksowe wsparcie dla Twojego organizmu',
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Protein Complex',
      category: 'Suplementy sportowe',
      subcategories: ['Białka', 'Odżywki sportowe'],
      usage: ['Poprawa kondycji fizycznej', 'Budowa masy mięśniowej'],
      subtitle1: 'Wysokiej jakości białko dla sportowców',
      subtitle2: 'Wspiera regenerację i wzrost mięśni',
      featuresTitle: 'Dlaczego nasz protein to najlepszy wybór?',
      status: 'inactive',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'BCAA Energy',
      category: 'Suplementy sportowe',
      subcategories: ['Aminokwasy', 'Energia'],
      usage: ['Poprawa kondycji fizycznej', 'Zwiększenie energii'],
      subtitle1: 'Aminokwasy rozgałęzione z dodatkiem kofeiny',
      subtitle2: 'Energia i regeneracja w jednym',
      featuresTitle: 'Maksymalna wydajność treningowa',
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'Kolagen Plus',
      category: 'Zdrowie i uroda',
      subcategories: ['Kolagen', 'Uroda'],
      usage: ['Wsparcie skóry', 'Zdrowie stawów'],
      subtitle1: 'Kolagen morski najwyższej jakości',
      subtitle2: 'Młoda skóra i zdrowe stawy',
      featuresTitle: 'Naturalne piękno od wewnątrz',
      status: 'pending',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '7',
      name: 'Probiotyki Daily',
      category: 'Probiotyki',
      subcategories: ['Bakterie probiotyczne', 'Zdrowie jelit'],
      usage: ['Wsparcie układu trawiennego', 'Wzmocnienie odporności'],
      subtitle1: 'Żywe kultury bakterii probiotycznych',
      subtitle2: 'Zdrowe jelita, silna odporność',
      featuresTitle: 'Dlaczego nasze probiotyki są wyjątkowe?',
      status: 'inactive',
      createdAt: '2023-12-28',
      updatedAt: '2023-12-28'
    },
    {
      id: '8',
      name: 'Omega-3 Fish Oil',
      category: 'Omega i kwasy tłuszczowe',
      subcategories: ['Omega-3', 'Kwasy tłuszczowe'],
      usage: ['Zdrowie serca', 'Poprawa funkcji poznawczych'],
      subtitle1: 'Olej z ryb morskich najwyższej czystości',
      subtitle2: 'Wspiera serce i mózg',
      featuresTitle: 'Korzyści z suplementacji Omega-3',
      status: 'active',
      createdAt: '2023-12-25',
      updatedAt: '2023-12-25'
    }
  ]);

  // Mock data for dropdowns - in real app these would come from other components
  const availableCategories = [
    'Witaminy i minerały',
    'Suplementy sportowe', 
    'Zdrowie i uroda',
    'Probiotyki',
    'Ekstrakty roślinne',
    'Omega i kwasy tłuszczowe'
  ];

  const availableSubcategories = [
    'Witaminy rozpuszczalne w wodzie',
    'Witaminy rozpuszczalne w tłuszczach',
    'Antyoksydanty',
    'Kompleksy witaminowe',
    'Minerały',
    'Białka',
    'Odżywki sportowe',
    'Aminokwasy',
    'Energia',
    'Kolagen',
    'Uroda',
    'Bakterie probiotyczne',
    'Zdrowie jelit',
    'Omega-3',
    'Kwasy tłuszczowe'
  ];

  const availableUsages = [
    'Wzmocnienie odporności',
    'Wsparcie układu kostnego',
    'Poprawa kondycji fizycznej',
    'Wsparcie układu trawiennego',
    'Poprawa funkcji poznawczych',
    'Zdrowie serca',
    'Wsparcie skóry',
    'Zdrowie stawów',
    'Wsparcie metabolizmu',
    'Budowa masy mięśniowej',
    'Zwiększenie energii',
    'Wsparcie układu immunologicznego'
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    subcategories: [] as string[],
    usage: [] as string[],
    subtitle1: '',
    subtitle2: '',
    featuresTitle: '',
    features: [] as string[],
    qualityGuaranteeTitle: '',
    qualityGuaranteeText: '',
    images: [] as string[],
    bulkPackageQuantity: 0,
    unitGrossWeight: 0,
    unitPackageHeight: 0,
    unitPackageWidth: 0,
    unitPackageDepth: 0,
    bulkPackageHeight: 0,
    bulkPackageWidth: 0,
    bulkPackageDepth: 0,
    unitsPerLayer: 0,
    unitsPerPallet: 0,
    status: 'active' as 'active' | 'inactive' | 'pending',
    // New product department fields
    postac: '',
    marka: '',
    iloscDziennychPorcji: '',
    iloscNetto: '',
    wagaNetto: undefined as number | undefined,
    kategoriaZywnosci: '',
    zalecanyWiek: '',
    kraj: undefined as 'Polska' | 'Niemcy' | undefined,
    ean: '',
    cenaSugerowana: undefined as number | undefined,
    waluta: undefined as 'PLN' | 'GBP' | 'EUR' | 'USD' | undefined,
    vat: undefined as number | undefined,
    bloz: '',
    gisLink: '',
    gisNumer: ''
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedProductForSync, setSelectedProductForSync] = useState<Product | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('marketing');

  const getRowBackgroundColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-white hover:bg-gray-50';
      case 'inactive':
        return 'bg-red-50 hover:bg-red-100';
      case 'pending':
        return 'bg-orange-50 hover:bg-orange-100';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywny';
      case 'inactive':
        return 'Nieaktywny';
      case 'pending':
        return 'Oczekujący';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || product.status === statusFilter) &&
    (categoryFilter === 'all' || product.category === categoryFilter)
  );

  const handleCreateProduct = () => {
    if (!newProduct.name.trim() || !newProduct.category.trim()) {
      alert('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name.trim(),
      category: newProduct.category.trim(),
      subcategories: newProduct.subcategories,
      usage: newProduct.usage,
      subtitle1: newProduct.subtitle1.trim(),
      subtitle2: newProduct.subtitle2.trim(),
      featuresTitle: newProduct.featuresTitle.trim(),
      features: newProduct.features,
      qualityGuaranteeTitle: newProduct.qualityGuaranteeTitle.trim(),
      qualityGuaranteeText: newProduct.qualityGuaranteeText.trim(),
      status: newProduct.status,
      // New product department fields
      postac: newProduct.postac,
      marka: newProduct.marka,
      iloscDziennychPorcji: newProduct.iloscDziennychPorcji,
      iloscNetto: newProduct.iloscNetto,
      wagaNetto: newProduct.wagaNetto,
      kategoriaZywnosci: newProduct.kategoriaZywnosci,
      zalecanyWiek: newProduct.zalecanyWiek,
      kraj: newProduct.kraj,
      ean: newProduct.ean,
      cenaSugerowana: newProduct.cenaSugerowana,
      waluta: newProduct.waluta,
      vat: newProduct.vat,
      bloz: newProduct.bloz,
      gisLink: newProduct.gisLink,
      gisNumer: newProduct.gisNumer,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      subcategories: [],
      usage: [],
      subtitle1: '',
      subtitle2: '',
      featuresTitle: '',
      features: [],
      qualityGuaranteeTitle: '',
      qualityGuaranteeText: '',
      images: [] as string[],
      bulkPackageQuantity: 0,
      unitGrossWeight: 0,
      unitPackageHeight: 0,
      unitPackageWidth: 0,
      unitPackageDepth: 0,
      bulkPackageHeight: 0,
      bulkPackageWidth: 0,
      bulkPackageDepth: 0,
      unitsPerLayer: 0,
      unitsPerPallet: 0,
      status: 'active',
      // New product department fields
      postac: '',
      marka: '',
      iloscDziennychPorcji: '',
      iloscNetto: '',
      wagaNetto: undefined,
      kategoriaZywnosci: '',
      zalecanyWiek: '',
      kraj: undefined,
      ean: '',
      cenaSugerowana: undefined,
      waluta: undefined,
      vat: undefined,
      bloz: '',
      gisLink: '',
      gisNumer: ''
    });
    setShowCreateModal(false);
    setActiveTab('marketing');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setActiveTab('marketing');
  };

  const handleSaveEdit = () => {
    if (editingProduct && editingProduct.name.trim() && editingProduct.category.trim()) {
      const updatedProduct = {
        ...editingProduct,
        name: editingProduct.name.trim(),
        category: editingProduct.category.trim(),
        subtitle1: editingProduct.subtitle1.trim(),
        subtitle2: editingProduct.subtitle2.trim(),
        featuresTitle: editingProduct.featuresTitle.trim(),
        features: editingProduct.features || [],
        qualityGuaranteeTitle: editingProduct.qualityGuaranteeTitle?.trim() || '',
        qualityGuaranteeText: editingProduct.qualityGuaranteeText?.trim() || '',
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      setProducts(products.map(p => 
        p.id === editingProduct.id ? updatedProduct : p
      ));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Czy napewno chcesz usunąć ten rekord?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSyncAction = (action: 'b2b' | 'ecommerce' | 'disable', productName: string) => {
    let message = '';
    switch (action) {
      case 'b2b':
        message = `Synchronizacja produktu "${productName}" z platformą B2B została rozpoczęta.`;
        break;
      case 'ecommerce':
        message = `Synchronizacja produktu "${productName}" z platformą E-commerce została rozpoczęta.`;
        break;
      case 'disable':
        message = `Produkt "${productName}" został wyłączony na obu platformach.`;
        break;
    }
    alert(message);
    setShowSyncModal(false);
    setSelectedProductForSync(null);
  };

  const openSyncModal = (product: Product) => {
    setSelectedProductForSync(product);
    setShowSyncModal(true);
  };

  const showPreview = (product: Product) => {
    setPreviewProduct(product);
    setShowPreviewModal(true);
  };

  const handleSubcategoryChange = (subcategory: string, checked: boolean, isEdit = false) => {
    if (isEdit && editingProduct) {
      const updatedSubcategories = checked
        ? [...editingProduct.subcategories, subcategory]
        : editingProduct.subcategories.filter(s => s !== subcategory);
      setEditingProduct({ ...editingProduct, subcategories: updatedSubcategories });
    } else {
      const updatedSubcategories = checked
        ? [...newProduct.subcategories, subcategory]
        : newProduct.subcategories.filter(s => s !== subcategory);
      setNewProduct({ ...newProduct, subcategories: updatedSubcategories });
    }
  };

  const handleUsageChange = (usage: string, checked: boolean, isEdit = false) => {
    if (isEdit && editingProduct) {
      const updatedUsage = checked
        ? [...editingProduct.usage, usage]
        : editingProduct.usage.filter(u => u !== usage);
      setEditingProduct({ ...editingProduct, usage: updatedUsage });
    } else {
      const updatedUsage = checked
        ? [...newProduct.usage, usage]
        : newProduct.usage.filter(u => u !== usage);
      setNewProduct({ ...newProduct, usage: updatedUsage });
    }
  };

  const TabButton = ({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  // Simple WYSIWYG Editor Component
  const WYSIWYGEditor = ({ 
    value, 
    onChange, 
    placeholder 
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    placeholder?: string; 
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    // Update tempValue when value changes
    React.useEffect(() => {
      setTempValue(value);
    }, [value]);

    const handleSave = () => {
      onChange(tempValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setTempValue(value);
      setIsEditing(false);
    };

    const insertTag = (tag: string) => {
      const textarea = document.getElementById('wysiwyg-textarea') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = tempValue.substring(start, end);
        const beforeText = tempValue.substring(0, start);
        const afterText = tempValue.substring(end);
        
        let newText = '';
        if (tag === 'br') {
          newText = `${beforeText}<br>${afterText}`;
        } else {
          if (selectedText) {
            newText = `${beforeText}<${tag}>${selectedText}</${tag}>${afterText}`;
          } else {
            newText = `${beforeText}<${tag}></${tag}>${afterText}`;
          }
        }
        
        setTempValue(newText);
        setTimeout(() => {
          textarea.focus();
          const newPosition = tag === 'br' 
            ? start + 4 
            : start + tag.length + 2 + (selectedText ? selectedText.length : 0);
          textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
      }
    };

    return (
      <div>
        {!isEditing ? (
          <div 
            onClick={() => setIsEditing(true)}
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg cursor-text hover:border-gray-400 bg-white"
            style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
          >
            {value ? (
              <div 
                dangerouslySetInnerHTML={{ __html: value }}
                className="wysiwyg-content"
              />
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg">
            {/* Toolbar */}
            <div className="flex items-center space-x-2 p-2 border-b border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={() => insertTag('strong')}
                className="px-2 py-1 text-sm font-bold border border-gray-300 rounded hover:bg-gray-200"
                title="Pogrubienie"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertTag('em')}
                className="px-2 py-1 text-sm italic border border-gray-300 rounded hover:bg-gray-200"
                title="Kursywa"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertTag('p')}
                className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200"
                title="Paragraf"
              >
                P
              </button>
              <button
                type="button"
                onClick={() => insertTag('br')}
                className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200"
                title="Nowa linia"
              >
                BR
              </button>
              <div className="flex-1"></div>
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-200"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Zapisz
              </button>
            </div>
            
            {/* Editor */}
            <textarea
              id="wysiwyg-textarea"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 border-none focus:outline-none resize-none"
              placeholder={placeholder}
            />
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          Kliknij aby edytować. Możesz używać tagów HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;
        </p>
      </div>
    );
  };

  const MarketingTab = ({ isEdit = false }: { isEdit?: boolean }) => {
    const currentProduct = isEdit ? editingProduct : newProduct;
    const setCurrentProduct = isEdit 
      ? (updates: any) => setEditingProduct({ ...editingProduct!, ...updates })
      : (updates: any) => setNewProduct({ ...newProduct, ...updates });

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nazwa produktu *
          </label>
          <input
            type="text"
            value={currentProduct?.name || ''}
            onChange={(e) => setCurrentProduct({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Suplement Witamina C 1000mg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Podtytuł nr 1
          </label>
          <input
            type="text"
            value={currentProduct?.subtitle1 || ''}
            onChange={(e) => setCurrentProduct({ subtitle1: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Najwyższej jakości witamina C"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Podtytuł nr 2
          </label>
          <input
            type="text"
            value={currentProduct?.subtitle2 || ''}
            onChange={(e) => setCurrentProduct({ subtitle2: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Wspiera naturalną odporność organizmu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategoria Produktu *
          </label>
          <select
            value={currentProduct?.category || ''}
            onChange={(e) => setCurrentProduct({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wybierz kategorię</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Podkategorie Produktu
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {availableSubcategories.map((subcategory) => (
              <label key={subcategory} className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentProduct?.subcategories?.includes(subcategory) || false}
                  onChange={(e) => handleSubcategoryChange(subcategory, e.target.checked, isEdit)}
                  className="mr-2"
                />
                <span className="text-sm">{subcategory}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zastosowanie
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {availableUsages.map((usage) => (
              <label key={usage} className="flex items-center">
                <input
                  type="checkbox"
                  checked={currentProduct?.usage?.includes(usage) || false}
                  onChange={(e) => handleUsageChange(usage, e.target.checked, isEdit)}
                  className="mr-2"
                />
                <span className="text-sm">{usage}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cechy produktu/Dlaczego warto tytuł
          </label>
          <input
            type="text"
            value={currentProduct?.featuresTitle || ''}
            onChange={(e) => setCurrentProduct({ featuresTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Dlaczego warto wybrać naszą witaminę C?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cechy produktu/Dlaczego warto
          </label>
          <div className="space-y-2">
            {(currentProduct?.features || []).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const updatedFeatures = [...(currentProduct?.features || [])];
                    updatedFeatures[index] = e.target.value;
                    setCurrentProduct({ features: updatedFeatures });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="np. Wysokiej jakości składniki"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedFeatures = (currentProduct?.features || []).filter((_, i) => i !== index);
                    setCurrentProduct({ features: updatedFeatures });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Usuń"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const updatedFeatures = [...(currentProduct?.features || []), ''];
                setCurrentProduct({ features: updatedFeatures });
              }}
              className="flex items-center space-x-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">Dodaj cechę</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gwarancja jakości tytuł
          </label>
          <input
            type="text"
            value={currentProduct?.qualityGuaranteeTitle || ''}
            onChange={(e) => setCurrentProduct({ qualityGuaranteeTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Najwyższa jakość gwarantowana"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gwarancja jakości tekst
          </label>
          <WYSIWYGEditor
            value={currentProduct?.qualityGuaranteeText || ''}
            onChange={(value) => setCurrentProduct({ qualityGuaranteeText: value })}
            placeholder="Wprowadź tekst gwarancji jakości (obsługuje HTML)"
          />
        </div>


      </div>
    );
  };

  const ProductTab = ({ isEdit = false }: { isEdit?: boolean }) => {
    const currentProduct = isEdit ? editingProduct : newProduct;
    const setCurrentProduct = isEdit 
      ? (updates: any) => setEditingProduct({ ...editingProduct!, ...updates })
      : (updates: any) => setNewProduct({ ...newProduct, ...updates });

    // Available Postać options from Form.tsx
    const availablePostac = [
      { id: '1', name: 'Kapsułki' },
      { id: '2', name: 'Tabletki' },
      { id: '3', name: 'Proszek' },
      { id: '4', name: 'Płyn' },
      { id: '5', name: 'Żel' },
      { id: '6', name: 'Krople' }
    ];

    // Available Marka options from Brand.tsx
    const availableMarki = [
      { id: '1', name: 'Aura Herbals' },
      { id: '2', name: 'NaturalHealth' },
      { id: '3', name: 'BioActive' },
      { id: '4', name: 'HealthPlus' },
      { id: '5', name: 'VitaMax' },
      { id: '6', name: 'PureLife' }
    ];

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            value={currentProduct?.status || 'active'}
            onChange={(e) => setCurrentProduct({ status: e.target.value as 'active' | 'inactive' | 'pending' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Aktywny</option>
            <option value="pending">Oczekujący</option>
            <option value="inactive">Nieaktywny</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postać *
          </label>
          <select
            value={currentProduct?.postac || ''}
            onChange={(e) => setCurrentProduct({ postac: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wybierz postać</option>
            {availablePostac.map((postac) => (
              <option key={postac.id} value={postac.name}>
                {postac.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marka *
          </label>
          <select
            value={currentProduct?.marka || ''}
            onChange={(e) => setCurrentProduct({ marka: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wybierz markę</option>
            {availableMarki.map((marka) => (
              <option key={marka.id} value={marka.name}>
                {marka.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ilość dziennych porcji/aplikacji
          </label>
          <input
            type="text"
            value={currentProduct?.iloscDziennychPorcji || ''}
            onChange={(e) => setCurrentProduct({ iloscDziennychPorcji: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 2 kapsułki dziennie"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ilość netto
          </label>
          <input
            type="text"
            value={currentProduct?.iloscNetto || ''}
            onChange={(e) => setCurrentProduct({ iloscNetto: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 60 kapsułek"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waga netto (gr.)
          </label>
          <input
            type="number"
            value={currentProduct?.wagaNetto || ''}
            onChange={(e) => setCurrentProduct({ wagaNetto: parseFloat(e.target.value) || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 45.5"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategoria żywności
          </label>
          <input
            type="text"
            value={currentProduct?.kategoriaZywnosci || ''}
            onChange={(e) => setCurrentProduct({ kategoriaZywnosci: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Suplement diety"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zalecany wiek
          </label>
          <input
            type="text"
            value={currentProduct?.zalecanyWiek || ''}
            onChange={(e) => setCurrentProduct({ zalecanyWiek: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. Dorośli od 18 lat"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kraj
          </label>
          <select
            value={currentProduct?.kraj || ''}
            onChange={(e) => setCurrentProduct({ kraj: e.target.value as 'Polska' | 'Niemcy' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wybierz kraj</option>
            <option value="Polska">Polska</option>
            <option value="Niemcy">Niemcy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            EAN
          </label>
          <input
            type="text"
            value={currentProduct?.ean || ''}
            onChange={(e) => setCurrentProduct({ ean: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 1234567890123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cena Sugerowana
          </label>
          <input
            type="number"
            value={currentProduct?.cenaSugerowana || ''}
            onChange={(e) => setCurrentProduct({ cenaSugerowana: parseFloat(e.target.value) || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 29.99"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waluta
          </label>
          <select
            value={currentProduct?.waluta || ''}
            onChange={(e) => setCurrentProduct({ waluta: e.target.value as 'PLN' | 'GBP' | 'EUR' | 'USD' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Wybierz walutę</option>
            <option value="PLN">PLN</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            VAT (%)
          </label>
          <input
            type="number"
            value={currentProduct?.vat || ''}
            onChange={(e) => setCurrentProduct({ vat: parseFloat(e.target.value) || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. 23"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            BLOZ
          </label>
          <input
            type="text"
            value={currentProduct?.bloz || ''}
            onChange={(e) => setCurrentProduct({ bloz: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. BLOZ-123456"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GIS Link
          </label>
          <input
            type="url"
            value={currentProduct?.gisLink || ''}
            onChange={(e) => setCurrentProduct({ gisLink: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GIS Numer
          </label>
          <input
            type="text"
            value={currentProduct?.gisNumer || ''}
            onChange={(e) => setCurrentProduct({ gisNumer: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="np. GIS-789012"
          />
        </div>
      </div>
    );
  };

  const B2BTab = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Dział B2B - w przygotowaniu</p>
      </div>
    </div>
  );

  const FilesTab = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Pliki - w przygotowaniu</p>
      </div>
    </div>
  );

  const CreateProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Dodaj nowy produkt</h3>
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200">
          <TabButton
            id="marketing"
            label="Dział Marketingu"
            active={activeTab === 'marketing'}
            onClick={() => setActiveTab('marketing')}
          />
          <TabButton
            id="product"
            label="Dział Produktu"
            active={activeTab === 'product'}
            onClick={() => setActiveTab('product')}
          />
          <TabButton
            id="b2b"
            label="Dział B2B"
            active={activeTab === 'b2b'}
            onClick={() => setActiveTab('b2b')}
          />
          <TabButton
            id="files"
            label="Pliki"
            active={activeTab === 'files'}
            onClick={() => setActiveTab('files')}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'marketing' && <MarketingTab />}
        {activeTab === 'product' && <ProductTab />}
        {activeTab === 'b2b' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ilość w opakowaniu zbiorczym (szt.)
              </label>
              <input
                type="number"
                value={newProduct.bulkPackageQuantity || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  bulkPackageQuantity: parseInt(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jednostkowa waga brutto (kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={newProduct.unitGrossWeight || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitGrossWeight: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wysokość opakowania jednostkowego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.unitPackageHeight || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitPackageHeight: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Szerokość opakowania jednostkowego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.unitPackageWidth || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitPackageWidth: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Głębokość opakowania jednostkowego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.unitPackageDepth || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitPackageDepth: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wysokość opakowania zbiorczego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.bulkPackageHeight || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  bulkPackageHeight: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Szerokość opakowania zbiorczego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.bulkPackageWidth || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  bulkPackageWidth: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Głębokość opakowania zbiorczego (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProduct.bulkPackageDepth || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  bulkPackageDepth: parseFloat(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ilość sztuk na warstwie
              </label>
              <input
                type="number"
                value={newProduct.unitsPerLayer || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitsPerLayer: parseInt(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ilość sztuk na palecie
              </label>
              <input
                type="number"
                value={newProduct.unitsPerPallet || ''}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  unitsPerPallet: parseInt(e.target.value) || 0 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        )}
        {activeTab === 'files' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zdjęcia produktu
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const imageUrls = files.map(file => URL.createObjectURL(file));
                    setNewProduct({
                      ...newProduct,
                      images: [...(newProduct.images || []), ...imageUrls]
                    });
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Kliknij aby dodać zdjęcia lub przeciągnij je tutaj</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF do 10MB</p>
                </label>
              </div>
            </div>

            {newProduct.images && newProduct.images.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Dodane zdjęcia:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Zdjęcie ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded">
                          Miniaturka
                        </span>
                      )}
                      <button
                        onClick={() => {
                          const updatedImages = newProduct.images?.filter((_, i) => i !== index) || [];
                          setNewProduct({
                            ...newProduct,
                            images: updatedImages
                          });
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowCreateModal(false);
              setNewProduct({
                name: '',
                category: '',
                subcategories: [],
                usage: [],
                subtitle1: '',
                subtitle2: '',
                featuresTitle: '',
                features: [],
                qualityGuaranteeTitle: '',
                qualityGuaranteeText: '',
                images: [] as string[],
                bulkPackageQuantity: 0,
                unitGrossWeight: 0,
                unitPackageHeight: 0,
                unitPackageWidth: 0,
                unitPackageDepth: 0,
                bulkPackageHeight: 0,
                bulkPackageWidth: 0,
                bulkPackageDepth: 0,
                unitsPerLayer: 0,
                unitsPerPallet: 0,
                status: 'active',
                // New product department fields
                postac: '',
                marka: '',
                iloscDziennychPorcji: '',
                iloscNetto: '',
                wagaNetto: undefined,
                kategoriaZywnosci: '',
                zalecanyWiek: '',
                kraj: undefined,
                ean: '',
                cenaSugerowana: undefined,
                waluta: undefined,
                vat: undefined,
                bloz: '',
                gisLink: '',
                gisNumer: ''
              });
              setActiveTab('marketing');
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreateProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Dodaj produkt
          </button>
        </div>
      </div>
    </div>
  );

  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Podgląd produktu</h3>
        
        {previewProduct && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa produktu</label>
              <p className="text-gray-900 font-medium mb-4">{previewProduct.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-4">
                {previewProduct.category}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Podkategorie</label>
              <div className="flex flex-wrap gap-1 mb-4">
                {previewProduct.subcategories.map((sub, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zastosowanie</label>
              <div className="flex flex-wrap gap-1 mb-4">
                {previewProduct.usage.map((use, index) => (
                  <span key={index} className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                    {use}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className={`inline-block text-xs px-2 py-1 rounded-full mb-4 ${
                previewProduct.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : previewProduct.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {previewProduct.status === 'active' ? 'Aktywny' : 
                 previewProduct.status === 'pending' ? 'Oczekujący' : 'Nieaktywny'}
              </span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Podtytuł 1</label>
              <p className="text-gray-900 mb-4">{previewProduct.subtitle1 || '-'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Podtytuł 2</label>
              <p className="text-gray-900 mb-4">{previewProduct.subtitle2 || '-'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł cech</label>
              <p className="text-gray-900 mb-4">{previewProduct.featuresTitle || '-'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł gwarancji jakości</label>
              <p className="text-gray-900 mb-4">{previewProduct.qualityGuaranteeTitle || '-'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gwarancja jakości tekst</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                {previewProduct.qualityGuaranteeText ? (
                  <div dangerouslySetInnerHTML={{ __html: previewProduct.qualityGuaranteeText }} />
                ) : (
                  <p className="text-gray-500">Brak tekstu</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Podkategorie</label>
              <div className="space-y-1">
                {previewProduct.subcategories.length > 0 ? (
                  previewProduct.subcategories.map((subcategory, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                    >
                      {subcategory}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Brak podkategorii</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zastosowanie</label>
              <div className="space-y-1">
                {previewProduct.usage.length > 0 ? (
                  previewProduct.usage.map((usage, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1"
                    >
                      {usage}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Brak zastosowań</p>
                )}
              </div>
            </div>

            {/* Product Department Information */}
            {(previewProduct.postac || previewProduct.marka || previewProduct.iloscDziennychPorcji || 
              previewProduct.iloscNetto || previewProduct.wagaNetto || previewProduct.kategoriaZywnosci || 
              previewProduct.zalecanyWiek || previewProduct.kraj || previewProduct.ean || 
              previewProduct.cenaSugerowana || previewProduct.waluta || previewProduct.vat || 
              previewProduct.bloz || previewProduct.gisLink || previewProduct.gisNumer) && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Informacje Działu Produktu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewProduct.postac && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Postać:</span>
                      <p className="text-gray-900">{previewProduct.postac}</p>
                    </div>
                  )}
                  {previewProduct.marka && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Marka:</span>
                      <p className="text-gray-900">{previewProduct.marka}</p>
                    </div>
                  )}
                  {previewProduct.iloscDziennychPorcji && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Ilość dziennych porcji/aplikacji:</span>
                      <p className="text-gray-900">{previewProduct.iloscDziennychPorcji}</p>
                    </div>
                  )}
                  {previewProduct.iloscNetto && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Ilość netto:</span>
                      <p className="text-gray-900">{previewProduct.iloscNetto}</p>
                    </div>
                  )}
                  {previewProduct.wagaNetto && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Waga netto:</span>
                      <p className="text-gray-900">{previewProduct.wagaNetto} gr.</p>
                    </div>
                  )}
                  {previewProduct.kategoriaZywnosci && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Kategoria żywności:</span>
                      <p className="text-gray-900">{previewProduct.kategoriaZywnosci}</p>
                    </div>
                  )}
                  {previewProduct.zalecanyWiek && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Zalecany wiek:</span>
                      <p className="text-gray-900">{previewProduct.zalecanyWiek}</p>
                    </div>
                  )}
                  {previewProduct.kraj && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Kraj:</span>
                      <p className="text-gray-900">{previewProduct.kraj}</p>
                    </div>
                  )}
                  {previewProduct.ean && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">EAN:</span>
                      <p className="text-gray-900">{previewProduct.ean}</p>
                    </div>
                  )}
                  {previewProduct.cenaSugerowana && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Cena sugerowana:</span>
                      <p className="text-gray-900">
                        {previewProduct.cenaSugerowana} {previewProduct.waluta || ''}
                      </p>
                    </div>
                  )}
                  {previewProduct.waluta && !previewProduct.cenaSugerowana && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Waluta:</span>
                      <p className="text-gray-900">{previewProduct.waluta}</p>
                    </div>
                  )}
                  {previewProduct.vat && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">VAT:</span>
                      <p className="text-gray-900">{previewProduct.vat}%</p>
                    </div>
                  )}
                  {previewProduct.bloz && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">BLOZ:</span>
                      <p className="text-gray-900">{previewProduct.bloz}</p>
                    </div>
                  )}
                  {previewProduct.gisLink && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">GIS Link:</span>
                      <p className="text-gray-900">
                        <a 
                          href={previewProduct.gisLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {previewProduct.gisLink}
                        </a>
                      </p>
                    </div>
                  )}
                  {previewProduct.gisNumer && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">GIS Numer:</span>
                      <p className="text-gray-900">{previewProduct.gisNumer}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data utworzenia</label>
                <p className="text-gray-600">{new Date(previewProduct.createdAt).toLocaleDateString('pl-PL')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ostatnia aktualizacja</label>
                <p className="text-gray-600">
                  {previewProduct.updatedAt !== previewProduct.createdAt 
                    ? new Date(previewProduct.updatedAt).toLocaleDateString('pl-PL')
                    : '-'
                  }
                </p>
              </div>
            </div>

            {/* B2B Information */}
            {(previewProduct.bulkPackageQuantity || previewProduct.unitGrossWeight || 
              previewProduct.unitPackageHeight || previewProduct.unitPackageWidth || 
              previewProduct.unitPackageDepth || previewProduct.bulkPackageHeight || 
              previewProduct.bulkPackageWidth || previewProduct.bulkPackageDepth || 
              previewProduct.unitsPerLayer || previewProduct.unitsPerPallet) && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Informacje B2B</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewProduct.bulkPackageQuantity && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Ilość w opakowaniu zbiorczym:</span>
                      <p className="text-gray-900">{previewProduct.bulkPackageQuantity} szt.</p>
                    </div>
                  )}
                  {previewProduct.unitGrossWeight && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Jednostkowa waga brutto:</span>
                      <p className="text-gray-900">{previewProduct.unitGrossWeight} kg</p>
                    </div>
                  )}
                  {previewProduct.unitPackageHeight && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Wysokość opakowania jednostkowego:</span>
                      <p className="text-gray-900">{previewProduct.unitPackageHeight} cm</p>
                    </div>
                  )}
                  {previewProduct.unitPackageWidth && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Szerokość opakowania jednostkowego:</span>
                      <p className="text-gray-900">{previewProduct.unitPackageWidth} cm</p>
                    </div>
                  )}
                  {previewProduct.unitPackageDepth && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Głębokość opakowania jednostkowego:</span>
                      <p className="text-gray-900">{previewProduct.unitPackageDepth} cm</p>
                    </div>
                  )}
                  {previewProduct.bulkPackageHeight && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Wysokość opakowania zbiorczego:</span>
                      <p className="text-gray-900">{previewProduct.bulkPackageHeight} cm</p>
                    </div>
                  )}
                  {previewProduct.bulkPackageWidth && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Szerokość opakowania zbiorczego:</span>
                      <p className="text-gray-900">{previewProduct.bulkPackageWidth} cm</p>
                    </div>
                  )}
                  {previewProduct.bulkPackageDepth && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Głębokość opakowania zbiorczego:</span>
                      <p className="text-gray-900">{previewProduct.bulkPackageDepth} cm</p>
                    </div>
                  )}
                  {previewProduct.unitsPerLayer && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Ilość sztuk na warstwie:</span>
                      <p className="text-gray-900">{previewProduct.unitsPerLayer} szt.</p>
                    </div>
                  )}
                  {previewProduct.unitsPerPallet && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Ilość sztuk na palecie:</span>
                      <p className="text-gray-900">{previewProduct.unitsPerPallet} szt.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowPreviewModal(false);
              setPreviewProduct(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );

  const SyncModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          Synchronizacja produktu: {selectedProductForSync?.name}
        </h3>
        
        <div className="mb-6">
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Status B2B</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">Zsynchronizowany</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Produkt jest aktualny na platformie B2B
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ostatnia synchronizacja: {new Date().toLocaleString('pl-PL')}
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <ShoppingCart className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Status E-commerce</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-xs text-orange-600 font-medium">Wymaga aktualizacji</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Produkt wymaga synchronizacji z PIM
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Ostatnia synchronizacja: {new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('pl-PL')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleSyncAction('b2b', selectedProductForSync?.name || '')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Synchronizuj z B2B</div>
                <div className="text-sm text-gray-500">Aktualizuj dane na platformie B2B</div>
              </div>
            </div>
            <div className="text-blue-600">→</div>
          </button>

          <button
            onClick={() => handleSyncAction('ecommerce', selectedProductForSync?.name || '')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Synchronizuj z E-commerce</div>
                <div className="text-sm text-gray-500">Aktualizuj dane w sklepie online</div>
              </div>
            </div>
            <div className="text-green-600">→</div>
          </button>

          <button
            onClick={() => handleSyncAction('disable', selectedProductForSync?.name || '')}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <Power className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Wyłącz na obu platformach</div>
                <div className="text-sm text-gray-500">Ukryj produkt w B2B i E-commerce</div>
              </div>
            </div>
            <div className="text-red-600">→</div>
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setShowSyncModal(false);
              setSelectedProductForSync(null);
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Anuluj
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Produkty</h1>
            <p className="text-gray-600">Zarządzaj listą produktów</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Dodaj produkt</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4">
          <div className="w-1/3 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj produktów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie kategorie</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive' | 'pending')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Wszystkie statusy</option>
              <option value="active">Aktywne</option>
              <option value="pending">Oczekujące</option>
              <option value="inactive">Nieaktywne</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista produktów ({filteredProducts.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produkt
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategoria
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
                    Brak produktów do wyświetlenia
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className={getRowBackgroundColor(product.status)}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-4 flex-shrink-0 relative group cursor-pointer">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200 transition-all duration-300 group-hover:w-auto group-hover:h-[500px] group-hover:fixed group-hover:top-1/2 group-hover:left-1/2 group-hover:transform group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:z-50 group-hover:shadow-2xl group-hover:rounded-xl"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">Brak</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          {product.subtitle1 && (
                            <p className="text-sm text-gray-600">{product.subtitle1}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusLabel(product.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => showPreview(product)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Podgląd"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openSyncModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Synchronizacja"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edytuj"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
      {showCreateModal && <CreateProductModal />}
      {showSyncModal && <SyncModal />}
      {showPreviewModal && <PreviewModal />}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edytuj produkt</h3>
            
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-gray-200">
              <TabButton
                id="marketing"
                label="Dział Marketingu"
                active={activeTab === 'marketing'}
                onClick={() => setActiveTab('marketing')}
              />
              <TabButton
                id="product"
                label="Dział Produktu"
                active={activeTab === 'product'}
                onClick={() => setActiveTab('product')}
              />
              <TabButton
                id="b2b"
                label="Dział B2B"
                active={activeTab === 'b2b'}
                onClick={() => setActiveTab('b2b')}
              />
              <TabButton
                id="files"
                label="Pliki"
                active={activeTab === 'files'}
                onClick={() => setActiveTab('files')}
              />
            </div>

            {/* Tab Content */}
            {activeTab === 'marketing' && <MarketingTab isEdit={true} />}
            {activeTab === 'product' && <ProductTab isEdit={true} />}
            {activeTab === 'b2b' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ilość w opakowaniu zbiorczym (szt.)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.bulkPackageQuantity || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      bulkPackageQuantity: parseInt(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jednostkowa waga brutto (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.unitGrossWeight || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitGrossWeight: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wysokość opakowania jednostkowego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.unitPackageHeight || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitPackageHeight: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Szerokość opakowania jednostkowego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.unitPackageWidth || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitPackageWidth: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Głębokość opakowania jednostkowego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.unitPackageDepth || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitPackageDepth: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wysokość opakowania zbiorczego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.bulkPackageHeight || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      bulkPackageHeight: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Szerokość opakowania zbiorczego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.bulkPackageWidth || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      bulkPackageWidth: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Głębokość opakowania zbiorczego (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingProduct.bulkPackageDepth || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      bulkPackageDepth: parseFloat(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ilość sztuk na warstwie
                  </label>
                  <input
                    type="number"
                    value={editingProduct.unitsPerLayer || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitsPerLayer: parseInt(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ilość sztuk na palecie
                  </label>
                  <input
                    type="number"
                    value={editingProduct.unitsPerPallet || ''}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      unitsPerPallet: parseInt(e.target.value) || 0 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            )}
            {activeTab === 'files' && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zdjęcia produktu
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const imageUrls = files.map(file => URL.createObjectURL(file));
                        setEditingProduct({
                          ...editingProduct,
                          images: [...(editingProduct.images || []), ...imageUrls]
                        });
                      }}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <label htmlFor="edit-image-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Kliknij aby dodać zdjęcia lub przeciągnij je tutaj</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF do 10MB</p>
                    </label>
                  </div>
                </div>

                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Dodane zdjęcia:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {editingProduct.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Zdjęcie ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded">
                              Miniaturka
                            </span>
                          )}
                          <button
                            onClick={() => {
                              const updatedImages = editingProduct.images?.filter((_, i) => i !== index) || [];
                              setEditingProduct({
                                ...editingProduct,
                                images: updatedImages
                              });
                            }}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('marketing');
                }}
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

export default Products;