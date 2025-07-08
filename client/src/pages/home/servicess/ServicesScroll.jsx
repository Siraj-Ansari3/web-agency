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
    const card = container.querySelector('.service-card');
    if (card) {
      container.scrollLeft = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
    }
  }, []);

  return (
    <section className="relative py-12  bg-black overflow-hidden services-section">
      <div className="services-container" >
        <div className="services-header">
          <h2 className="services-title">Professional Web Solutions</h2>
          <p className="services-description">
            {services.description}
          </p>
        </div>
        <div className="services-scroll-container">

          <div className="services-list p-10 flex flex-row" style={{padding: '3rem'}} ref={scrollRef}>
            {services.items.map((item, idx) => (
              <div key={item.id + '-' + idx} className="service-card h-[420px] w-80 min-h-[420px] max-h-[420px] flex flex-col bg-black rounded-xl p-4 border border-red-700/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-600 group overflow-hidden">
                <div className="bg-red-600 service-icon flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                  {iconMap[item.icon]}
                </div>
                <h3 className="service-title text-xl font-bold text-white mb-3 truncate flex-shrink-0">{item.title}</h3>
                <p className="service-description text-gray-300 mb-4 flex-grow overflow-hidden text-ellipsis line-clamp-3">{item.description}</p>
                <ul className="service-features mb-4 flex-shrink-0 overflow-hidden">
                  {item.features.slice(0, 5).map((feature, i) => (
                    <li key={i} className="service-feature truncate overflow-hidden text-ellipsis whitespace-nowrap">
                      <span className="feature-dot">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-red-600 service-learn-more w-full py-2 rounded-lg text-white font-medium mt-auto transition-all hover:bg-red-700 flex-shrink-0" onClick={() => navigate('/contact', { state: { serviceId: item.id } })}>
                  Contact Us
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}