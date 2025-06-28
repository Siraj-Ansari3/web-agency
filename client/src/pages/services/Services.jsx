import React, { useState } from 'react';
import servicesData from '../../data/services/servicesData';
import { 
  MdWeb, MdBusiness, MdPhotoLibrary, 
  MdShoppingBasket, MdDashboard, MdBuild,
  MdComment, MdClose, MdSend 
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const iconMap = {
  MdWeb: <MdWeb className="text-xl" />,
  MdBusiness: <MdBusiness className="text-xl" />,
  MdPhotoLibrary: <MdPhotoLibrary className="text-xl" />,
  MdShoppingBasket: <MdShoppingBasket className="text-xl" />,
  MdDashboard: <MdDashboard className="text-xl" />,
  MdBuild: <MdBuild className="text-xl" />
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [hoverAngle, setHoverAngle] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, serviceId: 1, author: "Alex Johnson", text: "Their web development service transformed our online presence!", date: "2023-05-15" },
    { id: 2, serviceId: 3, author: "Sarah Miller", text: "The photography team exceeded our expectations.", date: "2023-06-22" }
  ]);

  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    setHoverAngle(Math.atan2(y, x) * (180/Math.PI));
  };

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
      <div className="relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
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
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
              onMouseLeave={() => setHoverAngle(null)}
            >
              {servicesData.map((service, index) => {
                const angle = (index * 360) / servicesData.length;
                const radian = (angle * Math.PI) / 180;
                const radius = 120;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);
                
                const isHighlighted = hoverAngle !== null && 
                Math.abs((angle - hoverAngle + 360) % 360) < 30;

                return (
                  <button
                    key={service.id}
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
                    onMouseMove={(e) => handleMouseMove(e)}
                    onClick={() => {
                      setActiveService(index);
                      setShowComments(false);
                    }}
                  >
                    {React.cloneElement(iconMap[service.icon], {
                      className: `transition-all ${activeService === index ? 'scale-125' : ''}`
                    })}
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
                        {iconMap[servicesData[activeService].icon]}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {servicesData[activeService].title}
                        </h3>
                        <button 
                          onClick={() => setShowComments(!showComments)}
                          className={`p-2 rounded-full ${showComments ? 'bg-red-100 text-red-600' : 'text-gray-300 hover:bg-gray-900'}`}
                        >
                          <MdComment />
                        </button>
                      </div>
                      <p className="text-gray-300 mb-6">
                        {servicesData[activeService].description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {servicesData[activeService].features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">✓</span>
                            <span className="text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                        onClick={() => navigate('/contact', { state: { serviceId: servicesData[activeService].id } })}
                      >
                        Start with {servicesData[activeService].title}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments section */}
                {showComments && (
                  <div className="border-t lg:border-t-0 lg:border-l border-gray-800 lg:w-1/3 bg-gray-900">
                    <div className="p-4 flex justify-between items-center border-b border-gray-800">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <MdComment /> Comments ({comments.filter(c => c.serviceId === servicesData[activeService].id).length})
                      </h4>
                      <button 
                        onClick={() => setShowComments(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <MdClose />
                      </button>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto">
                      {comments.filter(c => c.serviceId === servicesData[activeService].id).length > 0 ? (
                        comments
                          .filter(c => c.serviceId === servicesData[activeService].id)
                          .map(comment => (
                            <div key={comment.id} className="mb-4 pb-4 border-b border-gray-900 last:border-0">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-white">{comment.author}</span>
                                <span className="text-xs text-gray-400">{comment.date}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{comment.text}</p>
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No comments yet. Be the first to share your experience!</p>
                      )}
                    </div>
                    <div className="p-4 border-t border-gray-800">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        />
                        <button
                          onClick={handleAddComment}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <MdSend />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Decorative Divider */}
      <div className="w-full overflow-hidden leading-none -mb-2">
        <svg viewBox="0 0 1200 120" className="w-full h-12">
          <path d="M0,0V46.29c47.5,22.09,103.77,29,158,17.39C306.5,44.09,360,0,480,0s173.5,44.09,322,63.68C1096.23,75.29,1152.5,68.38,1200,46.29V0Z" fill="#ef4444" fillOpacity="0.1"></path>
        </svg>
      </div>
      {/* Enhanced: Services List Section with Decorative Background */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Gradient/Blurred Background Blobs */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute left-1/4 top-0 w-72 h-72 bg-red-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute right-1/4 bottom-0 w-72 h-72 bg-pink-600 opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute right-10 top-1/2 w-40 h-40 bg-pink-400 opacity-10 rounded-full blur-2xl animate-pulse"></div>
        </div>
        <h2 className="text-4xl font-extrabold text-center mb-4 text-white tracking-tight">All Our Services</h2>
        <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12">Discover the full range of solutions we offer to help your business grow and succeed in the digital world.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="relative bg-black/70 backdrop-blur-lg border border-black/30 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-500 flex flex-col items-center group overflow-hidden opacity-0 translate-y-6 animate-fadein"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* Popular Badge Example */}
              {idx === 0 && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Popular</span>
              )}
              {/* Icon with Animation */}
              <div className="w-20 h-20 mb-6 flex items-center  justify-center rounded-full bg-red-100 text-red-600 text-4xl shadow group-hover:animate-bounce transition-all duration-300">
                {React.cloneElement(iconMap[service.icon], { className: 'text-4xl' })}
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">{service.title}</h3>
              {/* Description */}
              <p className="text-gray-300 text-center mb-4 leading-relaxed">{service.description}</p>
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 text-sm text-white mb-6 w-full max-w-xs mx-auto">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="inline-block w-5 h-5 mr-2 flex items-center justify-center rounded-full bg-red-50 text-red-500 text-center font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* CTA Button: Contact Us */}
              <Link to="/contact" className="mt-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                Contact Us
              </Link>
            </div>
          ))}
        </div>
        {/* Section Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mt-16 opacity-60"></div>
        {/* Animations */}
        <style>{`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadein {
            animation: fadein 0.7s cubic-bezier(0.4,0,0.2,1) both;
          }
        `}</style>
      </div>
      {/* End Enhanced Services List Section */}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .comment-enter {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Services;