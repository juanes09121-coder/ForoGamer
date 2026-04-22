'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: string;
};

type Credentials = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: Omit<User, 'password'> | null;
  register: (data: { name: string; email: string; password: string }) => boolean;
  login: (credentials: Credentials) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getStoredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('nexus_forum_users');
  if (!raw) return [];
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function getStoredUser(): Omit<User, 'password'> | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('nexus_forum_current_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Omit<User, 'password'>;
  } catch {
    return null;
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem('nexus_forum_users', JSON.stringify(users));
}

function saveCurrentUser(user: Omit<User, 'password'> | null) {
  if (!user) {
    localStorage.removeItem('nexus_forum_current_user');
    return;
  }
  localStorage.setItem('nexus_forum_current_user', JSON.stringify(user));
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const register = (data: { name: string; email: string; password: string }) => {
    const users = getStoredUsers();
    const exists = users.some((item) => item.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      alert('Ya existe un usuario con ese correo.');
      return false;
    }
    const nextUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      registeredAt: new Date().toISOString()
    };
    saveUsers([nextUser, ...users]);
    const currentUser = {
      id: nextUser.id,
      name: nextUser.name,
      email: nextUser.email,
      registeredAt: nextUser.registeredAt
    };
    saveCurrentUser(currentUser);
    setUser(currentUser);
    return true;
  };

  const login = (credentials: Credentials) => {
    const users = getStoredUsers();
    const found = users.find(
      (item) => item.email.toLowerCase() === credentials.email.toLowerCase() && item.password === credentials.password
    );
    if (!found) {
      alert('Correo o contraseña incorrectos.');
      return false;
    }
    const currentUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      registeredAt: found.registeredAt
    };
    saveCurrentUser(currentUser);
    setUser(currentUser);
    return true;
  };

  const logout = () => {
    saveCurrentUser(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, register, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
