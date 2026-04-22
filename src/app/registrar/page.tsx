'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Rellena todos los campos para continuar.');
      return;
    }
    const success = register({ name: name.trim(), email: email.trim(), password: password.trim() });
    if (success) {
      router.push('/perfil');
    }
  };

  return (
    <section className="panel" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <h1 className="sectionTitle">Crear cuenta</h1>
      <p className="footerNote">Regístrate para crear preguntas, responder temas y administrar tu perfil.</p>
      <form onSubmit={handleSubmit} className="grid" style={{ gap: '1rem' }}>
        <div className="fieldGroup">
          <label className="fieldLabel">Nombre</label>
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre o nickname" />
        </div>
        <div className="fieldGroup">
          <label className="fieldLabel">Correo electrónico</label>
          <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ejemplo@nexus.com" />
        </div>
        <div className="fieldGroup">
          <label className="fieldLabel">Contraseña</label>
          <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Contraseña segura" />
        </div>
        <button type="submit" className="button">Crear cuenta</button>
      </form>
    </section>
  );
}
