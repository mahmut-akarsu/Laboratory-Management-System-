import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TextInput, PasswordInput, Paper, Title, Container, Group, Button, } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import classes from './AuthenticationTitle.module.css';
import axios from 'axios';
export function AuthenticationTitle() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    // Form submit işlemi
    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun sayfanın yenilenmesini önler
        const payload = {
            username: username,
            password: password,
        };
        try {
            await axios.post('http://localhost:8080/api/auth/login', payload);
            const response = await axios.get(`http://localhost:8080/api/user/${username}/roles`);
            localStorage.setItem('userRole', response.data);
            console.log(localStorage.getItem('userRole'));
            setUserRole(response.data);
            navigate('/appshell-layout');
        }
        catch (e) {
            console.error(e);
        }
    };
    return (_jsxs(Container, { size: 420, my: 40, children: [_jsx(Title, { ta: "center", className: classes.title, children: "Welcome back!" }), _jsx(Paper, { withBorder: true, shadow: "md", p: 30, mt: 30, radius: "md", children: _jsxs("form", { onSubmit: handleSubmit, children: [" ", _jsx(TextInput, { label: "Username", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "sample-user", required: true }), _jsx(PasswordInput, { label: "Password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Your password", required: true, mt: "md" }), _jsx(Group, { justify: "space-between", mt: "lg" }), _jsx(Button, { type: "submit", fullWidth: true, mt: "xl", onClick: handleSubmit, children: "Sign in" })] }) })] }));
}
export default AuthenticationTitle;
