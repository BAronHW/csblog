import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function BlogCard({ title, subject, time, img, content, id }) {
  const theme = useContext(ThemeContext);
  const maxLength = 100;
  const isLong = content.length > maxLength;
  const truncatedContent = isLong ? content.slice(0, maxLength) + '...' : content;

  const deleteThisPage = async () => {
    try {
        setLoading(true);
        await deleteDoc(doc(db, "blog", id));
        navigate('/');
    } catch (err) {
        console.error("Error deleting document: ", err);
        setError("Failed to delete the blog post. Please try again later.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className={`flex flex-col overflow-hidden mt-6 ${
      theme.darkmode ? "bg-gray-600 text-white" : "bg-white text-gray-700"
    } shadow-md rounded-xl w-96`}>
      <div className="relative h-48 w-full">
        <img
          src={img}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 flex-grow">
        <h5 className={`mb-2 font-sans text-xl font-semibold leading-snug tracking-normal`}>
          {title}
        </h5>
        <p className={`font-sans text-base font-light leading-relaxed`}>
          {truncatedContent}
        </p>
      </div>
      <div className="p-6 pt-0 flex flex-col gap-2">
        <Link to={`/blog/${id}`} className="inline-block w-full">
          <button
            className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer"
            type="button">
            Read More
          </button>
        </Link>
        {theme.isAdmin && theme.loggedIn &&
        <button
          onClick={deleteThisPage}
          className='w-full align-middle bg-red-600 font-bold font-sans select-none text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-inherit shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer py-3 px-6'
        >
          Delete
        </button>
        }
      </div>
    </div>
  );
}

export default BlogCard;