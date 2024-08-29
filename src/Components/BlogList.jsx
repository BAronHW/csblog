import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const blogCollection = collection(db, "blog");
        const blogSnapshot = await getDocs(blogCollection);
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
    return <div className="text-center py-10">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className='flex flex-wrap justify-center gap-4 m-4'>
      {blogs.length > 0 ? (
        blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            subject={blog.subject}
            time={blog.time}
            img={blog.img}
            content={blog.content}
          />
        ))
      ) : (
        <div className="text-center py-10">No blogs found.</div>
      )}
    </div>
  )
}

export default BlogList