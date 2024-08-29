import React, { useContext } from 'react'
import { ThemeContext } from '../App'
import { useFormik } from 'formik';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { content } from 'flowbite-react/tailwind';
import { useNavigate } from 'react-router';

function CreateCard() {
  const { darkmode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validate: values => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Title is required';
      }
      if (!values.content) {
        errors.content = 'Content is required';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const docref = await addDoc(collection(db,"blog"),{
        title: formik.values.title,
        content: formik.values.content
      })
      console.log('Form submitted with values:', values);
      alert('Card created successfully!'+formik.values.content+"and"+formik.values.title);
      resetForm();
      setSubmitting(false);
      navigate('/')
    },
  });

  return (
    <div className={`flex flex-col items-center justify-start p-6 w-full min-h-screen ${
      darkmode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'
    }`}>
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Create New Card</h1>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`w-full p-2 rounded border ${
                darkmode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'
              } ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter card title"
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 mt-1">{formik.errors.title}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className={`w-full p-2 rounded border ${
                darkmode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'
              } ${formik.touched.content && formik.errors.content ? 'border-red-500' : ''}`}
              placeholder="Enter card content"
              {...formik.getFieldProps('content')}
            ></textarea>
            {formik.touched.content && formik.errors.content ? (
              <div className="text-red-500 mt-1">{formik.errors.content}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              darkmode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Creating...' : 'Create Card'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCard