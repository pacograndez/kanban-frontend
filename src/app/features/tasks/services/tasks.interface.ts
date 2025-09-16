/**
 * @fileoverview Definición de la interfaz para un objeto de tarea.
 * @description Esta interfaz define la estructura de datos que se utiliza para
 * representar una tarea en la aplicación. Actúa como un contrato de datos
 * entre el frontend y el backend.
 * @interface Task
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  userId: string;
}