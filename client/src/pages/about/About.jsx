import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StepsComponent from '../home/StepsComponent';
import {
  FiLayers,
  FiUsers,
  FiCheckCircle,
  FiZap,
  FiMail,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiDribbble,
  FiFigma,
  FiCode,
  FiAward,
  FiTarget,
  FiRefreshCw,
  FiSmile,
  FiThumbsUp,
  FiTrendingUp,
  FiX
} from 'react-icons/fi';
import { TbSparkles } from 'react-icons/tb';
import CallToAction from '../../components/CallToAction';
import axios from 'axios';
import defaultImg from "../../assets/default-member.png";
import SkeletonLoader from '../../components/SkeletonLoader';

const iconMap = {
  FiLayers,
  FiUsers,
  FiCheckCircle,
  FiZap,
  FiMail,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiDribbble,
  FiFigma,
  FiCode,
  FiAward,
  FiTarget,
  FiRefreshCw,
  FiSmile,
  FiThumbsUp,
  FiTrendingUp
};

const About = () => {
  const initialState = {
    header: {},
    storyMission: {},
    coreValues: [],
    teamMembers: [],
    whyChooseUs: [],
    cta: {}
  };

  const [pageData, setPageData] = useState(initialState);
  const [steps, setSteps] = useState({
    title: "",
    subtitle: "",
    steps: []
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      try {
        const aboutData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/about");
        setPageData(aboutData.data);
        console.log(aboutData)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  useEffect(() => {
    const fetchStepsData = async () => {
      try {
        const stepsData = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/edit-page/steps");
        setSteps(stepsData.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStepsData();
  }, []);

  const openMemberModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeMemberModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="bg-blac relative min-h-screen pt-8 pb-16">
      {/* About Header */}
      <div
        className="text-center mb-16 px-4"
      >
        <div className="inline-flex items-center px-4 py-2 bg-black/80 backdrop-blur-md border border-red-200 rounded-full mb-6 shadow-sm">
          <TbSparkles className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-red-200">
            {pageData.header.tagline}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
            {pageData.header.title}
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {pageData.header.description}
        </p>
      </div>

      {/* Detailed About Section */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-20">
        {/* Our Story Card */}
        <div
          className="md:col-span-2 bg-black/90 backdrop-blur-sm p-8 rounded-2xl border border-red-200 shadow-lg hover:shadow-xl transition-all"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4">Our Story</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            {pageData.storyMission.story}
          </p>
        </div>

        {/* Our Mission Card */}
        <div
          className="bg-gradient-to-br from-red-600 to-red-400 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center mb-4">
              <FiZap className="w-6 h-6 text-yellow-300 mr-3" />
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-red-100 text-base leading-relaxed mb-4">
              {pageData.storyMission.mission}
            </p>
          </div>
          <div className="bg-black/10 p-3 rounded-lg backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-1 flex items-center">
              <FiTarget className="mr-2" /> Our Vision
            </h4>
            <p className="text-red-100 text-sm">
              {pageData.storyMission.vision}
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div
          className="bg-black/90 backdrop-blur-sm p-8 rounded-2xl border border-red-200 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
            <FiCheckCircle className="mr-2 text-red-400" /> Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pageData.coreValues.map((value, index) => {
              let desc = value.description;
              const Icon = iconMap[value.icon];
              let title = value.title;
              return (
                <div
                  key={index}
                  className="bg-black p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-red-400 mb-3"><Icon className="w-6 h-6 text-red-400" /></div>
                  <h4 className="font-semibold text-red-400 mb-2">{title}</h4>
                  <p className="text-gray-300">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Meet the <span className="text-red-500">Team</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Our talented team brings together years of experience to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageData.teamMembers.map((member, i) => (
            <div
              key={i}
              className="group relative bg-black rounded-xl border border-red-200 shadow-md overflow-hidden transition-all hover:shadow-lg w-full max-w-xs mx-auto cursor-pointer"
              onClick={() => openMemberModal(member)}
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={member.img || defaultImg}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
              </div>

              <div className="p-5">
                <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                <span className="inline-block px-2 py-1 text-xs font-medium text-red-500 bg-red-50 rounded-full mb-3">
                  {member.role}
                </span>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{member.bio}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {member.skills?.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-black text-red-200 border border-red-200 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills?.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-black text-red-200 border border-red-200 rounded-full">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeMemberModal}
          >
            <div
              className="relative bg-black rounded-xl border border-red-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeMemberModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-full min-h-[400px]">
                  <img
                    src={selectedMember.img || defaultImg}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
                    <span className="inline-block px-3 py-1 text-sm font-medium text-red-500 bg-red-50 rounded-full mt-2">
                      {selectedMember.role}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-red-400 mb-3">About</h4>
                    <p className="text-gray-300">{selectedMember.bio}</p>
                  </div>

                  {selectedMember.skills?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-red-400 mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-black text-red-200 border border-red-200 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMember.social && Object.keys(selectedMember.social).length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-3">Connect</h4>
                      <div className="flex space-x-4">
                        {Object.entries(selectedMember.social).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-red-500 rounded-full transition-colors"
                            aria-label={`${selectedMember.name}'s ${platform}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {platform === 'twitter' && <FiTwitter className="w-5 h-5" />}
                            {platform === 'github' && <FiGithub className="w-5 h-5" />}
                            {platform === 'linkedin' && <FiLinkedin className="w-5 h-5" />}
                            {platform === 'dribbble' && <FiDribbble className="w-5 h-5" />}
                            {platform === 'behance' && <FiFigma className="w-5 h-5" />}
                            {platform === 'codepen' && <FiCode className="w-5 h-5" />}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Development Process Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            <span className="text-red-500">{steps.title}</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            {steps.subtitle}
          </p>
        </div>
        <StepsComponent steps={steps} page="about" />
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div
          className="bg-black/90 backdrop-blur-sm p-8 rounded-2xl border border-red-200 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
            <FiLayers className="mr-2 text-red-400" /> Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pageData.whyChooseUs.map((item, index) => {
              let Icon = iconMap[item.icon]
              return (
                <div
                  key={index}
                  className="bg-black p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-red-400 mb-3"><Icon className="w-6 h-6 text-red-400" /></div>
                  <h4 className="font-semibold text-red-400 mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <CallToAction data={pageData.cta} />
    </section>
  );
};

export default About;