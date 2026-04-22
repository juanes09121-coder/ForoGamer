import type { ReactNode } from 'react';
import './globals.css';
import Link from 'next/link';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'Nexus Gaming Foro',
  description: 'Foro gamer para preguntas, respuestas y discusiones sobre videojuegos.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <header className="siteHeader">
            <div className="brand">
              <div className="brandMark">Nexus</div>
              <div className="brandName">Gaming Foro</div>
            </div>
            <nav className="siteNav">
              <Link href="/">Inicio</Link>
              <Link href="/">Foro</Link>
              <Link href="/profile">Perfil</Link>
              <Link href="/login">Iniciar Sesión</Link>
            </nav>
          </header>
          <main className="pageShell">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
