import { Route, Switch, Redirect, useLocation } from 'wouter';
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
import AdditionalInfo from './components/Products/AdditionalInfo';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();
  
  if (location === '/login') {
    return <LoginForm />;
  }
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/users" component={UserManagement} />
        <Route path="/materials" component={MaterialManagement} />
        <Route path="/materials/standardization" component={Standardization} />
        <Route path="/materials/active-components" component={ActiveComponents} />
        <Route path="/materials/categories" component={Categories} />
        <Route path="/materials/components" component={Components} />
        <Route path="/products/products" component={Products} />
        <Route path="/products/brand" component={ProductBrand} />
        <Route path="/products/form" component={ProductForm} />
        <Route path="/products/categories" component={ProductCategories} />
        <Route path="/products/usage" component={ProductUsage} />
        <Route path="/products/additional-info" component={AdditionalInfo} />
        <Route path="/logs" component={ActivityLogs} />
      </Switch>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;