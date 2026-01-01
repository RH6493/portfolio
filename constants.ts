
import { AppData, SkillCategory } from './types';

/**
 * 📸 IMAGE & PERSISTENCE CHECKLIST:
 * 1. Your folder MUST be named "images" (lowercase) next to index.html.
 * 2. If you edit this file and don't see changes, go to the website URL 
 *    and add "/#/admin" to the end, then click "Reset All Data".
 * 3. NOTE: "Preview" tabs in online editors CANNOT see local folders. 
 *    You must download the code and run index.html on your PC for local images.
 */

export const INITIAL_DATA: AppData = {
  version: "1.0.2", // Incremented to force browser to clear old storage
  profile: {
    name: "Raj Hipparagi",
    title: "Senior Associate and a Student in Business Studies",
    tagline: "Global Catalyst: Driving Process Optimization, Rigor and Deployment with Sustainability.",
    bio: "I am a master's candidate in International Business with experience in data analysis, operational improvement, and cross functional collaboration. I am experienced and skilled at tracking performance metrics, identifying inefficiencies, and supporting process optimization. My way of working is highly organized, and detail-oriented, and I am eager to contribute to fast-paced, international teams. I have a positive attitude and a willingness to contribute to a fast-paced team with readiness to help the team achieve company goals. I aspire to work in Marketing, Supply Chain or Operations. Personally, I like to draw, take photos, learn new recipes, swim, technology and space, football, participate in team building activities, socialise, and spend quality time with people. Yeah, I know I like a lot of things!",
    email: "raj15hipparagi@gmail.com",
    location: "Lille, France",
    avatarUrl: "./images/profile-image.jpg",
    heroImageUrl: "./images/banner-picture.jpg",
    resumeUrl: "./images/Raj-Hipparagi-website-resume.pdf",
    socials: {
      linkedin: "https://www.linkedin.com/in/raj-hipparagi/",
      github: "https://github.com/yourname",
    },
    hobbies: ['Photography', 'Cooking', 'Swimming', 'Arts', 'Football']
  },

  skills: [
    { id: '1', name: 'Microsoft Excel', category: SkillCategory.TOOLS, proficiency: 85 },
    { id: '2', name: 'Microsoft Office', category: SkillCategory.TOOLS, proficiency: 80 },
    { id: '3', name: 'Canva', category: SkillCategory.TOOLS, proficiency: 80 },
    { id: '4', name: 'MS Project, R and SPSS', category: SkillCategory.TOOLS, proficiency: 25 },
    { id: '9', name: 'Power BI', category: SkillCategory.TOOLS, proficiency: 25 },
    { id: '5', name: 'Advanced Excel: PivotTables, VLOOKUP & XLOOKUP', category: SkillCategory.TECHNICAL, proficiency: 80 },
    { id: '6', name: 'Generative AI', category: SkillCategory.TECHNICAL, proficiency: 90 },
    { id: '10', name: 'Data Visualization (Tableau/Power BI)', category: SkillCategory.TECHNICAL, proficiency: 95 },
    { id: '7', name: 'Leadership', category: SkillCategory.SOFT, proficiency: 95 },
    { id: '8', name: 'Communication', category: SkillCategory.SOFT, proficiency: 95 },
    { id: '11', name: 'Team Work', category: SkillCategory.SOFT, proficiency: 95 },
    { id: '15', name: 'Autonomy', category: SkillCategory.SOFT, proficiency: 90 },
    { id: '16', name: 'English', category: SkillCategory.LANGUAGES, proficiency: 100 },
    { id: '17', name: 'French', category: SkillCategory.LANGUAGES, proficiency: 30 },
    { id: '18', name: 'Hindi', category: SkillCategory.LANGUAGES, proficiency: 100 }
  ],

  projects: [
    {
      id: '1',
      title: 'PUMA Multi-Channel Marketing Project',
      description: 'A comprehensive analysis for the "Retail of Tomorrow".',
      fullDescription: 'This project made me understand marketing from a new perspective like brand analysis and brand DNA. I worked with a team of 4 members. We were tasked to launch the brand Titan Watches in a new country: Nigeria. I did in-depth analysis of the Indian and Nigerian market as a whole and for watches. We came with a strategy to market Titan Watches in Nigeria. I led the research and analysis part along with supporting creative thinking and crucial elements for the presentation. Working for this project made me deeply appreciate how much fun and challenging it can be to work in marketing.',
      technologies: ['MS Powerpoint', 'Canva', 'Generative AI'],
      skillsGained: ['Branding', 'Market Analysis', 'Brand Analysis'],
      imageUrl: './images/puma-logo.png',
      liveUrl: 'https://1drv.ms/p/c/fed99e5742dd5f8d/IQDGKjvXvYggTp-T9CXxh2wHAWO2SZaczzrJfgc2azBhC6c?e=ySCHh7',
      featured: true
    },
    {
      id: '2',
      title: 'Business Simulation',
      description: 'Led a simulated automotive company that operates in three continents.',
      fullDescription: 'For Business Simulation, we had a simulation game for running an automobile business. We played against 6 teams to gain the highest cumulative shareholder return while maintaining a high ESG score. We ranked first in shareholder return and third in ESG ratings.',
      technologies: ['CESIM Business Simulation' ],
      skillsGained: ['Business Analysis', 'Data Analysis', 'Strategy and Strategy Optimisation', 'Market and Competitor Analysis'],
      imageUrl: './images/cesim.jpeg',
      liveUrl: 'https://1drv.ms/b/c/fed99e5742dd5f8d/IQB3WfYCuWi5RaHciMangucZATF0hjj48yPEhkBcrejMAjE?e=FiIqg9',
      featured: true
    },
    {
      id: '3',
      title: 'Titan Watches Marketing Project',
      description: 'Marketing plan for entry of the Indian watch market brand in Nigeria.',
      fullDescription: 'I led the research and analysis part along with supporting creative thinking and crucial elements for the presentation. Working for this project made me deeply appreciate how much fun and challenging it can be to work in marketing.',
      technologies: ['MS Powerpoint', 'Canva', 'Generative AI'],
      skillsGained: ['Branding', 'Market Analysis', 'Brand Analysis', 'Advertising'],
      liveUrl: 'https://1drv.ms/p/c/fed99e5742dd5f8d/IQC5OAlxTLuyS4Cp7Z8KcIsgAUy-i1Wp0hIiafHdbhwab2E?e=x0X7v8',
      imageUrl: './images/titan-vector-logo.png',
      featured: false
    },
    {
      id: '4',
      title: 'Victoria\'s Secret Project',
      description: 'Marketing analysis and strategy proposal.',
      fullDescription: 'A deep dive into the Victoria\'s Secret brand identity and market position.',
      technologies: ['MS Powerpoint', 'Canva', 'Market Research'],
      skillsGained: ['Branding', 'Market Analysis', 'Brand Analysis', 'Advertising'],
      liveUrl: 'https://1drv.ms/p/c/fed99e5742dd5f8d/IQC5OAlxTLuyS4Cp7Z8KcIsgAUy-i1Wp0hIiafHdbhwab2E?e=x0X7v8',
      // We use a fallback URL here so you see it working even if local folder is tricky
      imageUrl: './images/vs-logo.png',
      featured: false
    }
  ],

  experiences: [
    {
      id: '1',
      role: 'Masters In International Business',
      organization: 'IÉSEG School of Management',
      location: 'Lille, France',
      startDate: 'January 2025',
      endDate: 'current',
      current: true,
      description: [
        'Specialised in core subjects like Marketing, Supply Chain, Business Analytics and Statistics, Project Management, Strategy and CSR, Financial Analytics, Negotiations, Accounting and Intercultural Management',
        'Overall score: 14.92, Overall GPA: 3.87',
      ],
      type: 'Education'
    },
    {
      id: '2',
      role: 'Senior Associate (Revenue Cycle Officer)',
      organization: 'Inventurus Knowledge Solutions Ltd.',
      location: 'Mumbai, India',
      startDate: 'January 2022',
      endDate: 'November 2024',
      current: false,
      description: [
        'Full-time contract (CDI)',
        '### About the company',
        'Inventurus Knowledge Solutions is technology-backed healthcare solutions provider.',
        '### Core Competencies & Operations',
        'Financial Revenue Cycle: Deep understanding of end-to-end financial processes.',
        'Refund Execution: Specialization in compliant, full-cycle refund processing.',
        'Workflow Governance: Managing work inflow, task allocation, and production tracking.',
        'Performance Metrics: Strict adherence to TAT (Turn Around Time) and SLA (Service Level Agreements).',
        'Process Documentation: Creating standardized, compliant process flows for stakeholders.',
        '### Technical Skills & Tools',
        'Accounting: Mastery of core accounting entries.',
        'Software Proficiency: NextGen software and advanced Excel skills.',
        'Data & Reporting: Meticulous KPI tracking, reporting, and data presentation.',
        '### Leadership & Achievements',
        'Process Improvement: Achieved a 75% reduction in a severe process backlog.',
        'Team Enablement: Guided colleagues through transitions and accelerated new hire onboarding.',
        'Training: Created and updated training materials to boost team capacity.',
        'Strategic Support: Assisted team management with strategic enablement and daily operations.',
        '### Soft Skills',
        'Cross-functional Communication: Acting as a central hub for internal teams and client requests.',
        'Adaptability: Rapid learning of complex systems and high-priority assignments.',
        'Problem Solving: Tackling complex tasks and process bottlenecks.',
      ],
      type: 'Work'
    },
    {
      id: '3',
      role: 'Bachelors in Commerce',
      organization: 'University of Mumbai',
      location: 'Mumbai, Maharashtra, India',
      startDate: 'July, 2018',
      endDate: 'June, 2021',
      current: false,
      description: [
        'Specialized in Accounting and Business Management.',
        'CGPA: 8.10.'
      ],
      type: 'Education'
    }
  ],

  posts: [],

  theme: {
    primaryColor: '#3b82f6',
    fontFamily: 'sans',
    heroLayout: 'split',
    darkMode: true
  }
};
