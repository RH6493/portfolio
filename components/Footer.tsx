import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Footer: React.FC = () => {
  const { data } = useStore();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface pt-12 pb-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text">{data.profile.name}</h3>
            <p className="text-text-muted text-sm max-w-xs">
              {data.profile.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className="text-sm text-text-muted hover:text-primary">Home</NavLink>
              <NavLink to="/projects" className="text-sm text-text-muted hover:text-primary">Projects</NavLink>
              <NavLink to="/contact" className="text-sm text-text-muted hover:text-primary">Contact</NavLink>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text">Connect</h4>
            <div className="flex space-x-4">
              {data.profile.socials.github && (
                <a href={data.profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary">
                  <Github size={20} />
                </a>
              )}
              {data.profile.socials.linkedin && (
                <a href={data.profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-sm text-primary hover:text-secondary transition-colors"
          >
            Back to top <ArrowUp size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;