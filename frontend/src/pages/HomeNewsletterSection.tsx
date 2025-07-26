// HomeNewsletterSection: displays newsletter signup for the home page
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSection: React.FC = () => (
  <section className="py-20 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Stay Inspired</h2>
        <p className="text-xl mb-8 opacity-90">
          Get exclusive access to new products, styling tips, and special offers
          delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            className="flex-1 px-6 py-4 border-0 rounded-lg bg-white/10 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <Button variant="secondary" size="lg" className="px-8">
            Subscribe
          </Button>
        </div>
        <p className="text-sm opacity-70 mt-4">
          Unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </div>
  </section>
);

export default NewsletterSection;
