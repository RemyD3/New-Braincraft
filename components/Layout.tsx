import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Brain, User as UserIcon, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Button from './Button';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <Brain size={24} />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Braincraft</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-slate-600 hover:text-brand-700 font-medium">Home</Link>
              <Link to="/tests" className="text-slate-600 hover:text-brand-700 font-medium">Tests</Link>
              <Link to="/tests" className="text-slate-600 hover:text-brand-700 font-medium">How it works</Link>
              
              {user ? (
                 <div className="flex items-center gap-4 ml-4">
                    <Link to="/dashboard" className="text-slate-900 font-medium hover:text-brand-600 flex items-center gap-2">
                      <UserIcon size={18} />
                      {user.name}
                    </Link>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="!px-3">
                        <LogOut size={16} />
                    </Button>
                 </div>
              ) : (
                <div className="flex items-center gap-4 ml-4">
                   <Link to="/login" className="text-slate-900 font-medium hover:text-brand-600">Log in</Link>
                   <Link to="/tests">
                     <Button size="sm">Get Started</Button>
                   </Link>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" className="block py-3 text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/tests" className="block py-3 text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Tests</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="block py-3 text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-red-600 font-medium">Log out</button>
                </>
              ) : (
                <Link to="/login" className="block py-3 text-brand-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4 text-white">
                <Brain size={24} />
                <span className="text-xl font-bold">Braincraft</span>
             </div>
             <p className="text-sm leading-relaxed">
               Democratizing access to validated psychological tools. Understand yourself with science, not horoscopes.
             </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tests" className="hover:text-white transition">All Tests</Link></li>
              <li><Link to="#" className="hover:text-white transition">Methodology</Link></li>
              <li><Link to="#" className="hover:text-white transition">Pricing</Link></li>
              <li><Link to="#" className="hover:text-white transition">For Clinics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
             <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Crisis Resources</Link></li>
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <p className="text-xs text-slate-500">
              Disclaimer: The tests provided on Braincraft are for educational and screening purposes only. They do not constitute a clinical diagnosis. If you are in crisis, please contact local emergency services immediately.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          &copy; {new Date().getFullYear()} Braincraft. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;