import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

function BlogDetailPage() {
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBlogData = async () => {
            try {
                setLoading(true);
                const docRef = doc(db, "blog", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setBlogData(docSnap.data());
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
            <h1 className="text-3xl font-bold mb-4">{blogData.title}</h1>
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