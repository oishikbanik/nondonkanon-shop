import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, ShoppingCart, LogOut, Grid, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSidebar, AdminSidebarHeader, AdminSidebarContent, AdminSidebarNav, AdminSidebarLink } from '@/components/ui/admin-sidebar';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would handle proper logout
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    window.location.href = '/login';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar>
        <AdminSidebarHeader>
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-600 to-rose-600" />
            <span className="text-lg font-semibold">Admin Panel</span>
          </Link>
        </AdminSidebarHeader>
        
        <AdminSidebarContent>
          <AdminSidebarNav>
            <Link to="/admin">
              <AdminSidebarLink active={isActive('/admin')}>
                <LayoutGrid className="w-4 h-4" />
                Dashboard
              </AdminSidebarLink>
            </Link>
            
            <Link to="/admin/products">
              <AdminSidebarLink active={isActive('/admin/products')}>
                <Package className="w-4 h-4" />
                Products
              </AdminSidebarLink>
            </Link>

            <Link to="/admin/categories">
              <AdminSidebarLink active={isActive('/admin/categories')}>
                <Grid className="w-4 h-4" />
                Categories
              </AdminSidebarLink>
            </Link>

            <Link to="/admin/orders">
              <AdminSidebarLink active={isActive('/admin/orders')}>
                <ShoppingCart className="w-4 h-4" />
                Orders
              </AdminSidebarLink>
            </Link>

            <Link to="/admin/customers">
              <AdminSidebarLink active={isActive('/admin/customers')}>
                <Users className="w-4 h-4" />
                Customers
              </AdminSidebarLink>
            </Link>
          </AdminSidebarNav>

          <div className="absolute bottom-4 left-4 right-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </AdminSidebarContent>
      </AdminSidebar>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
