'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Menu, X, MapPin, Calendar } from 'lucide-react';
import Script from "next/script";
import TypeLooper from '@/components/TypeLooper';
import type { Testimonial } from "../components/Testimonials"; //sadece kullanılan tipleri import et ! 
//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// Ana Bileşen
//-------------------------------------------------------------------------------
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleElements, setVisibleElements] = useState(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (entry.target as HTMLElement).id) {
            const id = (entry.target as HTMLElement).id;
            setVisibleElements((prev) => new Set([...Array.from(prev), id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };
    

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // NOTE: remote ikonlar için next.config.js -> images.domains: ['cdn.jsdelivr.net']
  const skills = [
    { name: 'C#', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', level: 95 },
    { name: '.NET Core', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', level: 90 },
    { name: 'ASP.NET', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', level: 95 },
    { name: 'SQL Server', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', level: 88 },
    { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 85 },
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 82 },
    { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 80 },
    { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 90 },
    { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', level: 85 },
    { name: 'Bootstrap', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg', level: 80 },
    { name: 'GitHub', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', level: 85 },
    { name: 'Entity Framework', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', level: 85 },
    

  ];

  const experiences = [
    {
      company: 'Sahinbey Municipality',
      logo: '/sahinbey-logo.jpg',
      position: 'Software Developer',
      period: 'September 2025 - Present',
      location: 'Gaziantep, Turkey',
      description:
        'I am responsible for the development and maintenance of municipal applications. My role includes system architecture, back-end development, and web application development. I build applications from scratch and deliver them to end users.',
      technologies: ['.NET', 'ASP.NET Web API', 'React', 'Tailwind CSS- Bootstrap', 'MSSQL'],
      achievements: [
        'I took an active role in software architecture and development processes in corporate projects.',
        'I developed high-performance and scalable applications.',
        'I designed multi-user architectures.',
      ],
    },
    {
      company: 'SANKO Holding',
      logo: '/sanko-logo.png',
      position: 'Software Developer Intern',
      period: 'Feruary 2025 - June 2025',
      location: 'Gaziantep, Turkey',
      description:
        'During my internship, I contributed to web-based development using .NET Core. I performed API integration and database operations. I also worked on data models and CRUD processes using EF Core and SQL Server.',
      technologies: ['ASP.NET Web API (8.0)', 'MSSQL', 'Blazor', 'Bootstrap', 'Git', 'GitHub'],
      achievements: ['I ensured end-to-end digitalization and automation in corporate processes.',
         'I contributed to the team with modern technologies.'
        ],
    },
    {
      company: 'HA5 R&D Innovation and Design Industry Ltd. Co.',
      
      position: 'Managament Infortmation Systems Expert',
      period: 'June 2023 - October 2023',
      location: 'Gaziantep, Turkey',
      description:
        'I developed desktop applications aimed at digitizing internal processes. I developed an application that included user management, data operations, and reporting using C#/.NET Framework and SQL Server.',
      technologies: ['ASP.NET MVC', 'MSSQL', 'Entity Framework', 'JQuery', 'Ajax'],
      achievements: ['I developed an application from scratch for warehouse and inventory management'],
    },
  ];

  const projects = [
    {
      title: 'Energy Data Collection',
      description:
        'During my internship, I developed modular software for collecting, processing, and visualizing energy consumption data. Data operations with .NET Core, EF Core, and SQL Server; interface with ASP.NET Core MVC.',
      tech: ['.NET Core', 'Entity Framework', 'MS SQL'],
      github: 'https://github.com/TufanYilmaz/EnerjiVeritoplamaTanimlama',
      image: '/enerji.jpeg',
    },
    {
      title: '.NET Core AI',
      description:
        'OpenAI (Chat, Whisper, DALL·E), Google Vision & Tesseract OCR, RapidAPI integrations with 20+ layered projects in a single solution; various demos with ASP.NET MVC, EF Core & SQL Server.',
      tech: ['ASP.NET MVC', 'MSSQL / T-SQL', 'Bootstrap', 'ASP.NET Web API'],
      github: 'https://github.com/MehmetKarpuzx/NetCoreAI',
      image: '/netcoreai.jpeg',
    },
    {
      title: 'SANShine Company Managament Portal',
      description:
        'Portal that digitizes corporate processes: ASP.NET MVC multi-layer architecture, EF Core/ADO.NET data access, RBAC authorization, responsive UI, dynamic content with jQuery & AJAX.',
      tech: ['.NET Core', 'MS SQL', 'Entity Framework Core'],
      github: 'https://github.com/MehmetKarpuzx/SANShineCompanyManagamentPortal',
      image: '/sanshine.jpeg',
    },
  ];

  const testimonials: Testimonial[] = [
  {
    name: "Tufan Yılmaz",
    role: "Computer Engineer",
    company: "Sanko Holding",
    quote: "I worked with Mehmet during his internship. He quickly grasped new topics in the .NET/ASP.NET area and quickly became productive. He prioritizes code quality, takes constructive feedback into account in PRs, and delivers his assignments on time. His problem-solving approach, eagerness to learn, and communication within the team make him a trustworthy colleague.",
    avatarSrc: "/people/tufanyilmaz.jpg",
    link: "https://linkedin.com/in/yilmaztufan"
  },
  {
    name: "Mahmut Kantar",
    role: "SAP MII MES Developer Manager",
    company: "Sanko Holding",
    quote: "He’s added value to our team in a short time. He's attentive to EF Core and SQL, open to feedback, and has strong communication skills. He's a reliable developer who delivers on the job with proactive behavior.",
    avatarSrc: "/people/mahmutkantar.jpg",
    link: "https://linkedin.com/in/mahmutkantar"
  },
  {
    name: "Recep Doğan",
    role: "Dart & Flutter Mobile Developer",
    company: "Sahinbey Municipality",
    quote: "Mehmet is a hardworking, honest, and responsible team member. He communicates clearly and doesn’t give up in the face of challenges. He approaches feedback with humility, has an exemplary work ethic, is highly motivated to learn, and is a software developer who doesn't hesitate to support his teammates.",
    avatarSrc: "/people/recepdogan.jpg",
   
    link: "https://linkedin.com/in/recep-doğan-ab931322b"
  },
   {
    name: "Volkan Kamalak",
    role: "Computer Engineer",
    company: "Sanko Holding",
    quote: "He’s a productive, hard-working, and determined young man. He's open and eager to learn new technologies. He's a team player and a strong communicator. I believe he'll achieve great things if he continues to improve himself.",
    avatarSrc: "/people/volkankamalak.jpg",
    link: "https://linkedin.com/in/volkan-kamalak-8898b0b5"
  },
   {
    name: "Mert İyibiçer",
    role: "Computer Engineer",
    company: "",
    quote: "While interning with Mehmet, I was most impressed by his discipline and solution-oriented approach. He breaks down complex tasks into pieces and executes them quickly, providing clear and constructive feedback on PRs. He is a reliable, collaborative teammate who adds real value to the team.",
    avatarSrc: "/people/mertiyibicer.jpg",
    link: "https://linkedin.com/in/mert-iyibiçer-5331aa256"
  },
   {
    name: "Kerem Emir Ercan",
    role: "Software Engineer",
    company: "",
    quote: "Interning on the same team as Mehmet was a great opportunity. He quickly grasps difficult topics and produces clean, sustainable solutions; he's constructive and clear in his code reviews. He's a teammate who inspires confidence in both technical and communication skills.",
    avatarSrc: "/people/kerememirercan.jpg",
    link: "https://linkedin.com/in/kerem-emir-ercan-03914a239"
  },
  
];


  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              <Image src="/mehmetkarpuz-kisisel-logo.png" alt="Mehmet Karpuz" width={160} height={40} className="h-10 w-auto" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Homepage' },
                { id: 'about', label: 'About Me' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                 { id: 'testimonials', label: 'Testimonials' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`capitalize transition-colors duration-300 hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-2 space-y-2">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Me' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 px-3 rounded hover:bg-slate-700 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="z-10 px-4 w-full">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Texts */}
            <div className="md:w-2/3 w-full text-center md:text-left md:pr-12 mt-8 md:mt-0">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Mehmet Karpuz <span className="text-purple-400">Software Developer</span>
              </h1>

              <div className="flex justify-center md:justify-start space-x-6 mb-12">
                <a href="https://github.com/MehmetKarpuzx" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/mehmet-karpuz/" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mehmetkarpuz.business@gmail.com" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Profile Video */}
            <div className="md:w-1/3 w-full flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="w-64 h-64 md:w-100 md:h-100 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <video src="/yazilim.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse Animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => scrollToSection('about')}>
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="fade-up"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('about-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="about-title"
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-animate="fade-right"
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                visibleElements.has('about-content') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              id="about-content"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello, I’m Mehmet Karpuz, a Software Developer. I graduated from Iskenderun Technical University, Department of Management Information Systems, with a GPA of 3.48/4. I’ve been a part of the software ecosystem for about a year and, driven by a passion for continuous learning, I’m constantly improving myself. I continue to add value to companies with my projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">I design and develop scalable and high-performance web applications with Microsoft technologies.</p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Web Application Development',
                  'API ve Service Development',
                  'Database Solutions',
                  'Corporate Projects',
                  'Team and Version Control',
                  'CRM (Customer Relationship Management)',
                  'AI Project Development',
                ].map((tag, index) => (
                  <span key={tag} className="px-4 py-2 bg-blue-600/20 rounded-full text-sm border border-blue-500/30 transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              data-animate="fade-left"
              className={`relative transition-all duration-1000 delay-500 ${visibleElements.has('about-image') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              id="about-image"
            >
              <div className="w-80 h-110 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Image src="/mehmetkarpuz.png" alt="Mehmet Karpuz" width={400} height={400} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="fade-up"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('skills-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="skills-title"
          >
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                data-animate="fade-up"
                className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  visibleElements.has(`skill-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`skill-${index}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg mr-3">
                    <Image src={skill.iconUrl} alt={skill.name} width={24} height={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            data-animate="fade-up"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('experience-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="experience-title"
          >
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-animate="fade-up"
                className={`bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 ${
                  visibleElements.has(`exp-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`exp-${index}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 flex flex-col items-start">
                    <div className="flex items-center mb-2">
                      {exp.logo && (
                        <Image
                          src={exp.logo.startsWith('/') ? exp.logo : `/${exp.logo}`}
                          alt={`${exp.company} logo`}
                          width={40}
                          height={40}
                          className="object-contain rounded bg-white p-1 mr-3 border border-slate-700"
                        />
                      )}
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                        </div>
                        <p className="text-blue-400 font-semibold mb-2">{exp.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-600/20 rounded-full text-sm border border-blue-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">Contributions:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2
            data-animate="fade-up"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="projects-title"
          >
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                data-animate="fade-up"
                className={`bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  visibleElements.has(`project-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`project-${index}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-48 relative overflow-hidden bg-white">
                  <Image
                    src={project.image.startsWith('/') ? project.image : `/${project.image}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-600/20 rounded-full text-sm border border-blue-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
<section id="testimonials" className="py-20 px-4 bg-slate-900">
  <div className="max-w-7xl mx-auto">
    <h2
      data-animate="fade-up"
      className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
        visibleElements.has('testimonials-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      id="testimonials-title"
    >
      Testimonials
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((t, index) => (
        <div
          key={index}
          data-animate="fade-up"
          className={`bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
            visibleElements.has(`testimonial-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          id={`testimonial-${index}`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          {/* Üst görsel alanı: avatarı proje görseli gibi üstte göster */}
          <div className="h-48 relative overflow-hidden bg-white/5 flex items-center justify-center">
            <Image
              src={t.avatarSrc}
              alt={`${t.name} fotoğrafı`}
              width={128}
              height={128}
              className="rounded-full object-cover ring-2 ring-slate-200/50"
              priority={index === 0}
            />
          </div>
          {/* İçerik */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="text-sm text-gray-400">{[t.role, t.company].filter(Boolean).join(' • ')}</p>
              </div>

              {/* İsteğe bağlı küçük yıldızlar */}
         {typeof t.rating === 'number' && (() => {
  const r = Math.round(t.rating ?? 0); // <-- güvenli sayı
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${r}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < r ? 'fill-yellow-400' : 'fill-slate-600'}`}
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
        </svg>
      ))}
    </div>
  );
})()}
            </div>

            <p className="text-gray-300">“{t.quote}”</p>

            {t.link && (
              <a href={t.link} target="_blank" rel="noreferrer" className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors">
                Github Profile
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            data-animate="fade-up"
            className={`text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="contact-title"
          >
            Contact
          </h2>
          <p
            data-animate="fade-up"
            className={`text-xl text-gray-300 mb-12 transition-all duration-1000 delay-200 ${
              visibleElements.has('contact-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="contact-subtitle"
          >
            Let’s work together for new projects!
          </p>
          <div className="flex justify-center space-x-8 mb-12">
            {[
              { icon: <Github className="w-8 h-8" />, label: 'GitHub', href: 'https://github.com/MehmetKarpuzx' },
              { icon: <Linkedin className="w-8 h-8" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehmet-karpuz/' },
              { icon: <Mail className="w-8 h-8" />, label: 'E-Mail', href: 'mailto:mehmetkarpuz.business@gmail.com' },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                data-animate="fade-up"
                className={`flex flex-col items-center group transition-all duration-1000 ${
                  visibleElements.has(`contact-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`contact-${index}`}
                style={{ transitionDelay: `${index * 150 + 400}ms` }}
              >
                <div className="p-4 bg-blue-600/20 rounded-full group-hover:bg-blue-600/30 transition-all duration-300 group-hover:scale-110 mb-3">
                  {social.icon}
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors">{social.label}</span>
              </a>
            ))}
          </div>
          <button
            data-animate="fade-up"
            className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              visibleElements.has('contact-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="contact-button"
            style={{ transitionDelay: '700ms' }}
            onClick={() => window.open('mailto:mehmetkarpuz.business@gmail.com', '_blank')}
          >
            Contact Me
          </button>
        </div>
        <div className="mt-10 flex justify-center">
        <div className="text-center font-mono text-lg text-slate-300 w-[40ch] whitespace-nowrap">
          <TypeLooper
            texts={[
               "Clean code, fast APIs and happy users.",
               ".NET + React for reliable products.",
               "Open to new projects — say hi!"
           ]}
             typingSpeed={55}
             eraseSpeed={30}
             pause={1200}
         />
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p className="mb-4 md:mb-0">© 2025 Mehmet Karpuz. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Script src="/js/chatbot-config.js"  strategy="beforeInteractive" />
      <Script src="/js/chatbot-widget.js"  strategy="afterInteractive" />
      <Script src="/js/kapo-eggs.js"       strategy="afterInteractive" />
      <Script src="/js/kapo-joy.js"        strategy="afterInteractive" />
    </div>
    
  );
};
export default Portfolio;
