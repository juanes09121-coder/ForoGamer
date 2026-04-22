'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Thread } from '@/lib/forum';
import { useAuth } from '@/components/AuthProvider';

export default function ThreadPage() {
  const params = useParams();
  const threadId = params?.id as string;
  const router = useRouter();
  const { user } = useAuth();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('nexus_forum_threads');
    if (!raw) return;
    try {
      const threads = JSON.parse(raw) as Thread[];
      const found = threads.find((item) => item.id === threadId);
      if (found) setThread(found);
      else setThread(null);
    } catch {
      setThread(null);
    }
  }, [threadId]);

  const saveThread = (updated: Thread) => {
    const raw = localStorage.getItem('nexus_forum_threads');
    const threads = raw ? (JSON.parse(raw) as Thread[]) : [];
    const next = threads.map((item) => (item.id === updated.id ? updated : item));
    localStorage.setItem('nexus_forum_threads', JSON.stringify(next));
    setThread(updated);
  };

  const handleReply = () => {
    if (!user) {
      alert('Inicia sesión para responder.');
      return;
    }
    if (!replyContent.trim() || !thread) return;
    const nextThread: Thread = {
      ...thread,
      replies: [
        ...(thread.replies || []),
        {
          id: `reply-${Date.now()}`,
          threadId: thread.id,
          author: user.name,
          content: replyContent.trim(),
          createdAt: new Date().toISOString()
        }
      ]
    };
    saveThread(nextThread);
    setReplyContent('');
  };

  if (!thread) {
    return (
      <section className="panel" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <h1 className="sectionTitle">Hilo no encontrado</h1>
        <p className="footerNote">El tema que buscas no existe o se eliminó. Regresa al <a href="/">foro principal</a>.</p>
      </section>
    );
  }

  return (
    <section className="grid" style={{ gap: '1.5rem' }}>
      <div className="panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="sectionTitle">{thread.title}</h1>
            <div className="threadMeta">
              <span>{thread.category}</span>
              <span>{thread.author}</span>
              <span>{new Date(thread.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <button className="button" style={{ width: 'auto' }} onClick={() => router.push('/')}>Volver al foro</button>
        </div>
        <div className="threadCard" style={{ marginTop: '1rem' }}>
          <p className="threadContent">{thread.content}</p>
        </div>
      </div>

      <div className="panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h2 className="sectionTitle">Respuestas ({thread.replies.length})</h2>
        <div className="grid">
          {thread.replies.length === 0 && <p className="footerNote">Aún no hay respuestas. Sé el primero en ayudar.</p>}
          {thread.replies.map((reply) => (
            <div key={reply.id} className="replyCard">
              <div className="replyAuthor">
                <span>{reply.author}</span>
                <span>{new Date(reply.createdAt).toLocaleString()}</span>
              </div>
              <p className="threadContent">{reply.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h2 className="sectionTitle">Responder esta pregunta</h2>
        <p className="footerNote">{user ? 'Comparte tu experiencia y ayuda a otros jugadores.' : 'Necesitas iniciar sesión para responder.'}</p>
        <div className="fieldGroup">
          <label className="fieldLabel">Respuesta</label>
          <textarea
            className="textarea"
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            disabled={!user}
          />
        </div>
        <button className="button" onClick={handleReply} disabled={!user}>
          Publicar respuesta
        </button>
      </div>
    </section>
  );
}
