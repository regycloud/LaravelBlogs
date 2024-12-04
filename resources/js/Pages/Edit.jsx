import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';

const Edit = () => {
    const { blog } = usePage().props; // Ambil data blog dari server-side
    const [title, setTitle] = useState(blog.title); // State untuk judul
    const [content, setContent] = useState(blog.content); // State untuk konten

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kirim data ke server untuk diperbarui
        Inertia.post(`/blogs/${blog.id}`, {
            _method: 'PUT', // Metode HTTP untuk update
            title,
            content,
        });
    };

    return (
        <div>
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Judul:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Konten:</label>
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Perbarui</button>
            </form>
            <InertiaLink href="/blogs">Kembali ke daftar blog</InertiaLink>
        </div>
    );
};

export default Edit;