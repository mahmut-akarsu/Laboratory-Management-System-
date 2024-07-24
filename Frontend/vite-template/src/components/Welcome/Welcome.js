import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';
export function Welcome() {
    return (_jsxs(_Fragment, { children: [_jsxs(Title, { className: classes.title, ta: "center", mt: 100, children: ["Welcome to", ' ', _jsx(Text, { inherit: true, variant: "gradient", component: "span", gradient: { from: 'pink', to: 'yellow' }, children: "Mantine" })] }), _jsxs(Text, { c: "dimmed", ta: "center", size: "lg", maw: 580, mx: "auto", mt: "xl", children: ["This starter Vite project includes a minimal setup, if you want to learn more on Mantine + Vite integration follow", ' ', _jsx(Anchor, { href: "https://mantine.dev/guides/vite/", size: "lg", children: "this guide" }), ". To get started edit pages/Home.page.tsx file."] })] }));
}
