import { Component, inject, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../services/tasks.interface';

/**
 * @fileoverview Componente de diálogo reutilizable para agregar y editar tareas.
 * @description Este componente actúa como un diálogo de Angular Material que contiene
 * un formulario reactivo para la creación o edición de tareas. Es un componente
 * único que maneja ambas funcionalidades.
 */
@Component({
  selector: 'app-task-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  private fb = inject(FormBuilder);
  
  /**
   * Formulario reactivo para la creación y edición de tareas.
   * @public
   * @type {FormGroup}
   */
  public taskForm!: FormGroup;
  
 /**
   * Constructor de la clase. Inyecta los servicios necesarios para el diálogo.
   * @param {Task | null} data - Los datos de la tarea a editar (si existen) o `null` si es una nueva tarea.
   * @param {MatDialogRef<TaskDialogComponent>} dialogRef - Una referencia al diálogo abierto.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private dialogRef: MatDialogRef<TaskDialogComponent>
  ) {}

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * @description Inicializa el formulario con los datos de la tarea a editar o con valores por defecto.
   */
  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [this.data ? this.data.id : null],
      title: [this.data ? this.data.title : '', Validators.required],
      description: [this.data ? this.data.description : '']
    });
  }

  /**
   * Cierra el diálogo y retorna los datos del formulario.
   * @public
   */
  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  /**
   * Cierra el diálogo sin retornar datos.
   * @public
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
