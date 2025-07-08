import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import { MdWeb, MdBusiness, MdPhotoLibrary, MdShoppingBasket, MdDashboard, MdBuild } from 'react-icons/md';

const iconMap = {
  MdWeb: <MdWeb className="landing-icon" />,
  MdBusiness: <MdBusiness className="business-icon" />,
  MdPhotoLibrary: <MdPhotoLibrary className="portfolio-icon" />,
  MdShoppingBasket: <MdShoppingBasket className="ecommerce-icon" />,
  MdDashboard: <MdDashboard className="webapp-icon" />,
  MdBuild: <MdBuild className="maintenance-icon" />,
};



export default function ServicesScroll({services}) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Set initial scroll position to center the first card
    setTimeout(() => {
      const firstCard = container.querySelector('.service-card');
      if (firstCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = firstCard.offsetWidth;
        const scrollPosition = (containerWidth - cardWidth) / 2;
        container.scrollLeft = scrollPosition;
      }
    }, 100);
  }, []);

  return (
    <section className="relative py-16 bg-black overflow-hidden services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 services-container">
        <div className="services-header mb-12 text-center">
          <h2 className="services-title text-3xl md:text-4xl font-bold text-white mb-4">
            Professional Web Solutions
          </h2>
          <p className="services-description text-gray-300 text-lg max-w-3xl mx-auto">
            {services.description}
          </p>
        </div>
        
        <div className="services-scroll-container relative">
          {/* Scroll gradient overlays */}
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          
          <div 
            className="services-list flex overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
            ref={scrollRef}
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex-shrink-0 w-10 md:w-10"></div> {/* Left padding spacer */}
            
            {services.items.map((item, idx) => (
              <div 
                key={item.id + '-' + idx} 
                className="service-card flex-shrink-0 mx-3 w-[280px] min-h-[400px] max-h-[400px] flex flex-col bg-gray-900 rounded-xl p-6 border border-red-700/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-600 group overflow-hidden"
              >
                <div className="bg-red-600 service-icon flex items-center justify-center w-16 h-16 rounded-full mb-6 group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
                  {iconMap[item.icon]}
                </div>
                <h3 className="service-title text-xl font-bold text-white mb-3 truncate">{item.title}</h3>
                <p className="service-description text-gray-300 mb-4 flex-grow overflow-hidden text-ellipsis line-clamp-3">
                  {item.description}
                </p>
                <ul className="service-features mb-4">
                  {item.features.slice(0, 5).map((feature, i) => (
                    <li 
                      key={i} 
                      className="service-feature text-gray-400 text-sm mb-2 flex items-start"
                    >
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="bg-gradient-to-r from-red-600 to-red-700 service-learn-more w-full py-3 rounded-lg text-white font-medium mt-auto transition-all duration-300 hover:from-red-700 hover:to-red-800"
                  onClick={() => navigate('/contact', { state: { serviceId: item.id } })}
                >
                  Contact Us
                </button>
              </div>
            ))}
            
            <div className="flex-shrink-0 w-10 md:w-10"></div> {/* Right padding spacer */}
          </div>
        </div>
      </div>
    </section>
  );
}