/**
 * @fileoverview Declaraciones de tipos globales para la aplicación.
 * @description Este archivo declara variables globales que son inyectadas
 * por el entorno de compilación, como `process.env`.
 */
declare const process: {
  env: {
    [key: string]: string | undefined;
  };
};