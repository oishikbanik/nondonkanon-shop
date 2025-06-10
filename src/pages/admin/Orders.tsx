import { useState } from 'react';
import { Package, Search, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'New' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

const AdminOrders = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // Mock orders data (in real app, this would come from an API)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      address: '123 Main St, Mumbai, Maharashtra, 400001',
      items: [
        { name: 'Royal Silk Banarasi Saree', quantity: 1, price: 4599 }
      ],
      total: 4599,
      status: 'New',
      date: '2024-01-15'
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43211',
      address: '456 Park Ave, Delhi, 110001',
      items: [
        { name: 'Gold Plated Kundan Earrings', quantity: 1, price: 2299 }
      ],
      total: 2299,
      status: 'Processing',
      date: '2024-01-10'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));

    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been marked as ${newStatus}`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search orders..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="new">New Orders</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>₹{order.total}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order Details - {order.id}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-6">
                        {/* Customer Information */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                          <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span>{order.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span>{order.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span>{order.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>₹{item.price}</TableCell>
                                  <TableCell>₹{item.price * item.quantity}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Update Status */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Update Status</h3>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => updateOrderStatus(order.id, 'Processing')}
                              disabled={order.status === 'Processing'}
                            >
                              Mark as Processing
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'Shipped')}
                              disabled={order.status === 'Shipped'}
                            >
                              Mark as Shipped
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'Delivered')}
                              disabled={order.status === 'Delivered'}
                            >
                              Mark as Delivered
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline" 
                    size="sm"
                    className="text-rose-600 hover:text-rose-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Print Label
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
