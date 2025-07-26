// HomeFeaturesSection — Displays feature cards for the home page
// Renders a grid of key selling points and trust signals for the e-commerce site.
import React from 'react';
import { Shield, Truck, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Quality Guaranteed',
      description:
        'Every product is carefully selected and tested to meet our uncompromising standards of excellence.',
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: 'Fast & Free Shipping',
      description: `Free shipping on orders over $${siteConfig.shipping.freeShippingThreshold}. Most orders delivered within 2-3 business days.`,
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Expert Support',
      description:
        'Our dedicated team is here to help with personalized recommendations and exceptional customer service.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: '30-Day Returns',
      description:
        'Shop with confidence knowing you can return any item within 30 days for a full refund.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{`Why Choose ${siteConfig.name}?`}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.whyChoose}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
