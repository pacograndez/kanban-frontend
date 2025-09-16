import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TasksApiService } from '../services/tasks-api.service';
import { Task } from '../services/tasks.interface';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * @fileoverview Componente principal para la gestión de la lista de tareas.
 * @description Muestra las tareas, maneja la carga de datos, y orquesta los flujos de agregar, editar y eliminar tareas.
 */
@Component({
  selector: 'app-tasks-list',
  imports: [MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatFormFieldModule,
    MatInputModule, DatePipe, MatDialogModule, MatToolbarModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent implements OnInit, OnDestroy {
  private tasksApi = inject(TasksApiService);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private unsubscribe$ = new Subject<void>();

  /**
   * Señal que almacena el array de tareas.
   * @public
   * @type {Signal<Task[]>}
   */
  public tasks = signal<Task[]>([]);

  /**
   * Señal computada que filtra las tareas pendientes.
   * @public
   * @type {Signal<Task[]>}
   */
  public pendingTasks = computed(() => this.tasks().filter(task => !task.completed));

  /**
   * Señal computada que filtra las tareas completadas.
   * @public
   * @type {Signal<Task[]>}
   */
  public completedTasks = computed(() => this.tasks().filter(task => task.completed));

  /**
   * Hook del ciclo de vida que inicializa la carga de tareas.
   * @description Se usa para configurar el estado inicial, cargar datos o establecer suscripciones necesarias.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Hook del ciclo de vida que se ejecuta cuando el componente es destruido.
   * @description Se usa para cancelar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Carga las tareas del usuario desde el backend.
   * @private
   */
  private loadTasks(): void {
    this.tasksApi.getTasks().pipe(takeUntil(this.unsubscribe$)).subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  public onAddTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: null // Pasamos null para el modo de creación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksApi.addTask(result).pipe(takeUntil(this.unsubscribe$)).subscribe(createdTask => {
          this.tasks.update(tasks => [...tasks, createdTask]);
        });
      }
    });
  }

  public onDeleteTask(id: string): void {
    this.tasksApi.deleteTask(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    });
  }

  public onEditTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task // Pasamos la tarea para el modo de edición
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksApi.updateTask(result.id, result).pipe(takeUntil(this.unsubscribe$)).subscribe(updatedTask => {
          this.tasks.update(tasks => tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
        });
      }
    });
  }

  public onToggleCompleted(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.tasksApi.updateTask(task.id, { completed: updatedTask.completed }).subscribe(result => {
      // Reemplaza la tarea modificada en la señal
      this.tasks.update(tasks => tasks.map(t => (t.id === result.id ? result : t)));
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
