import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

/**
 * Interfaz para la respuesta del backend de autenticación.
 * @interface
 * @property {string} token - El custom token de Firebase devuelto por el backend.
 * @property {boolean} created - Indica si el usuario fue creado (`true`) o ya existía (`false`).
 */
export interface AuthResponse {
  token: string;
  created: boolean;
}

/**
 * @fileoverview Servicio para la comunicación con la API de autenticación.
 * @description Este servicio es la capa de infraestructura que se comunica
 * directamente con el backend para obtener el custom token de Firebase.
 * No contiene lógica de negocio.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private http = inject(HttpClient);

  constructor() { }

  /**
   * Realiza la llamada HTTP al backend para obtener un Custom Token y el estado de creación del usuario.
   * @method
   * @param {string} email - El correo electrónico del usuario.
   * @returns {Observable<CustomTokenResponse>} Un observable que emite la respuesta de la API.
   */
  public getCustomToken(email: string): Observable<AuthResponse> {
    const payload = { email };
    return this.http.post<AuthResponse>(`${environment.urlApi}/users`, payload);
  }
}
