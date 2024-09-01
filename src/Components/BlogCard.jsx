import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { db } from '../Firebase';
import { deleteDoc, doc } from 'firebase/firestore';

function BlogCard({ title, subject, time, img, content, id, blogNum }) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  const maxLength = 100;
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  const plainTextContent = stripHtml(content);
  const truncatedContent = plainTextContent.length > maxLength 
    ? `${plainTextContent.slice(0, maxLength)}...` 
    : plainTextContent;

  

  useEffect(() => {
    if (time) {
      const date = time.toDate ? time.toDate() : new Date(time);
      const dateString = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      setFormattedDate(dateString);
    }
  }, [time]);

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
            draggable={false}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="p-6 flex-grow">
        <h5 className="mb-2 font-sans text-xl font-semibold leading-snug tracking-normal">
          {title}
        </h5>
        <p className="font-sans text-base font-light leading-relaxed">
          {truncatedContent}
        </p>
        {formattedDate && <p className="text-sm text-inherit mt-2">Posted on: {formattedDate}</p>}
      </div>
      <div className="p-6 pt-0 flex flex-col gap-2">
        <Link to={`/blog/${id}`} className="block w-full">
          <button
            className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer"
            type="button">
            Read More
          </button>
        </Link>
        {theme.isAdmin && theme.loggedIn && (
          <>
            <button
              onClick={deleteThisPage}
              disabled={loading}
              className={`w-full align-middle bg-red-600 font-bold font-sans select-none text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer py-3 px-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
            <Link to={`edit/${id}`} className="w-full">
              <button
                disabled={loading}
                className="w-full align-middle bg-orange-500 font-bold font-sans select-none text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer py-3 px-6"
              >
                Edit
              </button>
            </Link>
          </>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default BlogCard;