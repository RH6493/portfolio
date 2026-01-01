
export enum SkillCategory {
  TECHNICAL = 'Technical',
  TOOLS = 'Tools',
  SOFT = 'Soft Skills',
  LANGUAGES = 'Languages',
  STRATEGY = 'Strategy',
  MANAGEMENT = 'Management'
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory | string;
  proficiency: number; // 0-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  skillsGained?: string[];
  imageUrl: string;
  liveUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[]; // Bullet points
  type: 'Work' | 'Education';
}

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl: string;
  heroImageUrl?: string;
  resumeUrl?: string;
  socials: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  hobbies?: string[];
}

export interface AppTheme {
  primaryColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  heroLayout: 'centered' | 'split';
  darkMode: boolean;
}

export interface AppData {
  version: string; // Used to force refresh data when constants change
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  posts: Post[];
  theme: AppTheme;
}
