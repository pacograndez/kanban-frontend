import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService, AuthResponse } from '../../features/auth/services/auth-api.service';
import { Auth, onAuthStateChanged, signInWithCustomToken, signOut, User, user } from '@angular/fire/auth';
import { catchError, from, Observable, of, switchMap, take, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * @fileoverview Servicio para la gestión del estado de autenticación.
 * @description Este servicio actúa como la capa de negocio para la autenticación,
 * gestionando el estado de la sesión, la comunicación con la API y la
 * integración con Firebase Auth.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private authApi = inject(AuthApiService);
  private firebaseAuth = inject(Auth);

  /**
   * Observable que emite el estado del usuario de Firebase.
   * @private
   * @type {Observable<User | null>}
   */
  private readonly user$ = new Observable<User | null>(observer => {
    onAuthStateChanged(this.firebaseAuth, user => {
      observer.next(user);
    });
  });


  /**
   * Señal que refleja el estado de autenticación. Es la fuente de la verdad para toda la aplicación.
   * @public
   * @type {Signal<User | null>}
   */
  public readonly isLoggedIn = toSignal(this.user$, { initialValue: null });

  /**
   * Señal computada que retorna `true` si el usuario está autenticado, `false` en caso contrario.
   * @public
   * @type {Signal<boolean>}
   */
  public readonly isAuthenticated = computed(() => !!this.isLoggedIn());

  constructor() { }

  /**
   * Inicia sesión en la aplicación.
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Observable<CustomTokenResponse>} Un observable que emite la respuesta del backend, incluyendo el estado de creación del usuario.
   */
  public login(email: string): Observable<AuthResponse> {
    return this.authApi.getCustomToken(email).pipe(
      take(1),
      tap(() => console.log('Custom Token obtenido del backend.')),
      switchMap((authResponse: AuthResponse) => {
        return from(signInWithCustomToken(this.firebaseAuth, authResponse.token)).pipe(
          tap(userCredential => {
            userCredential.user.getIdToken().then(idToken => {
              localStorage.setItem('firebase_id_token', idToken);
              // this.isLoggedInState.set(true);
            });
          }),
          switchMap(() => of(authResponse)),
          take(1)
        );
      }),
      catchError(error => {
        console.error('Error de autenticación de Firebase:', error);
        // this.isLoggedInState.set(false);
        return of({ token: '', created: false });
      })
    )
  }

  /**
   * Cierra la sesión del usuario.
   * @description Llama a la función `signOut` de Firebase y navega a la página de login.
   * El estado de autenticación (`isAuthenticated`) se actualiza automáticamente.
   */
  public logout(): void {
    signOut(this.firebaseAuth).then(() => {
      localStorage.removeItem('firebase_id_token');
      console.log('Sesión cerrada en Firebase. Redirigiendo...');
      this.router.navigate(['/login']);
    })
  }
}
