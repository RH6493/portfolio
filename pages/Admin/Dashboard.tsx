
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { LogOut, User, Settings, Briefcase, Code, Layers, Save, Trash2, Plus, Edit2, X, Download, Upload, AlertTriangle, RefreshCw } from 'lucide-react';
import { SkillCategory, Skill, Project, Experience } from '../../types';
import ImageUpload from '../../components/ImageUpload';

const Dashboard: React.FC = () => {
  const { data, updateData, updateTheme, resetData, exportData, importData, storageError } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const importInputRef = useRef<HTMLInputElement>(null);

  // Local state forms
  const [profileForm, setProfileForm] = useState(data.profile);
  
  // Sync profile form when data changes (e.g. after load or reset)
  useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);
  
  // Experience Form State
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [expForm, setExpForm] = useState<Experience | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/admin/login');
  };

  const handleProfileSave = () => {
    updateData({ profile: profileForm });
    // We use a timeout to allow the storage effect to run and potentially catch an error
    setTimeout(() => {
        if (!storageError) alert('Profile updated!');
    }, 100);
  };

  // --- Skills Logic ---
  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'New Skill',
      category: SkillCategory.TECHNICAL,
      proficiency: 50
    };
    updateData({ skills: [...data.skills, newSkill] });
  };
  const handleUpdateSkill = (id: string, field: keyof Skill, value: any) => {
    const newSkills = data.skills.map(s => s.id === id ? { ...s, [field]: value } : s);
    updateData({ skills: newSkills });
  };
  const handleDeleteSkill = (id: string) => {
    if(window.confirm('Delete this skill?')) {
        updateData({ skills: data.skills.filter(s => s.id !== id) });
    }
  };

  // --- Projects Logic ---
  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Short description',
      fullDescription: 'Full description',
      technologies: ['Tech 1'],
      imageUrl: '',
      featured: false
    };
    updateData({ projects: [...data.projects, newProject] });
  };
  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
     const newProjects = data.projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    updateData({ projects: newProjects });
  };
  const handleDeleteProject = (id: string) => {
    if(window.confirm('Delete this project?')) {
        updateData({ projects: data.projects.filter(p => p.id !== id) });
    }
  };

  // --- Experience Logic ---
  const handleAddExperience = () => {
    setExpForm({
      id: Date.now().toString(),
      role: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      type: 'Work'
    });
    setIsEditingExp(true);
  };

  const handleEditExperience = (exp: Experience) => {
    setExpForm({ ...exp });
    setIsEditingExp(true);
  };

  const handleSaveExperience = () => {
    if (!expForm) return;

    // Validate simple fields
    if (!expForm.role || !expForm.organization) {
      alert("Role and Organization are required.");
      return;
    }

    const existingIndex = data.experiences.findIndex(e => e.id === expForm.id);
    let newExperiences = [...data.experiences];

    if (existingIndex >= 0) {
      newExperiences[existingIndex] = expForm;
    } else {
      newExperiences.push(expForm);
    }
    
    updateData({ experiences: newExperiences });
    setIsEditingExp(false);
    setExpForm(null);
  };

  const handleDeleteExperience = (id: string) => {
    if(window.confirm('Are you sure you want to delete this experience?')) {
        updateData({ experiences: data.experiences.filter(e => e.id !== id) });
    }
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
    // Reset input so same file can be selected again if needed
    if (e.target) e.target.value = '';
  };

  // --- Components ---
  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
        activeTab === id 
        ? 'bg-primary text-white' 
        : 'text-text-muted hover:bg-surface hover:text-text'
      }`}
    >
      <Icon size={18} className="mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-background border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="font-bold text-xl text-text">Dashboard</h1>
          <button onClick={() => navigate('/')} className="text-xs text-primary hover:underline">View Site</button>
        </div>
        <nav className="p-4">
          <TabButton id="profile" label="Profile" icon={User} />
          <TabButton id="skills" label="Skills" icon={Code} />
          <TabButton id="projects" label="Projects" icon={Layers} />
          <TabButton id="experience" label="Experience" icon={Briefcase} />
          <TabButton id="settings" label="Theme Settings" icon={Settings} />
        </nav>
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <button onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-600 px-4 py-2 w-full">
            <LogOut size={18} className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen bg-gray-50 dark:bg-gray-900">
        
        {storageError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r shadow-sm flex items-start" role="alert">
            <AlertTriangle className="mr-3 flex-shrink-0" size={24} />
            <div>
              <p className="font-bold">Saving Issue</p>
              <p>{storageError}</p>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold text-text mb-6">Edit Profile</h2>
            <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
              
              {/* Avatar Upload */}
              <div className="pb-6 border-b border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUpload 
                      label="Profile Picture" 
                      currentImage={profileForm.avatarUrl}
                      onImageChange={(base64) => setProfileForm({...profileForm, avatarUrl: base64})}
                  />
                  <ImageUpload 
                      label="Hero Image (Split Layout)" 
                      currentImage={profileForm.heroImageUrl}
                      onImageChange={(base64) => setProfileForm({...profileForm, heroImageUrl: base64})}
                  />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Name</label>
                  <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Title</label>
                  <input type="text" value={profileForm.title} onChange={e => setProfileForm({...profileForm, title: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Tagline</label>
                <input type="text" value={profileForm.tagline} onChange={e => setProfileForm({...profileForm, tagline: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Bio</label>
                <textarea rows={5} value={profileForm.bio} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-text mb-1">Email</label>
                  <input type="text" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Location</label>
                  <input type="text" value={profileForm.location} onChange={e => setProfileForm({...profileForm, location: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Resume URL</label>
                <input type="text" value={profileForm.resumeUrl || ''} onChange={e => setProfileForm({...profileForm, resumeUrl: e.target.value})} className="input-field w-full p-2 border rounded text-text bg-surface" placeholder="Link to PDF or Google Drive" />
              </div>

              {/* Social Links - Twitter Removed */}
              <div>
                <label className="block text-sm font-medium text-text mb-1">LinkedIn URL</label>
                <input type="text" value={profileForm.socials.linkedin || ''} onChange={e => setProfileForm({...profileForm, socials: {...profileForm.socials, linkedin: e.target.value}})} className="input-field w-full p-2 border rounded text-text bg-surface" placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">GitHub URL</label>
                <input type="text" value={profileForm.socials.github || ''} onChange={e => setProfileForm({...profileForm, socials: {...profileForm.socials, github: e.target.value}})} className="input-field w-full p-2 border rounded text-text bg-surface" placeholder="https://github.com/..." />
              </div>
              
              <button onClick={handleProfileSave} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center mt-4">
                <Save size={18} className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">Manage Skills</h2>
              <button onClick={handleAddSkill} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <Plus size={16} className="mr-1" /> Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map(skill => (
                <div key={skill.id} className="bg-background p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <input 
                      value={skill.name} 
                      onChange={(e) => handleUpdateSkill(skill.id, 'name', e.target.value)}
                      className="font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none text-text w-full mr-2"
                    />
                    <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={skill.category}
                      onChange={(e) => handleUpdateSkill(skill.id, 'category', e.target.value)}
                      className="text-xs bg-surface border rounded p-1 text-text flex-1"
                    >
                      {Object.values(SkillCategory).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-text-muted">Lvl:</span>
                      <input 
                        type="number" 
                        min="0" max="100" 
                        value={skill.proficiency}
                        onChange={(e) => handleUpdateSkill(skill.id, 'proficiency', parseInt(e.target.value))}
                        className="w-14 text-xs bg-surface border rounded p-1 text-text"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">Manage Projects</h2>
              <button onClick={handleAddProject} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <Plus size={16} className="mr-1" /> Add Project
              </button>
            </div>
            <div className="space-y-6">
              {data.projects.map(project => (
                <div key={project.id} className="bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <input 
                        value={project.title} 
                        onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                        className="text-lg font-bold w-full bg-surface border rounded p-2 text-text"
                        placeholder="Project Title"
                      />
                      <textarea 
                        value={project.description} 
                        onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                        className="w-full h-20 bg-surface border rounded p-2 text-sm text-text"
                        placeholder="Short description"
                      />
                      <input 
                        value={project.technologies.join(', ')} 
                        onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value.split(', '))}
                        className="w-full bg-surface border rounded p-2 text-sm text-text"
                        placeholder="React, Node, etc (comma separated)"
                      />
                    </div>
                    <div className="space-y-4">
                      <ImageUpload 
                        label="Project Thumbnail" 
                        currentImage={project.imageUrl}
                        onImageChange={(base64) => handleUpdateProject(project.id, 'imageUrl', base64)}
                      />
                      
                      <div className="flex justify-between items-center pt-2">
                         <label className="flex items-center text-sm text-text">
                           <input 
                            type="checkbox" 
                            checked={project.featured} 
                            onChange={(e) => handleUpdateProject(project.id, 'featured', e.target.checked)}
                            className="mr-2"
                           /> Featured
                         </label>
                         <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 text-sm hover:underline flex items-center">
                           <Trash2 size={14} className="mr-1"/> Delete Project
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

         {/* Experience Tab */}
         {activeTab === 'experience' && (
           <div className="max-w-4xl">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text">Manage Experience</h2>
                {!isEditingExp && (
                  <button onClick={handleAddExperience} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center text-sm">
                    <Plus size={16} className="mr-1" /> Add Experience
                  </button>
                )}
             </div>

             {isEditingExp && expForm ? (
               // Edit Form
               <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in mb-8">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h3 className="text-lg font-bold text-text">
                      {expForm.id && data.experiences.find(e => e.id === expForm.id) ? 'Edit Experience' : 'New Experience'}
                    </h3>
                    <button onClick={() => setIsEditingExp(false)} className="text-text-muted hover:text-text"><X size={20}/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Role / Degree</label>
                      <input 
                        className="input-field w-full p-2 border rounded text-text bg-surface" 
                        value={expForm.role} 
                        onChange={e => setExpForm({...expForm, role: e.target.value})}
                        placeholder="e.g. Senior Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Organization / School</label>
                      <input 
                        className="input-field w-full p-2 border rounded text-text bg-surface" 
                        value={expForm.organization} 
                        onChange={e => setExpForm({...expForm, organization: e.target.value})}
                        placeholder="e.g. Tech Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Location</label>
                      <input 
                        className="input-field w-full p-2 border rounded text-text bg-surface" 
                        value={expForm.location} 
                        onChange={e => setExpForm({...expForm, location: e.target.value})}
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-text mb-1">Type</label>
                      <select
                        className="input-field w-full p-2 border rounded text-text bg-surface"
                        value={expForm.type}
                        onChange={e => setExpForm({...expForm, type: e.target.value as 'Work' | 'Education'})}
                      >
                        <option value="Work">Work</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                     <div>
                      <label className="block text-sm font-medium text-text mb-1">Start Date</label>
                      <input 
                        type="text"
                        className="input-field w-full p-2 border rounded text-text bg-surface" 
                        value={expForm.startDate} 
                        onChange={e => setExpForm({...expForm, startDate: e.target.value})}
                        placeholder="YYYY-MM"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">End Date</label>
                      <input 
                        type="text"
                        className="input-field w-full p-2 border rounded text-text bg-surface" 
                        value={expForm.endDate} 
                        onChange={e => setExpForm({...expForm, endDate: e.target.value})}
                        placeholder="YYYY-MM or Present"
                        disabled={expForm.current}
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center cursor-pointer text-text">
                        <input 
                          type="checkbox" 
                          checked={expForm.current} 
                          onChange={e => setExpForm({...expForm, current: e.target.checked})} 
                          className="mr-2"
                        />
                        Currently working here
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text mb-1">Description (Bullet points, one per line)</label>
                    <textarea 
                      rows={4}
                      className="input-field w-full p-2 border rounded text-text bg-surface font-mono text-sm" 
                      value={expForm.description.join('\n')} 
                      onChange={e => setExpForm({...expForm, description: e.target.value.split('\n')})}
                      placeholder="- Achieved X..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => setIsEditingExp(false)} 
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-text hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveExperience} 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Save size={16} className="mr-2" /> Save Experience
                    </button>
                  </div>
               </div>
             ) : (
               // List View
               <div className="space-y-4">
                 {data.experiences.map((exp) => (
                   <div key={exp.id} className="bg-background p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center group">
                     <div>
                       <div className="flex items-center gap-2">
                        <h4 className="font-bold text-text">{exp.role}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${exp.type === 'Work' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {exp.type}
                        </span>
                       </div>
                       <p className="text-sm text-text-muted">{exp.organization} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                     </div>
                     <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEditExperience(exp)} className="p-2 text-text hover:text-primary bg-surface rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                         <Edit2 size={16} />
                       </button>
                       <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 text-red-500 hover:text-red-700 bg-surface rounded-lg hover:bg-red-50">
                         <Trash2 size={16} />
                       </button>
                     </div>
                   </div>
                 ))}
                 
                 {data.experiences.length === 0 && (
                   <div className="text-center py-10 text-text-muted bg-surface rounded-xl border border-dashed border-gray-300">
                     No experiences found. Add one to get started.
                   </div>
                 )}
               </div>
             )}
           </div>
         )}

         {/* Theme Settings */}
         {activeTab === 'settings' && (
           <div className="max-w-3xl">
             <h2 className="text-2xl font-bold text-text mb-6">Theme Settings</h2>
             <div className="bg-background p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Primary Color</label>
                  <div className="flex space-x-4">
                    {['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'].map(color => (
                      <button 
                        key={color}
                        onClick={() => updateTheme({ primaryColor: color })}
                        className={`w-10 h-10 rounded-full border-2 ${data.theme.primaryColor === color ? 'border-text scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Font Family</label>
                   <select 
                      value={data.theme.fontFamily}
                      onChange={(e) => updateTheme({ fontFamily: e.target.value as any })}
                      className="w-full md:w-1/2 p-2 bg-surface border rounded text-text"
                    >
                      <option value="sans">Sans Serif (Inter)</option>
                      <option value="serif">Serif (Merriweather)</option>
                      <option value="mono">Monospace (Fira Code)</option>
                    </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Light Mode</label>
                  <button 
                    onClick={() => updateTheme({ darkMode: !data.theme.darkMode })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.theme.darkMode ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${data.theme.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">Hero Layout</label>
                   <div className="flex gap-4">
                     <button 
                      onClick={() => updateTheme({ heroLayout: 'split' })}
                      className={`p-4 border rounded-lg ${data.theme.heroLayout === 'split' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                     >
                       Split (Image Right)
                     </button>
                     <button 
                      onClick={() => updateTheme({ heroLayout: 'centered' })}
                       className={`p-4 border rounded-lg ${data.theme.heroLayout === 'centered' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                     >
                       Centered (Text Only)
                     </button>
                   </div>
                </div>

                {/* Backup & Restore */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-text mb-4">Data Management</h3>
                  <div className="bg-surface border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-4">
                    <p className="text-sm text-text-muted mb-3">
                      Your changes are saved to this specific browser. To move your portfolio to another device or browser, download your data here and upload it on the other device.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={exportData}
                        className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-text hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Download size={18} className="mr-2" /> Export Data (JSON)
                      </button>

                      <div className="relative">
                        <input 
                          type="file" 
                          ref={importInputRef}
                          onChange={handleFileChange}
                          accept=".json"
                          className="hidden"
                        />
                        <button 
                          onClick={handleImportClick}
                          className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-text hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Upload size={18} className="mr-2" /> Import Data
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 mb-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-bold text-text mb-4">Code Export</h3>
                    <p className="text-sm text-text-muted mb-3">
                        If you want to permanently save your changes into the website code (so you can host it anywhere without losing data), click below.
                    </p>
                    <button
                        onClick={() => {
                            // Helper to generate the TS file content
                            const generateConstantsFile = (currentData: any) => {
                                // Deep clone to avoid mutating state
                                const dataCopy = JSON.parse(JSON.stringify(currentData));
                                
                                // Format the JSON string nicely
                                const jsonString = JSON.stringify(dataCopy, null, 2);
                                
                                // Create the file content
                                return `
import { AppData, SkillCategory } from './types';

// ==================================================================================
// INSTRUCTIONS FOR UPDATING THIS FILE:
// 1. This file contains the DEFAULT content for your website.
// 2. If you want to permanently change your text, images, or skills:
//    - Go to your running website
//    - Log in to the Admin Dashboard (/admin/login)
//    - Edit your content (Upload images, change text, etc.)
//    - Go to 'Theme Settings' tab
//    - Click 'Copy Code for constants.ts'
//    - Paste that code HERE, replacing everything below.
// ==================================================================================

export const INITIAL_DATA: AppData = ${jsonString};
`;
                            };

                            const code = generateConstantsFile(data);
                            navigator.clipboard.writeText(code).then(() => {
                                alert("Code copied to clipboard! Now open 'constants.ts' and paste it there.");
                            }).catch(() => {
                                alert("Failed to copy. Please manually export JSON instead.");
                            });
                        }}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                        <Code size={18} className="mr-2" /> Copy Code for constants.ts
                    </button>
                  </div>

                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
                    <button 
                      onClick={resetData}
                      className="flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <RefreshCw size={18} className="mr-2" /> Reset All Data
                    </button>
                  </div>
                </div>
             </div>
           </div>
         )}
      </main>
    </div>
  );
};

export default Dashboard;