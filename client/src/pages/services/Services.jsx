import React, { useState, useEffect } from 'react';
import { 
  MdWeb, MdBusiness, MdPhotoLibrary, 
  MdShoppingBasket, MdDashboard, MdBuild, MdDesignServices, MdSecurity, MdCloud, MdDevices, MdSupportAgent, MdComment, MdClose, MdSend
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import SkeletonLoader from '../../components/SkeletonLoader';
import axios from 'axios';

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
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [servicesData, setServicesData] = useState([]);
  const [comments, setComments] = useState([
    { id: 1, serviceId: 1, author: "John Doe", text: "Great service!", date: "2023-06-20" },
    { id: 2, serviceId: 3, author: "Sarah Miller", text: "The photography team exceeded our expectations.", date: "2023-06-22" }
  ]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/services");
        setServicesData(Array.isArray(response.data.data) ? response.data.data : []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const safeService = servicesData[activeService] || {};
  const activeServiceIcon = safeService.icon && iconMap[safeService.icon] ? iconMap[safeService.icon] : iconMap['MdBuild'];
  const activeServiceTitle = safeService.title || 'Service';
  const activeServiceDescription = safeService.description || 'No description available.';
  const activeServiceFeatures = Array.isArray(safeService.features) ? safeService.features : [];
  const activeServiceId = safeService.id || 0;

  const handleAddComment = () => {
    if (newComment.trim() && activeService !== null) {
      const newCommentObj = {
        id: comments.length + 1,
        serviceId: servicesData[activeService].id,
        author: "You",
        text: newComment,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="bg-black">
      {/* Page Header */}
      <PageHeader
        title="Services"
        subtitle="Digital Solutions"
        description="Explore our comprehensive suite of services designed to elevate your business and transform your digital presence."
        breadcrumbs={["Home", "Services"]}
        showBadge={true}
        badgeText="Premium Services"
        badgeColor="red"
        variant="gradient"
        showStats={true}
        stats={[
          { value: servicesData.length, label: "Services" },
          { value: "500+", label: "Projects Completed" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "24/7", label: "Support" }
        ]}
      />

      {/* Services Content */}
      <div className="relative py-20 bg-black to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
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

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Radial menu */}
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-black rounded-full shadow-lg"
              onMouseLeave={() => setHoveredService(null)}
            >
              {servicesData.filter(service => service && service.icon && iconMap[service.icon]).map((service, index) => {
                const angle = (index * 360) / servicesData.length;
                const radian = (angle * Math.PI) / 180;
                const radius = 120;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);
                const isHighlighted = hoveredService === index;
                return (
                  <button
                    key={service.id || index}
                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300
                      ${activeService === index
                        ? 'bg-red-600 text-white scale-110 shadow-lg'
                        : isHighlighted
                          ? 'bg-red-100 text-red-600 scale-105'
                          : 'bg-black text-white shadow-md'
                      }`}
                    style={{
                      left: `calc(50% + ${x}px - 2rem)`,
                      top: `calc(50% + ${y}px - 2rem)`,
                      transform: activeService === index ? 'scale(1.1)' : '',
                      zIndex: activeService === index ? 10 : isHighlighted ? 5 : 1
                    }}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => {
                      setActiveService(index);
                      setShowComments(false);
                    }}
                  >
                    {service && service.icon && iconMap[service.icon]
                      ? React.cloneElement(iconMap[service.icon], {
                          className: `transition-all ${activeService === index ? 'scale-125' : ''}`
                        })
                      : iconMap['MdBuild']}
                  </button>
                );
              })}

              {/* Center circle */}
              <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-red-100 border-4 border-black shadow-md flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">
                  {activeService + 1}/{servicesData.length}
                </span>
              </div>
            </div>

            {/* Service details with comments section */}
            <div className="flex-1 bg-black rounded-xl shadow-lg border border-gray-900 transition-all duration-500 overflow-hidden">
              <div className={`flex flex-col ${showComments ? 'lg:flex-row' : ''}`}>
                {/* Main service content */}
                <div className={`p-8 ${showComments ? 'lg:w-2/3' : 'w-full'}`}>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        {activeServiceIcon}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {activeServiceTitle}
                        </h3>
                        <button
                          onClick={() => setShowComments(!showComments)}
                          className={`p-2 rounded-full ${showComments ? 'bg-red-100 text-red-600' : 'text-gray-300 hover:bg-gray-900'}`}
                        >
                          <MdComment />
                        </button>
                      </div>
                      <p className="text-gray-300 mb-6">
                        {activeServiceDescription}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {activeServiceFeatures.length > 0 ? activeServiceFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-200">{feature}</span>
                          </div>
                        )) : <span className="text-gray-400">No features listed.</span>}
                      </div>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        onClick={() => navigate('/contact', { state: { serviceId: activeServiceId } })}
                      >
                        Start with {activeServiceTitle}
                      </button>
                    </div>
                  </div>
                </div>
                {/* Comments section */}
                {showComments && (
                  <div className="p-8 bg-gray-900 border-l border-gray-800 lg:w-1/3">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <MdComment /> Comments ({comments.filter(c => c.serviceId === activeServiceId).length})
                      </h4>
                      <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-red-500">
                        <MdClose />
                      </button>
                    </div>
                    <div className="h-64 overflow-y-auto mb-4">
                      {comments.filter(c => c.serviceId === activeServiceId).length > 0 ? (
                        comments
                          .filter(c => c.serviceId === activeServiceId)
                          .map(comment => (
                            <div key={comment.id} className="mb-4 pb-4 border-b border-gray-900 last:border-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-red-400">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-gray-200">{comment.text}</p>
                            </div>
                          ))
                      ) : (
                        <span className="text-gray-400">No comments yet.</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                      />
                      <button
                        onClick={handleAddComment}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all"
                      >
                        <MdSend />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;