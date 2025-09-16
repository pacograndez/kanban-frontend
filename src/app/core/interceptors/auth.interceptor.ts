import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

/**
 * @fileoverview Interceptor HTTP para adjuntar tokens de autenticación.
 * @description Esta función de interceptor se encarga de interceptar todas las peticiones
 * HTTP salientes. Si el usuario está autenticado, obtiene el ID Token de Firebase
 * y lo añade a la cabecera 'Authorization' para autenticar la petición en el backend.
 * @param {HttpRequest<unknown>} req - La solicitud HTTP original.
 * @param {HttpHandlerFn} next - El siguiente manejador en la cadena de interceptores.
 * @returns {Observable<HttpEvent<unknown>>} Un observable que emite la solicitud modificada
 * o la original si no hay usuario autenticado.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const firebaseAuth = inject(Auth);

  return user(firebaseAuth).pipe(
    switchMap(currentUser => {
      if (currentUser) {
        return from(currentUser.getIdToken()).pipe(
          switchMap(idToken => {
            const authReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${idToken}`)
            });
            return next(authReq);
          })
        )
      }
      return next(req);
    })
  )
};
