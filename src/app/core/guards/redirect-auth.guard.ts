import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { map } from 'rxjs';

/**
 * @fileoverview Guardian de rutas para redirigir a usuarios autenticados fuera de rutas públicas.
 * @description Esta función de guardia implementa `CanActivateFn` para evitar que un usuario
 * autenticado acceda a rutas como `/login`. Espera a que el estado de autenticación de Firebase
 * se resuelva. Si el usuario está logueado, lo redirige a la página de tareas.
 * @param {ActivatedRouteSnapshot} route - La ruta que se está activando.
 * @param {RouterStateSnapshot} state - El estado del router en ese momento.
 * @returns {Observable<boolean>} Un observable que emite `true` si se permite la navegación o `false` en caso contrario.
 */
export const redirectAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const firebaseAuth = inject(Auth);
  
 /*  if (authService.isLoggedIn()) {
    router.navigate(['/tasks']);
    return false;
  }
  return true; */

  return user(firebaseAuth).pipe(
    map(currentUser => {
      if (currentUser) {
        console.log('redirectAuthGuard: Usuario autenticado. Redirigiendo a /tasks.');
        router.navigate(['/tasks']);
        return false;
      }
      return true;
    })
  );
};
