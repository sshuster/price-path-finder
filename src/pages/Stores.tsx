
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { mockStores, Store } from '@/lib/mockData';
import { Search, MapPin, Navigation, ExternalLink } from 'lucide-react';

const Stores: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [filteredStores, setFilteredStores] = useState<Store[]>(mockStores);

  const handleSearch = () => {
    let results = mockStores;
    
    // Filter by type if not "all"
    if (filterType !== 'all') {
      results = results.filter(store => store.type === filterType);
    }
    
    // Filter by search term if present
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      results = results.filter(store => 
        store.name.toLowerCase().includes(term) || 
        store.address.toLowerCase().includes(term)
      );
    }
    
    setFilteredStores(results);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Find Nearby Stores</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Stores</CardTitle>
          <CardDescription>
            Find stores based on name, location, or type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or address"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/4">
              <Label htmlFor="type" className="sr-only">Store Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Store Type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="supermarket">Supermarket</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="grocery">Grocery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="button" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {filteredStores.length === 0 ? (
        <div className="text-center py-16">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No stores found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map(store => (
            <Card key={store.id} className="overflow-hidden">
              <div className="h-40 bg-muted">
                <img 
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{store.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{store.type}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                  <span>{store.address}</span>
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="link" size="sm" className="px-0">
                    Products Available
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                  <span className="text-sm text-muted-foreground">0.8 miles away</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;
