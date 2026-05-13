## Estructura del proyecto
El proyecto se encuentra estructurado de la siguiente manera:
+---assets
|       hero.png 
|       react.svg
|       vite.svg
|       
+---components
|   |   Navbar.tsx // Componente de navegación
|   |   Table.tsx // Componente para mostrar la tabla de personajes
|   |   
|   \---shared
+---guards
|       AuthGuard.tsx // Protege las rutas que requieren autenticación
|       
+---hooks
|       useCharacters.ts // Hook personalizado para manejar la lógica de personajes
|       
+---interfaces
|       auth.interface.ts // Define las interfaces relacionadas con la autenticación
|       character.interface.ts // Define las interfaces relacionadas con los personajes
|       
+---pages
|   +---dashboard
|   |       DashboardPage.tsx // Página principal después de iniciar sesión
|   |       
|   \---login
|           LoginPage.tsx // Página de inicio de sesión
|           
+---routes
|       AppRouter.ts // Define las rutas de la aplicación
|       
\---services
        auth.service.ts // Servicio para manejar la autenticación

## Tecnologías utilizadas

## 1️⃣ Fase de Arquitectura y Configuración Inicial

* Selección del Entorno: Elegiste Vite en lugar de Create React App para garantizar una compilación ultra rápida basada en módulos ES nativos y Esbuild.
* Tipado Estricto: Configuraste TypeScript desde el primer día para definir contratos de datos rígidos, atrapando errores en tiempo de compilación y no en producción.
* Punto de Inyección Limpio: Diseñaste main.tsx usando el operador de aserción no nula (!) en el DOM raíz. Enlazaste el componente App.tsx bajo el modo estricto (<StrictMode>) para auditar renderizados dobles y garantizar código limpio.

## 2️⃣ Fase de Seguridad y Control de Acceso

* Enrutamiento Centralizado: Creaste AppRouter.tsx aislando las vistas públicas de las privadas mediante el patrón de Rutas Anidadas (Nested Routes).
* Portero de Seguridad: Programaste un AuthGuard.tsx que evalúa síncronamente la existencia del token. Si es falso, bloquea el renderizado y usa <Navigate to="/login" replace /> para borrar la ruta prohibida del historial.
* Comodín de Rescate: Añadiste una ruta comodín (path="*") al final para atrapar cualquier URL rota o inexistente, redirigiendo de forma segura al inicio.

## 3️⃣ Fase de Conexión de Datos (El Motor HTTP)

* Instancia Centralizada: Creaste axios.config.ts encapsulando la URL base de la API de Dragon Ball para evitar duplicidad de cadenas (hardcoding).
* Interceptor de Petición: Diseñaste un middleware automático que inyecta dinámicamente el encabezado Authorization: Bearer <token> en cada llamada si el usuario inició sesión.
* Interceptor de Respuesta: Programaste una trampa global de errores. Si el servidor responde con un código 401 (No Autorizado) por un token expirado, el interceptor limpia el almacenamiento local de inmediato y expulsa al usuario al login de forma automatizada.
* Interfaces Genéricas: En character.interface.ts, creaste APIResponse<T>. Esto te permite reutilizar la misma estructura de paginación y metadatos (meta) para cualquier otra entidad del sistema.

## 4️⃣ Fase de Lógica de Negocio (Abstracción)

* Servicio Desacoplado: Centralizaste las peticiones en characterService. Al aislar los métodos de Axios aquí, la vista no sabe ni le importa cómo se consiguen los datos.
* Custom Hook de Estado: Extrajiste toda la lógica asíncrona de los componentes en useCharacters.ts. Este hook coordina los estados de carga (isLoading), errores (error) y éxito en bloques try/catch/finally.
* Simulación de Latencia: En authService, usaste un objeto Promise nativo con setTimeout de 1000ms. Esto te permitió probar y asegurar que los componentes de la interfaz respondieran correctamente ante estados asíncronos reales.

## 5️⃣ Fase de Optimización de Interfaz y UI

* Reactividad Local Inmutable: En el hook, creaste updateCharacterLocal. Al editar un guerrero, usas .map() sobre el estado existente en la memoria RAM del navegador. Esto actualiza la interfaz al instante sin saturar el servidor con peticiones innecesarias.
* Búsquedas en Memoria: En DashboardPage.tsx, usaste el método .find() sobre la lista existente para abrir la ficha técnica. Al no disparar una nueva petición HTTP por ID, redujiste la latencia visual a cero.
* Componentes de Presentación Puros: Diseñaste Table.tsx como un componente tonto (Dumb Component). No maneja lógica; solo itera filas de forma ultra eficiente utilizando key={char.id} para optimizar el algoritmo de reconciliación de React.
* Controles Dinámicos y Validados: En CharacterForm.tsx, implementaste validaciones derivadas con expresiones regulares (kiRegex) en tiempo real. Al desactivar el botón si el formulario es inválido, proteges el flujo bloqueando el envío de datos corruptos.

------------------------------
