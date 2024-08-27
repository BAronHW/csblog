import React from 'react'
import { Link } from 'react-router-dom'


function BlogCard({title, subject, time, img, content}) {
  return (
    <Link to={"/"}>
        <div className='flex flex-col p-4 rounded-3xl'>
            <h2 className=''>{title}</h2>
            <h3 className=''>{subject}</h3>
            <p className=''>{content}</p>
            <p className=''>{time}</p>
            <img className='' src={img} alt="test card" />

        </div>
    </Link>
    
  )
}

export default BlogCard