import React from "react";
import cardsData from "../data/blogs/cardsData";
import raza from '../assets/autherImg/raza.jpg'

const ReadBlog = ({ id }) => {
  const blog = cardsData.find((blog) => blog.id == id);
  return (
    <>
      <section className="py-5 relative  bg-gray-50">
        <div className="bg-white max-w-6xl mx-auto rounded-2xl">
          <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-8  ">
            <img
              src={blog.imgSrc}
              alt=""
              className="h-[500px] w-full object-cover rounded-t-2xl"
            />
            <div className="px-10 grid lg:grid-cols-3 gap-8">
              <div className="col-span-2 bg-amber-00 text-justify flex flex-col gap-5 ">
                <h1 className=" text-2xl font-bold">{blog.title}</h1>
                <p>{blog.disc}</p>
              </div>
              <div className="border h-fit p-5 flex flex-col gap-5">
                <div className="flex gap-3 items-center">
                  <img src={raza} alt="" className="w-15 h-15 rounded-full object-cover" />
                  <div>
                    <h1 className="text-2xl">Raza Abbas</h1>
                    <h3 className="text-xs">Full Stack Developer</h3>
                  </div>
                </div>
                <div>
                  <p>The remote work revolution is entering its next phase, moving beyond simple location flexibility to reimagining fundamental work structures. This forward-looking analysis examines emerging technologies like VR workspaces that recreate office serendipity through 'digital bumping' algorithms.</p>
                </div>
                <div>
                  <button className="bg-green-300 w-full py-1 text-xl">Follow </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadBlog;
