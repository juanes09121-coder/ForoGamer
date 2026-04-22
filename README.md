# Nexus Gaming Foro

Un foro completo para la comunidad gamer construido con Next.js, diseñado como proyecto final para la asignatura de Lógica de Programación.

## 🚀 Características

- **Registro y autenticación de usuarios** - Sistema completo de login/registro
- **Creación de publicaciones** - Los usuarios pueden crear preguntas sobre videojuegos
- **Sistema de respuestas** - Interacción entre usuarios con respuestas a las publicaciones
- **Categorización de contenido** - Organización por categorías (FPS, RPG, MMO, etc.)
- **Interfaz moderna** - Diseño oscuro y responsivo optimizado para gaming
- **Almacenamiento local** - Persistencia de datos usando localStorage

## 🛠️ Tecnologías utilizadas

- **Next.js 14** - Framework React para aplicaciones web
- **TypeScript** - Tipado estático para mayor robustez
- **CSS Modules** - Estilos modulares y responsivos
- **Local Storage** - Almacenamiento de datos del lado cliente

## 📁 Estructura del proyecto

```
foro-gamer/
├── public/                 # Archivos estáticos
├── src/
│   ├── app/               # Páginas y layout de Next.js
│   │   ├── globals.css    # Estilos globales
│   │   ├── layout.tsx     # Layout principal
│   │   ├── page.tsx       # Página principal del foro
│   │   ├── iniciar-sesion/# Página de login
│   │   ├── registrar/     # Página de registro
│   │   ├── perfil/        # Página de perfil de usuario
│   │   └── thread/[id]/   # Páginas dinámicas de hilos
│   ├── components/        # Componentes reutilizables
│   │   └── AuthProvider.tsx # Contexto de autenticación
│   └── lib/               # Utilidades y tipos
│       └── forum.ts       # Tipos y datos iniciales del foro
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 🚀 Instalación y ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   - Abre http://localhost:3000 (o el puerto que indique la consola)

## 🎮 Funcionalidades principales

### Sistema de usuarios
- Registro con nombre, email y contraseña
- Inicio de sesión seguro
- Perfil de usuario con información personal
- Cierre de sesión

### Foro interactivo
- Visualización de todas las publicaciones
- Filtrado por categorías (FPS, RPG, MMO, Estrategia, Aventura)
- Creación de nuevas preguntas
- Sistema de respuestas a publicaciones
- Navegación intuitiva entre hilos

### Diseño y UX
- Tema oscuro optimizado para gaming
- Interfaz responsiva para móviles y desktop
- Animaciones suaves y transiciones
- Iconografía y branding consistente

## 📊 Datos de ejemplo

El foro incluye datos de ejemplo con:
- 3 publicaciones iniciales en diferentes categorías
- Usuarios de ejemplo
- Respuestas de muestra

## 🔧 Desarrollo

### Scripts disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de código

### Arquitectura
- **Componentes funcionales** con hooks de React
- **Context API** para manejo de estado global (autenticación)
- **Rutas dinámicas** para las páginas de hilos
- **Almacenamiento local** para persistencia de datos

## 🎯 Objetivos del proyecto

Este proyecto demuestra el dominio de:
- Lógica de programación aplicada
- Desarrollo web moderno con React/Next.js
- Gestión de estado y datos
- Diseño de interfaces de usuario
- Arquitectura de aplicaciones web

## 📝 Notas adicionales

- Los datos se almacenan localmente en el navegador usando localStorage
- La aplicación está optimizada para funcionar sin backend
- Incluye validaciones básicas de formularios
- Diseño responsive para diferentes dispositivos

---

**Desarrollado como proyecto final de Lógica de Programación**