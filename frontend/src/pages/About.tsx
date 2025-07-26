// About Page — Company Values, Team, Stats, and Mission
//
// This page displays:
//   - Company values for display
//   - Team members (expandable for more people)
//   - Key company stats for social proof
//   - Main about page layout and mission
//
// Imports site-wide config for company info and branding.
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Shield, Target, Zap, CheckCircle, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description:
        "I'm passionate about curating only the finest products that meet my uncompromising standards.",
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description:
        'Building lasting relationships through transparent practices and reliable service.',
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description:
        'Every decision I make is centered around enhancing your shopping experience.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description:
        'Continuously evolving to bring you the latest trends and cutting-edge products.',
    },
  ];

  const team = [
    {
      name: 'Nathanael Omebele',
      role: 'Founder & Developer',
      bio: "I'm a solo developer and designer dedicated to building beautiful, scalable web apps.",
      image: 'N',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Premium Products' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Customer Support' },
  ];

  return (
    <>
      <Helmet>
        <title>About | {siteConfig.name}</title>
        <meta name="description" content={siteConfig.company.mission} />
        <meta name="author" content={siteConfig.company.name} />
        <meta property="og:title" content={`About | ${siteConfig.name}`} />
        <meta property="og:description" content={siteConfig.company.mission} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:url" content={siteConfig.url + '/about'} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About | ${siteConfig.name}`} />
        <meta name="twitter:description" content={siteConfig.company.mission} />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:site" content={siteConfig.seo.twitter.site} />
        <meta name="twitter:creator" content={siteConfig.seo.twitter.handle} />
      </Helmet>
      <div className="space-y-24">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium"
            >
              <Award className="h-4 w-4 mr-2" />
              Established {siteConfig.company.founded}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              {siteConfig.company.mission}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              style={{ minHeight: 400 }}
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {siteConfig.company.mission}
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {siteConfig.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Premium Quality
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sustainable
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Handcrafted
                  </Badge>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-muted/20 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award className="h-16 w-16 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Premium Lifestyle Products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and every product we
                curate.
              </p>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              style={{ minHeight: 300 }}
            >
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{ minHeight: 200 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate individual behind {siteConfig.name} who is
                dedicated to bringing you the best.
              </p>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{ minHeight: 300 }}
            >
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-primary">
                        {member.image}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have elevated their
              living spaces with our curated products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-block"
                aria-label="Explore Products"
              >
                <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors" aria-label="Explore Products">
                  Explore Products
                </button>
              </a>
              <a
                href="/contact"
                className="inline-block"
                aria-label="Get in Touch"
              >
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" aria-label="Get in Touch">
                  Get in Touch
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
