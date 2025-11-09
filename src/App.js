import React, { useState, useEffect, useCallback } from 'react';
import { Aperture, Code, Cpu, Activity, User, Briefcase, Feather, BookOpen, Layers, Menu, X, Zap } from 'lucide-react'; // Icons from Lucide

// --- DATA STRUCTURE FROM CV ---

const profileData = {
    name: "Tanjid Alam Dhrubo",
    tagline: "AI/Full-Stack Developer | Focused on Intelligence & Robust System Design",
    contact: {
        email: "tanjid.alam.dhrubo@gmail.com",
        phone: "+880 1631722133",
        linkedin: "https://www.linkedin.com/in/tanjid-alam-dhrubo"
    },
    summary: "B.Sc. in Computer Science and Engineering with a strong focus on Machine Learning, AI, and Full-Stack Development. Proven ability to translate complex business logic into efficient, scalable applications, from HR & Payroll systems to mobile AI integration projects. Recipient of the Chairman's Distinguished Scholarship.",
    skills: {
        programming: ["C#", "Java", "Python", "C++", "Dart", "JavaScript", "HTML/CSS"],
        databases: ["PostgreSQL", "MySQL", "Firebase"],
        competencies: ["Full-Stack Development", "Data Modeling", "CRUD Operations", "RESTful APIs", "Report Generation", "UI/UX Design", "Business Logic Implementation"],
    },
    education: {
        institution: "East Delta University",
        degree: "B.Sc in Computer Science and Engineering",
        gpa: "3.02/4.00",
        gradDate: "Sep 2025",
        concentrations: "Intelligence and Modeling/Simulations"
    },
    work: {
        title: "Intern - Asp.Net",
        company: "Genuine Technology and Research Ltd",
        duration: "Oct 2025 - Present",
        description: "Developed a comprehensive HR & Payroll System using ASP.NET Core and PostgreSQL, implementing automated salary calculations and reporting features. Gained valuable experience in teamwork, problem-solving, and handling real-world business logic."
    }
};

const projects = [
    {
        id: 'p1',
        title: "Video Classification (CNN & LSTM)",
        type: "AI/ML",
        description: "Developed a video classification model leveraging CNN and LSTM on the UCF101 dataset for action recognition. Implemented preprocessing, frame extraction, and achieved model evaluation using TensorFlow.",
        tags: ["Python", "TensorFlow", "CNN", "LSTM", "UCF101 Dataset"],
        featured: true
    },
    {
        id: 'p2',
        title: "Stellar AI - AI Integration App",
        type: "Mobile/AI",
        description: "Independently developed a mobile app integrating AI models for chatbot, image generation, and language translation using Flutter and Appwrite. Focused on designing an intuitive and seamless UI/UX.",
        tags: ["Flutter", "Dart", "Appwrite", "AI Models", "UI/UX"],
        featured: true
    },
    {
        id: 'p3',
        title: "Ani-help - Pet Care System",
        type: "Full-Stack Mobile",
        description: "Led the development of a pet care platform (Flutter/Firebase) for product purchases and online veterinarian consultation. Integrated real-time chat features to enhance user engagement.",
        tags: ["Flutter", "Dart", "Firebase", "Real-Time Chat", "Project Management"],
        featured: true
    },
    {
        id: 'p4',
        title: "Patient Support System",
        type: "Database/DBMS",
        description: "Developed a database-driven system using DBMS concepts for managing patient, doctor, appointment, and prescription data. Features include user authentication, registration, and scheduling. Designed ER diagrams and SQL queries.",
        tags: ["DBMS", "SQL", "User Authentication", "Data Modeling"],
        featured: true
    },
    {
        id: 'p5',
        title: "HR & Payroll System",
        type: "Full-Stack Web",
        description: "Developed as an intern at Genuine Technology and Research Ltd using ASP.NET Core and PostgreSQL. Focused on data management, salary automation, and report generation.",
        tags: ["ASP.NET Core", "C#", "PostgreSQL", "Full-Stack", "Business Logic"],
        featured: false
    }
];

// Map skills to icons for the interactive project view
const SKILL_TABS = [
    { key: 'AI', label: 'AI & ML', icon: Cpu, filterTags: ['AI Models', 'TensorFlow', 'CNN', 'LSTM'] },
    { key: 'FullStack', label: 'Full Stack & Web', icon: Code, filterTags: ['ASP.NET Core', 'C#', 'PostgreSQL', 'JavaScript', 'Full-Stack'] },
    { key: 'Mobile', label: 'Mobile (Flutter)', icon: Aperture, filterTags: ['Flutter', 'Dart', 'Appwrite', 'Firebase'] },
    { key: 'Database', label: 'Data & Systems', icon: Layers, filterTags: ['DBMS', 'SQL', 'Data Modeling', 'PostgreSQL'] },
];

// --- COMPONENTS ---

// Navbar Component
const Navbar = ({ sections, onNavClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const MenuIcon = isOpen ? X : Menu;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-xl border-b border-indigo-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-extrabold text-indigo-400 tracking-wider">TAD</span>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        {sections.map(({ id, label }) => (
                            <a key={id} href={`#${id}`} onClick={() => onNavClick(id)}
                               className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition duration-300 transform hover:-translate-y-0.5"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {sections.map(({ id, label }) => (
                        <a key={id} href={`#${id}`} onClick={() => { onNavClick(id); setIsOpen(false); }}
                           className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300"
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

// Section Header
const SectionHeader = ({ icon: Icon, title }) => (
    <h2 className="text-4xl font-extrabold text-white mb-10 flex items-center">
        <Icon className="w-8 h-8 mr-4 text-indigo-400" />
        {title}
    </h2>
);

// Hero Section
const Hero = () => (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            {/* Subtle background pattern (geometric shapes) */}
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="720" cy="400" r="300" fill="url(#grad1)" opacity="0.3"/>
                <circle cx="100" cy="100" r="50" fill="url(#grad2)" opacity="0.5"/>
                <defs>
                    <radialGradient id="grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(720 400) scale(300)">
                        <stop stopColor="#6366F1"/>
                        <stop offset="1" stopColor="#111827" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) scale(50)">
                        <stop stopColor="#10B981"/>
                        <stop offset="1" stopColor="#111827" stopOpacity="0"/>
                    </radialGradient>
                </defs>
            </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xl text-indigo-400 font-semibold mb-3">Hello, I'm Tanjid Alam Dhrubo.</p>
            <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-none mb-6">
                {profileData.tagline.split('|')[0].trim()}
                <br/>
                <span className="text-gray-400 block mt-2 text-4xl md:text-6xl font-light">{profileData.tagline.split('|')[1].trim()}</span>
            </h1>
            <p className="max-w-3xl text-lg text-gray-300 mb-10">{profileData.summary}</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#projects" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] flex items-center justify-center">
                    <Layers className="w-5 h-5 mr-2" /> View Projects
                </a>
                <a href={`mailto:${profileData.contact.email}`} className="px-8 py-3 bg-gray-800 border border-indigo-600 text-indigo-400 font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02] flex items-center justify-center">
                    <Feather className="w-5 h-5 mr-2" /> Get in Touch
                </a>
            </div>
        </div>
    </section>
);

// Skills Section
const Skills = () => (
    <section id="skills" className="py-20 bg-gray-900 border-t border-indigo-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={Code} title="Technical Toolkit" />

            {/* Programming & Databases */}
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">Languages & Databases</h3>
                <div className="flex flex-wrap gap-4">
                    {profileData.skills.programming.map(skill => (
                        <div key={skill} className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-300 transition duration-300 hover:bg-indigo-500/20 hover:text-indigo-300 transform hover:scale-105">
                            {skill}
                        </div>
                    ))}
                    {profileData.skills.databases.map(skill => (
                        <div key={skill} className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-300 transition duration-300 border border-gray-700 hover:border-indigo-500/50 hover:text-indigo-300 transform hover:scale-105">
                            <span className="text-indigo-300 mr-2">•</span>{skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Competencies */}
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">Key Competencies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profileData.skills.competencies.map(comp => (
                        <div key={comp} className="p-4 bg-gray-800 rounded-lg border border-gray-700 flex items-center transition duration-300 hover:border-indigo-500">
                            <Zap className="w-5 h-5 text-indigo-500 flex-shrink-0 mr-3" />
                            <span className="text-gray-200 text-base">{comp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// Project Card Component
const ProjectCard = ({ project }) => (
    <div className="p-6 bg-gray-800/80 rounded-xl border border-gray-700 hover:border-indigo-500 transition duration-300 transform hover:shadow-2xl hover:bg-gray-800 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
             <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
             <span className="text-xs font-semibold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">{project.type}</span>
        </div>

        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-700/50">
            <h4 className="text-sm font-medium text-indigo-300 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-700 text-gray-300 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

// Projects Section
const Projects = () => {
    const [activeTab, setActiveTab] = useState(SKILL_TABS[0].key);

    const filteredProjects = useCallback(() => {
        if (activeTab === 'All') {
            return projects;
        }
        
        const filterTags = SKILL_TABS.find(tab => tab.key === activeTab)?.filterTags || [];

        return projects.filter(project => 
            project.tags.some(tag => filterTags.includes(tag))
        );
    }, [activeTab]);

    const displayProjects = filteredProjects();

    return (
        <section id="projects" className="py-20 bg-gray-800 border-t border-indigo-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader icon={Layers} title="Showcase Projects" />

                {/* Interactive Tabs */}
                <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-700 pb-4">
                    <button
                        onClick={() => setActiveTab('All')}
                        className={`px-5 py-2 rounded-lg font-medium transition duration-300 flex items-center ${activeTab === 'All' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        <Activity className="w-5 h-5 mr-2" /> All Projects
                    </button>
                    {SKILL_TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2 rounded-lg font-medium transition duration-300 flex items-center ${activeTab === tab.key ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                <Icon className="w-5 h-5 mr-2" /> {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProjects.length > 0 ? (
                        displayProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full p-8 bg-gray-700/50 rounded-xl text-center text-gray-400">
                            No projects match the selected filter.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// Experience/Education Section
const Experience = () => (
    <section id="experience" className="py-20 bg-gray-900 border-t border-indigo-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader icon={Briefcase} title="Experience & Education" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Work Experience Card */}
                <div className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-green-500/50 transition duration-300">
                    <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                        <h3 className="text-2xl font-bold text-white">Work Experience</h3>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                        <p className="text-lg font-semibold text-green-400">{profileData.work.title}</p>
                        <p className="text-gray-300 mb-1">{profileData.work.company}</p>
                        <p className="text-sm text-gray-500 mb-3">{profileData.work.duration}</p>
                        <p className="text-gray-400">{profileData.work.description}</p>
                    </div>
                </div>

                {/* Education Card */}
                <div className="p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-indigo-500 transition duration-300">
                    <div className="flex items-center mb-4">
                        <BookOpen className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0" />
                        <h3 className="text-2xl font-bold text-white">Education</h3>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                        <p className="text-lg font-semibold text-indigo-400">{profileData.education.degree}</p>
                        <p className="text-gray-300 mb-1">{profileData.education.institution}</p>
                        <p className="text-sm text-gray-500 mb-3">Graduation: {profileData.education.gradDate}</p>
                        <ul className="text-gray-400 space-y-1">
                            <li><span className="font-medium text-white">CGPA:</span> {profileData.education.gpa}</li>
                            <li><span className="font-medium text-white">Focus:</span> {profileData.education.concentrations}</li>
                            <li><span className="font-medium text-white">Note:</span> Chairman's Distinguished Scholarship</li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
);


// Footer/Contact Section
const Footer = () => (
    <footer id="contact" className="py-12 bg-gray-800 border-t border-indigo-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-lg text-gray-400 mb-8">
                I'm currently seeking new opportunities and collaborations in AI and Full-Stack development.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
                <a href={`mailto:${profileData.contact.email}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center px-6 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                    <Feather className="w-5 h-5 mr-2" /> Email Me
                </a>
                <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer"
                   className="flex items-center px-6 py-3 bg-gray-700 rounded-lg text-indigo-400 font-medium border border-indigo-600 hover:bg-gray-600 transition duration-300 transform hover:scale-105"
                >
                    <User className="w-5 h-5 mr-2" /> LinkedIn Profile
                </a>
                <div className="flex items-center px-4 py-3 bg-gray-700/50 rounded-lg text-gray-300 font-medium">
                    <span className="text-sm font-light mr-2">Phone:</span> {profileData.contact.phone}
                </div>
            </div>
            
            <p className="mt-12 text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Tanjid Alam Dhrubo. Designed minimally and built with React/Tailwind.
            </p>
        </div>
    </footer>
);

// Main App Component
const App = () => {
    // Define the sections for the navigation bar
    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Career' },
        { id: 'contact', label: 'Contact' },
    ];

    // Function to handle smooth scrolling
    const handleNavClick = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };
    
    // Custom cursor follower effect
    const CursorFollower = () => {
        useEffect(() => {
            const cursor = document.getElementById('cursor-follower');
            if (!cursor) return;

            const moveCursor = (e) => {
                cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
            };

            document.addEventListener('mousemove', moveCursor);

            // Add hover effect for interactive elements
            const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .hover\\:scale-105');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('scale-150', 'opacity-50'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('scale-150', 'opacity-50'));
            });

            return () => {
                document.removeEventListener('mousemove', moveCursor);
                interactiveElements.forEach(el => {
                    el.removeEventListener('mouseenter', () => cursor.classList.add('scale-150', 'opacity-50'));
                    el.removeEventListener('mouseleave', () => cursor.classList.remove('scale-150', 'opacity-50'));
                });
            };
        }, []);

        return (
            <div id="cursor-follower" className="hidden lg:block fixed top-0 left-0 w-5 h-5 bg-indigo-500 rounded-full pointer-events-none transition-all duration-150 ease-out z-[9999] opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
        );
    };


    return (
        <div className="min-h-screen bg-gray-900 text-white selection:bg-indigo-700 selection:text-white">
            <Navbar sections={sections} onNavClick={handleNavClick} />
            
            <main>
                <Hero />
                <Skills />
                <Projects />
                <Experience />
            </main>
            
            <Footer />
            <CursorFollower />
        </div>
    );
};

export default App;
