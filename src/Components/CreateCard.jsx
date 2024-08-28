import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../App'
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function CreateCard() {

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Card</h1>
    </div>
  )
}

export default CreateCard