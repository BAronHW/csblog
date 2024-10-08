import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const blogCollection = collection(db, "blog");
        const q = query(blogCollection, orderBy("timesent", "desc"));
        const blogSnapshot = await getDocs(q);
        const blogList = blogSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setBlogs(blogList);
      } catch (err) {
        console.error("Error fetching blogs: ", err);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);


  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 m-4'>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            subject={blog.subject}
            time={blog.timesent}
            img={blog.imgurl}
            content={blog.content}
            id={blog.id}
            blogNum={index}
          />
        ))
      ) : (
        <div className="text-center py-10">No blogs found.</div>
      )}
    </div>
  )
}

export default BlogList