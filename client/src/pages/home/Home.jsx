import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import ServicesScroll from './servicess/ServicesScroll';
import BlogSection from './blog/BlogSection';
import Testimonials from './TestimonialSlider';
import StepsComponent from './StepsComponent';
import PortfolioSection from './portfolioSection';
import axios from 'axios';
import { useLoading } from '../../context/LoadingContext';
import SkeletonLoader from '../../components/SkeletonLoader';

const Home = () => {
  const [homeData, setHomeData] = useState({
    hero: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      backgroundImage: null
    },
    about: {
      tagline: '',
      title: '',
      description: '',
      mission: '',
      whatWeBuild: {
        title: '',
        description: '',
        items: []
      },
      ourApproach: {
        title: '',
        items: []
      }
    },
    features: [
      {
        icon: '',
        title: '',
        description: ''
      }
    ],
    services: {
      title: '',
      description: '',
      items: [
        {
          icon: '',
          title: '',
          description: '',
          features: []
        }
      ]
    },
    steps: {
      title: '',
      subtitle: '',
      steps: [
        {
          stepNumber: 1,
          title: '',
          description: ''
        }
      ]
    },
    portfolio: {
      title: '',
      description: '',
      items: []
    },
    blog: {
      title: '',
      subtitle: ''
    },
    testimonials: [
      {
        avatar: '',
        name: '',
        role: '',
        content: '',
        rating: 5
      }
    ],
    cta: {
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: ''
    }
  });

  const { loading, setLoading } = useLoading();
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setHasError(false);
    
    try {
      const homeData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/homepage");
      setHomeData(homeData.data.data);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;

  if (hasError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-xl mb-4">Something went wrong</h2>
          <button
            onClick={fetchData}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-black overflow-hidden lg:px-20 sm:px-8">
      <Hero data={homeData.hero} />
      <AboutSection data={homeData.about} />
      <FeaturesSection features={homeData.features} />
      <ServicesScroll services={homeData.services} />
      <StepsComponent steps={homeData.steps} />
      <BlogSection blogMeta={homeData.blog} />
      <PortfolioSection portfolioMeta={homeData.portfolio} />
      <Testimonials testimonials={homeData.testimonials} />
    </section>
  );
};

export default Home;