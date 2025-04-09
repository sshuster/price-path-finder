
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from '@/lib/auth';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);
      
      if (response.isAuthenticated) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${username}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Invalid username or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center mb-4">
          <ShoppingCart className="h-12 w-12 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-primary">Price Path Finder</h1>
        </div>
        <p className="text-muted-foreground text-center max-w-md">
          Find the best prices and locations for all your shopping needs
        </p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-card rounded-lg shadow-md max-w-md">
        <h2 className="text-lg font-medium mb-2">Test Accounts</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-2 bg-muted rounded">
            <p><strong>User:</strong> muser</p>
            <p><strong>Password:</strong> muser</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <p><strong>Admin:</strong> mvc</p>
            <p><strong>Password:</strong> mvc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
