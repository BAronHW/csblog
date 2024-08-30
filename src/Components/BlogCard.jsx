import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { db } from '../Firebase';
import { deleteDoc, doc } from 'firebase/firestore';

function BlogCard({ title, subject, time, img, content, id, blogNum }) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const maxLength = 100;
  const isLong = content.length > maxLength;
  const truncatedContent = isLong ? content.slice(0, maxLength) + '...' : content;

  const deleteThisPage = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blog", id));
        alert("Blog post deleted successfully!");
        navigate('/');
      } catch (err) {
        console.error("Error deleting document: ", err);
        setError("Failed to delete the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className={`flex flex-col overflow-hidden mt-6 ${
      theme.darkmode ? "bg-gray-600 text-white" : "bg-white text-gray-700"
    } shadow-md rounded-xl w-96`}>
      <div className="relative h-48 w-full">
        {img ? (
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-6 flex-grow">
        <h5 className={`mb-2 font-sans text-xl font-semibold leading-snug tracking-normal`}>
          {title}
        </h5>
        <p className={`font-sans text-base font-light leading-relaxed`}>
          {truncatedContent}
        </p>
      </div>
      <div className="p-6 pt-0 space-y-2">
        <Link to={`/blog/${id}`} className="block w-full">
          <button
            className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer"
            type="button">
            Read More
          </button>
        </Link>
        {theme.isAdmin && theme.loggedIn && (
          <button
            onClick={deleteThisPage}
            disabled={loading}
            className={`w-full align-middle bg-red-600 font-bold font-sans select-none text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer py-3 px-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default BlogCard;