# ⚡ RESUMEN RÁPIDO - Cambiar Imágenes

## 🎯 3 PASOS SIMPLES

### **1️⃣ COPIAR IMÁGENES**
```bash
# Pega tus imágenes aquí:
public/images/products/chemicals/     ← Para químicos
public/images/products/hot-tubs/      ← Para hot tubs
public/images/products/swim-spas/     ← Para swim spas
public/images/products/saunas/        ← Para saunas
```

### **2️⃣ ACTUALIZAR JSON**
```bash
# Edita estos archivos:
src/data/chemicals.json         ← Productos químicos (6 productos)
src/data/hot-tubs-series.json   ← Hot tubs (9 modelos)
```

### **3️⃣ CAMBIAR RUTAS**
```json
// ANTES (descripción)
"images": ["Chlorine tablets in premium packaging"]

// DESPUÉS (ruta)
"images": ["/images/products/chemicals/chlorine-tablets-main.jpg"]
```

---

## 📊 TODOS LOS PRODUCTOS

### **CHEMICALS (6 productos):**

| # | Producto | Archivo JSON | ID | Imágenes Sugeridas |
|---|---|---|---|---|
| 1 | Chlorine Tablets 20g | chemicals.json | chem-001 | chlorine-tablets-main.jpg |
| 2 | pH Minus Liquid | chemicals.json | chem-002 | ph-minus-bottle.jpg |
| 3 | Algaecide Premium | chemicals.json | chem-003 | algaecide-bottle.jpg |
| 4 | Test Strips 6-in-1 | chemicals.json | chem-004 | test-strips-container.jpg |
| 5 | Lavender Fragrance | chemicals.json | chem-005 | lavender-fragrance.jpg |
| 6 | Eucalyptus Fragrance | chemicals.json | chem-006 | eucalyptus-fragrance.jpg |

### **HOT TUBS (9 modelos en 3 series):**

#### **SERIES ONE:**
| Modelo | Nombre | ID | Imágenes Sugeridas |
|---|---|---|---|
| J-235 | Compact | series-one | j-235-main.jpg, j-235-interior.jpg |
| J-245 | Classic | series-one | j-245-main.jpg, j-245-interior.jpg |
| J-275 | Premium | series-one | j-275-main.jpg, j-275-interior.jpg |

#### **SERIES TWO:**
| Modelo | Nombre | ID | Imágenes Sugeridas |
|---|---|---|---|
| J-335 | Deluxe | series-two | j-335-main.jpg, j-335-interior.jpg |
| J-345 | Grand | series-two | j-345-main.jpg, j-345-interior.jpg |
| J-375 | Ultimate | series-two | j-375-main.jpg, j-375-interior.jpg |

#### **SERIES THREE:**
| Modelo | Nombre | ID | Imágenes Sugeridas |
|---|---|---|---|
| J-465 | Luxury | series-three | j-465-main.jpg, j-465-interior.jpg |
| J-475 | Elite | series-three | j-475-main.jpg, j-475-interior.jpg |
| J-495 | Presidential | series-three | j-495-main.jpg, j-495-interior.jpg |

---

## 🔍 CÓMO IDENTIFICAR CADA PRODUCTO

### **Opción 1: En la web**
1. Abre: http://localhost:3000/chemicals
2. Los productos aparecen en orden (de arriba a abajo = chem-001, 002, 003...)
3. El título te dice cuál es cada uno

### **Opción 2: En el archivo JSON**
1. Abre: `src/data/chemicals.json`
2. Busca el título del producto (Ctrl+F)
3. Verás el array `"images"` justo debajo

---

## 📝 PLANTILLA PARA COPIAR/PEGAR

### **Para Chemicals:**
```json
"images": [
  "/images/products/chemicals/NOMBRE-ARCHIVO.jpg",
  "/images/products/chemicals/NOMBRE-ARCHIVO-2.jpg"
]
```

### **Para Hot Tubs:**
```json
"images": [
  "/images/products/hot-tubs/j-235-main.jpg",
  "/images/products/hot-tubs/j-235-interior.jpg",
  "/images/products/hot-tubs/j-235-jets.jpg"
]
```

---

## ⚠️ IMPORTANTE

- ✅ Rutas empiezan con `/images/` (NO `/public/images/`)
- ✅ Nombres en minúsculas
- ✅ Usa guiones `-` (no espacios)
- ✅ Formatos: .jpg, .png, .webp

---

## 🚀 ¿NECESITAS AYUDA?

**Solo dime:**
1. Qué imágenes tienes
2. Dónde las has guardado

**Y yo actualizo todos los JSON automáticamente** ✨

---

## 📁 ARCHIVOS ÚTILES

He creado 3 guías:
- ✅ `GUIA-IMAGENES.md` - Guía completa detallada
- ✅ `EJEMPLO-ACTUALIZAR-IMAGENES.md` - Ejemplos paso a paso
- ✅ `RESUMEN-RAPIDO-IMAGENES.md` - Este resumen (lectura rápida)

---

**Lee primero este resumen, luego usa la guía completa si necesitas más detalles** 😊


