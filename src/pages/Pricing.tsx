
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Pricing: React.FC = () => {
  const features = [
    "Store product locations",
    "Price comparisons",
    "Route optimization",
    "Shopping lists",
    "Save favorite products",
  ];

  const tiers = [
    {
      name: "Free",
      description: "Basic features for individual shoppers",
      price: "$0",
      period: "forever",
      features: features.slice(0, 3),
      isFeatured: false,
      buttonText: "Get Started",
    },
    {
      name: "Premium",
      description: "Enhanced features for frequent shoppers",
      price: "$4.99",
      period: "per month",
      features: [...features, "Priority support", "No advertisements"],
      isFeatured: true,
      buttonText: "Try Free for 14 Days",
      discount: "Save 20% with annual billing",
    },
    {
      name: "Family",
      description: "Share the benefits with up to 5 family members",
      price: "$9.99",
      period: "per month",
      features: [...features, "Up to 5 users", "Shared shopping lists", "Premium support"],
      isFeatured: false,
      buttonText: "Start Family Plan",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan to help you find the best deals and save time shopping
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={tier.isFeatured ? "border-primary shadow-lg relative" : ""}
          >
            {tier.isFeatured && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground"> {tier.period}</span>
                {tier.discount && (
                  <p className="text-sm text-primary mt-2">{tier.discount}</p>
                )}
              </div>
              
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={tier.isFeatured ? "w-full bg-primary" : "w-full"} 
                variant={tier.isFeatured ? "default" : "outline"}
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Enterprise Solutions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Need a custom solution for your business? Our enterprise plans offer advanced features and dedicated support.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
      
      <div className="mt-16 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <h3 className="font-medium mb-2">Can I cancel anytime?</h3>
            <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How does the free trial work?</h3>
            <p className="text-muted-foreground">You'll get full access to all Premium features for 14 days. No credit card required during the trial.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I switch plans later?</h3>
            <p className="text-muted-foreground">Absolutely! You can upgrade or downgrade your plan at any time. Changes will apply at your next billing date.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">We offer a 30-day money-back guarantee if you're not satisfied with your Premium or Family plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
