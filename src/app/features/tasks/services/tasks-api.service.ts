import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Task } from './tasks.interface';

/**
 * @fileoverview Servicio para la comunicación con la API de gestión de tareas.
 * @description Este servicio es la capa de infraestructura que se encarga de
 * todas las peticiones HTTP (CRUD) relacionadas con las tareas.
 */
@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  private http = inject(HttpClient);

  constructor() { }

  /**
   * Obtiene todas las tareas del usuario autenticado.
   * @method
   * @returns {Observable<Task[]>} Un observable que emite un array de tareas.
   */
  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.urlApi}/tasks`);
  }

  /**
   * Crea una nueva tarea.
   * @method
   * @param {Partial<Task>} task - Los datos de la tarea a crear (título, descripción).
   * @returns {Observable<Task>} Un observable que emite la tarea creada con su ID.
   */
  public addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${environment.urlApi}/tasks`, task);
  }

  /**
   * Edita una tarea existente.
   * @method
   * @param {string} id - El ID de la tarea a editar.
   * @param {Partial<Task>} task - Los datos actualizados de la tarea.
   * @returns {Observable<Task>} Un observable que emite la tarea actualizada.
   */
  public updateTask(id: string, task: Partial<Task>): Observable<Task> {
    const url = `${environment.urlApi}/tasks/${id}`;
    return this.http.put<Task>(url, task);
  }

  /**
   * Elimina una tarea existente.
   * @method
   * @param {string} id - El ID de la tarea a eliminar.
   * @returns {Observable<void>} Un observable que no emite un valor si la eliminación es exitosa.
   */
  public deleteTask(id: string): Observable<void> {
    const url = `${environment.urlApi}/tasks/${id}`;
    return this.http.delete<void>(url);
  }
}
