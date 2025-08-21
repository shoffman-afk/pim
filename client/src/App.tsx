import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import UserManagement from './components/Users/UserManagement';
import MaterialManagement from './components/Materials/MaterialManagement';
import ActivityLogs from './components/Logs/ActivityLogs';
import Standardization from './components/Materials/Standardization';
import ActiveComponents from './components/Materials/ActiveComponents';
import Categories from './components/Materials/Categories';
import Components from './components/Materials/Components';
import ProductBrand from './components/Products/Brand';
import ProductForm from './components/Products/Form';
import ProductCategories from './components/Products/Categories';
import ProductUsage from './components/Products/Usage';
import Products from './components/Products/Products';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="materials" element={<MaterialManagement />} />
        <Route path="materials/standardization" element={<Standardization />} />
        <Route path="materials/active-components" element={<ActiveComponents />} />
        <Route path="materials/categories" element={<Categories />} />
        <Route path="materials/components" element={<Components />} />
        <Route path="products/products" element={<Products />} />
        <Route path="products/brand" element={<ProductBrand />} />
        <Route path="products/form" element={<ProductForm />} />
        <Route path="products/categories" element={<ProductCategories />} />
        <Route path="products/usage" element={<ProductUsage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;