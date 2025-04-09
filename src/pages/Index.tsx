
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Search, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { checkAuth } from '@/lib/auth';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = checkAuth();
  
  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={28} />
            <span className="text-xl font-bold">Price Path Finder</span>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/login" className="hover:text-accent">Login</Link>
            <Link to="/register">
              <Button>Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find the Best Deals on<br />All Your Shopping Needs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Locate products, compare prices, and find the fastest routes for all your shopping list items.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Shop Smarter, Not Harder
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Search size={48} className="text-primary mb-4" />
                <CardTitle className="text-xl text-center">Find Products Easily</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Quickly locate any product you need, see pricing and exact in-store location.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-col items-center">
                <MapPin size={48} className="text-primary mb-4" />
                <CardTitle className="text-xl text-center">Optimized Shopping Routes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Get directions to the closest stores with the best prices for your entire shopping list.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-col items-center">
                <ShoppingCart size={48} className="text-primary mb-4" />
                <CardTitle className="text-xl text-center">Save Time & Money</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Compare prices across stores and find the fastest way to get everything you need.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your List</h3>
              <p className="text-muted-foreground">Add all the items you need to purchase to your shopping list.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Prices</h3>
              <p className="text-muted-foreground">Our system finds the best prices for your items across local stores.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Directions</h3>
              <p className="text-muted-foreground">See the optimal shopping route to get everything you need quickly.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Shop With Ease</h3>
              <p className="text-muted-foreground">Find products in-store with exact aisle and shelf locations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I save at least 30 minutes on each shopping trip and always find the best deals.",
                author: "Sarah T.",
                role: "Busy Mom"
              },
              {
                quote: "The in-store navigation is amazing! I never wander around looking for products anymore.",
                author: "James K.",
                role: "College Student"
              },
              {
                quote: "I've saved over $200 this month by finding the best prices for my grocery list.",
                author: "Michael P.",
                role: "Budget Shopper"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of shoppers who are saving time and money every week.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 border-white hover:bg-white hover:text-primary">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart size={24} className="text-primary" />
                <span className="text-lg font-bold">Price Path Finder</span>
              </div>
              <p className="text-muted-foreground">
                Find the best deals and save time shopping with our smart shopping assistant.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-muted-foreground/20 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 Price Path Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
