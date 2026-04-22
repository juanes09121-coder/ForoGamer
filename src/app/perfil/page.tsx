'use client';

import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <section className="panel" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1 className="sectionTitle">Perfil</h1>
        <p className="footerNote">No has iniciado sesión todavía.</p>
        <Link href="/iniciar-sesion" className="button" style={{ display: 'inline-block', width: 'auto' }}>
          Iniciar sesión
        </Link>
      </section>
    );
  }

  return (
    <section className="panel" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="sectionTitle">Hola, {user.name}</h1>
          <p className="footerNote">Cuenta registrada con {user.email}. Bienvenido a Nexus Gaming Foro.</p>
        </div>
        <button className="button" type="button" onClick={logout} style={{ width: 'auto' }}>
          Cerrar sesión
        </button>
      </div>
      <div className="panel" style={{ marginTop: '1.5rem' }}>
        <h2 className="sectionTitle">Tus datos de usuario</h2>
        <p className="threadMeta">Usuario: {user.name}</p>
        <p className="threadMeta">Correo: {user.email}</p>
        <p className="threadMeta">Miembro desde: {new Date(user.registeredAt).toLocaleDateString()}</p>
      </div>
    </section>
  );
}
