
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkAuth } from '@/lib/auth';
import { mockUserStatistics, mockAdminStatistics } from '@/lib/mockData';

const Dashboard = () => {
  const { currentUser } = checkAuth();
  const isAdmin = currentUser?.role === 'admin';
  
  const stats = isAdmin ? mockAdminStatistics : mockUserStatistics;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* First chart */}
        <Card>
          <CardHeader>
            <CardTitle>{isAdmin ? 'User Registrations' : 'Savings Over Time'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={isAdmin ? stats.userRegistrations : stats.savingsOverTime}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={isAdmin ? "count" : "savings"} 
                    name={isAdmin ? "New Users" : "Savings ($)"} 
                    fill="#0088FE" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Second chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isAdmin ? 'Category Sales' : 'Top Purchased Categories'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={isAdmin ? stats.categorySales : stats.topPurchasedCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {(isAdmin ? stats.categorySales : stats.topPurchasedCategories).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Third chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {isAdmin ? 'Store Performance' : 'Visits Per Store'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={isAdmin ? stats.storePerformance : stats.visitsPerStore}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey={isAdmin ? "searches" : "visits"} 
                    name={isAdmin ? "Product Searches" : "Store Visits"} 
                    fill="#00C49F" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
