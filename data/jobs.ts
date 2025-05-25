
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
    company: 'HireMentis',
    location: 'Meerut, India',
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
    salary: '₹12,00,000 – ₹18,00,000',
    posted: '2025-05-10',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'ChaiCode',
    location: 'Jaipur, India',
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
    salary: '₹18,00,000 – ₹25,00,000',
    posted: '2025-05-12',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
{
  id: 3,
  title: "Full Stack Developer",
  company: "Learnyst",
  location: "Bengaluru, India",
  type: "Full-time",
  level: "Mid",
  description: "We are looking for a talented Full Stack Developer to join our innovative team. You will be responsible for developing scalable web applications using both frontend and backend technologies.",
  requirements: [
    "3+ years of experience with JavaScript, React.js, and Node.js",
    "Strong understanding of HTML5, CSS3, and modern frontend libraries",
    "Proficient with backend frameworks like Express.js or Django",
    "Experience with RESTful APIs, GraphQL, and database systems like MongoDB or PostgreSQL",
    "Familiarity with DevOps practices and version control (Git)"
  ],
  responsibilities: [
    "Develop and maintain both frontend and backend components of web applications",
    "Translate UI/UX designs into high-quality, responsive web interfaces",
    "Design robust APIs and integrate with third-party services",
    "Ensure optimal performance and scalability of web applications",
    "Collaborate with cross-functional teams to deliver new features"
  ],
  salary: "₹12-18 LPA",
  posted: "2025-05-25",
  logo: "https://example.com/logo.png",
  industry: "Technology"
},
{
  id: 4,
  title: "Software Engineer",
  company: "ChaiCode",
  location: "Jaipur, India",
  type: "Full-time",
  level: "Mid",
  description: "Join our dynamic engineering team as a Software Engineer. You'll be involved in the full software development lifecycle to build high-quality software solutions.",
  requirements: [
    "Strong programming skills in C++, Java, or Python",
    "Solid understanding of data structures and algorithms",
    "Experience with version control systems like Git",
    "Familiarity with software development methodologies (Agile/Scrum)",
    "Ability to write clean, maintainable, and scalable code"
  ],
  responsibilities: [
    "Design, develop, and test software applications",
    "Participate in code reviews and technical discussions",
    "Debug and resolve technical issues",
    "Collaborate with product managers and designers",
    "Contribute to continuous improvement of development processes"
  ],
  salary: "₹10-16 LPA",
  posted: "2025-05-25",
  logo: "https://example.com/logo.png",
  industry: "Technology"
},

{
  id: 5,
  title: "JavaScript Developer",
  company: "Teachyst",
  location: "Patiala, India",
  type: "Full-time",
  level: "Mid",
  description: "We are looking for a JavaScript Developer to build dynamic and interactive web applications. You'll be responsible for delivering high-quality code and improving user experience.",
  requirements: [
    "Strong proficiency in JavaScript and ES6+",
    "Experience with React.js, Vue.js, or Angular",
    "Understanding of HTML5, CSS3, and responsive design",
    "Familiarity with modern development tools (Webpack, Babel, etc.)",
    "Experience integrating APIs and managing state (Redux, Vuex)"
  ],
  responsibilities: [
    "Develop and maintain frontend components using JavaScript frameworks",
    "Convert wireframes and designs into functional applications",
    "Optimize application for speed and scalability",
    "Write reusable and maintainable code",
    "Collaborate with UI/UX designers and backend developers"
  ],
  salary: "₹9-14 LPA",
  posted: "2025-05-25",
  logo: "https://example.com/logo.png",
  industry: "Technology"
},

{
  id: 6,
  title: "Python Developer",
  company: "HireMentis",
  location: "Meerut, India",
  type: "Full-time",
  level: "Mid",
  description: "We are seeking a Python Developer to build scalable backend services and automation solutions. The ideal candidate will have a strong foundation in Python and web technologies.",
  requirements: [
    "3+ years experience in Python development",
    "Experience with web frameworks such as Django or Flask",
    "Good understanding of RESTful APIs and data formats like JSON",
    "Proficient with SQL and NoSQL databases",
    "Familiarity with cloud platforms and deployment pipelines"
  ],
  responsibilities: [
    "Develop backend logic for web and enterprise applications",
    "Build and integrate RESTful APIs with frontend systems",
    "Write efficient and reusable code for automation and services",
    "Maintain code quality through testing and documentation",
    "Collaborate with DevOps and frontend teams for integration"
  ],
  salary: "₹11-17 LPA",
  posted: "2025-05-25",
  logo: "https://example.com/logo.png",
  industry: "Technology"
},

  {
    id: 7,
    title: 'UX/UI Designer',
    company: 'KodeKshetra',
    location: 'Remote',
    type: 'Full-time',
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
    salary: '₹10,00,000 – ₹15,00,000',
    posted: '2025-05-08',
    logo: 'https://via.placeholder.com/150',
    industry: 'Design'
  },

  {
    id: 8,
    title: 'Data Scientist',
    company: 'Super Live',
    location: 'Bengaluru, India',
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
    salary: '₹50,00,000 – ₹75,00,000',
    posted: '2025-05-15',
    logo: 'https://via.placeholder.com/150',
    industry: 'Data Science'
  },

 {
    id: 9,
    title: 'DevOps Engineer',
    company: 'KodeKshetra',
    location: 'Remote',
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
    salary: '₹25,00,000 – ₹35,00,000',
    posted: '2025-05-07',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },

  {
    id: 10,
    title: 'Product Manager',
    company: 'Learn Code Online',
    location: 'Noida, India',
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
    salary: '₹30,00,000 – ₹45,00,000',
    posted: '2025-05-05',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },

  {
    id: 11,
    title: 'Marketing Manager',
    company: 'Physics Wallah',
    location: 'Delhi, India',
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
    salary: '₹45,00,000 – ₹65,00,000',
    posted: '2025-05-09',
    logo: 'https://via.placeholder.com/150',
    industry: 'Marketing'
  },
  {
    id: 12,
    title: 'Software QA Engineer',
    company: 'Learnyst',
    location: 'Pune, India',
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
    salary: '₹25,00,000 – ₹35,00,000',
    posted: '2025-05-14',
    logo: 'https://via.placeholder.com/150',
    industry: 'Technology'
  },
  {
    id: 13,
    title: 'Project Manager',
    company: 'Teachyst',
    location: 'Patiala, India',
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
    salary: '₹30,00,000 – ₹45,00,000',
    posted: '2025-05-11',
    logo: 'https://via.placeholder.com/150',
    industry: 'Project Management'
  },
  {
    id: 14,
    title: 'Network Security Specialist',
    company: 'Learnyst',
    location: 'Bengaluru, India',
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
    salary: '₹60,00,000 – ₹1,00,00,000',
    posted: '2025-05-06',
    logo: 'https://via.placeholder.com/150',
    industry: 'Cybersecurity'
  },

 {
  id: 15,
  title: "Sales Manager",
  company: "HireMentis",
  location: "Meerut, India",
  type: "Full-time",
  level: "Mid",
  description: "We are seeking a Sales Manager to lead our business development efforts. You will be responsible for driving sales growth, building client relationships, and achieving revenue targets.",
  requirements: [
    "3+ years of experience in B2B/B2C sales or business development",
    "Strong communication, negotiation, and leadership skills",
    "Proven track record of achieving sales targets",
    "Knowledge of CRM tools and sales analytics",
    "Ability to work in a fast-paced and target-driven environment"
  ],
  responsibilities: [
    "Identify and pursue new sales opportunities and markets",
    "Build and maintain strong client relationships",
    "Lead and mentor the sales team to achieve KPIs",
    "Prepare reports and forecasts for upper management",
    "Coordinate with marketing to implement promotional strategies"
  ],
  salary: "₹8-12 LPA + incentives",
  posted: "2025-05-25",
  logo: "https://example.com/logo.png",
  industry: "Sales"
}
 
];
