'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Users, MapPin, Calendar } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
 

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id) {
              setVisibleElements(prev => new Set([...prev, entry.target.id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
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

 
  const skills = [
    { name: 'C#', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-6 h-6" />, level: 95 },
    { name: 'ASP.NET', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" alt="ASP.NET" className="w-6 h-6" />, level: 95 },
    { name: 'Angular', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" className="w-6 h-6" />, level: 90 },
    { name: 'SQL Server', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="SQL Server" className="w-6 h-6" />, level: 88 },
    { name: 'MongoDB', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-6 h-6" />, level: 85 },
    { name: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-6 h-6" />, level: 87 },
    { name: 'JavaScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-6 h-6" />, level: 85 },
    { name: 'Node.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-6 h-6" />, level: 82 },
    { name: 'Docker', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-6 h-6" />, level: 80 },
    { name: 'Azure', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure" className="w-6 h-6" />, level: 78 },
 { name: 'AWS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-6 h-6" />, level: 75 },    { name: 'Git', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-6 h-6" />, level: 85 },
  ];
  const experiences = [
      {
      company: "Teori Bilgisayar Yazılım ve Dan.Hiz.Ltd.Şti.",
      logo: "https://teori.com.tr/wp-content/uploads/2023/03/teori-logo.jpg",
      position: "Kıdemli Yazılım Geliştirici",
      period: "Haziran 2025 - Günümüz",
      location: "İstanbul, Türkiye",
      description:
        "Şirket uygulamalarının geliştirilmesinden ve bakımından sorumluyum. Rolüm sistem mimarisi tasarımı, arka uç geliştirme ve web uygulaması geliştirme içeriyor. Bilgi ve deneyimimden yararlanarak, uygulamalar sıfırdan oluşturuyorum ve bunları son kullanıcılara teslim ediyorum. Geliştirdiğim projeler arasında otomasyon kontrol sistemleri, bina yönetim sistemleri ve üretim izleme yazılımı yer alıyor",
      technologies: [
        ".NET",
        "ASP.NET Web API",
        "React",
        "Redux - Zustand",
        "Tailwind CSS- Bootstrap",
        "Angular 15-17",
        "PostgreSQL",
        "MongoDB",
        "MSSQL",
        "Docker",
        "Azure",
        "DDD"
      ],
      achievements: [
        "Kurumsal projelerde yazılım mimarisi ve geliştirme süreçlerini yönettim.",
        "Sistem mimarisi ve teknik mentorluk yaptım.",
        "Modern yazılım geliştirme pratiklerini ekibe kazandırdım.",
        "Yüksek performanslı ve ölçeklenebilir uygulamalar geliştirdim.",
        "Çok kullanıcılı ve çok kiracılı mimariler tasarladım."
      ]
    },
    {
      company: "ASD Laminat",
      logo: "https://www.asdlaminat.com/assets/2018/10/logo-asd-laminate.png",
      position: "Yazılım Uzmanı",
      period: "Aralık 2024 - Haziran 2025",
      location: "Düzce, Türkiye",
      description:
        "SAP kullanarak bir fabrika ortamında verimliliği artırmak ve yüksek kaliteli süreçleri sağlamak için tasarlanmış bir uygulama paketine katkıda bulunmak. Hammadde alımından üretim sırasında OEE (Genel Ekipman Etkinliği) takibine, ürün kalite kontrolüne ve sevkiyat yönetimine kadar işlemleri uçtan uca yöneten ve izleyen çözümler geliştirmek. Uygulamalar, fabrika içindeki MES/MOM çözümleriyle sorunsuz entegre olur ve satış ve tedarik için hızlandırılmış iş akışları, sağlam müşteri ilişkileri yönetimi (CRM) araçları ve belirli iş ihtiyaçlarını karşılamak için özelleştirilmiş bağımsız SAP modülleri içerir",
      technologies: [
        "ASP.NET Web API (8.0)",
        "Siemens S7",
        "Modbus",
        "Dapper",
        "MSSQL",
        "Angular 15-17",
        "Blazor",
        "DevExtreme",
        "RxJS",
        "Bootstrap",
        "Docker",
        "TypeScript",
        "Git",
        "GitHub",
        "DDD"
      ],
      achievements: [
        "Fabrika süreçlerinde uçtan uca dijitalleşme ve otomasyon sağladım.",
        "MES/MOM ve SAP entegrasyonları ile operasyonel verimlilik artırıldı.",
        "Satış, satın alma ve sevkiyat süreçlerinde iş akışlarını hızlandıran uygulamalar geliştirdim."
      ]
    },
    {
      company: "İlke Ambalaj San. ve Tic. A.Ş.",
      logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFWN6coW_NxKg/company-logo_200_200/company-logo_200_200/0/1630474335550?e=1759968000&v=beta&t=MB-RCCEUGZMK0hzV5TGkLVMrjGNKOcPj_RkdQD6n3u0",
      position: "Yazılım Uzmanı",
      period: "Kasım 2023 - Ekim 2024",
      location: "Gaziantep, Türkiye",
      description:
        "ERP yazılımını, hammadde tedarikinden müşteri sevkiyatına ve satın almadan vardiya takibine kadar tüm operasyonel süreçleri yönetmek ve iyileştirmek için özelleştiriyorum. Bu çözüm, tüm iş birimleri için entegre bir ortam sağlayarak iş akışlarını optimize ediyor, raporlamayı geliştiriyor ve otomatik e dokümantasyon sunuyor. Proje boyunca, süreç verimliliğini ve uyarlanabilirliği artırmak için ölçeklenebilir ve esnek bir mimari üzerine odaklanıyorum.",
      technologies: [
        "ASP.NET (8) MVC",
        "MSSQL",
        "T-SQL",
        "MongoDB",
        "Entity Framework",
        "Angular.js",
        "DevExtreme",
        "JQuery",
        "Ajax",
        "TFS",
        "Docker",
        "Azure",
        "IIS"
      ],
      achievements: [
        "Tüm iş birimlerini entegre eden ERP çözümü geliştirdim.",
        "Agile ve CI/CD metodolojileriyle geliştirme süreçlerini yönettim.",
        "Raporlama ve otomatik e-belge süreçlerini optimize ettim."
      ]
    },
    {
      company: "ADeko Technologies",
      logo: "https://www.adeko.com/wp-content/uploads/2016/12/Adeko-Technologies-Logo.png",
      position: "Yazılım Uzmanı Yardımcısı",
      period: "Mayıs 2023 - Ağustos 2023",
      location: "Nilüfer, Bursa, Türkiye",
      description:
        "aDeko CAD ve CAM uygulamasıyla (XAML kullanarak) entegre edilmiş bir CRM (Assistcool) sistemi geliştirdim, uygulamaya bağlı ürünlerin operasyonlarını yönetmek ve  takip etmek için. CRM uygulaması, tasarım, üretim planlaması, malzeme tedariki  ve sevkiyat gibi süreçleri kapsayan kapsamlı bir çözüm sunuyor. Ek olarak,  uygulama raporlama yetenekleri sunuyor ve müşteri kullanıcı deneyimini  geliştirmeye odaklanıyor.",
      technologies: [
        "C#",
        "ASP.NET MVC",
        "MSSQL",
        "T-SQL",
        "Bootstrap",
        "Entity Framework",
        "XAML",
        "Git",
        "BitBucket"
      ],
      achievements: [
        "CAD/CAM uygulamalarıyla entegre CRM sistemi geliştirdim.",
        "Kullanıcı deneyimini artıran raporlama ve takip modülleri ekledim.",
        "Versiyon kontrolü ve proje yönetiminde aktif rol aldım."
      ]
    },
    {
      company: "İletişim Yazılım",
      logo: "https://www.iletisimyazilim.com/application/themes/mediaclick/assets/img/logo.svg",
      position: "Yazılım Uzmanı Stajyeri",
      period: "Şubat 2023 - Mayıs 2023",
      location: "Bursa, Türkiye",
      description:
        "PLC makineleri PLC makinelerinin iletişim altyapısını ASP.NET MVC çerçevesini kullanarak bir kullanıcı  arayüzüne entegre ettim. Bu, makine verilerinin gerçek zamanlı izlenmesine ve  kontrolüne olanak sağladı. Geliştirdiğim panel aracılığıyla kullanıcılar makineleri uzaktan  yönetebiliyor ve kontrol edebiliyor. Bu çözüm, operatörlerin makinelerle etkili bir şekilde  etkileşime girmesini sağlıyor ve süreçleri optimize ediyornin iletişim altyapısını ASP.NET MVC ile kullanıcı arayüzüne entegre ettim. Gerçek zamanlı veri izleme ve uzaktan kontrol imkanı sağladım.",
      technologies: [
        "ASP.NET MVC",
        "Bootstrap",
        "Entity Framework",
        "PLC",
        "C#"
      ],
      achievements: [
        "Gerçek zamanlı makine izleme ve kontrol paneli geliştirdim.",
        "Operatörlerin makinelerle etkileşimini kolaylaştırdım.",
        "Üretim süreçlerinde verimlilik ve izlenebilirlik sağladım."
      ]
    }
  ];

 const teamMembers = [
    {
      name: "Talha Önder",
      role: "Mobil Geliştirici",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQG4G98nHpw_eA/profile-displayphoto-shrink_400_400/B4DZcHnMdSG8Ao-/0/1748179407228?e=1754524800&v=beta&t=YLsD-jh8Fq3PvYgY6XTUJ5ntwupTCgqWcS9RuLQx9VE",
      linkedin: "https://www.linkedin.com/in/talhaonder/",
      github: "https://github.com/talhaonder",
      portfolio: "https://talhaonder.com/", 
      skills: ["React Native", "JavaScript", "NodeJs","Firebase"],
      isImageUrl: true
    },
    {
      name: "Yunus Emre Öneç",
      role: "Full-Stack Geliştirici",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEuXSibu0t17w/profile-displayphoto-shrink_200_200/B4DZccLXfBIEAk-/0/1748524433459?e=1754524800&v=beta&t=68c5M56S9t-zI_vFnKBPRGns_depNKpd_qH2rLWZqIU",
      linkedin: "https://www.linkedin.com/in/yunusemreonec/", 
      github: "http://github.com/yunusonec",
      portfolio: "https://www.yunusemreonec.com/", 
      skills: ["ASP.NET","TypeScript" ,"Angular", "MsSQL","Devexpress"],
      isImageUrl: true
    },
  ];
  const projects = [
    {
      title: "Ignisfer",
      description: "Ignisfer, kampçılar için tasarlanmış bir sosyal medya ve blog platformudur. Uygulama, kullanıcıların kamp deneyimlerini paylaşmalarına, detaylı blog yazıları yazmalarına, kamp alanları hakkında bilgi edinmelerine ve benzer ilgi alanlarına sahip insanlarla bağlantı kurmalarına olanak tanır",
      tech: [".NET Core","Python", "Azure", "Redis","RabbitMQ", "AWS", "MongoDB", "React Native", "PostgreSQL","Docker","GraphQL"],
      demo: "https://ignisfer.com/",
      github: "#",
      image: "https://ignisfer.com/favicon.ico",
      isImageUrl: true
    },
    {
      title: "KENT ERP",
      description: "Fabrika içi operasyonel süreçleri ve müşteri ilişkilerini yöneten, Logo ERP entegrasyonu ile finans ve muhasebe işlemlerini merkezi hale getiren kurumsal bir uygulama geliştirdim. Satın alma, üretim, sevkiyat ve CRM süreçlerini dijitalleştirerek iş akışlarını hızlandırdım ve süreç verimliliğini artırdım.",
      tech: ["ASP.NET MVC","Angular.JS", "MSSQL / T-SQL", "Bootstrap", "Entity Framework", "IIS"],
      demo: "https://erp.ilkeambalaj.com/",
      github: "#",
      image: "https://media.licdn.com/dms/image/v2/C4D0BAQFWN6coW_NxKg/company-logo_200_200/company-logo_200_200/0/1630474335550?e=1759968000&v=beta&t=MB-RCCEUGZMK0hzV5TGkLVMrjGNKOcPj_RkdQD6n3u0",
      isImageUrl: false
    },
  {
      title: "Ignisfer Manage - Kamp Yönetim Sistemi",
      description: " Ignisfer Manage, kamp işletmecileri için tasarlanmış kapsamlı bir kamp yönetim sistemidir. Bu uygulama, kamp rezervasyonlarını, müşteri ilişkilerini ve operasyonel süreçleri tek bir platformda yönetmeyi kolaylaştırır. Kullanıcı dostu arayüzü ve güçlü özellikleriyle kamp sahiplerine işlerini daha verimli ve etkili bir şekilde yürütme imkanı sunar.",
      tech: ["React", ".NET Core", "PostgreSQL","Docker","Çok Kiracılı Mimari","CQRS", "Event Sourcing", "Redis", "RabbitMQ"],
      demo: "https://github.com/kaya2m/net-bys",
      github: "#",
      image: "https://ignisfer.com/logo/ignisfer-logo.svg"
    },
    {
      title: "ASD Soft V2 ",
      description: "ASD Soft V2, üretim süreçlerini optimize etmek ve verimliliği artırmak için tasarlanmış kapsamlı bir üretim yönetim/takip çözümüdür. Bu uygulama, üretim planlaması, malzeme yönetimi, kalite kontrol ve iş gücü yönetimi gibi temel işlevleri entegre ederek işletmelerin operasyonel verimliliğini artırmalarına yardımcı olur.",
      tech: [".NET Core", "DevExpress", "SQL Server","SAP HANA" ,"MSSQL", "Angular 15-17", "Docker", "Azure"],
      github: "#",
      image: "https://avatars.githubusercontent.com/u/192769476?s=200&v=4"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          <img src="/kisisel-logo.png" alt="" className="h-10 w-auto" />
        </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                {id: 'home', label: 'Ana Sayfa'},
                {id: 'about', label: 'Hakkımda'},
                {id: 'skills', label: 'Yetenekler'},
                {id: 'experience', label: 'Deneyim'},
                {id: 'projects', label: 'Projeler'},
                {id: 'team', label: 'Takım'},
                {id: 'contact', label: 'İletişim'}
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
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-2 space-y-2">
              {[
                {id: 'home', label: 'Ana Sayfa'},
                {id: 'about', label: 'Hakkımda'},
                {id: 'skills', label: 'Yetenekler'},
                {id: 'experience', label: 'Deneyim'},
                {id: 'projects', label: 'Projeler'},
                {id: 'team', label: 'Takım'},
                {id: 'contact', label: 'İletişim'}
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
            {/* Yazılar */}
            <div className="md:w-2/3 w-full text-center md:text-left md:pr-12 mt-8 md:mt-0">
              <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Muhammet Kaya  <span className="text-purple-400">Yazılım Uzmanı</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto md:mx-0">
                ASP.NET, Angular, Node.Js ve modern web teknolojileri ile <br />
                <span className="text-blue-400">ERP, CRM, MES</span> ve <span className="text-purple-400">Sosyal Medya</span> sistemleri geliştiriyorum
              </p>
              <div className="flex justify-center md:justify-start space-x-6 mb-12">
                <a href="https://github.com/kaya2m" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/muhammet-kaya-60b36b213/" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mkaya349@hotmail.com" className="p-3 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-all duration-300 hover:scale-110">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            {/* Profil Fotoğrafı */}
            <div className="md:w-1/3 w-full flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img src="/kisisel-foto.jpg" alt="Muhammet Kaya" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mouse Animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center cursor-pointer hover:border-blue-300 transition-colors"
            onClick={() => scrollToSection('about')}
          >
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
            Hakkımda
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
                Ben Muhammet, Yazılım Geliştirme Uzmanı&apos;yım. Bursa Uludağ Üniversitesi&apos;nden mezun oldum. Yaklaşık 4 yıldır yazılım ekosisteminin bir parçasıyım ve sürekli öğrenme ve gelişme tutkusuyla kendimi geliştiriyorum. Hem kendimi hem de üstlendiğim görevleri en iyi şekilde geliştirerek, hem kendime hem de projelerimle şirkete değer katmaya devam ediyorum.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Microsoft teknolojileri (.NET, SQL Server) ve modern frontend frameworkler (Angular, React) 
                ile ölçeklenebilir ve performanslı web uygulamaları tasarlayıp geliştiriyorum.
              </p>
              <div className="flex flex-wrap gap-3">
                {['ERP Sistemleri', 'CRM Çözümleri', 'MES Uygulamaları', 'Bina Yönetimi', 'Sosyal Medya'].map((tag, index) => (
                  <span 
                    key={tag} 
                    className={`px-4 py-2 bg-blue-600/20 rounded-full text-sm border border-blue-500/30 transition-all duration-500`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
            
            </div>
            <div 
              data-animate="fade-left"
              className={`relative transition-all duration-1000 delay-500 ${
                visibleElements.has('about-image') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              id="about-image"
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <img src="/avatar-kisisel.png" alt="" />
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
            Teknik Yetenekler
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
                    {skill.icon}
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
            Deneyimlerim
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
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-10 h-10 object-contain rounded bg-white p-1 mr-3 border border-slate-700"
                          style={{ background: "#fff" }}
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
                      <h4 className="text-white font-semibold mb-2">Kullanılan Teknolojiler:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-600/20 rounded-full text-sm border border-blue-500/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Başarılar:</h4>
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
            Projelerim
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
                <div className="h-48 flex items-center justify-center relative overflow-hidden bg-white">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-contain p-4"
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
                        Kod
                      </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <a href={project.demo} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            data-animate="fade-up"
            className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('team-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="team-title"
          >
            Takım Arkadaşlarım
          </h2>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  data-animate="fade-up"
                  className={`bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 text-center ${
                    visibleElements.has(`team-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  id={`team-${index}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div 
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
                  >
                    {member.isImageUrl ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full rounded-full flex items-center justify-center ${member.isImageUrl ? 'hidden' : 'flex'}`}
                      style={member.isImageUrl ? {} : { background: member.image }}
                    >
                      <Users className="w-8 h-8 text-white/80" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-600/20 rounded text-xs border border-blue-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-3">
                    <a href={member.linkedin} className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.github} className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/30 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={member.portfolio} className="p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/30 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            data-animate="fade-up"
            className={`text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-1000 ${
              visibleElements.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="contact-title"
          >
            İletişim
          </h2>
          <p 
            data-animate="fade-up"
            className={`text-xl text-gray-300 mb-12 transition-all duration-1000 delay-200 ${
              visibleElements.has('contact-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            id="contact-subtitle"
          >
            Yeni projeler için birlikte çalışalım!
          </p>
          <div className="flex justify-center space-x-8 mb-12">
            {[
              { icon: <Github className="w-8 h-8" />, label: 'GitHub', href: 'https://github.com/kaya2m' },
              { icon: <Linkedin className="w-8 h-8" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammet-kaya-60b36b213/' },
              { icon: <Mail className="w-8 h-8" />, label: 'E-posta', href: 'mailto:mkaya349@hotmail.com' }
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
            onClick={() => window.open('mailto:mkaya349@hotmail.com', '_blank')}
          >
            Benimle İletişime Geç
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p className="mb-4 md:mb-0">© 2025 Muhammet Kaya. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;