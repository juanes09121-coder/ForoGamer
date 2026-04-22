export type Reply = {
  id: string;
  threadId: string;
  author: string;
  content: string;
  createdAt: string;
};

export type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  replies: Reply[];
};

export const CATEGORIES = ['FPS', 'RPG', 'MMO', 'Estrategia', 'Aventura'];

export const initialThreads: Thread[] = [
  {
    id: 'thread-1',
    title: '¿Cuál es el mejor arma para un sniper en FPS competitivo?',
    content: 'Estoy armando una build centrada en precisión y necesito recomendaciones para el mejor rifle francotirador en el meta actual.',
    category: 'FPS',
    author: 'ShadowStriker',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    replies: [
      {
        id: 'reply-1',
        threadId: 'thread-1',
        author: 'Nexus_Dev',
        content: 'Prueba el Krieger X40 si buscas balance entre daño y movilidad. También vale considerar un silenciador para mapas pequeños.',
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      }
    ]
  },
  {
    id: 'thread-2',
    title: '¿Cómo optimizar la subida de nivel en un MMORPG nuevo?',
    content: 'Acabo de comenzar en un MMORPG nuevo y quiero subir rápido sin gastar dinero real. ¿Qué consejos dan para avanzar en el early game?',
    category: 'MMO',
    author: 'CyberPanda',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    replies: [
      {
        id: 'reply-2',
        threadId: 'thread-2',
        author: 'QuestMaster',
        content: 'Enfócate en las misiones de historia, completa cadenas de quest y usa bonus de experiencia de los eventos. Eso te dará la mejor progresión sin gastar.',
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Recomendaciones para construir un equipo de RPG con soporte y DPS',
    content: 'Quiero un grupo equilibrado para contenido cooperativo: quién debería ser support, tank y DPS para maximizar sinergia.',
    category: 'RPG',
    author: 'NexusVoyager',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    replies: [
      {
        id: 'reply-3',
        threadId: 'thread-3',
        author: 'ArenaPro',
        content: 'Un buen combo es tank con control de masas, support con curaciones de área y DPS rápido. Prioriza habilidades que den buffs a todo el equipo.',
        createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString()
      }
    ]
  }
];
