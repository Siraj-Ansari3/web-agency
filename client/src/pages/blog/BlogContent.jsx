import React from 'react'
import ReadBlog from '../../components/ReadBlog'
import { useParams } from "react-router-dom";


const BlogContent = () => {
    const {id}=useParams();
  return (
    <>
    <ReadBlog id={id}/>
    </>
  )
}

export default BlogContent