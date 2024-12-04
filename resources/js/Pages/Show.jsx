import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const Show = () => {
    const { blog } = usePage().props; // Ambil data blog dari server-side

    return (
        <div>
            <h1>題名：{blog.title}</h1>
            <p>内容：{blog.content}</p>
            <InertiaLink href="/blogs">戻る</InertiaLink>
        </div>
    );
};

export default Show;