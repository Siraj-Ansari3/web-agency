import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BlogCard = ({data}) => {
    const navigate=useNavigate();
    const reversedArray=[...data].reverse()
  return (
    <>
        {reversedArray.map((item) => (
          <div
            key={item.id}
            className=" bg-white rounded-lg shadow-md p-5 flex flex-col gap-8"
            onClick={()=>navigate(`/blog/${item.id}`)}
          >
            <div className="relative rounded ">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <div className=" absolute bottom-[-30px] right-[5px] flex flex-col w-[60px]">
              <div className="bg-white py-1 text-center  w-full  rounded-t">
                <h1 className="text-black text-2xl font-bold">{item.date}</h1>
              </div>
              <div className="bg-blue-300 py-1 text-center w-full rounded-b">
                <h1>{item.month}</h1>
              </div>
            </div>
            </div>
            <div className="bg-red-00 px-3">
            <div className="flex items-center justify-between text-sm pb-2 text-blue-500 ">
              
            </div>
            <div>
              <Link to="/blog">
                {" "}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </Link>
              <p className="text-gray-600 text-sm mt-1 text-justify">{item.disc}</p>
            </div>
            </div>
            
          </div>
        ))}
        </>
  )
}

export default BlogCard