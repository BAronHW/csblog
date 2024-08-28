import React from 'react'
import { TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-100 text-slate-800 p-4'>
      <TriangleAlert size={64} className='text-red-500 mb-4' />
      <h1 className='text-3xl font-bold mb-2'>Oops! Something went wrong.</h1>
      <p className='text-xl mb-6'>You don't have permission to access this page.</p>
      <button 
        onClick={() => navigate('/')} 
        className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
      >
        Return to Home
      </button>
    </div>
  )
}

export default ErrorPage