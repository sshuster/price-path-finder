
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { mockProducts, Product, mockStores } from '@/lib/mockData';
import { Search as SearchIcon, MapPin, Plus, Tag, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const categories = [
    'all',
    ...Array.from(new Set(mockProducts.map(product => product.category))),
  ];

  const handleSearch = () => {
    let filtered = mockProducts;
    
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    setResults(filtered);
    setHasSearched(true);
  };

  const addToList = (product: Product) => {
    toast({
      title: "Added to shopping list",
      description: `${product.name} has been added to your list`,
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search for Products</h1>
      
      <Tabs defaultValue="products" className="mb-6">
        <TabsList>
          <TabsTrigger value="products">Find Products</TabsTrigger>
          <TabsTrigger value="compare">Compare Prices</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Search</CardTitle>
              <CardDescription>
                Search for products across all nearby stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search</Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search products..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-1/4">
                  <Label htmlFor="category" className="sr-only">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="button" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compare">
          <Card>
            <CardHeader>
              <CardTitle>Price Comparison</CardTitle>
              <CardDescription>
                Compare prices for the same product across different stores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6">
                Coming soon! Our price comparison tool will help you find the best deals.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {hasSearched && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          
          {results.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No products found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search terms or category
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(product => {
                const store = mockStores.find(s => s.id === product.storeId);
                
                return (
                  <Card key={product.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-xl font-bold text-primary">${product.price.toFixed(2)}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                          <span>Available at: {store?.name}</span>
                        </p>
                        <p className="text-sm flex items-start">
                          <Tag className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                          <span>Location: {product.aisle} - {product.shelf}</span>
                        </p>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline" onClick={() => addToList(product)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add to List
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
