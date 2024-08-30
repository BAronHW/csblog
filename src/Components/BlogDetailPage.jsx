import React, { useContext, useEffect, useState } from 'react'
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';
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
        try {
            if(!theme.isAdmin)return
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
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{blogData.title}</h1>
                {theme.isAdmin && <button
                    onClick={deleteThisPage}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <CircleX className="mr-2" />
                    Delete Post
                </button>
                }
            </div>
            <img src={blogData.img} alt={blogData.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <p className="text-gray-600 mb-2">Subject: {blogData.subject}</p>
            <p className="text-gray-600 mb-4">Time: {blogData.time}</p>
            <div className="prose max-w-none">
                {blogData.content}
            </div>
        </div>
    );
}

export default BlogDetailPage;