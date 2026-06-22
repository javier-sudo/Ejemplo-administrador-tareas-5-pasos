/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Task, TaskFilters as FiltersType, Priority, Status } from './types';
import Dashboard from './components/Dashboard';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import { Moon, Sun, Laptop, ArrowRightLeft, Sparkles, CheckCircle, Trash2, CheckCircle2 } from 'lucide-react';

// Seed Tasks
const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Refactorizar Módulo Auth',
    description: 'Limpiar la lógica del token en el localStorage y manejar expiración.',
    priority: 'alta',
    status: 'en_progreso',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'task-2',
    title: 'Diseñar Dashboard IA',
    description: 'Crear las tarjetas de métricas y filtros dinámicos en el panel de control centralizado.',
    priority: 'media',
    status: 'completada',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
  },
  {
    id: 'task-3',
    title: 'Implementar Filtros Vanilla JS',
    description: 'Usar Array.filter() para filtrar tareas sin backend ni consultas complejas externas.',
    priority: 'baja',
    status: 'pendiente',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
  },
  {
    id: 'task-4',
    title: 'Documentar README.md',
    description: 'Escribir las instrucciones para GitHub y Vercel junto al manual técnico modular.',
    priority: 'alta',
    status: 'pendiente',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
  },
];

export default function App() {
  // State for Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('task_flow_ia_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialTasks;
      }
    }
    return initialTasks;
  });

  // State for Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('task_flow_ia_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Filters State
  const [filters, setFilters] = useState<FiltersType>({
    searchTerm: '',
    priorities: [],
    statuses: [],
  });

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Instant Feedback Alerts
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('task_flow_ia_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Sync theme to local storage and document class
  useEffect(() => {
    localStorage.setItem('task_flow_ia_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Alert dismiss helper
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  // Add / Edit handler
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      // Edit mode
      setTasks(prev =>
        prev.map(t =>
          t.id === taskData.id
            ? { ...t, ...taskData, title: taskData.title, description: taskData.description, priority: taskData.priority, status: taskData.status }
            : t
        )
      );
      showNotification(`Tarea "${taskData.title}" actualizada con éxito. 📝`, 'success');
    } else {
      // Add mode
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
      showNotification(`Nueva tarea "${taskData.title}" creada correctamente. 🚀`, 'success');
    }
  };

  // Update Status Inline handler
  const handleUpdateStatus = (id: string, newStatus: Status) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
    const task = tasks.find(t => t.id === id);
    if (task) {
      const statusLabels: Record<Status, string> = {
        pendiente: 'Pendiente ⏳',
        en_progreso: 'En Progreso 🚀',
        completada: 'Completada ✅',
      };
      showNotification(`Estado de "${task.title}" cambiado a ${statusLabels[newStatus]}`, 'info');
    }
  };

  // Delete handler
  const handleDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      if (confirm(`¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`)) {
        setTasks(prev => prev.filter(t => t.id !== id));
        showNotification(`Tarea "${task.title}" eliminada. 🗑️`, 'info');
      }
    }
  };

  // Open modal for Editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Open modal for Creating
  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Filter computations
  const filteredTasks = tasks.filter((task) => {
    // 1. Text Search matching title or description
    if (filters.searchTerm) {
      const query = filters.searchTerm.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDesc) return false;
    }

    // 2. Priority check
    if (filters.priorities.length > 0) {
      if (!filters.priorities.includes(task.priority)) return false;
    }

    // 3. Status check
    if (filters.statuses.length > 0) {
      if (!filters.statuses.includes(task.status)) return false;
    }

    return true;
  });

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-250">
      
      {/* Dynamic Feedback Popover */}
      {notification && (
        <div 
          id="toast-notification"
          className={`fixed top-4 right-4 z-55 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg animate-bounce transition-transform ${
            notification.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/30'
              : notification.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-100 dark:border-rose-900/30'
              : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/30'
          }`}
        >
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <header id="main-header" className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            ⚡
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            TaskFlow <span className="text-indigo-600 dark:text-indigo-400">IA</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Light / Dark selector support */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200/50 dark:border-slate-800/85">
            <button
              onClick={() => setTheme('light')}
              className={`px-2.5 py-1 rounded-md text-sm cursor-pointer transition-all ${
                theme === 'light' 
                  ? 'bg-white text-yellow-600 dark:text-yellow-500 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Modo Claro"
            >
              ☀️
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-md text-sm cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900 text-indigo-400 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Modo Oscuro"
            >
              🌙
            </button>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 sm:pl-6 text-xs sm:text-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center text-indigo-750 dark:text-indigo-300 font-bold text-xs">
              JD
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Ingeniero Senior</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">Mánager de Equipo</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col overflow-hidden">
        {/* Dashboard row */}
        <Dashboard tasks={tasks} />

        {/* Content Layout */}
        <div id="main-content-layout" className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Filters column (3 spans on large screens) */}
          <div className="lg:col-span-3">
            <TaskFilters
              filters={filters}
              onFiltersChange={setFilters}
              openTaskModal={handleCreateTask}
            />
          </div>

          {/* List column (9 spans on large screens) */}
          <div className="lg:col-span-9 h-full flex flex-col min-h-[460px]">
            <TaskList
              tasks={filteredTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-4 border-t border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-950/40 text-center text-[11px] text-slate-400 dark:text-slate-550 transition-colors">
        TaskFlow IA. Desarrollado con 💻 React, TypeScript y Tailwind CSS. Sincronizado en tiempo real.
      </footer>

      {/* Modal Dialog */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
}
