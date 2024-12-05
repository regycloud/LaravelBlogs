import React, { useState, useRef, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

const Navbar = ({ auth }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post("/logout");
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-xl font-bold">
                    My Blog
                </a>
                <div className="space-x-4">
                    {!auth.user ? (
                        <div className="flex space-x-4">
                            <a
                                href="/login"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                                ログイン
                            </a>
                            <a
                                href="/register"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                            >
                                登録
                            </a>
                        </div>
                    ) : (
                        <div
                            className="relative inline-block text-left"
                            ref={dropdownRef}
                        >
                            {/* Trigger Button */}
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-sm font-medium text-white hover:text-gray-300 focus:outline-none"
                            >
                                <span className="mr-2">
                                    👋 Hello, {auth.user.name || auth.user.username}!
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        dropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                                    <div className="py-1">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                        >
                                            🔒 Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;