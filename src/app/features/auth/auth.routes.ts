import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

/**
 * @fileoverview Definiciones de rutas para el módulo de autenticación.
 * @description Este array de `Routes` configura las rutas relacionadas con el inicio de sesión y la autenticación.
 * Utiliza `guards` para proteger el acceso a las vistas de forma condicional.
 */
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];