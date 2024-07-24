import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/useAuth';
import {HomePage} from './pages/HomePage';
import AuthenticationTitle from './pages/AuthenticationTitle/AuthenticationTitle';
import AppShellLayout from './components/AppShell/AppShellLayout';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import '@mantine/core/styles.css';
import CreateReport from './components/Table/CreateReport';

const App: React.FC = () => (
  // @ts-ignore
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthenticationTitle />} />
          <Route path="/appshell-layout" element={<AppShellLayout />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateReport />} />
        </Routes>
      </Router>
    </AuthProvider>
  </MantineProvider>
);

export default App;
