import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/blogs', { title, content });
    };

    return (
        <div>
            <h1>Create a New Blog</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    name="content"
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Create;