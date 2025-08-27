import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  FileText,
  ChevronDown,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const [materialsExpanded, setMaterialsExpanded] = React.useState(true);
  const [productsExpanded, setProductsExpanded] = React.useState(true);

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      permission: 'dashboard_view'
    },
    {
      path: '/products',
      label: 'Baza Produktów',
      icon: Package,
      permission: 'products_view'
    },
    {
      path: '/materials',
      label: 'Baza Surowców',
      icon: Package,
      permission: 'products_view'
    },
    {
      path: '/users',
      label: 'Użytkownicy',
      icon: Users,
      permission: 'users_manage'
    },
    {
      path: '/activity-logs',
      label: 'Logi Aktywności',
      icon: Activity,
      permission: 'admin_full'
    }
  ];

  const productsSubItems = [
    { path: '/products/products', label: 'Produkty' },
    { path: '/products/usage', label: 'Zastosowanie' },
    { path: '/products/categories', label: 'Kategorie' },
    { path: '/products/form', label: 'Postać' },
    { path: '/products/brand', label: 'Marka' },
    { path: '/products/additional-info', label: 'Dodatkowe informacje' }
  ];

  const materialsSubItems = [
    { path: '/materials/components', label: 'Składniki' },
    { path: '/materials/categories', label: 'Kategorie' },
    { path: '/materials/active-components', label: 'Nazwa Składnika' },
    { path: '/materials/standardization', label: 'Standaryzacja' }
  ];

  const toggleProducts = () => {
    setProductsExpanded(!productsExpanded);
  };

  const toggleMaterials = () => {
    setMaterialsExpanded(!materialsExpanded);
  };

  const [location] = useLocation();
  
  const isProductsActive = () => {
    return location.startsWith('/products');
  };

  const isMaterialsActive = () => {
    return location.startsWith('/materials');
  };

  const hasPermission = (permission: string) => {
    return user?.permissions.some(p => p.name === permission) || false;
  };

  const filteredMenuItems = menuItems.filter(item => hasPermission(item.permission));

  return (
    <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <img 
          src="/logo-aura-herbals-white.png" 
          alt="Aura Herbals Logo" 
          className="h-16 w-auto"
        />
      </div>
      
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-4">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            
            if (item.path === '/products') {
              return (
                <div key={item.path}>
                  <button
                    onClick={toggleProducts}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isProductsActive()
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        productsExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {productsExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      {productsSubItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            location === subItem.path
                              ? 'bg-blue-500 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          • {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            if (item.path === '/materials') {
              return (
                <div key={item.path}>
                  <button
                    onClick={toggleMaterials}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isMaterialsActive()
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        materialsExpanded ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {materialsExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      {materialsSubItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                            location === subItem.path
                              ? 'bg-blue-500 text-white'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          • {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location === item.path
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center mb-4 px-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium">
              {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.position}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span>Wyloguj</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;