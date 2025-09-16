import { Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';

/**
 * @fileoverview Definiciones de rutas para el módulo de tareas.
 * @description Este array de `Routes` configura las rutas relacionadas con la gestión
 * de tareas. La ruta principal está protegida por un guardian para
 * asegurar que solo los usuarios autenticados puedan acceder.
 */
export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TasksListComponent
  }
];