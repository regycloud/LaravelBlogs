import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import BackButton from "@/Components/BackButton";

const Show = () => {
    const { blog } = usePage().props; // Ambil data blog dari server-side
    const BlogDate = ({ date }) => {
        const formattedDate = new Date(date).toLocaleString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Tokyo",
        });

        return <p>{formattedDate}</p>;
    };

    return (
        <div className="flex flex-col items-center justify-center text-gray-800">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    題名：{blog.title}
                </h1>
                <p className="text-gray-700 text-base mb-6">
                    内容：
                    <p>{blog.content}</p>
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    筆者：{blog.user?.username +'さん' || "不明"}{" "}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    作成時間：{<BlogDate date={blog.created_at} /> || "不明"}{" "}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    編集時間：{<BlogDate date={blog.updated_at} /> || "不明"}{" "}
                </p>
                <BackButton />
            </div>
        </div>
    );
};

export default Show;
