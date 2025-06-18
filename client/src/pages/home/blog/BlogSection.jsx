import React from "react";
import blogCardsData from "../../../data/blogs/cardsData";
import { FaUser, FaComments } from "react-icons/fa"; // Font Awesome icons
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="relative bg-blue-400 pb-42">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <p className="max-w-xl mx-auto mt-4 text-gray-600">
            Outlived no dwelling denoting in peculiar as he believed...
          </p>
        </div>
        <div className="relative  flex gap-5 items-center justify-between md:max-w-[80%] mx-auto">
          {blogCardsData.map((item) => {
            return (
              <div
                key={item.id}
                className="  bg-white rounded py-5 px-5 flex flex-col gap-3"
              >
                <div className="bg-amber-300 rounded">
                  <img src={item.imgSrc} alt="" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-blue-400">
                    <FaUser /> <span>{item.auther}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <FaComments /> <span>{item.comments} comments</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <p>{item.disc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wave SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full z-[1]"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,208C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,218.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  );
};

export default Home;
