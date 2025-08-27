export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  password: string;
  permissions: Permission[];
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
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
  additionalInfo?: string[];
  // Product department fields
  postac?: string;
  marka?: string;
  iloscDziennychPorcji?: string;
  iloscNetto?: string;
  wagaNetto?: number;
  kategoriaZywnosci?: string;
  zalecanyWiek?: string;
  kraj?: string;
  ean?: string;
  cenaSugerowana?: number;
  waluta?: string;
  vat?: number;
  bloz?: string;
  gisLink?: string;
  gisNumer?: string;
  opakowanie?: string;
  receptura?: string;
  sposobUzycia?: string;
  przechowywanie?: string;
  producent?: string;
  // General characteristics (3-state: undefined, false, true)
  naturalny100?: boolean;
  markowySurowiec?: boolean;
  weganski?: boolean;
  wegetarianski?: boolean;
  bezCukru?: boolean;
  bezSubstancjiSlodzacych?: boolean;
  bezLaktozy?: boolean;
  bezglutenowy?: boolean;
  bezalkoholowy?: boolean;
  bezzapachowy?: boolean;
  wolneOdSoi?: boolean;
  wolneOdAlergenow?: boolean;
  nonGmo?: boolean;
  wolneOdSorbinianuPotasu?: boolean;
  cleanLabel?: boolean;
  // Target demographics (3-state: undefined, false, true)
  dlaMezczyzn?: boolean;
  dlaKobiet?: boolean;
  dlaKobietWCiazy?: boolean;
  dlaSeniorow?: boolean;
  dlaDzieci?: boolean;
  dlaRodziny?: boolean;
  dlaDiabetykow?: boolean;
  dlaSportowcow?: boolean;
  dlaWegan?: boolean;
  dlaWegetarian?: boolean;
  // Research studies
  badania?: Array<{
    id: string;
    tytul: string;
    data: string;
    rodzaj: 'Składniki aktywne' | 'Mikrobiologia' | 'Metale cięzkie' | 'Osmolarność';
    plik?: string;
  }>;
  // Product description
  pelnatrescFrontu?: string;
  szczegolneWlasciwosciTytul?: string;
  trescOswiadczenia?: string;
  zalecanadzienna?: string;
  // Ingredients
  skladniki?: Array<{
    id: string;
    title: string;
    activeName: string;
    ingredientsList: string;
  }>;
  // Tables
  tables?: Array<{
    id: string;
    tableType: '3-column' | '4-column';
    firstColumnHeader: 'Składniki aktywne' | 'Wartości odżywcze';
    secondColumnHeader: string;
    thirdColumnHeader: string;
    fourthColumnHeader?: string;
    rows: Array<{
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4?: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}
export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}