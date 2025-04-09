
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { checkAuth } from '@/lib/auth';
import { 
  Home, 
  Search, 
  ShoppingCart, 
  ListChecks, 
  Map, 
  Tag, 
  UserCircle, 
  Settings,
  Users
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = checkAuth();
  const isAdmin = currentUser?.role === 'admin';

  const links = [
    { path: '/dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { path: '/search', name: 'Search Products', icon: <Search className="w-5 h-5" /> },
    { path: '/shopping-lists', name: 'My Lists', icon: <ListChecks className="w-5 h-5" /> },
    { path: '/stores', name: 'Find Stores', icon: <Map className="w-5 h-5" /> },
    { path: '/pricing', name: 'Pricing', icon: <Tag className="w-5 h-5" /> },
    { path: '/profile', name: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
    { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const adminLinks = [
    { path: '/admin/users', name: 'Manage Users', icon: <Users className="w-5 h-5" /> },
    { path: '/admin/products', name: 'Manage Products', icon: <ShoppingCart className="w-5 h-5" /> },
  ];

  const navLinks = isAdmin ? [...links, ...adminLinks] : links;

  return (
    <div className="hidden md:block bg-sidebar text-sidebar-foreground w-64 p-4 shadow-md">
      <div className="flex items-center justify-center mb-8 mt-2">
        <ShoppingCart className="h-8 w-8 mr-2 text-accent" />
        <span className="text-xl font-bold">Price Path Finder</span>
      </div>
      
      <nav>
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                className={cn(
                  "flex items-center p-2 rounded-md transition-colors hover:bg-sidebar-accent",
                  location.pathname === link.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
