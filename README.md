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