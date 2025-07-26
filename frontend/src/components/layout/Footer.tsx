import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import {
  getFooterNavigation,
  getCompanyInfo,
  getContactInfo,
  getCopyright,
} from '@/lib/site-utils';
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  Clock,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Footer: React.FC = () => {
  const companyInfo = getCompanyInfo();
  const contactInfo = getContactInfo();
  const footerNav = getFooterNavigation();
  const isCompanyInfoLoading = !companyInfo || !companyInfo.social;
  const isContactInfoLoading = !contactInfo;

  return (
    <footer
      className="bg-background border-t min-h-56 overflow-hidden flex flex-col justify-center"
      style={{ minHeight: '14rem', minBlockSize: '14rem', blockSize: 'auto' }}
      aria-label="Site Footer"
    >
      {/* Trust Indicators */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Trust indicators are now config-driven for full boilerplate flexibility */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {siteConfig.trust?.secureShoppingTitle || 'Secure Shopping'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.trust?.secureShoppingDesc || 'SSL Protected'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {siteConfig.trust?.fastDeliveryTitle || 'Fast Delivery'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.trust?.fastDeliveryDesc || '2-3 Business Days'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {siteConfig.trust?.returnsTitle || '30-Day Returns'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.trust?.returnsDesc || 'No Questions Asked'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {siteConfig.trust?.qualityTitle || 'Premium Quality'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.trust?.qualityDesc || 'Curated Selection'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              {isContactInfoLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <MapPin
                      className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                      width={20}
                      height={20}
                    />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p>{contactInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail
                      className="w-5 h-5 text-primary flex-shrink-0"
                      width={20}
                      height={20}
                    />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-primary transition-colors"
                        aria-label={`Email: ${contactInfo.email}`}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone
                      className="w-5 h-5 text-primary flex-shrink-0"
                      width={20}
                      height={20}
                    />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="hover:text-primary transition-colors"
                        aria-label={`Phone: ${contactInfo.phone}`}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-3" aria-label="Footer quick links">
              {footerNav.slice(0, 5).map(item =>
                'disabled' in item && item.disabled ? (
                  <span
                    key={item.href}
                    className="block text-sm text-muted-foreground/70 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    aria-label={item.name ? item.name : item.href}
                  >
                    {item.name || <span className="sr-only">{item.href}</span>}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <nav className="space-y-3" aria-label="Footer support links">
              {footerNav.slice(5, 9).map(item =>
                'disabled' in item && item.disabled ? (
                  <span
                    key={item.href}
                    className="block text-sm text-muted-foreground/70 cursor-not-allowed"
                    title="Coming soon"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    aria-label={item.name || item.href}
                  >
                    {item.name || <span className="sr-only">{item.href}</span>}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 justify-end">
              <div className="relative">
                {siteConfig.logoImage ? (
                  <img
                    src={siteConfig.logoImage}
                    alt={siteConfig.name + ' logo'}
                    className="h-10 w-10 rounded-xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg text-logo">
                    {siteConfig.logoText}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-accent rounded-full border-2 border-background"></div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Premium Lifestyle
                </span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {siteConfig.description} We're committed to providing exceptional
              products and service that enhance your everyday living.
            </p>
            <div className="flex space-x-4 justify-center min-h-[48px]">
              {isCompanyInfoLoading ? (
                <div className="flex space-x-2 animate-pulse min-h-[40px]">
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="w-10 h-10 bg-muted rounded-full" />
                  <div className="w-10 h-10 bg-muted rounded-full" />
                </div>
              ) : (
                <>
                  {companyInfo.social.twitter && (
                    <a
                      href={companyInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" width={20} height={20} />
                    </a>
                  )}
                  {companyInfo.social.facebook && (
                    <a
                      href={companyInfo.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" width={20} height={20} />
                    </a>
                  )}
                  {companyInfo.social.instagram && (
                    <a
                      href={companyInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" width={20} height={20} />
                    </a>
                  )}
                  {companyInfo.social.linkedin && (
                    <a
                      href={companyInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" width={20} height={20} />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">{getCopyright()}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span
                className="text-muted-foreground/70 cursor-not-allowed"
                title="Coming soon"
              >
                Privacy Policy
              </span>
              <span
                className="text-muted-foreground/70 cursor-not-allowed"
                title="Coming soon"
              >
                Terms of Service
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                SSL Secure
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                Trusted Store
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Developed by</span>
              <a
                href="https://natede.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline transition-colors"
                aria-label="Visit Nate De Developer's portfolio"
              >
                Nate De Developer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
