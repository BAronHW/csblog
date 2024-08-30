import React, { useContext } from 'react'
import { Instagram, Linkedin, Mail, Globe } from 'lucide-react'
import { ThemeContext } from '../App'

function Footer() {
    const theme = useContext(ThemeContext);

    return (
        <footer className={`${theme.darkmode ? "bg-slate-800 text-white" : "bg-lightmodeheader text-gray-800"}  py-10 px-4 sm:px-6 md:px-8 sticky top-[100vh]`}>
            <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0'>
                <div className='space-y-4'>
                    <h3 className='text-xl font-semibold'>Get in touch</h3>
                    <div className='flex items-center space-x-2 hover:text-blue-400 transition-colors'>
                        <Linkedin size={20} />
                        <a href="https://www.linkedin.com/in/aaron-wan-ho-lam/" className='hover:underline'>LinkedIn</a>
                    </div>
                    <div className='flex items-center space-x-2 hover:text-blue-400 transition-colors'>
                        <Mail size={20} />
                        <a href="mailto:baronhw808@gmail.com" className='hover:underline'>baronhw808@gmail.com</a>
                    </div>
                </div>
                <div className='space-y-4'>
                    <h3 className='text-xl font-semibold'>Connect</h3>
                    <div className='flex items-center space-x-2 hover:text-blue-400 transition-colors'>
                        <Instagram size={20} />
                        <a href="https://www.instagram.com/baron_hw/" className='hover:underline'>Instagram</a>
                    </div>
                    <div className='flex items-center space-x-2 hover:text-blue-400 transition-colors'>
                        <Globe size={20} />
                        <a href="https://baron-web.netlify.app/" className='hover:underline'>My Portfolio Website</a>
                    </div>
                </div>
            </div>
            <div className='mt-8 text-center text-sm text-inherit'>
                © {new Date().getFullYear()} Aaron Wan. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer