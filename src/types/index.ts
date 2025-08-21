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