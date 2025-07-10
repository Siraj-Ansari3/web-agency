import React, { useState, useEffect } from 'react';
import {
  MdWeb, MdBusiness, MdPhotoLibrary,
  MdShoppingBasket, MdDashboard, MdBuild, 
  MdDesignServices, MdSecurity, MdCloud, 
  MdDevices, MdSupportAgent
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import SkeletonLoader from '../../components/SkeletonLoader';
import axios from 'axios';
import StepsComponent from '../home/StepsComponent';

const iconMap = {
  MdWeb: <MdWeb className="text-xl" />,
  MdBusiness: <MdBusiness className="text-xl" />,
  MdPhotoLibrary: <MdPhotoLibrary className="text-xl" />,
  MdShoppingBasket: <MdShoppingBasket className="text-xl" />,
  MdDashboard: <MdDashboard className="text-xl" />,
  MdBuild: <MdBuild className="text-xl" />,
  MdDesignServices: <MdDesignServices className="text-xl" />,
  MdSecurity: <MdSecurity className="text-xl" />,
  MdCloud: <MdCloud className="text-xl" />,
  MdDevices: <MdDevices className="text-xl" />,
  MdSupportAgent: <MdSupportAgent className="text-xl" />
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);
  const [servicesData, setServicesData] = useState({ items: [] });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [homepageData, setHomepageData] = useState({ steps: { title: '', subtitle: '', steps: [] } });
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/services");
        setServicesData({
          items: Array.isArray(response.data?.data?.items)
            ? response.data.data.items
            : []
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch homepage data for steps
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/homepage");
        setHomepageData(response.data.data || { steps: { title: '', subtitle: '', steps: [] } });
      } catch (e) {
        // Optionally handle error
      }
    };
    fetchHomepageData();
  }, []);

  // Safe access to current service data
  const safeService = servicesData.items[activeService] || {};
  const activeServiceIcon = safeService.icon && iconMap[safeService.icon] 
    ? iconMap[safeService.icon] 
    : iconMap['MdBuild'];
  const activeServiceTitle = safeService.title || 'Service';
  const activeServiceDescription = safeService.description || 'No description available.';
  const activeServiceFeatures = Array.isArray(safeService?.features) 
    ? safeService.features 
    : [];
  const activeServiceId = safeService._id || null;

  if (loading) return <SkeletonLoader />;

  // Adjust radial menu size based on screen width
  const getRadialMenuSize = () => {
    if (windowWidth < 640) return 180; // mobile
    if (windowWidth < 768) return 220; // small tablet
    if (windowWidth < 1024) return 280; // tablet
    return 320; // desktop
  };

  const radialMenuSize = getRadialMenuSize();
  const iconSize = windowWidth < 640 ? 40 : 64;

  return (
    <div className="bg-black">
      {/* Page Header */}
      <PageHeader
        title="Services"
        subtitle="Digital Solutions"
        description="From custom websites to full-stack solutions, we build digital experiences that drive results and meet real business goals."
        breadcrumbs={["Home", "Services"]}
        showBadge={true}
        badgeText="Trusted by Clients"
        badgeColor="red"
        variant="gradient"
        showStats={true}
        stats={[
          { value: servicesData.items.length, label: "Services" },
          { value: "10+", label: "Projects Completed" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "24/7", label: "Support" }
        ]}
      />

      {/* Services Content */}
      <section className="relative py-12 md:py-20 lg:py-32 bg-black to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)]?.map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-red-300 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                animation: `pulse ${8 + i}s infinite alternate`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-12">
            {/* Radial menu - now properly sized for mobile */}
            <div
              className="relative flex items-center justify-center bg-black rounded-full shadow-lg mb-8 lg:mb-0"
              style={{
                width: `${radialMenuSize}px`,
                height: `${radialMenuSize}px`,
                minWidth: `${radialMenuSize}px`,
                minHeight: `${radialMenuSize}px`
              }}
              onMouseLeave={() => setHoveredService(null)}
            >
              {servicesData.items?.filter(service => service?.icon && iconMap[service.icon]).map((service, index) => {
                const angle = (index * 360) / servicesData.items.length;
                const radian = (angle * Math.PI) / 180;
                const radius = radialMenuSize * 0.45; // Adjust radius based on container size
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);
                const isHighlighted = hoveredService === index;
                
                return (
                  <button
                    key={service._id || index}
                    className={`absolute rounded-full flex items-center justify-center text-xl transition-all duration-300
                      ${activeService === index
                        ? 'bg-red-600 text-white scale-110 shadow-lg'
                        : isHighlighted
                          ? 'bg-red-100 text-red-600 scale-105'
                          : 'bg-black text-white shadow-md'
                      }`}
                    style={{
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      left: `calc(50% + ${x}px - ${iconSize/2}px)`,
                      top: `calc(50% + ${y}px - ${iconSize/2}px)`,
                      transform: activeService === index ? 'scale(1.1)' : '',
                      zIndex: activeService === index ? 10 : isHighlighted ? 5 : 1
                    }}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setActiveService(index)}
                  >
                    {service?.icon && iconMap[service.icon]
                      ? React.cloneElement(iconMap[service.icon], {
                        className: `transition-all ${activeService === index ? 'scale-125' : ''}`
                      })
                      : iconMap['MdBuild']}
                  </button>
                );
              })}

              {/* Center circle */}
              <div className="absolute inset-0 m-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-100 border-2 border-black shadow flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs md:text-sm">
                  {activeService + 1}/{servicesData.items.length}
                </span>
              </div>
            </div>

            {/* Service details section - adjusted for mobile */}
            <div className="w-full bg-black rounded-xl shadow-lg border border-gray-900 transition-all duration-500 overflow-hidden lg:transform lg:scale-105 lg:shadow-2xl lg:-translate-y-6">
              <div className="flex flex-col">
                {/* Main service content */}
                <div className="p-4 sm:p-6 md:p-8 w-full">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex justify-center md:justify-start">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        {activeServiceIcon}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                        {activeServiceTitle}
                      </h3>
                      <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                        {activeServiceDescription}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {activeServiceFeatures.length > 0 ? activeServiceFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-0.5 sm:mt-1">✓</span>
                            <span className="text-gray-200 text-sm sm:text-base">{feature}</span>
                          </div>
                        )) : <span className="text-gray-400">No features listed.</span>}
                      </div>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
                        onClick={() => navigate('/contact', { state: { serviceId: activeServiceId } })}
                      >
                        Start with {activeServiceTitle}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto w-full">
        <StepsComponent steps={homepageData.steps} />
      </div>

      {/* Additional Section */}
      <section className="w-full bg-gradient-to-b from-black via-gray-900 to-black py-12 md:py-20 mt-8 md:mt-12 flex flex-col items-center justify-center border-t-2 border-red-600 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 text-center">
          <span className="text-red-500">Why</span> Choose Us?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl text-center mb-6 md:mb-8">
          We deliver <span className="text-red-400 font-semibold">high-quality, custom web solutions</span> tailored to your business needs. Our team combines creativity, technical expertise, and a passion for results to help you succeed online. Let us turn your ideas into <span className="text-white font-bold">reality</span>!
        </p>
      </section>
    </div>
  );
};

export default Services;