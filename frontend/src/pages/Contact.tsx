import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`,
      color: 'text-blue-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: siteConfig.contact.phone,
      link: `tel:${siteConfig.contact.phone}`,
      color: 'text-green-600',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support',
      contact: 'Available 24/7',
      link: '#',
      color: 'text-purple-600',
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: siteConfig.contact.hours.monday },
    { day: 'Saturday', hours: siteConfig.contact.hours.saturday },
    { day: 'Sunday', hours: siteConfig.contact.hours.sunday },
  ];

  const faqs = [
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy on all products. Items must be in original condition with all packaging intact.',
    },
    {
      question: 'Do you offer free shipping?',
      answer:
        'Yes! We offer free shipping on all orders over $75. Standard shipping takes 2-3 business days.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "You'll receive a tracking number via email once your order ships. You can also track it in your account dashboard.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            We're Here to Help
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or need assistance? Our dedicated
            team is here to help you find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ minHeight: 200 }}
          >
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  <a
                    href={method.link}
                    className="text-primary font-semibold hover:underline transition-colors"
                    aria-label={`${method.title}: ${method.contact}`}
                  >
                    {method.contact}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            style={{ minHeight: 400 }}
          >
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-6">Send us a Message</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="h-12"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="h-12"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-12"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="h-12"
                    placeholder="What can we help you with?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-12">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-4xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop by our showroom to see our products in person and meet our
                team.
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Our Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city},{' '}
                      {siteConfig.contact.address.state}{' '}
                      {siteConfig.contact.address.zip}
                      <br />
                      {siteConfig.contact.address.country}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Business Hours
                    </h3>
                    <div className="space-y-2">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {schedule.day}
                          </span>
                          <span className="font-medium">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Support Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-lg mb-4">
                    Customer Support
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">24/7 Email Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">Live Chat Available</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm">
                        Phone Support During Hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our products and
              services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Explore our curated range of premium lifestyle products and
            transform your space today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-block"
              aria-label="Browse Products"
            >
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors" aria-label="Browse Products">
                Browse Products
              </button>
            </a>
            <a
              href="/about"
              className="inline-block"
              aria-label="Learn More About Us"
            >
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" aria-label="Learn More About Us">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
