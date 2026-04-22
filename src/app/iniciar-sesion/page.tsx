'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Introduce tu correo y contraseña.');
      return;
    }
    const success = login({ email: email.trim(), password: password.trim() });
    if (success) {
      router.push('/perfil');
    }
  };

  return (
    <section className="panel" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 className="sectionTitle">Iniciar sesión</h1>
      <p className="footerNote">Accede para crear publicaciones, responder discusiones y administrar tu cuenta.</p>
      <form onSubmit={handleSubmit} className="grid" style={{ gap: '1rem' }}>
        <div className="fieldGroup">
          <label className="fieldLabel">Correo electrónico</label>
          <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ejemplo@nexus.com" />
        </div>
        <div className="fieldGroup">
          <label className="fieldLabel">Contraseña</label>
          <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contraseña" />
        </div>
        <button type="submit" className="button">Entrar</button>
      </form>
    </section>
  );
}
