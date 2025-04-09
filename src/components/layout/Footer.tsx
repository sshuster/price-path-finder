
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">© 2025 Price Path Finder. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm hover:text-accent transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm hover:text-accent transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
