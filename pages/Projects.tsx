

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ExternalLink, Github, X, Eye, CheckCircle } from 'lucide-react';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { data } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="py-20 bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-text-muted">A selection of my recent work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map(project => (
            <div 
              key={project.id} 
              className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col border border-gray-100 dark:border-gray-700"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center text-white font-bold border-2 border-white px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={20} className="mr-2" /> View Details
                  </div>
                </div>
                {project.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        Featured
                    </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-text-muted text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-surface text-text-muted border border-gray-200 dark:border-gray-700">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface text-text-muted border border-gray-200 dark:border-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-20 backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            
            <div className="relative h-64 md:h-96 w-full">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8">
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{selectedProject.title}</h2>
                     <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-full bg-white/20 text-white text-sm backdrop-blur-md border border-white/30">
                                {tech}
                            </span>
                        ))}
                     </div>
                  </div>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-text mb-4">Project Overview</h3>
                        <p className="text-text-muted leading-relaxed whitespace-pre-line text-lg">
                            {selectedProject.fullDescription || selectedProject.description}
                        </p>
                      </div>

                      {/* SKILLS GAINED SECTION */}
                      {selectedProject.skillsGained && selectedProject.skillsGained.length > 0 && (
                        <div>
                           <h3 className="text-xl font-bold text-text mb-4">Skills Gained</h3>
                           <div className="flex flex-wrap gap-3">
                              {selectedProject.skillsGained.map((skill, index) => (
                                <div key={index} className="flex items-center px-4 py-2 bg-primary/10 rounded-lg border border-primary/20 text-primary">
                                   <CheckCircle size={16} className="mr-2" />
                                   <span className="font-medium text-sm">{skill}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                  </div>
                  
                  <div className="lg:col-span-1 space-y-6">
                     <div className="bg-surface p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-text mb-4">Links</h3>
                        <div className="space-y-3">
                            {selectedProject.liveUrl ? (
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors w-full font-medium">
                                <ExternalLink size={18} className="mr-2" /> Live Demo
                            </a>
                            ) : (
                                <button disabled className="flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 rounded-lg w-full cursor-not-allowed">
                                    <ExternalLink size={18} className="mr-2" /> Live Demo N/A
                                </button>
                            )}
                            
                            {selectedProject.codeUrl ? (
                            <a href={selectedProject.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full font-medium">
                                <Github size={18} className="mr-2" /> Source Code
                            </a>
                             ) : (
                                <button disabled className="flex items-center justify-center px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-400 rounded-lg w-full cursor-not-allowed">
                                    <Github size={18} className="mr-2" /> Code Private
                                </button>
                            )}
                        </div>
                     </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;