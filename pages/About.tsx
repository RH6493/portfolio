import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Mail, Globe, Download, Github, Linkedin } from 'lucide-react';

const About: React.FC = () => {
  const { data } = useStore();
  const { profile, experiences } = data;

  const education = experiences.filter(exp => exp.type === 'Education');

  return (
    <div className="py-20 animate-fade-in bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: Fixed Info Card */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
              <div className="text-center">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="w-40 h-40 rounded-full object-cover mx-auto shadow-lg mb-6 border-4 border-background"
                />
                <h3 className="text-2xl font-bold text-text">{profile.name}</h3>
                <p className="text-primary font-medium mb-6">{profile.title}</p>
                
                {/* Social Links Mini */}
                <div className="flex justify-center space-x-4 mb-6">
                  {profile.socials.github && (
                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full text-text-muted hover:text-primary transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {profile.socials.linkedin && (
                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full text-text-muted hover:text-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>

                {/* Bio moved here */}
                <div className="text-text-muted text-sm leading-relaxed mb-8 px-2">
                   {profile.bio.split('\n').map((paragraph, idx) => (
                     <p key={idx} className="mb-2 last:mb-0">{paragraph}</p>
                   ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-text-muted">
                  <MapPin className="mr-3 text-primary flex-shrink-0" size={18} />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center text-text-muted">
                  <Mail className="mr-3 text-primary flex-shrink-0" size={18} />
                  <span className="text-sm break-all">{profile.email}</span>
                </div>
                <div className="flex items-center text-text-muted">
                  <Globe className="mr-3 text-primary flex-shrink-0" size={18} />
                  <span className="text-sm">Available for work</span>
                </div>
              </div>

              {profile.resumeUrl && (
                 <a 
                   href={profile.resumeUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="mt-8 w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                 >
                   <Download size={18} className="mr-2" /> Download CV
                 </a>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Education Only */}
          <div className="lg:w-2/3">
            {/* Education Section */}
            {education.length > 0 ? (
              <div>
                <h3 className="text-2xl font-bold text-text mb-6">Education</h3>
                <div className="space-y-6">
                  {education.map(edu => (
                    <div key={edu.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-surface rounded-xl border-l-4 border-primary">
                      <div className="sm:w-32 flex-shrink-0">
                         <span className="text-sm font-bold text-text-muted uppercase tracking-wider block mb-1">
                           {edu.endDate}
                         </span>
                         <span className="text-xs text-text-muted block">
                           {edu.startDate}
                         </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-text">{edu.role}</h4>
                        <p className="text-primary font-medium mb-2">{edu.organization}</p>
                        <ul className="list-disc list-inside text-text-muted text-sm space-y-1">
                          {edu.description.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
                <div className="hidden lg:block h-full flex items-center justify-center text-text-muted opacity-50">
                    <p>Experience and projects below...</p>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;