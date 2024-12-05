import React from "react";

const Home = ({ laravelVersion, phpVersion }) => {
    return (
        <div>
            <div className="flex flex-col h-screen justify-center items-center bg-white shadow-lg rounded-lg p-8 text-center mx-auto" style={{height:'75vh'}}>
                <h1 className="text-3xl font-bold mb-4 text-gray-900">
                    ブログホームページへようこそ
                </h1>
                <p className="text-sm text-gray-600 mb-2">
                    Laravel Version:{" "}
                    <span className="font-semibold text-gray-800">
                        {laravelVersion}
                    </span>
                </p>
                <p className="text-sm text-gray-600 mb-6">
                    PHP Version:{" "}
                    <span className="font-semibold text-gray-800">
                        {phpVersion}
                    </span>
                </p>
                <a
                    href="/blogs"
                    className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                    ブログリストを見る
                </a>
            </div>
        </div>
    );
};

// Home.withoutLayout = true;
export default Home;
