
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  level: 'Entry' | 'Mid' | 'Senior';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  posted: string;
  logo: string;
  industry: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid',
    description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js concepts and workflows.',
    requirements: [
      '3+ years experience with React.js',
      'Proficient understanding of web markup, HTML5, CSS3',
      'Good understanding of JavaScript and ES6+ features',
      'Experience with RESTful APIs and GraphQL',
      'Familiarity with Redux, TypeScript, and modern frontend tools'
    ],
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and frontend libraries for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance across devices and browsers',
      'Collaborate with backend developers and designers to improve usability'
    ],
    salary: '$100,000 - $130,000',
    posted: '2025-05-10',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems Inc',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Senior',
    description: 'Join our backend team to build scalable and resilient systems that power our enterprise applications.',
    requirements: [
      '5+ years of experience in backend development',
      'Strong knowledge of Node.js, Python, or Java',
      'Experience with databases (SQL and NoSQL)',
      'Understanding of server-side templating languages',
      'Knowledge of API design and development'
    ],
    responsibilities: [
      'Design and implement backend services and APIs',
      'Optimize application performance and responsiveness',
      'Collaborate with frontend developers to integrate user-facing elements',
      'Implement security and data protection measures',
      'Write clean, maintainable code with proper documentation'
    ],
    salary: '$130,000 - $160,000',
    posted: '2025-05-12',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'InnovateX',
    location: 'Austin, TX',
    type: 'Full-time',
    level: 'Mid',
    description: 'We are seeking an experienced Product Manager to join our team and help shape our product vision and roadmap.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Excellent communication and presentation abilities',
      'Experience with agile methodologies',
      'Technical background preferred'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering, design, and marketing teams',
      'Analyze market trends and competitor activities',
      'Lead the product development lifecycle from conception to launch'
    ],
    salary: '$110,000 - $140,000',
    posted: '2025-05-05',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    company: 'DesignWorks',
    location: 'Remote',
    type: 'Remote',
    level: 'Mid',
    description: 'DesignWorks is looking for a talented UX/UI Designer to craft beautiful and intuitive interfaces for our clients.',
    requirements: [
      'Portfolio showcasing UI design and interaction expertise',
      'Experience with Figma, Sketch, and other design tools',
      'Understanding of user-centered design principles',
      'Knowledge of web and mobile design patterns',
      'Ability to create wireframes, prototypes, and high-fidelity mockups'
    ],
    responsibilities: [
      'Create user flows, wireframes, and UI mockups',
      'Conduct user research and usability testing',
      'Collaborate with product managers and engineers',
      'Establish design guidelines and systems',
      'Stay updated on latest design trends and technologies'
    ],
    salary: '$90,000 - $120,000',
    posted: '2025-05-08',
    logo: 'https://via.placeholder.com/150',
    industry: 'Design'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'AnalyticsAI',
    location: 'Chicago, IL',
    type: 'Full-time',
    level: 'Senior',
    description: 'Looking for a skilled Data Scientist to analyze large datasets and provide actionable insights to improve our products.',
    requirements: [
      'Advanced degree in Statistics, Computer Science, or related field',
      'Strong programming skills in Python or R',
      'Experience with data visualization tools',
      'Knowledge of machine learning algorithms',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Develop and implement machine learning models',
      'Analyze complex datasets to extract valuable insights',
      'Create data visualizations and reports',
      'Collaborate with engineering and product teams',
      'Stay current with latest advancements in AI and machine learning'
    ],
    salary: '$140,000 - $180,000',
    posted: '2025-05-15',
    logo: 'https://via.placeholder.com/150',
    industry: 'Data Science'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    company: 'CloudSolutions',
    location: 'Seattle, WA',
    type: 'Full-time',
    level: 'Mid',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      'Experience with AWS, Azure, or Google Cloud',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Familiarity with CI/CD tools (Jenkins, GitLab CI)',
      'Scripting and automation skills (Python, Bash)',
      'Understanding of infrastructure as code (Terraform, CloudFormation)'
    ],
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Automate deployment processes',
      'Monitor system performance and troubleshoot issues',
      'Implement security best practices',
      'Collaborate with development teams to optimize workflows'
    ],
    salary: '$120,000 - $150,000',
    posted: '2025-05-07',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 7,
    title: 'Marketing Manager',
    company: 'BrandBoost',
    location: 'Boston, MA',
    type: 'Full-time',
    level: 'Senior',
    description: 'Seeking an experienced Marketing Manager to lead our digital marketing strategies and campaigns.',
    requirements: [
      '5+ years of marketing experience',
      'Strong understanding of digital marketing channels',
      'Experience with marketing analytics tools',
      'Excellent project management skills',
      'Creative mindset with attention to detail'
    ],
    responsibilities: [
      'Develop and execute marketing strategies',
      'Manage digital advertising campaigns',
      'Analyze marketing metrics and ROI',
      'Oversee content creation and distribution',
      'Collaborate with sales and product teams'
    ],
    salary: '$100,000 - $130,000',
    posted: '2025-05-09',
    logo: 'https://via.placeholder.com/150',
    industry: 'Marketing'
  },
  {
    id: 8,
    title: 'Software QA Engineer',
    company: 'QualityTech',
    location: 'Denver, CO',
    type: 'Full-time',
    level: 'Entry',
    description: 'Join our QA team to ensure the quality and reliability of our software products through comprehensive testing.',
    requirements: [
      'Knowledge of software QA methodologies and tools',
      'Experience with manual and automated testing',
      'Familiarity with test management tools',
      'Basic understanding of programming concepts',
      'Strong analytical and problem-solving skills'
    ],
    responsibilities: [
      'Create and execute test plans and test cases',
      'Identify, report, and track bugs',
      'Perform regression testing',
      'Collaborate with developers to resolve issues',
      'Participate in code reviews and product discussions'
    ],
    salary: '$70,000 - $90,000',
    posted: '2025-05-14',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 9,
    title: 'Project Manager',
    company: 'TechSolutions',
    location: 'Portland, OR',
    type: 'Contract',
    level: 'Mid',
    description: 'We are looking for a skilled Project Manager to oversee our software development projects from initiation to completion.',
    requirements: [
      'PMP certification preferred',
      'Experience managing software development projects',
      'Strong leadership and communication skills',
      'Knowledge of agile and waterfall methodologies',
      'Proficiency with project management tools'
    ],
    responsibilities: [
      'Lead project planning and execution',
      'Manage project scope, schedule, and resources',
      'Facilitate team communication and collaboration',
      'Identify and mitigate project risks',
      'Report project status to stakeholders'
    ],
    salary: '$90,000 - $120,000',
    posted: '2025-05-11',
    logo: 'https://via.placeholder.com/150',
    industry: 'Project Management'
  },
  {
    id: 10,
    title: 'Network Security Specialist',
    company: 'SecureTech',
    location: 'Washington, DC',
    type: 'Full-time',
    level: 'Senior',
    description: 'Join our security team to protect our network infrastructure from cyber threats and ensure data integrity.',
    requirements: [
      'CISSP or related security certifications',
      'Experience with network security technologies',
      'Knowledge of security frameworks (NIST, ISO)',
      'Familiarity with security assessment tools',
      'Understanding of compliance requirements'
    ],
    responsibilities: [
      'Monitor and maintain network security systems',
      'Conduct security assessments and vulnerability scans',
      'Implement security measures and protocols',
      'Respond to security incidents and breaches',
      'Provide security training and awareness'
    ],
    salary: '$140,000 - $170,000',
    posted: '2025-05-06',
    logo: 'https://via.placeholder.com/150',
    industry: 'Cybersecurity'
  }
];
