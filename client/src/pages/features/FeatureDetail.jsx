import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaBolt, 
  FaShieldAlt,
  FaMobile,
  FaRocket,
  FaChartLine,
  FaCog 
} from 'react-icons/fa';

const features = [
  {
    icon: <FaBolt className="text-white text-3xl" />,
    title: "Lightning Fast",
    stat: "0.8s Load Time",
    highlight: "300% Faster",
    slug: "lightning-fast",
    longDescription: "Our web apps are engineered for maximum speed, utilizing the latest technologies and best practices. From optimized assets to advanced caching and server-side rendering, we ensure your users experience instant page loads and seamless navigation, no matter where they are."
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: "Ironclad Security",
    stat: "100% Secure",
    highlight: "Zero Breaches",
    slug: "ironclad-security",
    longDescription: "Security is at the core of our development process. We use robust encryption, regular security audits, and proactive threat monitoring to protect your data and your users. Trust in our commitment to zero breaches and peace of mind."
  },
  {
    icon: <FaMobile className="text-white text-3xl" />,
    title: "Perfect on Mobile",
    stat: "100% Responsive",
    highlight: "All Devices",
    slug: "perfect-on-mobile",
    longDescription: "Our responsive designs adapt perfectly to smartphones, tablets, and desktops. No matter the screen size, your users will enjoy a seamless and intuitive experience, boosting engagement and satisfaction."
  },
  {
    icon: <FaRocket className="text-white text-3xl" />,
    title: "Easy Scaling",
    stat: "10M+ Users",
    highlight: "Zero Downtime",
    slug: "easy-scaling",
    longDescription: "We build with scalability in mind. Whether you have 100 users or 10 million, our infrastructure grows with you, ensuring zero downtime and uninterrupted service as your business expands."
  },
  {
    icon: <FaChartLine className="text-white text-3xl" />,
    title: "Real Analytics",
    stat: "Live Data",
    highlight: "Actionable Insights",
    slug: "real-analytics",
    longDescription: "Track user behavior, conversions, and more with our intuitive analytics dashboards. Get actionable insights in real time to drive your business forward and make smarter decisions."
  },
  {
    icon: <FaCog className="text-white text-3xl" />,
    title: "Always Updated",
    stat: "24/7 Support",
    highlight: "Auto-Updates",
    slug: "always-updated",
    longDescription: "We handle all maintenance and updates, so you never have to worry about falling behind. Our support team is available 24/7 to assist you, ensuring your web app is always running smoothly and securely."
  },
  {
    icon: <FaBolt className="text-white text-3xl" />,
    title: "SEO Optimized",
    stat: "#1 Ranking",
    highlight: "Top Results",
    slug: "seo-optimized",
    longDescription: "Our web apps are built with SEO in mind, using semantic HTML, fast load times, and mobile optimization to help you achieve higher search rankings and attract more organic traffic."
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: "GDPR Ready",
    stat: "100% Compliant",
    highlight: "Privacy First",
    slug: "gdpr-ready",
    longDescription: "We ensure your web app is fully GDPR compliant, protecting user data and privacy. Our solutions help you meet all regulatory requirements, giving you and your users peace of mind."
  }
];

const FeatureDetail = () => {
  const { slug } = useParams();
  const feature = features.find(f => f.slug === slug);

  if (!feature) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Feature Not Found</h2>
        <Link to="/" className="text-red-400 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center bg-black py-16 px-4">
      <div className="bg-black border border-red-700/50 rounded-2xl shadow-xl max-w-xl w-full p-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-lg">
          {feature.icon}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 text-center">{feature.title}</h1>
        <div className="flex gap-3 mb-4">
          <span className="inline-block bg-red-700/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{feature.stat}</span>
          <span className="inline-block bg-gray-800 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">{feature.highlight}</span>
        </div>
        <p className="text-gray-300 text-center text-lg mb-6">{feature.longDescription}</p>
        <Link to="/" className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium shadow hover:from-red-700 hover:to-red-800 transition-all">Back to Home</Link>
      </div>
    </section>
  );
};

export default FeatureDetail; 