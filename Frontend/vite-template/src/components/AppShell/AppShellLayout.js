import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AppShell, Burger, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateReport from '../Table/CreateReport'; // Import CreateReport component
import ReportsTable from '../Table/ReportsTable'; // Import ReportsTable component
import { useNavigate } from "react-router-dom";
import useAuth from '../../pages/useAuth';
function AppShellLayout() {
    const [opened, { toggle }] = useDisclosure();
    const [activeView, setActiveView] = useState('reports'); // State to manage active view
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs(AppShell, { header: { height: 60 }, navbar: {
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
        }, padding: "md", children: [_jsxs(AppShell.Header, { children: [_jsx(Burger, { opened: opened, onClick: toggle, hiddenFrom: "sm", size: "sm" }), _jsx("div", { children: "Laborant Management System" }), _jsx("header", { children: _jsx(Button, { onClick: handleLogout, children: "Logout" }) })] }), _jsxs(AppShell.Navbar, { p: "md", children: [_jsx(Text, { onClick: () => setActiveView('reports'), style: { cursor: 'pointer', marginBottom: 10 }, children: "View Reports" }), _jsx(Text, { onClick: () => setActiveView('create'), style: { cursor: 'pointer' }, children: "Create Report" })] }), _jsxs(AppShell.Main, { children: [activeView === 'reports' && _jsx(ReportsTable, {}), activeView === 'create' && _jsx(CreateReport, {})] })] }));
}
export default AppShellLayout;
