// HomeTestimonialsSection: displays testimonials for the home page
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const testimonialCards = [
  <Card key="testimonial-1" className="border-0 shadow-lg">
    <CardContent className="p-8">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        "The quality of these products is exceptional. Every piece feels premium
        and has transformed our living space. The customer service was
        outstanding too!"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
          <span className="font-semibold text-primary">S</span>
        </div>
        <div>
          <p className="font-semibold">Sarah Johnson</p>
          <p className="text-sm text-muted-foreground">Interior Designer</p>
        </div>
      </div>
    </CardContent>
  </Card>,
  <Card key="testimonial-2" className="border-0 shadow-lg">
    <CardContent className="p-8">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {`Fast shipping and beautiful packaging. The attention to detail is remarkable. I've already recommended ${siteConfig.name} to all my friends!`}
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
          <span className="font-semibold text-primary">M</span>
        </div>
        <div>
          <p className="font-semibold">Michael Chen</p>
          <p className="text-sm text-muted-foreground">Architect</p>
        </div>
      </div>
    </CardContent>
  </Card>,
  <Card key="testimonial-3" className="border-0 shadow-lg">
    <CardContent className="p-8">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        "The return process was seamless when I needed to exchange an item. This
        level of customer care is rare these days. Highly recommend!"
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
          <span className="font-semibold text-primary">E</span>
        </div>
        <div>
          <p className="font-semibold">Emily Rodriguez</p>
          <p className="text-sm text-muted-foreground">Home Stylist</p>
        </div>
      </div>
    </CardContent>
  </Card>,
];

const TestimonialsSection: React.FC = () => {
  const [testimonialPage, setTestimonialPage] = useState(1);
  const testimonialsPerPage = 3;
  const totalTestimonialPages = Math.ceil(
    testimonialCards.length / testimonialsPerPage
  );
  const paginatedTestimonials = testimonialCards.slice(
    (testimonialPage - 1) * testimonialsPerPage,
    testimonialPage * testimonialsPerPage
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            spaces with our products.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedTestimonials}
        </div>
        {totalTestimonialPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTestimonialPage(testimonialPage - 1)}
              disabled={testimonialPage === 1}
            >
              Previous
            </Button>
            <span className="px-2 py-1 text-sm">
              Page {testimonialPage} of {totalTestimonialPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTestimonialPage(testimonialPage + 1)}
              disabled={testimonialPage === totalTestimonialPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
