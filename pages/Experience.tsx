import React from 'react';
import { useStore } from '../context/StoreContext';
import { Calendar, MapPin, Briefcase, Building } from 'lucide-react';

const Experience: React.FC = () => {
  const { data } = useStore();
  const work = data.experiences.filter(exp => exp.type === 'Work');
  const hasMultiple = work.length > 1;

  return (
    <div className="py-20 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-text-muted">My professional career journey.</p>
        </div>

        <div className="relative">
          {/* Vertical Line - Only shown if more than 1 experience */}
          {hasMultiple && (
            <div className="absolute left-6 md:left-8 top-10 bottom-10 w-0.5 bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>
          )}

          <div className="space-y-10">
            {work.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start group">
                
                {/* Timeline Dot with Icon - Always visible */}
                <div className="hidden sm:flex absolute left-0 w-12 h-12 md:w-16 md:h-16 bg-surface border-2 border-primary rounded-full items-center justify-center z-10 text-primary shadow-lg transition-transform group-hover:scale-110">
                   <Briefcase size={hasMultiple ? 20 : 24} />
                </div>
                
                {/* Wide Card Content */}
                <div className="w-full sm:ml-20 md:ml-24">
                  <div className="bg-surface p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    
                    {/* Decorative Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-all group-hover:scale-150"></div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10">
                      <div>
                          <h3 className="text-2xl font-bold text-text group-hover:text-primary transition-colors">{exp.role}</h3>
                          <div className="flex items-center text-lg font-medium text-text-muted mt-2">
                              <Building size={18} className="mr-2 text-primary" />
                              {exp.organization}
                          </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit lg:ml-auto">
                            <Calendar size={14} className="mr-1.5" />
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                          <div className="flex items-center text-sm text-text-muted lg:justify-end">
                            <MapPin size={14} className="mr-1.5" />
                            {exp.location}
                          </div>
                        </div>
                        {exp.current && (
                          <span className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-green-500/20">
                            Active Role
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Description List - Rendered in a wider landscape flow */}
                    <div className="space-y-3 relative z-10">
                      {exp.description.map((point, idx) => {
                        const isHeader = point.startsWith('### ');
                        const content = isHeader ? point.replace('### ', '') : point;

                        if (isHeader) {
                          return (
                            <h4 key={idx} className="text-base font-bold text-text mt-8 first:mt-0 mb-3 flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {content}
                            </h4>
                          );
                        }

                        return (
                          <div key={idx} className="flex items-start text-text-muted text-base leading-relaxed ml-3 group/item">
                            <span className="mr-3 mt-2.5 w-1.5 h-1.5 border border-primary rounded-full flex-shrink-0 group-hover/item:bg-primary transition-colors"></span>
                            <span>{content}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {work.length === 0 && (
          <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-gray-700">
             <Briefcase size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
             <p className="text-text-muted">No professional experience listed yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;