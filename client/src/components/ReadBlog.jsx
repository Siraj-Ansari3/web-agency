import React from 'react'
import blogCardsData from "../data/blogs/cardsData";
import cardsData from '../data/blogs/cardsData';

const ReadBlog = ({id}) => {
    const blog=cardsData.find((blog)=>blog.id==id)
  return (
    <>
    <div>ReadBlog {id}</div>
        <img src={blog.imgSrc} className='w-[500px]'/>
        <p>{blog.title}</p>
        {console.log(blog.title)
        }

    </>
  )
}

export default ReadBlog