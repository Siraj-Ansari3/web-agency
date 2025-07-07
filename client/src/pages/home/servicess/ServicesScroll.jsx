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
              <div key={item.id + '-' + idx} className="service-card">
                <div className="bg-red-600 service-icon">
                  {iconMap[item.icon]}
                </div>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-description">{item.description}</p>
                <ul className="service-features">
                  {item.features.map((feature, i) => (
                    <li key={i} className="service-feature">
                      <span className="feature-dot">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="bg-red-600 service-learn-more" onClick={() => navigate('/contact', { state: { serviceId: item.id } })}>
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