import React from "react";
import { motion } from 'framer-motion';
import { FiMail} from 'react-icons/fi';
const CallToAction = ({data}) => {
  return (
    <>
      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-red-600 to-red-400 p-8 rounded-2xl shadow-xl text-white overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              {data.title}
            </h2>
            <p className="mb-6 text-lg text-red-100">
             {data.subtitle}
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg font-medium border border-red-300 hover:bg-red-50 transition-all shadow-sm"
            >
              <FiMail className="mr-2 w-5 h-5" /> {data.buttonText}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CallToAction;
