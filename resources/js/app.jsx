import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import "../css/app.css";
import axios from "axios";
import Layout from "./Components/Layouts";

axios.defaults.headers.common["X-CSRF-TOKEN"] = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

createInertiaApp({
    resolve: (name) => {
        return import(/* @vite-ignore */ `./Pages/${name}`).then((module) => {
            const page = module.default;
            // Hanya gunakan layout jika `page.withoutLayout` tidak diatur atau false
            page.layout =
                page.layout ||
                (!page.withoutLayout
                    ? (page) => <Layout auth={page.props.auth}>{page}</Layout>
                    : null);

            return page;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
