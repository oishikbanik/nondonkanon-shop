import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface Customer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  orderCount: number;
  totalSpent: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

export default function AdminCustomers() {
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2025-01-15",
      orderCount: 5,
      totalSpent: 549.99,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2025-02-20",
      orderCount: 3,
      totalSpent: 299.99,
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders] = useState<Order[]>([
    {
      id: "ord1",
      date: "2025-05-15",
      status: "Delivered",
      total: 199.99,
    },
    {
      id: "ord2",
      date: "2025-06-01",
      status: "Processing",
      total: 149.99,
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.joinDate}</TableCell>
              <TableCell>{customer.orderCount}</TableCell>
              <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Customer Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <Card className="p-4">
                        <h3 className="font-semibold mb-2">Customer Information</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p>{customer.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{customer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Join Date</p>
                            <p>{customer.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Spent</p>
                            <p>${customer.totalSpent.toFixed(2)}</p>
                          </div>
                        </div>
                      </Card>

                      <div>
                        <h3 className="font-semibold mb-2">Order History</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Order ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {customerOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
