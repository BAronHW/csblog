import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { Code, Brain, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero() {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme.darkmode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'} py-14 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Exploring the Frontiers of</span>
            <span className="block text-blue-600">Computer Science & AI</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Dive into the latest developments in Computer Science, Machine Learning, and Deep Learning with in-depth articles and tutorials.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Link to={"/blog"}>
              <a className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${theme.darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                Latest Posts
              </a>
            </Link>
            
          </div>
        </div>
        <div className="mt-20 flex justify-center space-x-10">
          <div className="text-center">
            <Code size={48} className="mx-auto text-blue-500" />
            <h2 className="mt-4 text-lg font-semibold">Computer Science</h2>
          </div>
          <div className="text-center">
            <Brain size={48} className="mx-auto text-blue-500" />
            <h2 className="mt-4 text-lg font-semibold">Machine Learning</h2>
          </div>
          <div className="text-center">
            <Cpu size={48} className="mx-auto text-blue-500" />
            <h2 className="mt-4 text-lg font-semibold">Deep Learning</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;