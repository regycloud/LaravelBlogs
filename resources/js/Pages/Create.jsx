import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/blogs", { title, content });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                新しいブログを書く
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        題名
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="ブログのタイトル"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Textarea Content */}
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        内容
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="ここでタイプしてください"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        rows="6"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-md transition duration-300"
                >
                    送信
                </button>
            </form>
        </div>
    );
};

export default Create;
