
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { logout, checkAuth } from '@/lib/auth';
import { User, ShoppingCart, Search, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = checkAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span>Price Path Finder</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="hover:text-accent transition-colors flex items-center">
            <Search className="h-4 w-4 mr-1" />
            <span>Search</span>
          </Link>
          <Link to="/shopping-lists" className="hover:text-accent transition-colors">
            Shopping Lists
          </Link>
          <Link to="/stores" className="hover:text-accent transition-colors">
            Find Stores
          </Link>
          <Link to="/pricing" className="hover:text-accent transition-colors">
            Pricing
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-1 hover:text-accent">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">{currentUser?.username}</span>
          </Link>
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:text-accent">
            <LogOut className="h-5 w-5 sm:mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
