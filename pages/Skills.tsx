import React from 'react';
import { useStore } from '../context/StoreContext';
import { SkillCategory } from '../types';

const Skills: React.FC = () => {
  const { data } = useStore();
  
  // Group skills by category
  const categories = Object.values(SkillCategory);
  const groupedSkills = categories.reduce((acc, category) => {
    acc[category] = data.skills.filter(s => s.category === category);
    return acc;
  }, {} as Record<SkillCategory, typeof data.skills>);

  return (
    <div className="py-20 bg-surface transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Skills & Tools</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-text-muted max-w-2xl mx-auto">
             I am constantly learning and improving. Here are the technologies I work with most frequently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map(category => {
            const skills = groupedSkills[category];
            if (skills.length === 0) return null;

            return (
              <div key={category} className="bg-background p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-text mb-8 flex items-center">
                  <span className="w-2 h-8 bg-primary rounded-full mr-3"></span>
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills.map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-text">{skill.name}</span>
                        <span className="text-sm text-text-muted">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;