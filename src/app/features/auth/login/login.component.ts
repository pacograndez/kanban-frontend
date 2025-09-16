import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

/**
 * @fileoverview Componente para la página de inicio de sesión.
 * @description Contiene el formulario de login y orquesta la lógica de autenticación
 * con el servicio `AuthService`.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /**
   * Formulario reactivo para la entrada del correo electrónico del usuario.
   * @public
   * @type {FormGroup}
   */
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @public
   */
  public onSubmit(): void {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.getRawValue().email as string;
    console.log('Intento de inicio de sesión con:', email);
    this.authService.login(email).subscribe(response => {
      if (response.created) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              email: email,
              message: 'Usuario registrado !!!' 
            }
          })
          dialogRef.afterClosed().subscribe(() => this.router.navigate(['/tasks']));
        } else {
          this.router.navigate(['/tasks']);
        }
    })
  }
}
