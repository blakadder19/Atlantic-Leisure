# 📸 Guía Completa para Cambiar las Imágenes de Productos

## 📁 Estructura de Carpetas

He creado estas carpetas para organizar las imágenes:

```
public/
└── images/
    └── products/
        ├── chemicals/      ← Imágenes de productos químicos
        ├── hot-tubs/       ← Imágenes de hot tubs
        ├── swim-spas/      ← Imágenes de swim spas
        └── saunas/         ← Imágenes de saunas
```

---

## 🎯 PASO A PASO

### **PASO 1: Preparar tus imágenes**

1. **Formato recomendado:**
   - Formato: JPG o PNG (WebP también funciona)
   - Tamaño: Mínimo 800x800px (recomendado 1200x1200px)
   - Peso: Máximo 500KB por imagen (comprímelas si es necesario)

2. **Nombrar las imágenes:**
   - Usa nombres descriptivos en minúsculas
   - Usa guiones en lugar de espacios
   - Ejemplo: `chlorine-tablets-main.jpg`

---

### **PASO 2: Copiar las imágenes a las carpetas**

**Para CHEMICALS (Productos Químicos):**
```bash
# Copia tus imágenes a:
public/images/products/chemicals/
```

**Para HOT TUBS:**
```bash
# Copia tus imágenes a:
public/images/products/hot-tubs/
```

**Para SWIM SPAS:**
```bash
# Copia tus imágenes a:
public/images/products/swim-spas/
```

**Para SAUNAS:**
```bash
# Copia tus imágenes a:
public/images/products/saunas/
```

---

### **PASO 3: Actualizar los archivos JSON**

Hay 4 archivos JSON que contienen productos:

1. **`src/data/chemicals.json`** - Productos químicos
2. **`src/data/hot-tubs-series.json`** - Hot Tubs (Series One, Two, Three)
3. **`src/data/categories.json`** - Categorías principales
4. Otros archivos de productos si los tienes

---

## 📋 LISTADO DE TODOS LOS PRODUCTOS

### **1. CHEMICALS (Químicos) - 6 productos**

Archivo: `src/data/chemicals.json`

#### **CHEM-001: Chlorine Tablets 20g**
- **ID:** `chem-001`
- **Slug:** `chlorine-tablets-20g`
- **Nombre de archivos sugeridos:**
  - `chlorine-tablets-main.jpg` (imagen principal)
  - `chlorine-tablets-close-up.jpg` (segunda imagen)

**ANTES (texto):**
```json
"images": [
  "Chlorine tablets in premium packaging with safety labels",
  "Close-up of individual wrapped chlorine tablets"
]
```

**DESPUÉS (rutas):**
```json
"images": [
  "/images/products/chemicals/chlorine-tablets-main.jpg",
  "/images/products/chemicals/chlorine-tablets-close-up.jpg"
]
```

---

#### **CHEM-002: pH Minus Liquid**
- **ID:** `chem-002`
- **Slug:** `ph-minus-liquid`
- **Nombre de archivos sugeridos:**
  - `ph-minus-bottle.jpg`
  - `ph-minus-pouring.jpg`

**Actualizar:**
```json
"images": [
  "/images/products/chemicals/ph-minus-bottle.jpg",
  "/images/products/chemicals/ph-minus-pouring.jpg"
]
```

---

#### **CHEM-003: Algaecide Premium**
- **ID:** `chem-003`
- **Slug:** `algaecide-premium`
- **Nombre de archivos sugeridos:**
  - `algaecide-bottle.jpg`
  - `algaecide-before-after.jpg`

---

#### **CHEM-004: Test Strips 6-in-1**
- **ID:** `chem-004`
- **Slug:** `test-strips-6-in-1`
- **Nombre de archivos sugeridos:**
  - `test-strips-container.jpg`
  - `test-strips-chart.jpg`

---

#### **CHEM-005: Spa Fragrance Oil - Lavender**
- **ID:** `chem-005`
- **Slug:** `spa-fragrance-lavender`
- **Nombre de archivos sugeridos:**
  - `lavender-fragrance.jpg`
  - `lavender-in-spa.jpg`

---

#### **CHEM-006: Spa Fragrance Oil - Eucalyptus**
- **ID:** `chem-006`
- **Slug:** `spa-fragrance-eucalyptus`
- **Nombre de archivos sugeridos:**
  - `eucalyptus-fragrance.jpg`
  - `eucalyptus-steam.jpg`

---

### **2. HOT TUBS (Por Series)**

Archivo: `src/data/hot-tubs-series.json`

#### **SERIES ONE**

**J-235 Compact**
- **Model:** `J-235`
- **Slug:** `j-235-compact`
- Sugerencia: `hot-tubs/j-235-main.jpg`, `hot-tubs/j-235-interior.jpg`

**J-245 Classic**
- **Model:** `J-245`
- **Slug:** `j-245-classic`
- Sugerencia: `hot-tubs/j-245-main.jpg`, `hot-tubs/j-245-jets.jpg`

**J-275 Premium**
- **Model:** `J-275`
- **Slug:** `j-275-premium`

#### **SERIES TWO**

**J-335 Deluxe**
- **Model:** `J-335`
- **Slug:** `j-335-deluxe`

**J-345 Grand**
- **Model:** `J-345`
- **Slug:** `j-345-grand`

**J-375 Ultimate**
- **Model:** `J-375`
- **Slug:** `j-375-ultimate`

#### **SERIES THREE**

**J-465 Luxury**
- **Model:** `J-465`
- **Slug:** `j-465-luxury`

**J-475 Elite**
- **Model:** `J-475`
- **Slug:** `j-475-elite`

**J-495 Presidential**
- **Model:** `J-495`
- **Slug:** `j-495-presidential`

---

## 🔧 CÓMO ACTUALIZAR LOS JSON

### **Ejemplo 1: Actualizar Chlorine Tablets**

1. **Encuentra el producto en el JSON:**
```bash
Abre: src/data/chemicals.json
Busca: "id": "chem-001"
```

2. **Copia tus imágenes:**
```bash
# Copia estas 2 imágenes a:
public/images/products/chemicals/chlorine-tablets-main.jpg
public/images/products/chemicals/chlorine-tablets-close-up.jpg
```

3. **Actualiza el JSON:**
```json
{
  "id": "chem-001",
  "title": "Chlorine Tablets 20g",
  "images": [
    "/images/products/chemicals/chlorine-tablets-main.jpg",
    "/images/products/chemicals/chlorine-tablets-close-up.jpg"
  ]
}
```

---

### **Ejemplo 2: Actualizar Hot Tub J-235**

1. **Encuentra el modelo en el JSON:**
```bash
Abre: src/data/hot-tubs-series.json
Busca: "model": "J-235"
```

2. **Copia tus imágenes:**
```bash
# Copia a:
public/images/products/hot-tubs/j-235-main.jpg
public/images/products/hot-tubs/j-235-interior.jpg
public/images/products/hot-tubs/j-235-jets.jpg
```

3. **Actualiza el JSON:**
```json
{
  "model": "J-235",
  "images": [
    "/images/products/hot-tubs/j-235-main.jpg",
    "/images/products/hot-tubs/j-235-interior.jpg",
    "/images/products/hot-tubs/j-235-jets.jpg"
  ]
}
```

---

## 🎨 CONSEJOS DE IMÁGENES

### **Tipos de imágenes por producto:**

#### **Para Chemicals:**
1. **Imagen principal:** Producto completo con packaging
2. **Imagen secundaria:** Close-up del producto o en uso

#### **Para Hot Tubs:**
1. **Imagen principal:** Vista exterior completa
2. **Imagen interior:** Vista de asientos y jets
3. **Imagen detalle:** Jets, controles, o características especiales
4. **Imagen lifestyle:** Personas usando el hot tub (opcional)

#### **Para Saunas:**
1. **Imagen exterior:** Vista completa de la sauna
2. **Imagen interior:** Vista del interior con bancos
3. **Imagen detalle:** Puerta, ventanas, o características

---

## 📊 TABLA RÁPIDA DE REFERENCIA

### **CHEMICALS:**
| ID | Producto | Archivos Sugeridos |
|---|---|---|
| chem-001 | Chlorine Tablets | chlorine-tablets-main.jpg, chlorine-tablets-close.jpg |
| chem-002 | pH Minus | ph-minus-bottle.jpg, ph-minus-pouring.jpg |
| chem-003 | Algaecide | algaecide-bottle.jpg, algaecide-before-after.jpg |
| chem-004 | Test Strips | test-strips-container.jpg, test-strips-chart.jpg |
| chem-005 | Lavender Oil | lavender-fragrance.jpg, lavender-spa.jpg |
| chem-006 | Eucalyptus Oil | eucalyptus-fragrance.jpg, eucalyptus-steam.jpg |

### **HOT TUBS - SERIES ONE:**
| Model | Nombre | Archivos Sugeridos |
|---|---|---|
| J-235 | Compact | j-235-main.jpg, j-235-interior.jpg, j-235-jets.jpg |
| J-245 | Classic | j-245-main.jpg, j-245-interior.jpg, j-245-jets.jpg |
| J-275 | Premium | j-275-main.jpg, j-275-interior.jpg, j-275-jets.jpg |

### **HOT TUBS - SERIES TWO:**
| Model | Nombre | Archivos Sugeridos |
|---|---|---|
| J-335 | Deluxe | j-335-main.jpg, j-335-interior.jpg, j-335-jets.jpg |
| J-345 | Grand | j-345-main.jpg, j-345-interior.jpg, j-345-jets.jpg |
| J-375 | Ultimate | j-375-main.jpg, j-375-interior.jpg, j-375-jets.jpg |

### **HOT TUBS - SERIES THREE:**
| Model | Nombre | Archivos Sugeridos |
|---|---|---|
| J-465 | Luxury | j-465-main.jpg, j-465-interior.jpg, j-465-jets.jpg |
| J-475 | Elite | j-475-main.jpg, j-475-interior.jpg, j-475-jets.jpg |
| J-495 | Presidential | j-495-main.jpg, j-495-interior.jpg, j-495-jets.jpg |

---

## ⚡ COMANDO RÁPIDO

Si ya tienes todas tus imágenes preparadas y nombradas correctamente, puedes actualizar todos los JSON de una vez.

**¿Quieres que te ayude a actualizarlos automáticamente?**
Solo necesitas:
1. Copiar tus imágenes a las carpetas correspondientes
2. Decirme qué imágenes has copiado
3. Yo actualizo los JSON automáticamente

---

## 🔍 CÓMO IDENTIFICAR CADA PRODUCTO

### **Método 1: Por el slug (URL)**
Cada producto tiene un `slug` único que se usa en la URL:
- `chlorine-tablets-20g` → http://localhost:3000/chemicals/chlorine-tablets-20g
- `j-235-compact` → http://localhost:3000/hot-tubs/series-one/j-235-compact

### **Método 2: Por el ID**
Cada producto tiene un `id` único:
- Chemicals: `chem-001`, `chem-002`, etc.
- Hot Tubs: por model `J-235`, `J-245`, etc.

### **Método 3: Visualmente en la web**
1. Abre http://localhost:3000
2. Navega a Chemicals o Hot Tubs
3. Los productos se muestran con su título y descripción actual
4. El nombre del producto te indica cuál es

---

## ✅ CHECKLIST

- [ ] Preparar imágenes (formato JPG/PNG, min 800x800px)
- [ ] Copiar imágenes a `public/images/products/chemicals/`
- [ ] Copiar imágenes a `public/images/products/hot-tubs/`
- [ ] Actualizar `src/data/chemicals.json`
- [ ] Actualizar `src/data/hot-tubs-series.json`
- [ ] Verificar en el navegador que las imágenes carguen

---

## 🚀 ¿Necesitas ayuda?

**Opción 1:** Copia tus imágenes a las carpetas y dime los nombres, yo actualizo los JSON

**Opción 2:** Dame las rutas de tus imágenes y yo creo un script para actualizarlas todas

**Opción 3:** Actualízalas manualmente siguiendo los ejemplos de arriba

---

## 💡 TIPS IMPORTANTES

1. **Las rutas comienzan con `/images/`** (no `public/images/`)
2. **Usa minúsculas** en los nombres de archivo
3. **Sin espacios** (usa guiones `-`)
4. **Mantén el orden** de las imágenes (la primera es la principal)
5. **Puedes tener más de 2 imágenes** por producto si quieres

---

¿Quieres que te ayude a actualizar los JSON automáticamente? Solo dime qué imágenes has copiado a las carpetas. 😊


