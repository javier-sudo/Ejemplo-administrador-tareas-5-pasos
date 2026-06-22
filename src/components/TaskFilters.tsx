/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Priority, Status, TaskFilters as FiltersType } from '../types';
import { Search, RotateCcw, ShieldCheck } from 'lucide-react';

interface TaskFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  openTaskModal: () => void;
}

export default function TaskFilters({ filters, onFiltersChange, openTaskModal }: TaskFiltersProps) {
  const toggleStatus = (status: Status) => {
    const isSelected = filters.statuses.includes(status);
    const newStatuses = isSelected
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const togglePriority = (priority: Priority) => {
    const isSelected = filters.priorities.includes(priority);
    const newPriorities = isSelected
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority];
    onFiltersChange({ ...filters, priorities: newPriorities });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchTerm: '',
      priorities: [],
      statuses: []
    });
  };

  return (
    <aside id="task-filters-aside" className="space-y-4 md:space-y-6">
      <button
        id="btn-new-task"
        onClick={openTaskModal}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md cursor-pointer shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <span className="text-xl">+</span> Nueva Tarea
      </button>

      <div id="filters-card" className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">Filtrar por Texto</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar por título..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-150 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* State */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">Filtrar por Estado</label>
            {(filters.statuses.length > 0 || filters.priorities.length > 0 || filters.searchTerm) && (
              <button 
                onClick={resetFilters}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                title="Limpiar filtros"
              >
                <RotateCcw size={10} /> Limpiar
              </button>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none">
              <input
                type="checkbox"
                checked={filters.statuses.length === 0}
                onChange={() => onFiltersChange({ ...filters, statuses: [] })}
                className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 focus:ring-indigo-500"
              />
              Todos los estados
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none">
              <input
                type="checkbox"
                checked={filters.statuses.includes('pendiente')}
                onChange={() => toggleStatus('pendiente')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 focus:ring-indigo-500"
              />
              ⏳ Pendientes
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none">
              <input
                type="checkbox"
                checked={filters.statuses.includes('en_progreso')}
                onChange={() => toggleStatus('en_progreso')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 focus:ring-indigo-500"
              />
              🚀 En Progreso
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none">
              <input
                type="checkbox"
                checked={filters.statuses.includes('completada')}
                onChange={() => toggleStatus('completada')}
                className="w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 focus:ring-indigo-500"
              />
              ✅ Completadas
            </label>
          </div>
        </div>

        {/* Priority */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500 block">Prioridad</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => togglePriority('alta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filters.priorities.includes('alta')
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50'
              }`}
            >
              Alta 🚨
            </button>
            <button
              onClick={() => togglePriority('media')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filters.priorities.includes('media')
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              Media ⚡
            </button>
            <button
              onClick={() => togglePriority('baja')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filters.priorities.includes('baja')
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-750 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              }`}
            >
              Baja 🍃
            </button>
          </div>
        </div>
      </div>

      <div id="persistance-banner" className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
        <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium italic flex items-center gap-2">
          <ShieldCheck size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>Sincronización local activa. Datos seguros en localStorage. 💾</span>
        </p>
      </div>
    </aside>
  );
}
