import { FiLayers, FiUsers, FiCheckCircle, FiZap } from 'react-icons/fi';
import { TbSparkles } from 'react-icons/tb';

const AboutSection = ({ data }) => {
  return (
    <section className="relative py-20 bg-black overflow-hidden" id="about">
     

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
     

              {/* Heading */}
      <div className="services-header">
        <h2 className="services-title">{data.title}</h2>
        <p className="services-description">
          {data.tagline}
        </p>
      </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Content - Animated */}
          <div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >

            <div className="bg-black/90 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all">
              <p className="text-white text-md text-justify md:text-lg  leading-relaxed mb-6">
               {data.description}
               </p>


              <div className="relative bg-gradient-to-br from-red-900/40 to-red-900/10 rounded-xl p-6 border-2 border-red-200 shadow-lg mb-6">
                <div className="absolute -top-3 -left-3 bg-black p-2 rounded-full border-2 border-red-300 shadow-md">
                  <FiZap className="w-5 h-5 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-gray-100 text-lg font-medium leading-relaxed">
                  <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent text-2xl font-bold">
                    Our Mission →

                  </span> <span className='text-md md:text-lg block'>{data.mission}</span></p>
              </div>

            </div>
          </div>

          {/* Right Column - Services */}
          <div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            

            {/* Our Approach */}
            <div
              whileHover={{ y: -5 }}
              className="bg-black/90 backdrop-blur-sm p-6 rounded-xl border border-red-200 shadow-lg hover:shadow-xl transition-all "
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-red-600 to-red-400 text-white mr-4 shadow-md">
                  <FiCheckCircle className="w-5 h-5" />
                </div>

                <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  {data.ourApproach.title}
                </h3>
              </div>
              <ul className="space-y-3 pl-2">
                {data.ourApproach.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="bg-red-100 text-red-600 p-1 rounded-full mr-3 mt-1">
                      <FiCheckCircle className="w-3 h-3" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;