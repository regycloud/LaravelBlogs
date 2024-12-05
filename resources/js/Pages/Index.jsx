import React from "react";
import axios from "axios";
import BackButton from "@/Components/BackButton";
import { Head } from "@inertiajs/inertia-react";

const handleDelete = async (id) => {
    if (confirm("ブログを削除してもよろしいですか？")) {
        try {
            await axios.delete(`/blogs/${id}`, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            alert("ブログを削除しました。");
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("削除失敗しました。");
        }
    }
};

const Index = ({ blogs, auth }) => {
    return (
        <>
            <Head>
                <title>ブログリスト</title>
            </Head>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        📚 ブログリスト
                    </h1>
                    {/* Only show the button when the user have already logged in */}
                    {auth?.user && (
                        <a
                            href="/blogs/create"
                            className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium text-sm leading-5 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
                            style={{ marginRight: "1vh" }}
                        >
                            新しいブログを書く
                        </a>
                    )}
                    <BackButton />

                    {/* If the condition there is no blog post at all. */}
                    {blogs.length === 0 ? (
                        <p className="text-gray-600 mt-4">
                            ブログはありません。
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {blogs.map((blog) => (
                                <a
                                    key={blog.id}
                                    href={`/blogs/${blog.id}`}
                                    className="block p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                                    onClick={(e) => {
                                        if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <li className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-blue-600 hover:underline">
                                            {blog.title}
                                        </span>
                                        {auth?.user?.id === blog.user_id && (
                                            <div className="flex items-center space-x-4">
                                                <a
                                                    href={`/blogs/${blog.id}/edit`}
                                                    className="text-sm text-white bg-blue-500 hover:bg-blue-600 font-semibold py-1 px-3 rounded shadow-md transition-all duration-200"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    編集
                                                </a>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        e.preventDefault();
                                                        handleDelete(blog.id); 
                                                    }}
                                                    className="text-sm text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-3 rounded shadow-md transition-all duration-200"
                                                >
                                                    消す
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                </a>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
