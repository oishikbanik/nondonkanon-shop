import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, Users, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  // Mock statistics data (in a real app, this would come from an API)
  const stats = {
    totalSales: '₹125,000',
    totalOrders: 150,
    totalProducts: 45,
    totalCustomers: 89
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-gray-500">+10% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            <Package className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">+8 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-gray-500">+15 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-gray-50">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Products</div>
              <div>Total</div>
              <div>Status</div>
            </div>
            {/* Mock orders data */}
            {[
              {
                id: 'ORD001',
                customer: 'John Doe',
                products: 'Royal Silk Banarasi Saree',
                total: '₹4,599',
                status: 'Processing'
              },
              {
                id: 'ORD002',
                customer: 'Jane Smith',
                products: 'Gold Plated Kundan Earrings',
                total: '₹2,299',
                status: 'Delivered'
              },
              {
                id: 'ORD003',
                customer: 'Alice Johnson',
                products: 'Vitamin C Serum',
                total: '₹1,899',
                status: 'Shipped'
              }
            ].map((order) => (
              <div key={order.id} className="grid grid-cols-5 gap-4 p-4 border-t">
                <div className="text-sm">{order.id}</div>
                <div className="text-sm">{order.customer}</div>
                <div className="text-sm">{order.products}</div>
                <div className="text-sm">{order.total}</div>
                <div>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
