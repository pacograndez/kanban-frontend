import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

/**
 * @fileoverview Interfaz para los datos que se pasan al diálogo de confirmación.
 * @interface DialogData
 * @property {string} title - El título del diálogo.
 * @property {string} message - El mensaje principal de confirmación.
 */
export interface DialogData {
  email: string;
  message: string;
}

/**
 * @fileoverview Componente de diálogo de confirmación reutilizable.
 * @description Este componente muestra un diálogo de Angular Material con un título y un mensaje.
 * Su propósito es obtener una confirmación del usuario para una acción.
 */
@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  /**
   * Constructor de la clase. Inyecta los datos que se le pasan al diálogo y la referencia del mismo.
   * @param {DialogData} data - Los datos que se utilizan para el contenido del diálogo.
   * @param {MatDialogRef<ConfirmationDialogComponent>} dialogRef - Una referencia al diálogo abierto, utilizada para cerrarlo.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  /**
   * Cierra el diálogo y retorna `true` para confirmar la acción.
   * @public
   */
  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}
