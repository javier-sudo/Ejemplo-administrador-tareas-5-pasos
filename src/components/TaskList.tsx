/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Task, Priority, Status } from '../types';
import { Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onUpdateStatus: (id: string, status: Status) => void;
}

export default function TaskList({ tasks, onEditTask, onDeleteTask, onUpdateStatus }: TaskListProps) {
  // Simple pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case 'alta':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-900/40';
      case 'media':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/40';
      case 'baja':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40';
    }
  };

  return (
    <div id="task-list-card" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-between items-center">
        <h2 className="font-bold text-slate-800 dark:text-slate-200">Lista de Tareas</h2>
        <div className="text-xs text-slate-500 font-medium">
          Ordenado por: <span className="text-slate-900 dark:text-slate-300 font-bold">Fecha de creación ↓</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[300px]">
        {displayedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center h-full">
            <AlertCircle className="text-slate-350 dark:text-slate-600 mb-3" size={40} />
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">No se encontraron tareas</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Usa el botón "Nueva Tarea" para crear una o ajusta los filtros en el menú lateral.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200/50 dark:border-slate-800/50">
                  <tr>
                    <th className="px-6 py-3.5">Tarea</th>
                    <th className="px-6 py-3.5">Prioridad</th>
                    <th className="px-6 py-3.5">Estado</th>
                    <th className="px-6 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {displayedTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-950/20 transition-colors">
                      <td className="px-6 py-4 max-w-sm">
                        <div className="font-semibold text-slate-800 dark:text-slate-100 truncate" title={task.title}>
                          {task.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1" title={task.description}>
                          {task.description || 'Sin descripción.'}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                          <Calendar size={10} />
                          {formatDate(task.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wide border ${getPriorityBadgeClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={task.status}
                          onChange={(e) => onUpdateStatus(task.id, e.target.value as Status)}
                          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md px-2 py-1 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="pendiente">⏳ Pendiente</option>
                          <option value="en_progreso">🚀 En Progreso</option>
                          <option value="completada">✅ Completada</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => onEditTask(task)}
                            className="p-1 px-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md transition-colors cursor-pointer"
                            title="Editar tarea"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 px-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md transition-colors cursor-pointer"
                            title="Eliminar tarea"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-150 dark:divide-slate-850">
              {displayedTasks.map((task) => (
                <div key={task.id} className="p-4 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2">
                        {task.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
                        <Calendar size={10} />
                        {formatDate(task.createdAt)}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wide border shrink-0 ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-xs text-slate-550 dark:text-slate-400 line-clamp-3">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <select
                      value={task.status}
                      onChange={(e) => onUpdateStatus(task.id, e.target.value as Status)}
                      className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="pendiente">⏳ Pendiente</option>
                      <option value="en_progreso">🚀 En Progreso</option>
                      <option value="completada">✅ Completada</option>
                    </select>

                    <div className="flex gap-1">
                      <button
                        onClick={() => onEditTask(task)}
                        className="p-1 px-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1 px-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 shrink-0">
          <span>
            Mostrando <span className="font-semibold text-slate-700 dark:text-slate-350">{displayedTasks.length}</span> de <span className="font-semibold text-slate-700 dark:text-slate-350">{totalTasks}</span> tareas
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
