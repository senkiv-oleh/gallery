'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.scss';

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!isLogin && !trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const rawUsers = localStorage.getItem('unsplash_users');
    const users: StoredUser[] = rawUsers ? JSON.parse(rawUsers) : [];

    if (isLogin) {
      const existing = users.find(
        (u) => u.email === trimmedEmail && u.password === password
      );

      if (!existing) {
        setError('Invalid email or password.');
        return;
      }

      localStorage.setItem(
        'unsplash_user',
        JSON.stringify({ name: existing.name, email: existing.email })
      );
    } else {
      if (users.some((u) => u.email === trimmedEmail)) {
        setError('An account with this email already exists.');
        return;
      }

      const newUser: StoredUser = {
        name: trimmedName,
        email: trimmedEmail,
        password,
      };

      localStorage.setItem('unsplash_users', JSON.stringify([...users, newUser]));
      localStorage.setItem(
        'unsplash_user',
        JSON.stringify({ name: newUser.name, email: newUser.email })
      );
    }

    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{isLogin ? 'Login' : 'Join Gallery'}</h1>
          <p className={styles.subtitle}>
            {isLogin ? 'Welcome back.' : 'Already have an account?'}{' '}
            {!isLogin && (
              <button
                type="button"
                onClick={toggleMode}
                style={{
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#111',
                  fontSize: '14px',
                }}
              >
                Login
              </button>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && <div className={styles.error}>{error}</div>}

          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password (min. 6 char)</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Login' : 'Join'}
          </button>
        </form>

        {isLogin && (
          <div className={styles.switchBox}>
            Don&apos;t have an account?
            <button type="button" onClick={toggleMode}>
              Join
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
