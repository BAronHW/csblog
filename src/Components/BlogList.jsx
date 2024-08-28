import React from 'react'
import BlogCard from './BlogCard'

function BlogList() {
  return (
    <div className='flex items-center justify-center m-4 flex-wrap gap-2'>
      <BlogCard title={"test"} subject={"tech"} time={10} img={"https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"} content={"testing testing"}></BlogCard>
      <BlogCard title={"test"} subject={"tech"} time={10} img={"https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"} content={"testing testing"}></BlogCard>
      <BlogCard title={"test"} subject={"tech"} time={10} img={"https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"} content={"testing testing"}></BlogCard>
      <BlogCard title={"test"} subject={"tech"} time={10} img={"https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"} content={"testing testing"}></BlogCard>
      <BlogCard title={"test"} subject={"tech"} time={10} img={"https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"} content={"testing testing"}></BlogCard>

    </div>
  )
}

export default BlogList