
import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import { useConfig } from '../contexts/ConfigContext'
import type { LinkHTMLAttributes } from 'react'

const isInternalHref = (href: string) => href.startsWith('/')

const FooterLink = (
  { href, children, ...rest }: LinkHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode },
) => {
  if (isInternalHref(href)) {
    return (
      <Link to={href} className="text-gray-400 hover:text-white text-sm" {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className="text-gray-400 hover:text-white text-sm" {...rest}>
      {children}
    </a>
  )
}

const Footer: React.FC = () => {
  const config = useConfig()
  const footerConf = config?.extra?.footer
  const brandName = footerConf?.brand_name || config?.basic?.app_name || 'API-SPORTS'
  const socialFromConfig = (footerConf?.social as { icon: string; href: string }[] | undefined) || [
    { icon: 'Twitter', href: '#' },
    { icon: 'Facebook', href: '#' },
    { icon: 'Instagram', href: '#' },
    { icon: 'Linkedin', href: '#' },
  ]
  const iconMap: Record<string, React.ReactNode> = {
    Twitter: <Twitter size={20} />,
    Facebook: <Facebook size={20} />,
    Instagram: <Instagram size={20} />,
    Linkedin: <Linkedin size={20} />,
  }
  const socialLinks = socialFromConfig.map((s) => ({ icon: iconMap[s.icon] || <Twitter size={20} />, href: s.href }))

  const footerSections = (footerConf?.sections as { title: string; links: { name: string; href: string }[] }[] | undefined) || [
    {
      title: 'Products',
      links: [
        { name: 'Football API', href: '#' },
        { name: 'Basketball API', href: '#' },
        { name: 'Baseball API', href: '#' },
        { name: 'Hockey API', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About us', href: '#' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact us', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
  ]

  return (
    <footer className="bg-api-dark-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-api-green">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-3.5l-3.5 3.5-1.42-1.42L9.58 13H6v-2h3.58l-3.5-3.5 1.42-1.42L11 9.58V6h2v3.58l3.5-3.5 1.42 1.42L14.42 11H18v2h-3.58l3.5 3.5-1.42 1.42L13 14.42V18h-2v-.5z" fill="currentColor"/>
              </svg>
              <span className="text-white font-bold text-lg">{brandName}</span>
            </Link>
            <p className="text-gray-400 text-sm">{footerConf?.tagline || 'The best APIs for sports data.'}</p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white tracking-wider uppercase">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {brandName}. {footerConf?.copyright || 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  
