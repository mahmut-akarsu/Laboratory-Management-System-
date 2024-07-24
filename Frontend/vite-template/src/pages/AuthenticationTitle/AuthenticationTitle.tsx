import React, { useState, useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useNavigate } from "react-router-dom";
import classes from './AuthenticationTitle.module.css';
import axios from 'axios';

export function AuthenticationTitle() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  // Form submit işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Formun sayfanın yenilenmesini önler

    const payload = {
      username: username,
      password: password,
    };

    try {
      await axios.post('http://localhost:8080/api/auth/login', payload);
      const response = await axios.get(`http://localhost:8080/api/user/${username}/roles`);
      localStorage.setItem('userRole',response.data)
      console.log(localStorage.getItem('userRole'));

      setUserRole(response.data);
      navigate('/appshell-layout');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}> {/* Form elemanlarını saran form etiketi */}
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="sample-user"
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            {/* Diğer form öğeleri */}
          </Group>
          <Button type="submit" fullWidth mt="xl" onClick={handleSubmit}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AuthenticationTitle;
