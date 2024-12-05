import React, { useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

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
        window.location.href = "/login"; // Redirect setelah menutup modal
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <h1>Register</h1>
            {isModalVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            textAlign: "center",
                        }}
                    >
                        <p>Registrasi berhasil!</p>
                        <button
                            onClick={handleCloseModal}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "blue",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    name="_token"
                    value={document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content")}
                />
                <div style={{ marginBottom: "15px" }}>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "5px",
                        }}
                        required
                    />
                    {errors.username && (
                        <p style={{ color: "red" }}>{errors.username[0]}</p>
                    )}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "5px",
                        }}
                        required
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email[0]}</p>
                    )}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "5px",
                        }}
                        required
                    />
                    {errors.password && (
                        <p style={{ color: "red" }}>{errors.password[0]}</p>
                    )}
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Konfirmasi Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation || ""}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginBottom: "5px",
                        }}
                        required
                    />
                    {errors.password_confirmation && (
                        <p style={{ color: "red" }}>
                            {errors.password_confirmation[0]}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                    }}
                >
                    Register
                </button>
            </form>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
        Sudah register?{" "}
        <a
          href="/login"
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Login di sini
        </a>
      </p>
        </div>
    );
};

export default RegisterPage;
