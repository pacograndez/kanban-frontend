import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth, user } from '@angular/fire/auth';
import { map } from 'rxjs';

/**
 * @fileoverview Guardian de rutas para proteger las vistas de usuarios no autenticados.
 * @description Esta función de guardia implementa `CanActivateFn` para determinar si una ruta
 * puede ser activada. Espera a que el estado de autenticación de Firebase se resuelva
 * antes de tomar una decisión. Si el usuario no está logueado, redirige a la página de inicio
 * de sesión.
 * @param {ActivatedRouteSnapshot} route - La ruta que se está activando.
 * @param {RouterStateSnapshot} state - El estado del router en ese momento.
 * @returns {Observable<boolean>} Un observable que emite `true` si se permite la navegación o `false` en caso contrario.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const firebaseAuth = inject(Auth);

  /* if (authService.isLoggedIn()) {
    console.log('authGuard: Usuario autenticado. Acceso permitido.');
    return true;
  } else {
    console.log('authGuard: Usuario no autenticado. Redirigiendo a /login.');
    router.navigate(['/login']);
    return false;
  } */

    return user(firebaseAuth).pipe(
    map(currentUser => {
      if (currentUser) {
        console.log('authGuard: Usuario autenticado. Acceso permitido.');
        return true;
      } else {
        console.log('authGuard: Usuario no autenticado. Redirigiendo a /login.');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
