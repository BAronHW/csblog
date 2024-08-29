import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';

function BlogCard({ title, subject, time, img, content, id }) {
  const theme = useContext(ThemeContext);
  const maxLength = 100;
  const isLong = content.length > maxLength;
  const truncatedContent = isLong ? content.slice(0, maxLength) + '...' : content;

  return (
    <div className={`relative flex flex-col mt-6 text-gray-700 ${theme.darkmode ? "bg-gray-600 shadow-md bg-clip-border rounded-xl w-96" : "bg-white shadow-md bg-clip-border rounded-xl w-96"}`}>
      <div
        className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={img}
          alt="card-image" 
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h5 className={`block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal ${theme.darkmode ? "text-white" : "text-blue-gray-900"}`}>
          {title}
        </h5>
        <p className={`block font-sans text-base antialiased font-light leading-relaxed ${theme.darkmode ? "text-white" : "text-blue-gray-900"}`}>
          {truncatedContent}
        </p>
      </div>
      <div className="p-6 pt-0">
          <Link to={`/blog/${id}`} className="inline-block">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:cursor-pointer"
              type="button">
              Read More
            </button>
          </Link>
      </div>
    </div>
  );
}

export default BlogCard;