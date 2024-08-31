import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../Firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkmode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      imgurl: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let imgUrl = values.imgurl;
        
        if (values.newImage) {
          const imgRef = ref(storage, `images/${Date.now()}_${values.newImage.name}`);
          const snapshot = await uploadBytes(imgRef, values.newImage);
          imgUrl = await getDownloadURL(snapshot.ref);
        }

        await updateDoc(doc(db, "blog", id), {
          title: values.title,
          content: values.content,
          imgurl: imgUrl
        });

        alert('Blog post updated successfully!');
        navigate(`/blog/${id}`);
      } catch (error) {
        console.error("Error updating blog post:", error);
        setError("Failed to update the blog post. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const docRef = doc(db, "blog", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          formik.setValues({
            title: data.title,
            content: data.content,
            imgurl: data.imgurl
          });
        } else {
          setError("No such blog post!");
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to fetch the blog post. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${darkmode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            {...formik.getFieldProps('title')}
            className={`w-full p-2 rounded border ${darkmode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 mt-1">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <textarea
            id="content"
            {...formik.getFieldProps('content')}
            rows="10"
            className={`w-full p-2 rounded border ${darkmode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          ></textarea>
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 mt-1">{formik.errors.content}</div>
          )}
        </div>

        <div>
          <label htmlFor="newImage" className="block text-sm font-medium mb-1">New Image (optional)</label>
          <input
            type="file"
            id="newImage"
            onChange={(event) => {
              formik.setFieldValue("newImage", event.currentTarget.files[0]);
            }}
            className={`w-full p-2 rounded border ${darkmode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
          />
        </div>

        {formik.values.imgurl && (
          <div>
            <p className="text-sm font-medium mb-1">Current Image:</p>
            <img src={formik.values.imgurl} alt="Current" className="max-w-xs h-auto" />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${darkmode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Updating...' : 'Update Blog Post'}
        </button>
      </form>
    </div>
  );
}

export default EditBlog;