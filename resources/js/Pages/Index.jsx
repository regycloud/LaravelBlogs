import React from 'react';

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
            <h1>Daftar Blog</h1>
            {/* Tampilkan tombol "Buat Blog Baru" jika user login */}
            {auth?.user && (
                <a href="/blogs/create" style={{ color: 'green', marginBottom: '10px', display: 'inline-block' }}>
                    Buat Blog Baru
                </a>
            )}

            {/* Jika tidak ada blog */}
            {blogs.length === 0 ? (
                <p>Tidak ada blog yang tersedia saat ini.</p>
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
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            Hapus
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