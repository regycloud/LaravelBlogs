import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(
            "/login",
            { email, password },
            {
                onSuccess: () => {
                    Inertia.visit("/");
                },
                onError: (error) => {
                    setErrors(error);
                },
            }
        );
    };

    return (
        <>
        <Head>
            <title>ログイン</title>
        </Head>
        <div className="flex h-[75vh] justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
                    ログインページ
                </h2>
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                        {Object.values(errors).map((err, idx) => (
                            <p key={idx}>{err}</p>
                        ))}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        メールアドレス:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        パスワード:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                    >
                        ログイン
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400 transition"
                    >
                        戻る
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;
