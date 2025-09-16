# Frontend de la Aplicación de Tareas (To-Do App)

Este repositorio contiene el código fuente del frontend para la aplicación de lista de tareas. Está construido con Angular (v19) y diseñado para consumir el backend basado en Firebase Cloud Functions.

## Stack Tecnológico
- Framework: Angular

- Lenguaje: TypeScript

- Componentes de UI: Angular Material (con el tema preconstruido azure-blue) y Angular CDK.

- Comunicación con Firebase: AngularFire para una integración fluida con los servicios de Firebase (Auth y Firestore).

- Programación Reactiva: RxJS para el manejo de operaciones asíncronas y eventos.

## Configuración del Entorno de Desarrollo
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos
- Node.js (versión 18 o superior)

- Angular CLI (npm install -g @angular/cli)

### Pasos de Instalación
1. Clonar el Repositorio:

```bash
git clone <URL_DEL_REPOSITORIO_FRONTEND>
cd kanban-frontend
```

2. Instalar Dependencias:

```bash
npm install
```

3. Configuración de Entorno (¡MUY IMPORTANTE!):
El frontend necesita saber a qué API conectarse. Esta configuración se gestiona en los archivos de entorno de Angular.

Para producción (apuntando al backend desplegado):
Modifica el archivo src/environments/environment.ts. Este es el archivo base.

```bash
export const environment = {
  emulators: true,
  // Reemplaza esta URL con la URL de tu función desplegada (la que termina en .a.run.app)
  apiUrl: '[https://api-ph72znidmq-uc.a.run.app/api](https://api-ph72znidmq-uc.a.run.app/api)'
};
```

Para desarrollo local (apuntando a los emuladores):
Modifica el archivo src/environments/environment.dev.ts. Este archivo reemplaza al anterior cuando ejecutas ng serve.

```bash
export const environment = {
  emulators: false,
  apiUrl: '[http://127.0.0.1:5001/](http://127.0.0.1:5001/)[TU_ID_DE_PROYECTO]/api'
};
```

Reemplaza [TU_ID_DE_PROYECTO] con el ID de tu proyecto de Firebase.

## Scripts Disponibles
Estos son los comandos principales definidos en package.json para gestionar la aplicación.

- npm start:
Inicia el servidor de desarrollo en http://localhost:4200/. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

- npm run build:
Compila la aplicación para desarrollo. Los artefactos de la compilación se guardarán en el directorio dist/.

- npm run build-prd:
Compila la aplicación para producción. Este es el comando que debes usar para generar los archivos que se desplegarán en un servidor como Netlify.

- npm run watch:
Ejecuta una compilación en modo de vigilancia, recompilando automáticamente los archivos cuando se detectan cambios.
