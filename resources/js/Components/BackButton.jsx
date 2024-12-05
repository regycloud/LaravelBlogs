import React from "react";

const BackButton = ({ label = "戻る", width = "50%" }) => {
    return (
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium text-sm leading-5 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
        >
            {label}
        </button>
    );
};

export default BackButton;