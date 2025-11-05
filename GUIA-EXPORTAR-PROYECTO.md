# Guía para Guardar y Exportar el Proyecto

## 📦 Opción 1: Usar Git (Recomendado)

Esta es la mejor opción para mantener el proyecto versionado y sincronizado.

### Inicializar Git y subir a GitHub:

```bash
# 1. Inicializar Git (si no está ya inicializado)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit"

# 4. Crear un repositorio en GitHub (ve a github.com y crea uno nuevo)

# 5. Conectar tu repositorio local con GitHub
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 6. Subir el proyecto
git push -u origin main
```

### En la otra MacBook:

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 2. Entrar al directorio
cd TU-REPOSITORIO

# 3. Instalar dependencias
npm install

# 4. Ejecutar el proyecto
npm run dev
```

---

## 💾 Opción 2: Exportar como ZIP (Sin node_modules)

Si prefieres copiar el proyecto directamente sin usar Git:

### En tu MacBook actual:

```bash
# 1. Navegar al directorio del proyecto
cd /Users/alejandro/Downloads/horizons-export-ffedb68b-be83-4027-a33f-6a742e5b7c26

# 2. Crear un ZIP excluyendo node_modules y dist
zip -r proyecto-lux-hydro.zip . -x "node_modules/*" -x "dist/*" -x "*.DS_Store"
```

O usar la interfaz gráfica:
- Selecciona todos los archivos EXCEPTO `node_modules` y `dist`
- Clic derecho → "Comprimir X elementos"

### En la otra MacBook:

1. Copiar el ZIP (vía AirDrop, USB, iCloud, etc.)
2. Descomprimir el ZIP
3. Abrir Terminal en la carpeta del proyecto
4. Ejecutar: `npm install`
5. Ejecutar: `npm run dev`

---

## 📤 Opción 3: AirDrop Directo

Si las MacBooks están cerca:

1. Selecciona la carpeta del proyecto (excluyendo `node_modules`)
2. Clic derecho → Compartir → AirDrop
3. En la otra MacBook, acepta la transferencia
4. En la otra MacBook, ejecuta `npm install` y luego `npm run dev`

---

## 🔄 Opción 4: iCloud Drive / Dropbox

1. Mueve o copia la carpeta del proyecto a iCloud Drive o Dropbox
2. En la otra MacBook, abre iCloud Drive/Dropbox
3. Copia la carpeta a tu ubicación deseada
4. Ejecuta `npm install` y `npm run dev`

---

## ⚠️ Importante

**NO incluyas estas carpetas/archivos al exportar:**
- `node_modules/` (se regenera con `npm install`)
- `dist/` (se regenera con `npm run build`)
- `.DS_Store` (archivos del sistema)

**SÍ incluye:**
- Todo el código fuente (`src/`)
- Archivos de configuración (`package.json`, `vite.config.js`, etc.)
- Carpeta `public/` con las imágenes
- Carpeta `scripts/`
- Carpeta `tools/`
- `.gitignore` (ahora incluido)

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver la versión compilada
npm run preview
```

