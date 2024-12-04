import React from 'react';
import axios from 'axios';

const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus blog ini?')) {
        try {
            await axios.delete(`/blogs/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            alert('Blog berhasil dihapus.');
            window.location.reload(); // Opsional: refresh halaman
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal menghapus blog.');
        }
    }
};

const Index = ({ blogs, auth }) => {

    const handleLogout = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            if (response.ok) {
                window.location.href = '/login'; // Redirect ke halaman login setelah logout
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <h1>ブログリスト</h1>
            {/* Tampilkan tombol "Buat Blog Baru" jika user login */}
            {auth?.user && (
                <a href="/blogs/create" style={{ color: 'green', marginBottom: '10px', display: 'inline-block' }}>
                    新しいブログを書く
                </a>
            )}

            {/* Jika tidak ada blog */}
            {blogs.length === 0 ? (
                <p>ブログはありません。</p>
            ) : (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.id}>
                            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                            {/* Tombol Edit dan Hapus hanya untuk pemilik blog */}
                            {auth?.user?.id === blog.user_id && (
                                <>
                                    <a href={`/blogs/${blog.id}/edit`} style={{ color: 'blue', marginLeft: '10px' }}>
                                        Edit
                                    </a>
                                    <form
                                        method="POST"
                                        action={`/blogs/${blog.id}`}
                                        style={{ display: 'inline', marginLeft: '10px' }}
                                    >
                                        <button
                                        onClick={() => handleDelete(blog.id)}
                                        style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                    >
                                        Hapus
                                    </button>
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            消す
                                        </button>
                                    </form>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {/* Tombol Logout */}
            {auth?.user && (
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Index;