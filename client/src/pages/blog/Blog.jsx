import React from 'react'
import BlogCard from '../../components/BlogCard'
import blogCardsData from "../../data/blogs/cardsData";


const Blog = () => {
  return (
    <>
    <section className='mt-5'>
      <div className='bg-amber-300 max-w-7xl mx-auto '>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 '>
          <BlogCard  data={blogCardsData}/>

        </div>
      </div>
    </section>
    </>
  )
}

export default Blog