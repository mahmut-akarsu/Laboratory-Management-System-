import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import AppShellLayout from './components/AppShell/AppShellLayout';
import CreateReport from './components/Table/CreateReport';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:"/appshell-layout",
    element: <AppShellLayout />
  },
  {
    path:"/create-report",
    element: <CreateReport />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
