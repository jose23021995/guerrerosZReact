
# Manual de instalación y configuración del proyecto
## Ambientacion e Instalacion de dependencias
### Paso 1 - inicializacion del proyecto
1. npm create vite@5 dragon-ball-app -- --template react-ts
2. cd dragon-ball-app
### Paso 2 - instalación de dependencias
1. npm install
2. npm install axios react-router-dom
3. npm install -D @types/react-router-dom   
4. npm install react@19.2.6 react-dom@19.2.6 react-router-dom@7.15.0
5. npm install react-dom@19.2.6 react-router-dom@7.15.0
6. npm install axios --legacy-peer-deps
7. npm install -D @types/node --legacy-peer-deps
```json
    "dependencies": 
    {
        "axios": "^1.16.1",
        "react": "^19.2.6",
        "react-dom": "^19.2.6",
        "react-router-dom": "^7.15.0"
    },
```
### Paso 3 - ejecutar el proyecto
1. npm run dev
2. Abre tu navegador y navega a http://localhost:5173 para ver la aplicación en acción.
### Paso 4 - estructura del proyecto carpetas
```
    +---public
    \---src
        +---api
        +---assets
        +---components
        |   \---shared
        +---guards
        +---hooks
        +---interfaces
        +---pages
        |   +---dashboard
        |   \---login
        +---routes
        \---services
```
### Paso 5 - estructura del proyecto carpetas y archivos
```
    A:.
|   .gitignore
|   eslint.config.js
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|
+---public
|       favicon.svg
|       icons.svg
|
\---src
    |   App.tsx
    |   main.tsx
    |
    +---api
    |       axios.config.ts
    |
    +---assets
    |       hero.png
    |       react.svg
    |       vite.svg
    |
    +---components
    |   |   CharacterDetail.tsx
    |   |   CharacterForm.tsx
    |   |   Navbar.tsx
    |   |   Table.tsx
    |   |
    |   \---shared
    |           Modal.tsx
    |
    +---guards
    |       AuthGuard.tsx
    |
    +---hooks
    |       useCharacters.ts
    |
    +---interfaces
    |       auth.interface.ts
    |       character.interface.ts
    |
    +---pages
    |   +---dashboard
    |   |       DashboardPage.tsx
    |   |
    |   \---login
    |           LoginPage.tsx
    |
    +---routes
    |       AppRouter.tsx
    |
    \---services
            auth.service.ts
            character.service.ts
```
### Paso 6 - configuracion de archivos a nivel raiz
1. package.json
2. vite.config.ts
3. tsconfig.app.json   
#### package.json
    ```json
    {
        "name": "dragon-ball-app",
        "private": true,
        "version": "1.0.0",
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "tsc -b && vite build",
            "lint": "eslint .",
            "preview": "vite preview"
        },
        "dependencies": {
            "axios": "^1.16.1",
            "react": "^19.2.6",
            "react-dom": "^19.2.6",
            "react-router-dom": "^7.15.0"
        },
        "devDependencies": {
            "@eslint/js": "^10.0.1",
            "@types/node": "^24.12.4",
            "@types/react": "^19.2.14",
            "@types/react-dom": "^19.2.3",
            "@types/react-router-dom": "^5.3.3",
            "@vitejs/plugin-react": "^6.0.1",
            "eslint": "^10.3.0",
            "eslint-plugin-react-hooks": "^7.1.1",
            "eslint-plugin-react-refresh": "^0.5.2",
            "globals": "^17.6.0",
            "typescript": "~6.0.2",
            "typescript-eslint": "^8.59.2",
            "vite": "^8.0.12"
        }
    }
    ```
#### vite.config.ts
    ```typescript
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import path from 'path'
        export default defineConfig({
        plugins: [react()],
        resolve: {
                alias: {
                '@': path.resolve(__dirname, './src'),
                },
            },
        })
    ```
#### tsconfig.app.json
    ```json
    {
        "compilerOptions": 
        {
            "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
            "target": "es2023",
            "lib": ["ES2023", "DOM"],
            "module": "esnext",
            "types": ["vite/client"],
            "skipLibCheck": true,

            /* Bundler mode */
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": true,
            "verbatimModuleSyntax": true,
            "moduleDetection": "force",
            "noEmit": true,
            "jsx": "react-jsx",

            /* Linting */
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "erasableSyntaxOnly": false,
            "noFallthroughCasesInSwitch": true,
            "paths": 
                {
                "@/*": ["./src/*"]
                }
        },
        "include": ["src"]
    }

    ```
## Interfaces

### Paso 7 - auth.interface.ts 
    ```typescript
    export interface User 
    {
        username: string;
        role: string;
    }

    export interface AuthResponse 
    {
        user: User;
        token: string;
    }

    ```
### Paso 8 - character.interface.ts
    ```typescript
    export interface Character {
        id: number;
        name: string;
        ki: string;
        maxKi: string;
        race: string;
        gender: string;
        description: string;
        image: string;
        affiliation: string;
    }

    export interface APIResponse<T> {
    items: T[]; // Array de personajes u otra entidad genérica
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    }
    ```
## axios
### Paso 9 - axios.config.ts
```typescript
    import axios from 'axios';

    const api = axios.create({
    baseURL: 'https://dragonball-api.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    });

    // Interceptor de Petición: Agrega el Bearer Token
    api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    // Interceptor de Respuesta: Manejo global de errores (como el 401)
    api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        // Si el token expira o es inválido, limpiamos y redirigimos
        localStorage.removeItem('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
    );

    export default api;

```
## services
### Paso 10 - auth.service.ts
```typescript
    import { type AuthResponse } from '../interfaces/auth.interface';
    export const authService = {
    login: async (username: string, password: string): Promise<AuthResponse> => {
        // Simulamos una demora de red para que la prueba sea realista
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
            resolve({
                user: { username: 'admin', role: 'administrator' },
                token: 'fake-jwt-token-dbz-123'
            });
            } else {
            reject(new Error('Credenciales incorrectas'));
            }
        }, 1000);
        });
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    }
    };

```
### Paso 11 - character.service.ts
```typescript
    import api from '../api/axios.config';
    import { type APIResponse, type Character } from '../interfaces/character.interface';

    export const characterService = {
        // Obtenemos la lista paginada
        getCharacters: async (page = 1, limit = 100): Promise<APIResponse<Character>> => {
            const { data } = await api.get<APIResponse<Character>>(`/characters`, {
            params: { page, limit }
            });
            return data;
        },

        // Obtener un personaje por ID (para el detalle)
        getCharacterById: async (id: number): Promise<Character> => {
            const { data } = await api.get<Character>(`/characters/${id}`);
            return data;
        }
    };

```
## Guards 
### Paso 12 - AuthGuard.tsx
    ```typescript
    import { Navigate, Outlet } from 'react-router-dom';

    export const AuthGuard = () => {
    // Verificamos si existe el token en el storage
    const token = localStorage.getItem('token');

    // Si existe el token, mostramos el contenido de la ruta (Outlet)
    // Si no, redirigimos al login
    return token ? <Outlet /> : <Navigate to="/login" replace />;
    };

    ```
## Hooks
### Paso 13 - useCharacters.ts
```typescript
    import { useState, useEffect } from 'react';
    import { type Character } from '../interfaces/character.interface';
    import { characterService } from '../services/character.service';

    export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCharacters = async () => {
        try {
        setIsLoading(true);
        const data = await characterService.getCharacters();
        setCharacters(data.items);
        setError(null);
        } catch (err: any) {
        setError('Error al cargar los personajes de Dragon Ball');
        } finally {
        setIsLoading(false);
        }
    };

    // FUNCION PARA REACTIVIDAD LOCAL
    // Esta función busca al personaje por ID y lo reemplaza en el estado local
    const updateCharacterLocal = (updatedChar: Character) => {
        setCharacters((prevCharacters) =>
        prevCharacters.map((char) =>
            char.id === updatedChar.id ? updatedChar : char
        )
        );
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    return { 
            characters, 
            isLoading, 
            error, 
            refetch: fetchCharacters,
            updateCharacterLocal // <-- Exportamos esto para el modal
        };
    };

```
## rutes 
### Paso 14 - generar las paginas para ponerlas en las rutas
1. DashboardPage.tsx
```typescript
    import { useState } from 'react';
    export const DashboardPage = () => {}
```
2. LoginPage.tsx
```typescript
    import { useState } from 'react';
    export const LoginPage = () => {}
```
### Paso 15 - generar los componentes 
1. Navbar.tsx
2. Table.tsx
3. CharacterDetail.tsx
4. CharacterForm.tsx
5. Modal.tsx
### Paso 16 - AppRouter.tsx
    ```typescript
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import { LoginPage } from '../pages/login/LoginPage';
    import { DashboardPage } from '../pages/dashboard/DashboardPage';
    import { AuthGuard } from '../guards/AuthGuard';

    export const AppRouter = () => {
        return (
            <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rutas Privadas Protegidas */}
                <Route element={<AuthGuard />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* Puedes añadir más rutas privadas aquí dentro */}
                </Route>

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            </BrowserRouter>
        );
    };
    ```

    NOTA: SE DEBE POSTERIORMENTE CONFIGURAR LAS PAGINAS POR QUE ASI NO VA A SERVIR
## login 
### Paso 17 - LoginPage.tsx
```typescript
    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { authService } from '../../services/auth.service';

    export const LoginPage = () => 
    {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const navigate = useNavigate();

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
            const response = await authService.login(username, password);
            localStorage.setItem('token', response.token); // Guardamos el token
            navigate('/dashboard'); // Redirigimos
            } catch (err: any) {
            setError(err.message);
            } finally {
            setLoading(false);
            }
        };

    return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                    <h2>Login Dragon Ball</h2>
                    <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    />
                    <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    />
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        );
    };

```
## dashboard
### Paso 19 - Dashboard
```typescript
import { useState } from 'react';

import { useCharacters } from '../../hooks/useCharacters';
import { Navbar } from '../../components/Navbar';
import { Table } from '../../components/Table';
import { Modal } from '../../components/shared/Modal';
import { CharacterForm } from '../../components/CharacterForm';
import { CharacterDetail } from '../../components/CharacterDetail'; // Importamos el nuevo componente
import { type Character } from '../../interfaces/character.interface';

export const DashboardPage = () => {
  const { characters, isLoading, error, updateCharacterLocal } = useCharacters();
  
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'detail'>('detail'); // Nuevo estado para alternar

  const handleOpenEdit = (char: Character) => {
    setSelectedChar(char);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleOpenDetail = (char: Character) => { // Recibimos el objeto completo para no hacer otra petición
    setSelectedChar(char);
    setModalType('detail');
    setIsModalOpen(true);
  };

    return (
        <div>
        <Navbar />
        <div style={{ padding: '0 2rem' }}>
            <h1>Guerreros Z</h1>
            {isLoading ? <p>Cargando...</p> : (
            <Table 
                data={characters} 
                onEdit={handleOpenEdit} 
                onDetail={(id) => {
                const char = characters.find(c => c.id === id);
                if (char) handleOpenDetail(char);
                }} 
            />
            )}
        </div>

        <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={modalType === 'edit' ? "Editar Guerrero" : "Ficha de Personaje"}
        >
            {selectedChar && (
            modalType === 'edit' ? (
                <CharacterForm 
                character={selectedChar} 
                onUpdate={(updated) => { setSelectedChar(updated); updateCharacterLocal(updated); }} 
                onSave={() => setIsModalOpen(false)} 
                />
            ) : (
                <CharacterDetail character={selectedChar} />
            )
            )}
        </Modal>
        </div>
    );
    };

```
## componentes 
### Paso 20 - character detail
```typescript
import { type Character } from '../interfaces/character.interface';

interface Props {
  character: Character;
}

export const CharacterDetail = ({ character }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: '180px', height: '240px', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }} 
      />
      <div style={{ width: '100%' }}>
        <h2 style={{ color: '#e67e22', marginBottom: '5px' }}>{character.name}</h2>
        <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>
          "{character.description}"
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>Raza:</span> <span>{character.race}</span>
          <span style={{ fontWeight: 'bold' }}>Ki Máximo:</span> <span>{character.maxKi}</span>
          <span style={{ fontWeight: 'bold' }}>Género:</span> <span>{character.gender}</span>
          <span style={{ fontWeight: 'bold' }}>Afiliación:</span> <span>{character.affiliation}</span>
        </div>
      </div>
    </div>
  );
};

```
### Paso 21 - character form
```typescript
import { type Character } from '../interfaces/character.interface';

interface Props {
  character: Character;
  onUpdate: (updated: Character) => void;
  onSave: () => void;
}

export const CharacterForm = ({ character, onUpdate, onSave }: Props) => {
  const kiRegex = /^[0-9.]+$/;
  const isNameInvalid = !character.name.trim();
  const isKiInvalid = !character.ki.trim() || !kiRegex.test(character.ki);
  const isFormInvalid = isNameInvalid || isKiInvalid;

  const handleChange = (field: keyof Character, value: string) => {
    onUpdate({ ...character, [field]: value });
  };

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSave(); }} 
      style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nombre:</label>
        <input 
          type="text" 
          style={{ 
            padding: '10px', borderRadius: '4px', 
            border: isNameInvalid ? '2px solid red' : '1px solid #ccc',
            outline: 'none' 
          }}
          value={character.name} 
          onChange={(e) => handleChange('name', e.target.value)} 
        />
        {isNameInvalid && <span style={{ color: 'red', fontSize: '12px' }}>El nombre es obligatorio</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Ki:</label>
        <input 
          type="text" 
          style={{ 
            padding: '10px', borderRadius: '4px', 
            border: isKiInvalid ? '2px solid red' : '1px solid #ccc',
            outline: 'none' 
          }}
          value={character.ki} 
          onChange={(e) => handleChange('ki', e.target.value)} 
        />
        {isKiInvalid && <span style={{ color: 'red', fontSize: '12px' }}>El Ki solo puede contener números y puntos</span>}
      </div>

      <button 
        type="submit" 
        disabled={isFormInvalid}
        style={{ 
          marginTop: '10px', 
          backgroundColor: isFormInvalid ? '#ccc' : '#28a745', 
          color: 'white', padding: '12px', border: 'none', borderRadius: '4px',
          cursor: isFormInvalid ? 'not-allowed' : 'pointer', fontWeight: 'bold'
        }}
      >
        Confirmar Cambios
      </button>
    </form>
  );
};

```
### Paso 22 - modal
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', zIndex: 1000, padding: '20px' // Padding para que no toque los bordes
    }}>
      <div style={{
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        width: '100%', 
        maxWidth: '500px', 
        position: 'relative',
        // --- ESTO ACTIVA EL SCROLL ---
        maxHeight: '90vh', // Máximo 90% del alto de la pantalla
        overflowY: 'auto',  // Activa scroll vertical solo si es necesario
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {title}
        </h3>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}
        >
          ✕
        </button>
        <div style={{ marginTop: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

```
### Paso 23 - navbar
```typescript
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#242424',
      color: 'white',
      marginBottom: '2rem'
    }}>
      <h2 style={{ margin: 0 }}>DBZ Portal</h2>
      <button 
        onClick={handleLogout}
        style={{ backgroundColor: '#ed8936', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};


```
### Paso 24 - table
```typescript
import { type Character } from '../interfaces/character.interface';

interface Props {
  data: Character[];
  onEdit: (char: Character) => void;
  onDetail: (id: number) => void;
}

export const Table = ({ data, onEdit, onDetail }: Props) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <th style={{ padding: '12px' }}>Nombre</th>
          <th style={{ padding: '12px' }}>Raza</th>
          <th style={{ padding: '12px' }}>Ki</th>
          <th style={{ padding: '12px' }}>Afiliación</th>
          <th style={{ padding: '12px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((char) => (
          <tr key={char.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '12px' }}>{char.name}</td>
            <td style={{ padding: '12px' }}>{char.race}</td>
            <td style={{ padding: '12px' }}>{char.ki}</td>
            <td style={{ padding: '12px' }}>{char.affiliation}</td>
            <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
              <button onClick={() => onDetail(char.id)}>Ver</button>
              <button onClick={() => onEdit(char)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

```
## pasos finales / main.ts y app.ts
### Paso 25 main.ts
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './routes/AppRouter.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```
### Paso 26 app.ts
```typescript
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <AppRouter />
  );
}

export default App;

```
