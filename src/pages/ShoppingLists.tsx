
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle, ListChecks, Trash, Edit, Map } from 'lucide-react';
import { mockShoppingLists, ShoppingList } from '@/lib/mockData';

const ShoppingLists: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>(mockShoppingLists);
  const [newListName, setNewListName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeList, setActiveList] = useState<ShoppingList | null>(null);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 1 });
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList: ShoppingList = {
        id: (lists.length + 1).toString(),
        userId: '1',
        name: newListName,
        items: [],
        createdAt: new Date().toISOString(),
      };

      setLists([...lists, newList]);
      setNewListName('');
      setDialogOpen(false);
    }
  };

  const handleAddItem = () => {
    if (activeList && newItem.name.trim()) {
      const updatedList = {
        ...activeList,
        items: [
          ...activeList.items,
          {
            id: (activeList.items.length + 1).toString(),
            productId: `-1`, // Mock ID for new items
            name: newItem.name,
            category: newItem.category,
            quantity: newItem.quantity,
            purchased: false,
          },
        ],
      };

      setLists(lists.map(list => list.id === activeList.id ? updatedList : list));
      setActiveList(updatedList);
      setNewItem({ name: '', category: '', quantity: 1 });
      setItemDialogOpen(false);
    }
  };

  const handleDeleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const toggleItemPurchased = (listId: string, itemId: string) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => {
            if (item.id === itemId) {
              return { ...item, purchased: !item.purchased };
            }
            return item;
          }),
        };
      }
      return list;
    }));
  };

  const openItemDialog = (list: ShoppingList) => {
    setActiveList(list);
    setItemDialogOpen(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Shopping Lists</h1>
        <Button onClick={() => setDialogOpen(true)} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>

      {lists.length === 0 ? (
        <div className="text-center py-16">
          <ListChecks className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No Shopping Lists Yet</h2>
          <p className="mt-2 text-muted-foreground">Create your first shopping list to start saving.</p>
          <Button onClick={() => setDialogOpen(true)} className="mt-4">Create Shopping List</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {lists.map(list => (
            <Card key={list.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{list.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openItemDialog(list)} 
                      className="h-8 w-8 p-0"
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteList(list.id)} 
                      className="h-8 w-8 p-0 text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {list.items.length === 0 ? (
                  <p className="text-center py-6 text-muted-foreground">No items yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Done</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Qty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {list.items.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <input 
                              type="checkbox" 
                              checked={item.purchased} 
                              onChange={() => toggleItemPurchased(list.id, item.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className={item.purchased ? "line-through text-muted-foreground" : ""}>
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                
                <div className="flex justify-between mt-4">
                  <span className="text-sm text-muted-foreground">
                    {new Date(list.createdAt).toLocaleDateString()}
                  </span>
                  
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Map className="h-4 w-4 mr-1" />
                    Find Route
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* New List Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Shopping List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="listName">List Name</Label>
            <Input 
              id="listName" 
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="e.g., Weekly Groceries"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateList}>Create List</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item to {activeList?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="itemName">Item Name</Label>
              <Input 
                id="itemName" 
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                placeholder="e.g., Milk"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="itemCategory">Category</Label>
              <Input 
                id="itemCategory" 
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                placeholder="e.g., Dairy"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="itemQuantity">Quantity</Label>
              <Input 
                id="itemQuantity" 
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingLists;
