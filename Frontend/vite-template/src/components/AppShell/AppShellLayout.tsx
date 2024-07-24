import React, { useState } from 'react';
import { AppShell, Burger, Text, Box,Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateReport from '../Table/CreateReport'; 
import ReportsTable from '../Table/ReportsTable'; 
import { useNavigate } from "react-router-dom";
import useAuth from '@/pages/useAuth';

function AppShellLayout() {
  const [opened, { toggle }] = useDisclosure();
  const [activeView, setActiveView] = useState('reports'); // State to manage active view
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Laborant Management System</div>
        <header>
        {/* Diğer header içeriği */}
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text onClick={() => setActiveView('reports')} style={{ cursor: 'pointer', marginBottom: 10 }}>
          View Reports
        </Text>
        <Text onClick={() => setActiveView('create')} style={{ cursor: 'pointer' }}>
          Create Report
        </Text>
      </AppShell.Navbar>

      <AppShell.Main>
        {activeView === 'reports' && <ReportsTable />}
        {activeView === 'create' && <CreateReport />}
      </AppShell.Main>
    </AppShell>
  );
}

export default AppShellLayout;
