import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';

const Edit = () => {
    const { blog } = usePage().props; // Take blog data from server-side
    const [title, setTitle] = useState(blog.title); // State for blog title
    const [content, setContent] = useState(blog.content); // State fo content

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send data to server to update using PUT method
        Inertia.post(`/blogs/${blog.id}`, {
            _method: 'PUT', 
            title,
            content,
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">編集</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-600 font-medium mb-2">題名:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label className="block text-gray-600 font-medium mb-2">内容:</label>
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            >
                終了
            </button>
        </form>
        <div className="text-center mt-4">
            <InertiaLink
                href="/blogs"
                className="text-blue-500 hover:underline text-sm font-medium"
            >
                ブログリストへ戻る
            </InertiaLink>
        </div>
    </div>
    );
};

export default Edit;