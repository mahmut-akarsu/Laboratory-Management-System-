import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import AppShellLayout from './components/AppShell/AppShellLayout';
import CreateReport from './components/Table/CreateReport';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(HomePage, {}),
    },
    {
        path: "/appshell-layout",
        element: _jsx(AppShellLayout, {})
    },
    {
        path: "/create-report",
        element: _jsx(CreateReport, {})
    }
]);
export function Router() {
    return _jsx(RouterProvider, { router: router });
}
