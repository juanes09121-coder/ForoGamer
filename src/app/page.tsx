'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { initialThreads, CATEGORIES, Thread } from '@/lib/forum';
import { useAuth } from '@/components/AuthProvider';

function getStoredThreads(): Thread[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('nexus_forum_threads');
  if (!raw) return initialThreads;
  try {
    return JSON.parse(raw) as Thread[];
  } catch {
    return initialThreads;
  }
}

export default function HomePage() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [category, setCategory] = useState('Todos');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('FPS');

  useEffect(() => {
    setThreads(getStoredThreads());
  }, []);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) =>
      category === 'Todos' ? true : thread.category === category
    );
  }, [threads, category]);

  const saveThreads = (nextThreads: Thread[]) => {
    localStorage.setItem('nexus_forum_threads', JSON.stringify(nextThreads));
  };

  const handlePublish = () => {
    if (!user) {
      alert('Inicia sesión para publicar una pregunta.');
      return;
    }
    if (!title.trim() || !content.trim()) {
      alert('Completa el título y el contenido.');
      return;
    }
    const nextThread: Thread = {
      id: `thread-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      category: selectedCategory,
      author: user.name,
      createdAt: new Date().toISOString(),
      replies: []
    };
    const nextThreads = [nextThread, ...threads];
    setThreads(nextThreads);
    saveThreads(nextThreads);
    setTitle('');
    setContent('');
  };

  return (
    <section className="grid" style={{ gap: '2rem' }}>
      <div className="panel">
        <h1 className="sectionTitle">Nexus Gaming Foro</h1>
        <p className="footerNote">
          Plataforma para crear preguntas, responder dudas y organizar contenido por categorías.
        </p>
      </div>

      <div className="row">
        <div className="panel" style={{ flex: 2 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <h2 className="sectionTitle">Últimas preguntas</h2>
              <p className="footerNote">Explora la comunidad y contribuye con tus conocimientos.</p>
            </div>
            <div className="badge">{filteredThreads.length} temas</div>
          </div>

          <div className="row" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="button"
              style={{ width: 'auto', background: category === 'Todos' ? 'var(--accent)' : '' }}
              onClick={() => setCategory('Todos')}
            >
              Todos
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className="button"
                style={{ width: 'auto', background: category === item ? 'var(--accent)' : '' }}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid" style={{ marginTop: '1.5rem' }}>
            {filteredThreads.map((thread) => (
              <Link key={thread.id} href={`/thread/${thread.id}`} className="threadCard">
                <div className="threadHeader">
                  <h3 className="threadTitle">{thread.title}</h3>
                  <span className="badge">{thread.category}</span>
                </div>
                <p className="threadExcerpt">{thread.content.slice(0, 120)}...</p>
                <div className="threadMeta">
                  <span>{thread.author}</span>
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  <span>{thread.replies.length} respuestas</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="panel" style={{ flex: 1 }}>
          <h2 className="sectionTitle">Nueva pregunta</h2>
          <p className="footerNote">
            {user ? `Hola ${user.name}, publica una pregunta para que la comunidad te responda.` : 'Regístrate e inicia sesión para participar.'}
          </p>
          <div className="fieldGroup">
            <label className="fieldLabel">Categoría</label>
            <select
              className="select"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="fieldGroup">
            <label className="fieldLabel">Título de la publicación</label>
            <input
              className="input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Escribe un título descriptivo..."
            />
          </div>
          <div className="fieldGroup">
            <label className="fieldLabel">Contenido</label>
            <textarea
              className="textarea"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Describe tu duda o tema con claridad..."
            />
          </div>
          <button className="button" onClick={handlePublish}>
            Publicar ahora
          </button>

          {!user && (
            <div className="notice" style={{ marginTop: '1rem' }}>
              Para publicar necesitas <Link href="/iniciar-sesion">iniciar sesión</Link> o <Link href="/registrar">crear una cuenta</Link>.
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
