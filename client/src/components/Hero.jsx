import { ArrowRight, Code, LayoutDashboard, Palette, Smartphone, Cpu, Database, Zap, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [activeService, setActiveService] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);

  // Simplified services array with static color classes
  const services = [
    { 
      icon: Code, 
      title: "Web Development", 
      desc: "React, Next.js", 
      color: "sky",
      colorClass: {
        bg: "bg-sky-600",
        text: "text-sky-600",
        border: "border-sky-200",
        lightBg: "bg-sky-100",
        gradient: "from-sky-100 to-blue-50"
      },
      features: ["SSR/SSG Support", "SEO Optimized", "Blazing Fast"],
      stats: ["98%", "Performance Score", "from Lighthouse"]
    },
    { 
      icon: Smartphone, 
      title: "Mobile Apps", 
      desc: "iOS & Android", 
      color: "cyan",
      colorClass: {
        bg: "bg-cyan-600",
        text: "text-cyan-600",
        border: "border-cyan-200",
        lightBg: "bg-cyan-100",
        gradient: "from-cyan-100 to-blue-50"
      },
      features: ["Native Performance", "Offline Support", "Push Notifications"],
      stats: ["4.9/5", "App Store Rating", "average across projects"]
    },
    { 
      icon: Palette, 
      title: "UI/UX Design", 
      desc: "Figma, Framer", 
      color: "blue",
      colorClass: {
        bg: "bg-blue-600",
        text: "text-blue-600",
        border: "border-blue-200",
        lightBg: "bg-blue-100",
        gradient: "from-blue-100 to-indigo-50"
      },
      features: ["User Research", "Prototyping", "Design Systems"],
      stats: ["40%+", "Conversion Boost", "for redesigned products"]
    },
    { 
      icon: Database, 
      title: "Backend", 
      desc: "Node, PostgreSQL", 
      color: "indigo",
      colorClass: {
        bg: "bg-indigo-600",
        text: "text-indigo-600",
        border: "border-indigo-200",
        lightBg: "bg-indigo-100",
        gradient: "from-indigo-100 to-purple-50"
      },
      features: ["REST APIs", "Real-time Data", "Secure Auth"],
      stats: ["99.9%", "Uptime", "last 12 months"]
    }
  ];

  // Auto-rotation effect with pause on interaction
  useEffect(() => {
    let interval;
    if (!isHovering && !rotationPaused) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveService((prev) => (prev + 1) % services.length);
          setIsAnimating(false);
        }, 300);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isHovering, rotationPaused, services.length]);

  const handleServiceClick = (index) => {
    if (index !== activeService) {
      setRotationPaused(true);
      setIsAnimating(true);
      setTimeout(() => {
        setActiveService(index);
        setIsAnimating(false);
        // Resume auto-rotation after 10 seconds of inactivity
        setTimeout(() => setRotationPaused(false), 10000);
      }, 300);
    }
  };

  const CurrentServiceIcon = services[activeService].icon;
  const currentColor = services[activeService].colorClass;

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Reduced floating elements for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-sky-100/70 blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-100/60 blur-[90px] animate-float animation-delay-3000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Content Section */}
          <div className="order-1 lg:order-none w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
            
              
              {/* Added testimonial snippet */}
              <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-sky-200 rounded-full shadow-sm hover:shadow-md transition-all w-fit">
                <Quote className="w-4 h-4 text-sky-500 rotate-180 mr-2" />
                <span className="text-sm font-medium text-sky-800">"Transformed our digital presence"</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-900 mb-3 leading-tight">
              We Build <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Digital Experiences</span>
            </h1>
            
            {/* Added value proposition */}
            <p className="text-lg font-medium text-sky-600 mb-2">Web • Mobile • Cloud • Design</p>

            <p className="text-lg text-sky-800/90 mb-6">
              High-performance websites and applications tailored to your business goals.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:shadow-sky-200/50"
                aria-label="Start Your Project"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('work')}
                className="flex items-center px-5 py-2.5 bg-white text-sky-700 rounded-lg font-medium border border-sky-200 hover:bg-sky-50 transition-all"
                aria-label="View Our Work"
              >
                View Our Work
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Service Card */}
          <div className="order-2 lg:order-none w-full lg:w-1/2">
            <div 
              className={`relative h-64 sm:h-72 md:h-80 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute inset-0 rounded-xl overflow-hidden transition-all duration-500 shadow-xl`}>
                {/* Card background with gradient */}
                <div className={`absolute inset-0 ${currentColor.gradient}`}></div>
                
                {/* Card border glow */}
                <div className={`absolute inset-0 rounded-xl border border-${currentColor.border}/30 pointer-events-none`}></div>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-${currentColor.border}/20 to-transparent pointer-events-none`}></div>
                
                {/* Reduced floating elements */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-${currentColor.border}/30 blur-[60px]`}></div>
                
                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col p-6">
                  {/* Card header */}
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-white shadow-sm border ${currentColor.border}`}>
                      <CurrentServiceIcon className={`w-6 h-6 ${currentColor.text}`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-sky-900">{services[activeService].title}</h3>
                      <p className="text-sm text-sky-700/90">{services[activeService].desc}</p>
                    </div>
                  </div>
                  
                  {/* Card body */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Features section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-sky-100 shadow-sm">
                      <h4 className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3">Key Features</h4>
                      <ul className="space-y-3">
                        {services[activeService].features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <div className={`flex-shrink-0 mt-1 mr-3 w-2 h-2 rounded-full ${currentColor.bg}`}></div>
                            <span className="text-sm font-medium text-sky-800">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Stats section - hidden on mobile */}
                    <div className="hidden md:block bg-white rounded-lg p-4 border border-sky-200 shadow-sm">
                      <h4 className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-3">Our Results</h4>
                      <div className="flex flex-col items-center justify-center h-full p-2">
                        <div className={`text-4xl font-bold mb-1 ${currentColor.text}`}>
                          {services[activeService].stats[0]}
                        </div>
                        <div className="text-sm text-center font-medium text-sky-700">
                          {services[activeService].stats[1]}
                        </div>
                        <div className="text-xs text-center text-sky-500 mt-1">
                          {services[activeService].stats[2]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service selector dots - Mobile */}
            <div className="lg:hidden flex justify-center mt-4">
              <div className="inline-flex bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm border border-sky-200">
                {services.map((service, i) => (
                  <button
                    key={i}
                    onClick={() => handleServiceClick(i)}
                    className={`p-1.5 mx-1 rounded-full transition-all ${i === activeService ? 
                      `${service.colorClass.bg} w-3` : 
                      `bg-sky-300 hover:${service.colorClass.bg} w-2`}`}
                    style={{ height: '0.75rem' }}
                    aria-label={`View ${service.title} service`}
                  >
                    <span className="sr-only">{service.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-8 order-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {services.map((service, i) => (
            <button
              key={i}
              onClick={() => handleServiceClick(i)}
              className={`group p-3 rounded-lg border transition-all flex items-center hover:shadow-md ${
                i === activeService 
                  ? `${service.colorClass.lightBg} ${service.colorClass.border} shadow-sm transform -translate-y-1` 
                  : 'bg-white border-sky-200 hover:bg-sky-50'
              }`}
              aria-label={`Learn more about ${service.title}`}
            >
              <div className={`p-2 rounded-lg transition-all ${
                i === activeService 
                  ? `${service.colorClass.bg} text-white` 
                  : `bg-sky-100 ${service.colorClass.text} group-hover:${service.colorClass.bg} group-hover:text-white`
              } mr-3`}>
                <service.icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className={`text-xs font-medium ${
                  i === activeService 
                    ? `${service.colorClass.text}` 
                    : 'text-sky-700 group-hover:text-sky-800'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-xs ${
                  i === activeService 
                    ? `${service.colorClass.text}/90` 
                    : 'text-sky-600/90 group-hover:text-sky-700'
                }`}>
                  {service.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center animate-bounce">
          <div className="w-8 h-12 border-2 border-sky-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-sky-500 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-15px) translateX(10px) rotate(2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-20px) translateX(15px) rotate(3deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 1.5s ease infinite;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
};

export default Hero;