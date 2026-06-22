/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Task } from '../types';
import { CheckCircle2, Play, Clock, Inbox } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
}

export default function Dashboard({ tasks }: DashboardProps) {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pendiente').length;
  const inProgress = tasks.filter(t => t.status === 'en_progreso').length;
  const completed = tasks.filter(t => t.status === 'completada').length;

  return (
    <div id="dashboard-container" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div 
        id="stat-total" 
        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all duration-200 hover:shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Tareas</p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{String(total).padStart(2, '0')}</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Inbox size={20} />
        </div>
      </div>

      <div 
        id="stat-pending" 
        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all duration-200 hover:shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Pendientes</p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300">{String(pending).padStart(2, '0')}</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
          <Clock size={20} className="animate-pulse" />
        </div>
      </div>

      <div 
        id="stat-progress" 
        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all duration-200 hover:shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">En Progreso</p>
          <h3 className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-450">{String(inProgress).padStart(2, '0')}</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
          <Play size={18} className="fill-current animate-pulse" />
        </div>
      </div>

      <div 
        id="stat-completed" 
        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-all duration-200 hover:shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 font-sans">Completadas</p>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-450">{String(completed).padStart(2, '0')}</h3>
        </div>
        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={20} />
        </div>
      </div>
    </div>
  );
}
