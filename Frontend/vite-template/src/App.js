import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/useAuth';
import { HomePage } from './pages/HomePage';
import AuthenticationTitle from './pages/AuthenticationTitle/AuthenticationTitle';
import AppShellLayout from './components/AppShell/AppShellLayout';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import '@mantine/core/styles.css';
import CreateReport from './components/Table/CreateReport';
const App = () => (
// @ts-ignore
_jsx(MantineProvider, { theme: theme, withGlobalStyles: true, withNormalizeCSS: true, children: _jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(AuthenticationTitle, {}) }), _jsx(Route, { path: "/appshell-layout", element: _jsx(AppShellLayout, {}) }), _jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/create", element: _jsx(CreateReport, {}) })] }) }) }) }));
export default App;
