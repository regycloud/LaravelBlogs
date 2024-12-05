import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        try {
            const response = await axios.post("/register", formData, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            setSuccessMessage(
                response.data.message || "Registration successful!"
            );
            setFormData({ username: "", email: "", password: "" });
            setIsModalVisible(true);
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error("An error occurred:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        window.location.href = "/login"; 
    };

    return (
        <div className="max-w-md mx-auto my-12 p-5 border border-gray-300 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-center mb-4">登録</h1>
    {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg text-center">
                <p className="mb-4">登録が成功しました!</p>
                <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    了解
                </button>
            </div>
        </div>
    )}
    {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
    )}
    <form onSubmit={handleSubmit}>
        <input
            type="hidden"
            name="_token"
            value={document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content")}
        />
        <div className="mb-4">
            <label className="block font-medium mb-1">ユーザー名</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            {errors.username && (
                <p className="text-red-500 text-sm">{errors.username[0]}</p>
            )}
        </div>
        <div className="mb-4">
            <label className="block font-medium mb-1">メールアドレス</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email[0]}</p>
            )}
        </div>
        <div className="mb-4">
            <label className="block font-medium mb-1">パスワード</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password[0]}</p>
            )}
        </div>
        <div className="mb-4">
            <label className="block font-medium mb-1">確認パスワード</label>
            <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                required
            />
            {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                    {errors.password_confirmation[0]}
                </p>
            )}
        </div>
        <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
            登録
        </button>
    </form>
    <p className="mt-4 text-center">
        登録しました？{" "}
        <a
            href="/login"
            className="text-blue-500 underline hover:text-blue-600"
        >
            ここでログイン
        </a>
    </p>
</div>
    );
};

export default RegisterPage;
