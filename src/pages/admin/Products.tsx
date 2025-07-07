import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/api';

const AdminProducts = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', price: '', category: '', stock: '', description: '', image: ''
  });

  const categories = ['sarees', 'skincare', 'jewelry'];

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      // In a real app, this would upload to a storage service
      toast({
        title: "Images Uploaded",
        description: `${files.length} image(s) uploaded successfully.`,
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createProduct({
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        description: form.description,
        imageUrl: form.image
      });
      setProducts([res.data, ...products]);
      toast({ title: 'Product added' });
      setForm({ name: '', price: '', category: '', stock: '', description: '', image: '' });
    } catch (err: any) {
      toast({ title: 'Add failed', description: err?.response?.data?.message || 'Error', variant: 'destructive' });
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id || selectedProduct.id);
        setProducts(products.filter(p => (p._id || p.id) !== (selectedProduct._id || selectedProduct.id)));
        toast({ title: 'Product deleted' });
        setIsDeleteDialogOpen(false);
      } catch (err: any) {
        toast({ title: 'Delete failed', description: err?.response?.data?.message || 'Error', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddProduct}>
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter product name" 
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="Enter price" 
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    placeholder="Enter stock quantity" 
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter product description" 
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="images">Product Images</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer rounded-md font-medium text-rose-600 hover:text-rose-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                Add Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="capitalize">{product.category}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteProduct}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;
