
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useConfig } from '../contexts/ConfigContext'
import { Menu, X } from 'lucide-react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isInternal = href.startsWith('/')
  const className = 'text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium'
  return isInternal ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const config = useConfig()
  const appName = config?.basic?.app_name || 'API-FOOTBALL'
  return (
    <header className="bg-api-dark-secondary/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-api-green">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-3.5l-3.5 3.5-1.42-1.42L9.58 13H6v-2h3.58l-3.5-3.5 1.42-1.42L11 9.58V6h2v3.58l3.5-3.5 1.42 1.42L14.42 11H18v2h-3.58l3.5 3.5-1.42 1.42L13 14.42V18h-2v-.5z" fill="currentColor"/>
              </svg>
              <span className="text-white font-bold text-lg">{appName}</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              <NavLink href="#">Football API</NavLink>
              <NavLink href="#">Sports API</NavLink>
              <NavLink href="#">Widgets</NavLink>
              <NavLink href="#">Pricing</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="#">Contact us</NavLink>
            </nav>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Login</a>
            <a href="#" className="bg-api-green text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-500 transition-colors duration-200">
              Sign up
            </a>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-api-dark-secondary pb-8">
          <nav className="flex flex-col items-center space-y-4 px-4">
            <NavLink href="#">Football API</NavLink>
            <NavLink href="#">Sports API</NavLink>
            <NavLink href="#">Widgets</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#">Contact us</NavLink>
            <div className="flex flex-col items-center space-y-4 pt-4 w-full">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium w-full text-center py-2">Login</a>
              <a href="#" className="bg-api-green text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-500 transition-colors duration-200 w-full text-center">
                Sign up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
  
