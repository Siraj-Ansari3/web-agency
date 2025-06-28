import React from 'react';
import { useParams } from 'react-router-dom';
import { MdWeb, MdBusiness, MdPhotoLibrary, MdShoppingBasket, MdDashboard, MdBuild } from 'react-icons/md';

const serviceData = [
  {
    id: '1',
    title: 'Landing Pages',
    description: 'High-converting, performance-optimized landing pages tailored to your campaign goals.',
    icon: <MdWeb className="landing-icon" />,
    features: ['Conversion-focused design', 'Mobile-optimized', 'Fast loading (<2s)']
  },
  {
    id: '2',
    title: 'Business Websites',
    description: 'Complete corporate websites that reflect your brand identity and values.',
    icon: <MdBusiness className="business-icon" />,
    features: ['Custom UI/UX', 'SEO-optimized', 'Content management']
  },
  {
    id: '3',
    title: 'Portfolio Sites',
    description: 'Elegant showcases for creative professionals and agencies.',
    icon: <MdPhotoLibrary className="portfolio-icon" />,
    features: ['Visual galleries', 'Project case studies', 'Client testimonials']
  },
  {
    id: '4',
    title: 'E-commerce Platforms',
    description: 'Secure online stores with seamless shopping experiences.',
    icon: <MdShoppingBasket className="ecommerce-icon" />,
    features: ['Payment gateways', 'Inventory system', 'Order tracking']
  },
  {
    id: '5',
    title: 'Web Applications',
    description: 'Custom solutions for complex business requirements.',
    icon: <MdDashboard className="webapp-icon" />,
    features: ['User management', 'Data visualization', 'API integrations']
  },
  {
    id: '6',
    title: 'Maintenance & Support',
    description: 'Ongoing care and optimization for your digital assets.',
    icon: <MdBuild className="maintenance-icon" />,
    features: ['Security updates', 'Performance tuning', '24/7 monitoring']
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData.find(s => s.id === id);

  if (!service) return <div className="p-8 text-center">Service not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-black rounded-xl shadow-md mt-10">
      <div className="flex items-center mb-6">
        <div className="mr-4 text-red-500">{service.icon}</div>
        <h1 className="text-3xl font-bold text-white">{service.title}</h1>
      </div>
      <p className="mb-6 text-gray-300">{service.description}</p>
      <h2 className="text-xl font-semibold mb-2 text-red-400">Key Features:</h2>
      <ul className="list-disc pl-6 text-white">
        {service.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDetail; 