# SQUAD UP: Plataforma web para la gestión y formación de equipos en juegos cooperativos

---

## CAMBIOS REALIZADOS RESPECTO A LA VERSIÓN ANTERIOR

**1. Reestructuración del documento**: Se ha reorganizado el contenido para ajustarse estrictamente a los requerimientos de la FASE 1, separando claramente cada sección según las instrucciones de entrega.

**2. Adición de material visual**: Se han incorporado capturas de pantalla de alta resolución de los mockups de Figma (WEB y SALA en modo claro y oscuro) y del diagrama de flujo UML, todas ellas con enlaces públicos para su consulta.

**3. Enlaces públicos a recursos**: Se han añadido enlaces directos y públicos al proyecto de Figma completo y al diagrama UML para facilitar su revisión por parte del profesorado.

**4. Identificación de elementos de interfaz**: Se ha detallado explícitamente la identificación de botones, campos de texto, etiquetas y elementos de interacción en cada mockup, tal como requieren las instrucciones de la FASE 1.

**5. Adaptación tipológica**: Se ha actualizado la tipología de la aplicación de Android a Web, reflejando el cambio en el stack tecnológico decidido para el proyecto.

---

## 1. TÍTULO DEL PROYECTO

**Squad Up: Plataforma web para la gestión y formación de equipos en juegos cooperativos**

---

## 2. RESUMEN FUNCIONAL DE LA APLICACIÓN

### Recordatorio breve: Explicación de qué hace la aplicación

Squad Up es una aplicación web que funciona como un tablón de anuncios inteligente para jugadores de videojuegos cooperativos y multijugador. La plataforma permite a los usuarios crear salas de juego con criterios específicos (videojuego, rol, nivel de habilidad) y buscar salas existentes que se ajusten a sus preferencias, superando las limitaciones de los sistemas de emparejamiento aleatorio tradicionales.

La diferencia fundamental de Squad Up reside en la capacidad de los usuarios para establecer criterios de filtrado específicos, lo que permite formar equipos con personas que no solo juegan el mismo videojuego, sino que también comparten objetivos similares, niveles de habilidad comparables y, fundamentalmente, una actitud positiva durante las partidas.

### Perfil de usuario: Qué puede hacer el usuario con la herramienta

El usuario de Squad Up es un jugador de videojuegos cooperativos como League of Legends, World of Warcraft, Dungeons & Dragons o Magic: The Gathering, que ha experimentado frustraciones con los sistemas de matchmaking aleatorio. Este usuario busca un mayor control sobre la composición de su equipo y desea jugar con personas que compartan su nivel de compromiso y habilidad.

Con Squad Up, el usuario puede registrarse en la plataforma, crear un perfil personalizado con sus preferencias de juego (videojuego principal, rol dentro del equipo, rango o nivel de habilidad), buscar salas existentes mediante palabras clave y filtros específicos, crear sus propias salas como anfitrión, unirse a salas de otros jugadores, chatear en tiempo real con los miembros de su sala, indicar cuándo se encuentra listo para iniciar la partida, y valorar a sus compañeros tras finalizar la experiencia de juego mediante un sistema de puntuación de cinco estrellas.

El perfil de usuario no se limita exclusivamente a jugadores competitivos; también resulta muy útil para jugadores casuales que desean tener una experiencia organizada y agradable sin la presión de los Ranked o la incertidumbre de las colas aleatorias.

### Tipología: Definición del tipo de aplicación

Squad Up es una **aplicación web responsiva** desarrollada con el stack tecnológico React, complementada con Tailwind CSS para el diseño de la interfaz y Supabase como Backend as a Service para garantizar la seguridad y gestión de datos.

Esta elección tecnológica responde a la necesidad de ofrecer una plataforma accesible desde cualquier dispositivo con navegador web (ordenador de escritorio, tablet o dispositivo móvil), sin requerir instalación ni descargas adicionales por parte del usuario. La naturaleza web de la aplicación facilita su mantenimiento, actualización continua y accesibilidad universal, aspecto fundamental en un entorno tan dinámico como el gaming.

---

## 3. FUNCIONALIDADES DE LA APLICACIÓN

A continuación se detallan las funcionalidades principales de Squad Up desde el punto de vista del usuario, sin entrar en detalles técnicos de implementación.

### Gestión de datos

**Registro y autenticación de usuarios**: La aplicación permite a nuevos usuarios registrarse proporcionando información básica como correo electrónico y contraseña. Los usuarios ya registrados pueden iniciar sesión con sus credenciales. Este proceso se gestiona de manera segura mediante Supabase Auth.

**Gestión de perfiles**: Una vez autenticado, el usuario debe completar su perfil personal con información relevante para el sistema de emparejamiento. El perfil incluye el nombre de usuario, fotografía o avatar, videojuego principal, rol o posición dentro del equipo, y rango o nivel de habilidad. El usuario puede modificar esta información en cualquier momento.

**Creación de salas**: Los usuarios pueden crear sus propias salas de juego como anfitriones. Este proceso permite configurar los parámetros de la partida incluyendo el videojuego específico, número de jugadores necesarios, roles disponibles, rango o nivel mínimo requerido, y descripciones adicionales.

**Modificación de estado listo**: Dentro de una sala, los usuarios pueden cambiar su estado a "listo" para indicar que están preparados para iniciar la partida. Este estado puede revocarse en cualquier momento antes del inicio.

**Valoración de jugadores**: Tras finalizar una partida, todos los miembros deben obligatoriamente valorar a sus compañeros mediante una escala de cinco estrellas. Esta valoración se registra en el perfil del usuario y sirve como referencia para futuros emparejamientos.

### Consulta de listados y detalles

**Búsqueda de salas**: La aplicación dispone de un buscador global accesible desde cualquier punto que permite encontrar salas existentes mediante palabras clave. Los resultados se presentan en una lista estructurada mostrando información resumida de cada sala.

**Visualización de detalles de sala**: Antes de unirse a una sala, el usuario puede visualizar información detallada incluyendo datos del anfitrión, jugadores actuales, roles disponibles, requisitos de nivel, y descripciones adicionales.

**Visualización de miembros de sala**: Una vez dentro de una sala, el usuario puede ver la lista completa de miembros con su nombre, avatar, rol dentro del equipo, y estado actual de listo. El anfitrión se identifica visualmente mediante distintivos específicos.

**Historial de valoraciones**: El perfil de cada usuario muestra las valoraciones acumuladas de compañeros de partidas anteriores, permitiendo a otros jugadores evaluar su reputación dentro de la plataforma.

### Navegación entre pantallas

**Pantalla principal**: Funciona como el centro neurálgico desde el cual se puede navegar a todas las funcionalidades. Incluye acceso al buscador global, creación de salas, perfil de usuario, configuración, e historial de partidas.

**Pantalla de sala**: Desde la pantalla principal se puede navegar hacia una sala específica, bien como anfitrión (si se ha creado) o como jugador (si se ha unido a una existente). Esta pantalla prioriza la comunicación y coordinación entre miembros del equipo.

**Pantalla de perfil**: Accesible desde la barra de navegación, permite al usuario consultar y modificar su información personal, preferencias de juego, y ver su historial de valoraciones.

**Retorno a pantalla principal**: Desde cualquier pantalla de sala, el usuario puede salir y volver automáticamente a la pantalla principal para buscar nuevas oportunidades de juego.

### Sistema de mensajes, avisos y confirmaciones

**Chat en tiempo real**: Todas las salas disponen de un chat de texto que permite la comunicación continua entre todos los miembros. El chat está disponible tanto en la fase de espera como durante la sala activa.

**Sistema de notificaciones**: La aplicación mantiene a los usuarios informados sobre eventos relevantes como nuevos jugadores que se unen a la sala, cambios en el estado de listo de otros miembros, o actualizaciones sobre partidas anteriores.

**Confirmación de listo**: El sistema muestra visualmente qué jugadores se encuentran listos y cuáles no, facilitando la coordinación del inicio de la partida. La partida solo se inicia cuando todos los miembros han indicado que están listos.

**Confirmación de salida**: Cuando un usuario decide salir de una sala, el sistema solicita confirmación para evitar salidas accidentales. En el caso del anfitrión, se informa adicionalmente sobre las consecuencias de su abandono (disolución de la sala o transferencia del rol).

**Confirmación de expulsión**: El anfitrión puede expulsar jugadores de la sala, acción que requiere confirmación para prevenir activaciones accidentales. El usuario expulsado recibe una notificación informativa.

**Confirmación de valoración**: Tras abandonar una sala, el sistema dirige obligatoriamente al usuario a la pantalla de valoración, donde no puede continuar hasta haber valorado a todos sus compañeros.

---

## 4. DISEÑO DE LA INTERFAZ: ESBOSOS O MOCKUPS

Los diseños de interfaz de Squad Up se han plasmado en mockups realizados con la herramienta Figma, que permiten visualizar tanto el estilo estético como la distribución funcional de los elementos. A continuación se presentan las cuatro pantallas principales diseñadas: la interfaz de navegación y búsqueda (WEB) y la interfaz de sala de juego (SALA), cada una en modo claro y modo oscuro.

**Enlace público al proyecto completo en Figma**: https://www.figma.com/design/Ka2XTd6wnVRwlUnrarUIeL/Squad-Up-?node-id=0-1

### Interfaz WEB - Modo Claro

![WEB - Modo Claro](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/24132a3c-6bb4-44b9-9569-3048bfd76497/652f79c861d018c075b110f2093f878c.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1771243081&Signature=CLbGTH/OmMGz+dDcWAUtMfmHX9I=)

**Elementos de interacción identificados**:

- **Barra de navegación superior** (NavBar): Contiene el logotipo de la aplicación (cuadrado morado a la izquierda), el buscador global central con campo de texto "Buscar...." e icono de lupa, el icono de notificaciones (campana), y el avatar del usuario (círculo claro a la derecha).
- **Barra lateral izquierda** (SideBar): Muestra la lista de videojuegos disponibles organizados en tarjetas verticales. Cada tarjeta incluye el avatar del juego (cuadrado gris), el nombre del juego (ej. "Juego 1", "Juego 2"), y un borde morado en el lado izquierdo que indica el juego seleccionado.
- **Área central de resultados**: Contiene las tarjetas de salas disponibles. Cada tarjeta de sala incluye el avatar de la sala (círculo gris), el título descriptivo (ej. "BUSCO SUPPORT - Platinos", "Ranked Duo - Gold II"), y un borde morado en el lado izquierdo que indica la sala activa.
- **Panel derecho**: Área reservada para el chat global con el encabezado "Chat" en la parte superior.

### Interfaz WEB - Modo Oscuro

![WEB - Modo Oscuro](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/24132a3c-6bb4-44b9-9569-3048bfd76497/bb68c37e9462fc5cc292cc1cc0261d00.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1771243081&Signature=juIq571s1qDK6EgrVJacjFB1uZM=)

**Elementos de interacción identificados**:

Los elementos son análogos al modo claro, con las siguientes diferencias visuales:
- **Fondo oscuro**: Toda la interfaz utiliza un fondo gris oscuro (#1e1e26) en lugar del gris claro del modo claro.
- **Contraste adaptado**: El texto en color claro (#b2bec3) sobre fondos oscuros mejora la legibilidad en entornos con poca luz.
- **Mantenimiento de colores de acento**: El morado (#6c5ce7) se mantiene como color de acento para indicar selección y estados activos, garantizando coherencia visual entre ambos modos.

### Interfaz SALA - Modo Claro

![SALA - Modo Claro](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/24132a3c-6bb4-44b9-9569-3048bfd76497/7c30ccacfdf6dd6c7e0f8a6f8a587771.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1771243081&Signature=2ZtCYQ6xhHnrgW9LT+FFtLH2HsE=)

**Elementos de interacción identificados**:

- **Área de chat principal**: Ocupa la mayor parte de la pantalla a la izquierda. Incluye el historial de mensajes con bubbles de chat (algunos con fondo morado para mensajes propios, otros con fondo gris para mensajes de otros), nombres de usuario, y marcas de tiempo.
- **Campo de entrada de texto**: Situado en la parte inferior del área de chat, contiene el placeholder "Escribe un mensaje..." y el botón de enviar con icono de avión.
- **Panel lateral de jugadores**: A la derecha, muestra la lista de miembros de la sala. Cada tarjeta de jugador incluye el avatar (círculo con imagen), el nombre de usuario (ej. "TuNombre", "Jugador1"), el rol dentro del equipo (ej. "Support", "ADC"), y un indicador de estado "Listo" o "No listo".
- **Botón de acción principal**: Botón prominente "Listo" que cambia el estado del usuario. Se encuentra posicionado estratégicamente para facilitar su acceso.
- **Botón de salir**: Botón secundario que permite abandonar la sala, generalmente requiere confirmación para evitar salidas accidentales.
- **Indicador de rol**: El anfitrión se identifica con una corona o distintivo especial junto a su nombre para diferenciarlo del resto de jugadores.

### Interfaz SALA - Modo Oscuro

![SALA - Modo Oscuro](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/24132a3c-6bb4-44b9-9569-3048bfd76497/1310004efab07aa904107c39011b777b.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1771243081&Signature=DHa33xMuZF/mCWk+PWBkCxXlWGQ=)

**Elementos de interacción identificados**:

Los elementos son funcionalmente idénticos al modo claro, con adaptaciones visuales:
- **Fondo oscuro consistente**: El área de chat y el panel de jugadores utilizan fondos oscuros que reducen la fatiga visual.
- **Bubbles de chat adaptados**: Los mensajes mantienen su esquema de colores pero con tonos ajustados para modo oscuro, manteniendo la diferenciación visual entre mensajes propios y ajenos.
- **Texto en claro**: Todos los textos se muestran en colores claros sobre fondos oscuros para garantizar legibilidad.
- **Mantenimiento de colores de estado**: Los indicadores de "Listo" (generalmente verde) y "No listo" (generalmente gris o rojo) mantienen su significado semántico en ambos modos.

### Notas sobre el diseño

Los mockups presentados cumplen con el mínimo obligatorio de mostrar al menos la pantalla principal (WEB) y una pantalla secundaria (SALA). Adicionalmente, se han diseñado ambas variantes en modo claro y modo oscuro para ofrecer una experiencia visual completa y accesible en diferentes condiciones de iluminación.

El diseño sigue principios de modernidad y limpieza, con un uso cuidadoso del espacio en blanco, tipografías legibles (fuente Inter), y jerarquías visuales claras. La paleta de colores utiliza el morado (#6c5ce7) como color primario de identificación de marca, complementado con grises para fondos y acentos semánticos (verde para estados positivos, rojo para acciones destructivas).

---

## 5. DIAGRAMA DE NAVEGACIÓN O FLUJO DE LA APLICACIÓN

El flujo de navegación de Squad Up se representa mediante el siguiente diagrama de flujo UML, que ilustra la secuencia de estados y decisiones que un usuario experimenta durante su interacción con la aplicación.

**Enlace público al diagrama UML interactivo**: https://www.figma.com/online-whiteboard/create-diagram/269a8515-4c35-4a67-bb40-8d1f1614c275

### Diagrama de Flujo UML

![Diagrama de Flujo UML - SquadUp](https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/24132a3c-6bb4-44b9-9569-3048bfd76497/680d82de049bf75b96c9467909df6b37.png)

### Explicación del flujo

El diagrama comienza en el estado **Inicio**, desde donde el usuario decide si **posee una cuenta** o necesita **registrarse**. En caso de no tener cuenta, fluye hacia el **Registro** donde introduce su información básica. Si ya tiene cuenta, **inicia sesión** directamente.

Tras la autenticación, el sistema verifica si el **perfil está completo**. Si no lo está, el usuario debe completar su **perfil** con información mínima necesaria: videojuego principal, rol o posición, y nivel de habilidad. Solo cuando el perfil se encuentra completo, el usuario puede **elegir su videojuego principal** y acceder a la **Pantalla Principal** (Home).

Desde la **Pantalla Principal**, el usuario tiene tres opciones principales:

1. **Crear sala** (como HOST): Configura los parámetros de la sala y pasa al estado de **Sala** como anfitrión.
2. **Buscar sala**: Utiliza el buscador para encontrar salas existentes y **unirse** a una de ellas, pasando al estado de **Sala** como jugador.
3. Acceder a otras secciones como perfil, configuración o historial.

Una vez dentro de la **Sala**, independientemente de su rol, el usuario tiene disponibles las siguientes **Acciones**:

- **Chat**: Enviar y recibir mensajes en tiempo real. Esta acción no cambia el estado de sala.
- **Listo**: Cambiar su estado a "listo". Tras esta acción, el sistema evalúa **¿Todos listos?**.
- **Expulsar** (Solo HOST): Eliminar a un jugador de la sala. Esta acción exclusiva del host libera una plaza.
- **Salir**: Abandonar la sala voluntariamente. Esta acción deriva hacia **Valorar**.

La decisión **¿Todos listos?** actúa como punto de control. Si no todos los miembros están listos, la sala permanece en estado actual y los usuarios pueden continuar interactuando. Cuando **todos están listos**, la sala pasa a **Partida iniciada** y los usuarios proceden a jugar.

Tras finalizar la partida, o cuando un usuario abandona la sala, fluye hacia **Valorar**, donde debe obligatoriamente valorar a sus compañeros mediante escala de cinco estrellas. Solo tras completar esta valoración, puede **Finalizar** y volver a la pantalla principal para buscar nuevas partidas.

El diagrama utiliza **líneas punteadas** para indicar que el **buscador global** está disponible permanentemente desde cualquier estado, permitiendo a los usuarios iniciar nuevas búsquedas sin restricciones de navegación.

---

## 6. TECNOLOGÍAS PREVISTAS

La elección del stack tecnológico para el desarrollo de Squad Up ha sido cuidadosamente considerada, equilibrando aspectos como la curva de aprendizaje, la robustez técnica, las capacidades funcionales requeridas, y la demanda laboral actual en el sector del desarrollo web.

### Lenguaje de programación principal

**JavaScript (ES6+)**: Lenguaje principal para el desarrollo de la aplicación. JavaScript es el lenguaje nativo de los navegadores web y permite desarrollar tanto la lógica de cliente como, mediante entornos como Node.js, la lógica de servidor si fuera necesario. La amplia adopción de JavaScript en la industria, junto con su ecosistema de librerías y herramientas, facilita el acceso a recursos, documentación y soluciones a problemas comunes.

### Tipo de aplicación

**Aplicación web responsiva**: Tipo de aplicación que se ejecuta en el navegador y se adapta a diferentes tamaños de pantalla (móvil, tablet, escritorio). No requiere instalación ni descargas por parte del usuario, lo que maximiza su accesibilidad.

### Framework principal

**React**: Biblioteca desarrollada por Facebook para construir interfaces de usuario. React se basa en un modelo de programación declarativa y en componentes que permite construir interfaces complejas a partir de piezas pequeñas y reutilizables. Utiliza un Virtual DOM que optimiza la renderización, actualizando únicamente las partes que han cambiado, lo que resulta especialmente importante para funcionalidades en tiempo real como el chat.

### Framework de diseño

**Tailwind CSS**: Framework de utilidades CSS que permite diseñar interfaces rápidamente mediante clases predefinidas. A diferencia de otros frameworks, Tailwind no proporciona componentes preestablecidos, sino clases de utilidad de bajo nivel que pueden combinarse para construir cualquier diseño. Facilita la implementación de diseños responsivos y modo oscuro.

### Backend

**Supabase**: Plataforma Backend-as-a-Service que proporciona autenticación, base de datos PostgreSQL, y funcionalidades en tiempo real. Supabase Auth gestiona el flujo de registro, login y sesiones. La base de datos PostgreSQL permite almacenar perfiles, salas, mensajes y valoraciones. El sistema de Row Level Security (RLS) garantiza que los usuarios solo accedan a datos autorizados. Supabase Realtime permite implementar el chat mediante WebSockets.

### Entorno de desarrollo

**Visual Studio Code**: Editor de código con ecosistema rico de extensiones para React y JavaScript. Incluye herramientas de formateo (Prettier), linting (ESLint), autocompletado inteligente, integración con Git, terminal integrado, y capacidades de depuración.

### Herramientas de construcción

**Vite**: Herramienta de build moderna que optimiza el desarrollo de aplicaciones React. Proporciona un servidor de desarrollo con recarga en caliente instantánea, lo que significa que los cambios en el código se reflejan inmediatamente en el navegador.

### Gestión de paquetes

**npm o yarn**: Gestores de paquetes estándar en el ecosistema JavaScript para instalar bibliotecas, gestionar versiones de dependencias, y ejecutar scripts de desarrollo.

### Plataforma de despliegue

**Vercel o Netlify**: Plataformas que ofrecen integración continua y despliegue automatizado desde un repositorio Git. Facilitan poner la aplicación en producción con mínimo esfuerzo, proporcionando dominios personalizados, certificados SSL gratuitos, y optimización automática de activos.

---

## CONCLUSIÓN

Squad Up representa un proyecto ambicioso que combina la necesidad social de facilitar conexiones positivas entre jugadores con el desafío técnico de construir una aplicación web moderna con funcionalidades en tiempo real. La aplicación, basada en un modelo de tablón de anuncios inteligente para la formación de equipos de juego, tiene el potencial de mejorar significativamente la experiencia de millones de jugadores que actualmente sufren las limitaciones y frustraciones asociadas a los sistemas de emparejamiento aleatorio.

La planificación detallada de las funcionalidades, el diseño cuidadoso de la interfaz plasmado en los mockups de Figma, la claridad del flujo de navegación representado en el diagrama UML, y la elección justificada de un stack tecnológico moderno y robusto, constituyen una base sólida sobre la cual iniciar la fase de implementación del proyecto. La aplicación no solo aborda un problema real y relevante para la comunidad gaming, sino que también demuestra la capacidad de aplicar y integrar tecnologías actuales con estándares de calidad profesionales.

El enfoque en la construcción de una comunidad positiva mediante mecanismos como el sistema de valoración obligatorio, la capacidad de filtrar por criterios específicos, y la disponibilidad de chat para facilitar la comunicación, diferencia a Squad Up de otras soluciones y le confiere un valor añadido significativo. La alineación del proyecto con los Objetivos de Desarrollo Sostenible de la ONU, especialmente en lo referente a la salud mental, la igualdad de género, y la reducción de desigualdades, refuerza el impacto social positivo que la plataforma puede generar.

La fase de implementación que dará comienzo a continuación se enfrentará al reto técnico de traducir esta planificación en código funcional, integrando las diferentes piezas del stack tecnológico y construyendo una aplicación que no solo funcione correctamente, sino que ofrezca una experiencia de usuario excepcional. Los mockups y el diagrama de flujo servirán como guía constante durante el desarrollo, asegurando que el producto final se mantenga fiel a la visión original y cumpla con los objetivos establecidos en esta fase de planificación.

Squad Up tiene, por tanto, el potencial no solo de constituir un proyecto académico exitoso que demuestre las capacidades técnicas adquiridas durante el ciclo formativo, sino también de convertirse en una herramienta real y útil para la comunidad de jugadores, contribuyendo positivamente a su experiencia de juego y fomentando entornos más inclusivos, respetuosos y divertidos para todos los usuarios independientemente de su nivel, género o procedencia.
