import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';

const Home: React.FC = () => {
  const { data } = useStore();
  const { profile, theme } = data;

  const isSplit = theme.heroLayout === 'split';

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden min-h-screen flex items-center bg-surface transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className={`flex flex-col ${isSplit ? 'lg:flex-row items-center' : 'items-center text-center'} gap-12 lg:gap-20`}>
            
            <div className={`flex-1 space-y-8 ${isSplit ? '' : 'max-w-3xl mx-auto'}`}>
              <div className="animate-slide-up">
                <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
                  {profile.title}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text leading-tight mb-6">
                  {profile.name}
                  <span className="block text-primary text-2xl sm:text-4xl lg:text-5xl mt-2 font-normal">
                    {profile.tagline}
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-text-muted leading-relaxed max-w-2xl animate-slide-up animation-delay-100">
                {/* Show only first sentence of bio in hero to avoid duplication */}
                {profile.bio.split('.')[0]}.
              </p>

              <div className={`flex flex-wrap gap-4 ${isSplit ? '' : 'justify-center'} animate-slide-up animation-delay-200`}>
                <button 
                  onClick={scrollToProjects}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center transform hover:-translate-y-1"
                >
                  View My Work <ArrowRight size={18} className="ml-2" />
                </button>
                <button 
                  onClick={scrollToContact}
                  className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-text rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {isSplit && (
              <div className="flex-1 w-full max-w-lg lg:max-w-xl animate-fade-in animation-delay-300">
                <div className="relative">
                  {/* Decorative Blobs */}
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                  
                  {/* Hero Image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] border-8 border-white dark:border-gray-800">
                     <img 
                      src={profile.heroImageUrl || profile.avatarUrl} 
                      alt={profile.name} 
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToAbout}>
            <ArrowDown className="text-text-muted hover:text-primary transition-colors" size={32} />
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="border-t border-gray-100 dark:border-gray-800">
        <About />
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="skills" className="border-t border-gray-100 dark:border-gray-800">
        <Skills />
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section id="experience" className="border-t border-gray-100 dark:border-gray-800">
        <Experience />
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="border-t border-gray-100 dark:border-gray-800">
        <Projects />
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="border-t border-gray-100 dark:border-gray-800">
        <Contact />
      </section>
    </div>
  );
};

export default Home;