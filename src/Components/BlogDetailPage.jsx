import React, { useContext, useEffect, useState } from 'react'
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleX, Clock, Tag, User } from 'lucide-react';
import { ThemeContext } from '../App';

function BlogDetailPage() {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    useEffect(() => {
        const getBlogData = async () => {
            try {
                setLoading(true);
                const docRef = doc(db, "blog", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBlogData({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("No such document!");
                }
            } catch (err) {
                console.error("Error fetching blog post:", err);
                setError("Failed to fetch the blog post. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            getBlogData();
        }
    }, [id]);

    const deleteThisPage = async () => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                if (!theme.isAdmin) return;
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!blogData) {
        return <div className="text-center py-10">No blog post found.</div>;
    }

    return (
        <div className={`container mx-auto px-4 py-8 ${theme.darkmode ? 'text-white bg-gray-700' : 'text-gray-800 bg-white'}`}>
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{blogData.title}</h1>
                    {theme.isAdmin && theme.loggedIn &&
                        <button
                            onClick={deleteThisPage}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                        >
                            <CircleX className="mr-2" size={20} />
                            Delete Post
                        </button>
                    }
                </div>

                <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
                    <img 
                        src={blogData.imgurl} 
                        alt={blogData.title} 
                        className="w-full h-auto max-h-[400px] object-cover"
                        draggable={false}
                    />
                </div>

                <div className="flex flex-wrap items-center space-x-4 mb-6 text-sm text-gray-500">
                    {blogData.author && (
                        <div className="flex items-center mb-2">
                            <User size={16} className="mr-2" />
                            <span>{blogData.author}</span>
                        </div>
                    )}
                    {blogData.time && (
                        <div className="flex items-center mb-2">
                            <Clock size={16} className="mr-2" />
                            <span>{new Date(blogData.time).toLocaleDateString()}</span>
                        </div>
                    )}
                    {blogData.subject && (
                        <div className="flex items-center mb-2">
                            <Tag size={16} className="mr-2" />
                            <span>{blogData.subject}</span>
                        </div>
                    )}
                </div>

                <div className={`prose max-w-none ${theme.darkmode ? 'prose-invert' : ''}`}>
                    {blogData.content}
                </div>
            </div>
        </div>
    );
}

export default BlogDetailPage;