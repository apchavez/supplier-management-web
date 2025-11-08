
# e‑Commerce Gapsi — Frontend (CRA + React 17)

Proyecto base del **reto técnico** implementado con **Create React App**, **React 17**, **Redux Toolkit**, **React Router v6** y **Axios**.  
Este documento explica **archivo por archivo** qué hace cada pieza, cómo ejecutar, cómo configurar variables y tips de solución de problemas.

---

## 1) Requisitos
- Node.js 16/18/20 (recomendado 18 LTS).
- npm 8+.
- Backend activo (Spring Boot) con endpoints descritos abajo.

## 2) Instalación y ejecución

```bash
# instalar dependencias
npm install

# variables de entorno (crear .env en la raíz)
# REACT_APP_API_BASE_URL=http://localhost:8080
# REACT_APP_APP_VERSION=0.0.1

# ejecutar modo desarrollo
npm start

# build producción
npm run build
```

> **Importante (CRA + ajv)**: si ves el error `Cannot find module 'ajv/dist/compile/codegen'`, fija versiones compatibles:
```bash
npm uninstall ajv ajv-keywords
npm i -D ajv@6.12.6 ajv-keywords@3.5.2 schema-utils@3
```
Si el árbol quedó inconsistente, elimina `node_modules` y `package-lock.json` y reinstala con:
```bash
npm install
```

---

## 3) Árbol principal (src/)

```
src/
  api/
    client.js
  assets/
    icon.png
    logo.png
    logoBlanco.png
  components/
    Header.jsx
  features/
    providers/
      AddProviderForm.jsx
      ProvidersList.jsx
      providersSlice.js
  pages/
    Providers.jsx
    Welcome.jsx
  store.js
  App.js
  index.js
  index.css
```

A continuación se detalla el propósito de **cada archivo**:

### `/src/index.js`
- Punto de entrada de la UI.
- Monta la app en `#root` (CRA).
- Envuelve `App` con `Provider` (Redux) y `BrowserRouter` (React Router).

### `/src/App.js`
- Define las rutas principales:
  - `/` → `Welcome.jsx`
  - `/providers` → `Providers.jsx`
- Inserta el `Header` con el branding *e‑Commerce Gapsi*.

### `/src/store.js`
- Configura el **Redux Store** con **Redux Toolkit**.
- Registra el **slice** `providers` (estado de proveedores).

### `/src/index.css`
- Estilos base (layout, botones, tabla, grids, etc.).
- Clases usadas por componentes: `.container`, `.card`, `.header`, `.icon-btn`, `.table`, etc.

> **Nota UI**: Si el ícono del botón *Eliminar* no se ve, asegúrate que `.icon-btn` no tenga un `background` opaco que tape el glifo. Se puede forzar a transparente:
```css
.icon-btn {
  background: transparent; /* asegurar visibilidad del ícono */
}
```

---

## 4) Componentes y páginas

### `/src/components/Header.jsx`
- Barra superior con logo (de `src/assets`) y navegación (“Inicio”, “Proveedores”).  
- No maneja estado global; es “presentational”.

### `/src/pages/Welcome.jsx`
- Pantalla de bienvenida del reto.
- Consume `GET /api/welcome` vía `providers.repository.js`.
- Muestra el **mensaje** y **versión** del backend; si no hay versión en API, usa `REACT_APP_APP_VERSION`.

### `/src/pages/Providers.jsx`
- Página **Lista de proveedores**.
- Dispara `loadProviders()` al montar.
- Contiene banner/imagen de referencia (mock) y el layout de la sección.
- Renderiza:
  - `AddProviderForm` (formulario simple de alta).
  - `ProvidersList` (tabla virtualizada o lista).

### `/src/features/providers/AddProviderForm.jsx`
- Formulario controlado con 3 campos: `name`, `businessName`, `address`.
- Al enviar, ejecuta `createProvider(...)` (thunk) y limpia los campos.
- La **validación de duplicados** está delegada al **backend** (según el reto).

### `/src/features/providers/ProvidersList.jsx`
- Lista/tablas de proveedores (paginado).
- Muestra **Nombre / Razón Social / Dirección / Acciones**.
- En **Acciones** deja solo **Eliminar**:
  - Ejecuta `removeProvider(id)` (thunk).
- Controles de paginación usando `setPageIndex(...)`.

### `/src/features/providers/providersSlice.js`
- **Slice Redux** que maneja el estado de proveedores.
- Estado:
  - `page` (página retornada por la API: `{ content, totalElements, totalPages, size, number }`).
  - `pageIndex`, `pageSize`, `loading`, `error`.
- **Thunks**:
  - `loadProviders` → usa `listProviders(pageIndex, pageSize)`.
  - `createProvider` → usa `addProvider(payload)` y luego recarga lista.
  - `removeProvider` → usa `deleteProvider(id)` y luego recarga lista.
- **Reducers**:
  - `setPageIndex`, `setPageSize` para paginación.

---

### `/src/api/client.js`
- **Alternativa/legacy** de cliente HTTP.  
- En el proyecto final se usa **`/src/services/api.js`**; este archivo puede eliminarse si no se utiliza.

---

## 5) Activos (assets)

### `/src/assets/*.png|.svg`
- `logo.png`, `logoBlanco.png`, `icon.png`: branding proporcionado.
- `01-container.png`, `02-visitors.png`: **mockups de referencia** (no funcionales).
- Se utilizan en `Header` y/o `Welcome`/`Providers` como recursos visuales.

---

## 6) Configuración de HTML (público)

### `/public/index.html` (CRA)
- Mantiene solo lo necesario: `<div id="root"></div>` y, opcionalmente, el link a **Font Awesome** para íconos.
- Puedes actualizar el **favicon** con tu marca:
  - Coloca tu archivo en `public/favicon.png` o `public/favicon.ico`.
  - Asegura el `<link rel="icon" href="%PUBLIC_URL%/favicon.png" />`.

---

## 7) Endpoints esperados del backend

```
GET    /api/welcome
  -> { "message": "Bienvenido Candidato 01", "version": "X.Y.Z" }

GET    /api/providers?page=0&size=20
  -> {
       "content": [{ "id": 1, "name": "...", "businessName": "...", "address": "..." }],
       "totalElements": 3,
       "totalPages": 1,
       "size": 20,
       "number": 0
     }

POST   /api/providers
  -> 201 Created, body: proveedor creado

DELETE /api/providers/{id}
  -> 204 No Content
```

---

## 8) Estilo, íconos y accesibilidad

- Se usan clases utilitarias en `index.css`.  
- Para íconos de acción (Eliminar) puedes usar **Font Awesome** si está enlazado en `public/index.html`:
```jsx
<button className="icon-btn" title="Eliminar" onClick={...}>
  <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
  <span className="sr-only">Eliminar</span>
</button>
```
Asegura contraste del ícono (color) y `background` del botón.

---

## 9) Pruebas rápidas (manuales)

- **Welcome**: debe mostrar mensaje y versión provenientes del backend.
- **Providers**:
  - Listado paginado.
  - Alta con `Agregar` (si backend valida duplicados, mostrar error allí).
  - Eliminar por fila.
  - Navegación por páginas con `setPageIndex`.

---

## 12) Notas de diseño

- **Repository Pattern** para futuras migraciones de cliente HTTP o cache sin tocar UI.
- **Slices + Thunks** simplifican manejo de side-effects y recarga de datos tras **create/delete**.
- **Ruteo** minimal para cumplir el flujo del reto: bienvenida → proveedores.