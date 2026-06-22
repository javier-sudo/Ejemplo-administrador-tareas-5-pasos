/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Priority = 'baja' | 'media' | 'alta';
export type Status = 'pendiente' | 'en_progreso' | 'completada';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}

export interface TaskFilters {
  searchTerm: string;
  priorities: Priority[];
  statuses: Status[];
}
