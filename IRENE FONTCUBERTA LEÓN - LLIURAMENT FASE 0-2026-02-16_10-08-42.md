## Proyecto Intermodular: FASE 0

1. Título del proyecto...1

2. Introducción...1

a. Presentación del tema...1

b. Justificación...2

c. Objetivos generales y específicos...2

d. Relación con los ODS...3

## 1. Título del proyecto

Squad Up: Plataforma Android para la gestión y formación de equipos en juegos cooperativos

## 2. Introducción

## a. Presentación del tema

El presente proyecto de final de ciclo se centra en el diseño y desarrollo de una aplicación móvil nativa para el sistema operativo Android. La aplicación, denominada provisionalmente "Squad Up", nace como una solución tecnológica orientada al sector del entretenimiento digital, específicamente a los videojuegos multijugador y de rol (como League of Legends, World of Warcraft, Dungeons & Dragons o Magic: The Gathering).

La premisa fundamental del proyecto es crear una plataforma que facilite la conexión entre jugadores. Funciona como un sistema de gestión de "tablón de anuncios" inteligente, donde los usuarios pueden crear o buscar salas de juego con criterios específicos, permitiendo así la formación de equipos (o parties) que se adecuen a las necesidades concretas de la partida y a las preferencias de los participantes.

## bсиplicación

La elección de este tema responde a una problemática recurrente en la comunidad gaming: la dificultad de encontrar compañeros de equipo adecuados en entornos online. En muchos juegos cooperativos, depender de sistemas de emparejamiento aleatorio (matchmaking) suele derivar en experiencias negativas, falta de coordinación o situaciones de toxicidad.

Este proyecto se justifica por la necesidad de una herramienta externa que permita un filtrado previo de los participantes, garantizando una experiencia de juego más satisfactoria y organizada. Asimismo, a nivel técnico, este TFC permite aplicar y profundizar en tecnologías de desarrollo móvil actuales y altamente demandadas en el mercado laboral, como el lenguaje Kotlin y el kit de interfaz de usuario Jetpack Compose.

## c. Objetivos generales y específicos

Objetivo General: Desarrollar un Producto Mínimo Viable (MVP) de una aplicación Android que permita a los usuarios publicar y buscar anuncios para completar equipos de juego, gestionando la comunicación inicial entre los miembros seleccionados.

## Objetivos Específicos:

1. Implementar la arquitectura MVVM: Aplicar el patrón de diseño Model-View-ViewModel (MVVM) cubriendo al menos 5 módulos funcionales principales de la aplicación (Autenticación, Gestión de Perfiles, Creación de Anuncios, Búsqueda y Chat), logrando un 100% de cumplimiento del patrón para garantizar código limpio y escalable.

2. Desarrollo del sistema de gestión de usuarios: Desarrollar completamente el flujo de registro, autenticación y gestión de perfiles de jugador, integrando Firebase como servicio backend y validando el perfil con un mínimo de 5 campos de datos de usuario relevantes para el emparejamiento (incluyendo juego principal, rol/posición y rango/nivel).

3. Diseño del sistema de emparejamiento (Match): Diseñar e implementar la lógica para la creación de anuncios y el filtrado avanzado de salas, permitiendo que los usuarios puedan aplicar el filtrado simultáneo por un mínimo de 3 criterios (juego, rol y nivel/rango) y la aceptación de un máximo de 5 candidatos por sala de juego.

4. Integración del chat de texto: Implementar la funcionalidad de chat de texto en tiempo real para las salas completadas, garantizando un rendimiento óptimo de latencia de envío y recepción de mensajes en un entorno de prueba simulado.

5. Fomento de un entorno positivo: Diseñar e integrar un sistema de valoración post-partida que utilice una escala de 5 puntos (estrellas) y que sea de uso obligatorio al cerrar la sala o finalizar el chat, registrando la valoración en la base de datos para su posterior uso en el perfil del usuario.

## d. Relación con los ODS

El proyecto se alinea con los Objetivos de Desarrollo Sostenible (ODS) de la Agenda 2030, enfocándose en el bienestar de la comunidad digital y la innovación tecnológica:

- ODS 3: Salud y Bienestar. Se busca mitigar el estrés y la ansiedad social derivados de entornos de juego tóxicos. Al facilitar la búsqueda de compañeros afines, se promueve un ocio digital saludable y una mejor salud mental para los usuarios.

- ODS 5: Igualdad de Género. La plataforma permite la creación de espacios seguros o grupos exclusivos, proporcionando herramientas para que las jugadoras puedan evitar el acoso frecuente en partidas aleatorias y empoderando su participación en el sector.

- ODS 9: Industria, Innovación e Infraestructura. El proyecto implica el desarrollo de software utilizando tecnologías de vanguardia (Jetpack Compose), contribuyendo a la modernización de las infraestructuras digitales de organización comunitaria.

- ODS 10: Reducción de las Desigualdades. La aplicación democratiza el acceso al juego en equipo, permitiendo que usuarios con diferentes capacidades sociales o ubicaciones geográficas encuentren grupos adaptados a su nivel y ritmo, promoviendo la inclusión.