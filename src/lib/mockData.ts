
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  email: string;
  firstName: string;
  lastName: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  storeId: string;
  location: string;
  aisle: string;
  shelf: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'supermarket' | 'pharmacy' | 'grocery';
  image: string;
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: string;
}

export interface ShoppingListItem {
  id: string;
  productId: string;
  quantity: number;
  purchased: boolean;
  name: string;
  category: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'muser',
    password: 'muser',
    role: 'user',
    email: 'mockuser@example.com',
    firstName: 'Mock',
    lastName: 'User'
  },
  {
    id: '2',
    username: 'mvc',
    password: 'mvc',
    role: 'admin',
    email: 'mockadmin@example.com',
    firstName: 'Mock',
    lastName: 'Admin'
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'SuperFresh Market',
    address: '123 Main St, New York, NY 10001',
    latitude: 40.7128,
    longitude: -74.006,
    type: 'supermarket',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'MediCare Pharmacy',
    address: '456 Park Ave, New York, NY 10002',
    latitude: 40.7141,
    longitude: -74.0059,
    type: 'pharmacy',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'GreenGrocer',
    address: '789 Broadway, New York, NY 10003',
    latitude: 40.7135,
    longitude: -74.0046,
    type: 'grocery',
    image: '/placeholder.svg'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    category: 'Produce',
    price: 1.99,
    storeId: '1',
    location: 'Produce Section',
    aisle: 'A1',
    shelf: 'S2'
  },
  {
    id: '2',
    name: 'Whole Grain Bread',
    category: 'Bakery',
    price: 3.49,
    storeId: '1',
    location: 'Bakery Section',
    aisle: 'B3',
    shelf: 'S1'
  },
  {
    id: '3',
    name: 'Ibuprofen',
    category: 'Medicine',
    price: 8.99,
    storeId: '2',
    location: 'Pain Relief Section',
    aisle: 'C2',
    shelf: 'S4'
  },
  {
    id: '4',
    name: 'Vitamin C Tablets',
    category: 'Vitamins',
    price: 12.99,
    storeId: '2',
    location: 'Vitamin Section',
    aisle: 'D1',
    shelf: 'S3'
  },
  {
    id: '5',
    name: 'Organic Apples',
    category: 'Produce',
    price: 4.99,
    storeId: '3',
    location: 'Produce Section',
    aisle: 'A2',
    shelf: 'S1'
  }
];

export const mockShoppingLists: ShoppingList[] = [
  {
    id: '1',
    userId: '1',
    name: 'Weekly Groceries',
    items: [
      {
        id: '1',
        productId: '1',
        quantity: 2,
        purchased: false,
        name: 'Organic Bananas',
        category: 'Produce'
      },
      {
        id: '2',
        productId: '2',
        quantity: 1,
        purchased: false,
        name: 'Whole Grain Bread',
        category: 'Bakery'
      }
    ],
    createdAt: '2023-06-01T12:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    name: 'Medication',
    items: [
      {
        id: '3',
        productId: '3',
        quantity: 1,
        purchased: false,
        name: 'Ibuprofen',
        category: 'Medicine'
      },
      {
        id: '4',
        productId: '4',
        quantity: 1,
        purchased: false,
        name: 'Vitamin C Tablets',
        category: 'Vitamins'
      }
    ],
    createdAt: '2023-06-02T12:00:00Z'
  }
];

export const mockUserStatistics = {
  savingsOverTime: [
    { month: 'Jan', savings: 20 },
    { month: 'Feb', savings: 35 },
    { month: 'Mar', savings: 25 },
    { month: 'Apr', savings: 45 },
    { month: 'May', savings: 55 },
    { month: 'Jun', savings: 40 },
  ],
  topPurchasedCategories: [
    { name: 'Produce', value: 35 },
    { name: 'Dairy', value: 25 },
    { name: 'Bakery', value: 20 },
    { name: 'Medicine', value: 15 },
    { name: 'Meat', value: 5 }
  ],
  visitsPerStore: [
    { name: 'SuperFresh Market', visits: 12 },
    { name: 'MediCare Pharmacy', visits: 5 },
    { name: 'GreenGrocer', visits: 8 },
  ]
};

export const mockAdminStatistics = {
  userRegistrations: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 58 },
    { month: 'Mar', count: 65 },
    { month: 'Apr', count: 89 },
    { month: 'May', count: 102 },
    { month: 'Jun', count: 115 },
  ],
  storePerformance: [
    { name: 'SuperFresh Market', searches: 532 },
    { name: 'MediCare Pharmacy', searches: 321 },
    { name: 'GreenGrocer', searches: 287 },
  ],
  categorySales: [
    { name: 'Produce', value: 35 },
    { name: 'Dairy', value: 25 },
    { name: 'Bakery', value: 20 },
    { name: 'Medicine', value: 15 },
    { name: 'Meat', value: 5 }
  ]
};
