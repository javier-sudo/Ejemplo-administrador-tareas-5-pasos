# TaskFlow IA ⚡

**TaskFlow IA** es una aplicación web interactiva, moderna y ultra-ligera diseñada para gestionar las tareas y el flujo de trabajo de un equipo de software. 

La aplicación destaca por su interfaz limpia, responsiva y minimalista, además de su persistencia local nativa que previene la pérdida de datos al recargar la página.

---

## 🎨 Características Principales

- **Gestión Integral de Tareas (CRUD)**: Creación de nuevas tareas, edición de títulos/descripciones, eliminación interactiva y asignación dinámica de estados y prioridades.
- **Métricas en Tiempo Real (Dashboard)**: Visualización dinámica del total de tareas, tareas pendientes (⏳), tareas en progreso (🚀) e ítems completados (✅).
- **Filtrado Multivariable Avanzado**: Buscador de texto instantáneo de títulos y descripciones junto a selectores por prioridad (Baja, Media, Alta) y estado.
- **Sincronización Local Nativa**: Almacenamiento directo mediante la API de `localStorage` para un guardado transparente sin requerir bases de datos remotas.
- **Modo Claro / Oscuro**: Toggle con un clic que respeta las preferencias visuales del sistema operativo del usuario.
- **Diseño Adaptativo (Mobile-First)**: Estructura fluida optimizada tanto para pantallas de escritorio amplias como para tablets y celulares táctiles.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos / Diseño**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Gestor**: [Vite](https://vitejs.dev/)

---

## 🚀 Instrucciones para Ejecución Local

Para ejecutar este proyecto en tu propia máquina, sigue estos sencillos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO_GITHUB>
   cd react-example
   ```

2. **Instalar Dependencias**:
   Instala todos los paquetes requeridos por el proyecto usando npm:
   ```bash
   npm install
   ```

3. **Ejecutar el Servidor de Desarrollo**:
   Inicia la aplicación en modo desarrollo (se abrirá automáticamente una dirección local en el puerto `3000`):
   ```bash
   npm run dev
   ```

4. **Compilar para Producción**:
   Si quieres generar los archivos estáticos de distribución listos para subir:
   ```bash
   npm run build
   ```

---

## ☁️ Instrucciones para Despliegue en Vercel

Dado que **TaskFlow IA** es una SPA estática, su despliegue en Vercel es increíblemente rápido y gratuito:

1. **Crear una cuenta gratis** en [Vercel](https://vercel.com/) (puedes iniciar sesión con tu cuenta de GitHub).
2. Haz clic en **"Add New Project"** desde el panel general de Vercel.
3. Importa tu repositorio de GitHub donde subiste este clon del proyecto.
4. **Configuración de Proyecto**:
   - Vercel detectará automáticamente que es un proyecto **Vite**.
   - **Build Command**: `npm run build` o `vite build`.
   - **Output Directory**: `dist`.
5. Haz clic en **"Deploy"** y ¡listo! Vercel te proveerá un enlace único público en cuestión de segundos.
