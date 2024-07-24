import { jsx as _jsx } from "react/jsx-runtime";
import { Route, Navigate } from 'react-router-dom';
import useAuth from './useAuth';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();
    return (_jsx(Route, { ...rest, element: user ? _jsx(Component, {}) : _jsx(Navigate, { to: "/login" }) }));
};
export default PrivateRoute;
