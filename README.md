# SquadUp

SquadUp es una aplicación web full-stack para la gestión y organización de eventos colaborativos. El proyecto implementa una arquitectura de monorepo que integra el frontend y el backend en un único repositorio, facilitando el desarrollo y despliegue coordinado de ambas partes.

Este proyecto forma parte del Proyecto Intermodular del Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).

## Aviso de licencia

Este proyecto **no es de código abierto (Open Source)**. El código fuente está disponible únicamente con fines de visualización y evaluación académica. No se permite la copia, modificación, redistribución ni el uso comercial del código sin autorización expresa del autor.

Para obtener información detallada sobre los términos de uso, consulte el archivo [LICENSE](LICENSE) incluido en este repositorio.

## Descripción

SquadUp permite a los usuarios crear, gestionar y participar en eventos de manera colaborativa. La aplicación ofrece comunicación en tiempo real mediante WebSockets, lo que posibilita la actualización instantánea de información entre los participantes de un evento.

La arquitectura del proyecto separa claramente las responsabilidades del cliente y del servidor. El frontend está desarrollado con React y TypeScript, utilizando Vite como herramienta de construcción y Tailwind CSS para los estilos. El backend está implementado con Express y TypeScript, incorporando Socket.io para la comunicación en tiempo real.

## Requisitos previos

Antes de comenzar, asegúrese de tener instalado lo siguiente:

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)

## Instalación

Clone el repositorio y acceda al directorio del proyecto:

```bash
git clone <repository-url>
cd SquadUp
```

Instale las dependencias del proyecto ejecutando el siguiente comando desde la raíz:

```bash
npm run install-all
```

Este comando instalará las dependencias de la raíz, el cliente y el servidor de forma secuencial.

## Configuración

Cree un archivo `.env` en el directorio `server/` con las siguientes variables de entorno:

```env
PORT=3000
```

Ajuste las variables según el entorno de desarrollo o producción según sea necesario.

## Uso

### Entorno de desarrollo

Para iniciar la aplicación completa en modo desarrollo, ejecute:

```bash
npm run dev
```

Este comando inicia simultáneamente el servidor de desarrollo de Vite (frontend) y el servidor Express con recarga en caliente (backend). Por defecto, los servicios están disponibles en:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### Comandos por separado

Si desea ejecutar el frontend o el backend de forma independiente, acceda al directorio correspondiente.

**Frontend (`client/`):**

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera el build de producción
npm run preview  # Previsualiza el build generado
npm run lint     # Ejecuta el linter
```

**Backend (`server/`):**

```bash
npm run dev      # Inicia el servidor con recarga en caliente
npm run build    # Compila TypeScript a JavaScript
npm run start    # Ejecuta el servidor en modo producción
```

## Estructura del proyecto

```
SquadUp/
├── client/                 # Frontend de la aplicación
│   ├── public/            # Archivos estáticos
│   ├── src/               # Código fuente
│   │   ├── assets/       # Recursos estáticos
│   │   ├── App.tsx       # Componente principal
│   │   ├── main.tsx      # Punto de entrada
│   │   └── index.css     # Estilos globales
│   ├── index.html        # Plantilla HTML
│   ├── tailwind.config.ts
│   ├── postcss.config.ts
│   ├── vite.config.ts
│   └── tsconfig.json
├── server/                # Backend de la aplicación
│   ├── index.ts          # Punto de entrada del servidor
│   └── tsconfig.json
├── LICENSE               # Términos de licencia
├── .gitignore
├── package.json
└── README.md
```

## Tecnologías

### Frontend

- React 19.2.0: Biblioteca para la construcción de interfaces de usuario
- TypeScript 5.9: Superset tipado de JavaScript
- Vite 7.3.1: Herramienta de construcción y servidor de desarrollo
- Tailwind CSS 4.1.18: Framework CSS utility-first
- ESLint 9.39.1: Herramienta de análisis estático de código

### Backend

- Express 5.2.1: Framework web para Node.js
- TypeScript 5.9: Superset tipado de JavaScript
- Socket.io 4.8.3: Biblioteca para comunicación en tiempo real
- CORS 2.8.6: Middleware para el manejo de Cross-Origin Resource Sharing
- Dotenv 17.3.1: Módulo para la carga de variables de entorno

### Herramientas de desarrollo

- Concurrently: Ejecución simultánea de múltiples procesos
- ts-node-dev: Entorno de desarrollo TypeScript con recarga automática
- PostCSS: Procesador de CSS

## Autor

Irene Fontcuberta León

Proyecto Intermodular - Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)

## Licencia

Este proyecto está protegido bajo un acuerdo de licencia de uso limitado. Consulte el archivo [LICENSE](LICENSE) para conocer los términos completos.
