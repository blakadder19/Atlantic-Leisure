# 🎯 EJEMPLO PRÁCTICO: Cómo Actualizar Imágenes

## 📸 Escenario Real

Supongamos que tienes estas imágenes listas para subir:

```
Mis Imágenes/
├── cloro.jpg
├── ph-menos.jpg
├── alguicida.jpg
├── tiras-test.jpg
├── jacuzzi-modelo-235.jpg
└── jacuzzi-modelo-235-interior.jpg
```

---

## 🔄 PROCESO COMPLETO

### **PASO 1: Renombrar según convención**

Renombra tus archivos con nombres descriptivos:

```bash
# ANTES → DESPUÉS
cloro.jpg                           → chlorine-tablets-main.jpg
ph-menos.jpg                        → ph-minus-bottle.jpg
alguicida.jpg                       → algaecide-bottle.jpg
tiras-test.jpg                      → test-strips-container.jpg
jacuzzi-modelo-235.jpg              → j-235-main.jpg
jacuzzi-modelo-235-interior.jpg     → j-235-interior.jpg
```

---

### **PASO 2: Copiar a las carpetas correctas**

**En Mac/Linux:**
```bash
# Chemicals
cp chlorine-tablets-main.jpg public/images/products/chemicals/
cp ph-minus-bottle.jpg public/images/products/chemicals/
cp algaecide-bottle.jpg public/images/products/chemicals/
cp test-strips-container.jpg public/images/products/chemicals/

# Hot Tubs
cp j-235-main.jpg public/images/products/hot-tubs/
cp j-235-interior.jpg public/images/products/hot-tubs/
```

**En Windows:**
```bash
# Chemicals
copy chlorine-tablets-main.jpg public\images\products\chemicals\
copy ph-minus-bottle.jpg public\images\products\chemicals\

# Hot Tubs
copy j-235-main.jpg public\images\products\hot-tubs\
```

---

### **PASO 3: Actualizar el JSON**

#### **Chemicals: src/data/chemicals.json**

**BUSCA esto (líneas 2-28):**
```json
{
  "id": "chem-001",
  "title": "Chlorine Tablets 20g",
  "slug": "chlorine-tablets-20g",
  "category": "Sanitizers",
  "form": "Tablet",
  "brand": "AquaPure",
  "shortDesc": "Premium slow-dissolving chlorine tablets for consistent sanitization",
  "longDesc": "Our premium 20g chlorine tablets...",
  "price": 34.99,
  "compareAt": 44.99,
  "sku": "CHEM-CLR-20G-5KG",
  "stock": 45,
  "images": [
    "Chlorine tablets in premium packaging with safety labels",
    "Close-up of individual wrapped chlorine tablets"
  ],
```

**CAMBIA SOLO la parte de "images":**
```json
  "images": [
    "/images/products/chemicals/chlorine-tablets-main.jpg",
    "/images/products/chemicals/chlorine-tablets-close-up.jpg"
  ],
```

**RESULTADO COMPLETO:**
```json
{
  "id": "chem-001",
  "title": "Chlorine Tablets 20g",
  "slug": "chlorine-tablets-20g",
  "category": "Sanitizers",
  "form": "Tablet",
  "brand": "AquaPure",
  "shortDesc": "Premium slow-dissolving chlorine tablets for consistent sanitization",
  "longDesc": "Our premium 20g chlorine tablets...",
  "price": 34.99,
  "compareAt": 44.99,
  "sku": "CHEM-CLR-20G-5KG",
  "stock": 45,
  "images": [
    "/images/products/chemicals/chlorine-tablets-main.jpg",
    "/images/products/chemicals/chlorine-tablets-close-up.jpg"
  ],
  "usage": "Add 1-2 tablets per week...",
  "safetyNotes": "Store in cool, dry place...",
  ...resto del objeto...
}
```

---

## 🔍 IDENTIFICACIÓN VISUAL DE PRODUCTOS

### **CHEMICALS (en orden del archivo JSON):**

```
Producto 1:
├─ Título: "Chlorine Tablets 20g"
├─ ID: chem-001
├─ Ubicación en JSON: Líneas 2-28
├─ URL: /chemicals/chlorine-tablets-20g
└─ Imágenes: chlorine-tablets-main.jpg, chlorine-tablets-close-up.jpg

Producto 2:
├─ Título: "pH Minus Liquid"
├─ ID: chem-002
├─ Ubicación en JSON: Líneas 29-53
├─ URL: /chemicals/ph-minus-liquid
└─ Imágenes: ph-minus-bottle.jpg, ph-minus-pouring.jpg

Producto 3:
├─ Título: "Algaecide Premium"
├─ ID: chem-003
├─ Ubicación en JSON: Líneas 54-78
├─ URL: /chemicals/algaecide-premium
└─ Imágenes: algaecide-bottle.jpg, algaecide-before-after.jpg

Producto 4:
├─ Título: "Test Strips 6-in-1"
├─ ID: chem-004
├─ Ubicación en JSON: Líneas 79-103
├─ URL: /chemicals/test-strips-6-in-1
└─ Imágenes: test-strips-container.jpg, test-strips-chart.jpg

Producto 5:
├─ Título: "Spa Fragrance Oil - Lavender"
├─ ID: chem-005
├─ Ubicación en JSON: Líneas 104-128
├─ URL: /chemicals/spa-fragrance-lavender
└─ Imágenes: lavender-fragrance.jpg, lavender-spa.jpg

Producto 6:
├─ Título: "Spa Fragrance Oil - Eucalyptus"
├─ ID: chem-006
├─ Ubicación en JSON: Líneas 129-153
├─ URL: /chemicals/spa-fragrance-eucalyptus
└─ Imágenes: eucalyptus-fragrance.jpg, eucalyptus-steam.jpg
```

---

## 🛁 HOT TUBS (src/data/hot-tubs-series.json)

### **SERIES ONE:**

```json
{
  "id": "series-one",
  "name": "Series One",
  "description": "Compact luxury...",
  "models": [
    {
      "model": "J-235",
      "name": "Compact",
      "slug": "j-235-compact",
      "images": [
        "/images/products/hot-tubs/j-235-main.jpg",
        "/images/products/hot-tubs/j-235-interior.jpg",
        "/images/products/hot-tubs/j-235-jets.jpg"
      ],
      ...
    },
    {
      "model": "J-245",
      "name": "Classic",
      "slug": "j-245-classic",
      "images": [
        "/images/products/hot-tubs/j-245-main.jpg",
        "/images/products/hot-tubs/j-245-interior.jpg",
        "/images/products/hot-tubs/j-245-jets.jpg"
      ],
      ...
    }
  ]
}
```

---

## ⚡ MÉTODO RÁPIDO: Buscar y Reemplazar

Si usas VS Code (o cualquier editor):

### **Para Chemicals:**

1. Abre `src/data/chemicals.json`
2. Usa Buscar y Reemplazar (Cmd+H en Mac, Ctrl+H en Windows)

**Ejemplo 1:**
```
Buscar:    "Chlorine tablets in premium packaging with safety labels"
Reemplazar: "/images/products/chemicals/chlorine-tablets-main.jpg"
```

**Ejemplo 2:**
```
Buscar:    "pH Minus liquid bottle with measuring cap"
Reemplazar: "/images/products/chemicals/ph-minus-bottle.jpg"
```

---

## 🎯 TIPS DE IDENTIFICACIÓN

### **1. Por el título del producto**
El campo `"title"` te dice exactamente qué es:
```json
"title": "Chlorine Tablets 20g"  → Es el cloro en tabletas
"title": "pH Minus Liquid"       → Es el pH menos líquido
```

### **2. Por la descripción actual de imagen**
La descripción actual te da pistas:
```json
"Chlorine tablets in premium packaging"  → Necesitas foto del envase de cloro
"pH Minus liquid bottle with cap"        → Necesitas foto de la botella de pH
```

### **3. Por el orden en la web**
Abre http://localhost:3000/chemicals y verás los productos en orden:
- Primero: Chlorine Tablets (chem-001)
- Segundo: pH Minus (chem-002)
- Tercero: Algaecide (chem-003)
- etc.

---

## 📋 CHECKLIST COMPLETO

### **Para cada producto:**

- [ ] 1. Identificar el producto por título/ID
- [ ] 2. Renombrar la imagen según convención
- [ ] 3. Copiar imagen a la carpeta correcta
- [ ] 4. Actualizar el JSON con la ruta
- [ ] 5. Guardar el archivo JSON
- [ ] 6. Verificar en navegador (refresh la página)

---

## 🚨 ERRORES COMUNES

### ❌ **ERROR 1: Ruta incorrecta**
```json
// MAL - incluye "public"
"images": ["/public/images/products/chemicals/cloro.jpg"]

// BIEN - sin "public"
"images": ["/images/products/chemicals/chlorine-tablets-main.jpg"]
```

### ❌ **ERROR 2: Espacios en nombre de archivo**
```json
// MAL
"images": ["/images/products/chemicals/chlorine tablets.jpg"]

// BIEN
"images": ["/images/products/chemicals/chlorine-tablets-main.jpg"]
```

### ❌ **ERROR 3: Imagen no está en la carpeta**
```json
// El JSON dice:
"images": ["/images/products/chemicals/chlorine-tablets-main.jpg"]

// Pero la imagen está en:
public/images/chemicals/chlorine-tablets-main.jpg  ← Falta "products/"

// CORRECTO debe estar en:
public/images/products/chemicals/chlorine-tablets-main.jpg
```

---

## ✅ VERIFICACIÓN

Después de actualizar, verifica así:

1. **Abre el navegador**: http://localhost:3000
2. **Ve a Chemicals**: http://localhost:3000/chemicals
3. **Haz click en un producto**: http://localhost:3000/chemicals/chlorine-tablets-20g
4. **Verifica que la imagen carga**

Si NO carga:
- Abre DevTools (F12)
- Ve a Console
- Busca errores tipo "404 Not Found"
- Eso te dirá si la ruta está mal

---

## 🎉 EJEMPLO FINAL COMPLETO

**Archivo: src/data/chemicals.json (primeros 2 productos actualizados)**

```json
[
  {
    "id": "chem-001",
    "title": "Chlorine Tablets 20g",
    "slug": "chlorine-tablets-20g",
    "category": "Sanitizers",
    "form": "Tablet",
    "brand": "AquaPure",
    "shortDesc": "Premium slow-dissolving chlorine tablets for consistent sanitization",
    "longDesc": "Our premium 20g chlorine tablets provide long-lasting, consistent sanitization for your hot tub or swim spa. Slow-dissolving formula ensures stable chlorine levels with minimal maintenance. Each tablet is individually wrapped for freshness and safety.",
    "price": 34.99,
    "compareAt": 44.99,
    "sku": "CHEM-CLR-20G-5KG",
    "stock": 45,
    "images": [
      "/images/products/chemicals/chlorine-tablets-main.jpg",
      "/images/products/chemicals/chlorine-tablets-close-up.jpg"
    ],
    "usage": "Add 1-2 tablets per week to floating dispenser. Test water daily and adjust as needed. Ideal chlorine level: 3-5 ppm.",
    "safetyNotes": "Store in cool, dry place away from direct sunlight. Keep out of reach of children. Wear gloves when handling. Do not mix with other chemicals.",
    "relatedIds": ["chem-002", "chem-004"],
    "badges": ["Best Seller", "Premium Quality"],
    "seo": {
      "metaTitle": "Premium Chlorine Tablets 20g | Lux Hydro Living",
      "metaDescription": "Long-lasting chlorine tablets for hot tubs and swim spas. Premium quality, slow-dissolving formula for consistent sanitization."
    }
  },
  {
    "id": "chem-002",
    "title": "pH Minus Liquid",
    "slug": "ph-minus-liquid",
    "category": "Balancers",
    "form": "Liquid",
    "brand": "AquaPure",
    "shortDesc": "Fast-acting liquid pH reducer for optimal water balance",
    "longDesc": "Professional-grade liquid pH reducer that works quickly to lower pH and total alkalinity. Easy-to-use formula with precise dosing cap. Essential for maintaining comfortable, safe water conditions and protecting your spa equipment.",
    "price": 18.99,
    "sku": "CHEM-PHM-LIQ-2L",
    "stock": 62,
    "images": [
      "/images/products/chemicals/ph-minus-bottle.jpg",
      "/images/products/chemicals/ph-minus-pouring.jpg"
    ],
    "usage": "Add 50ml per 1000 litres to reduce pH by 0.2. Wait 30 minutes and retest. Ideal pH range: 7.2-7.6.",
    "safetyNotes": "Corrosive liquid. Wear protective gloves and eyewear. Do not mix with other chemicals. Store upright in original container.",
    "relatedIds": ["chem-003", "chem-004"],
    "badges": ["Fast Acting"],
    "seo": {
      "metaTitle": "pH Minus Liquid - Fast Acting pH Reducer | Lux Hydro Living",
      "metaDescription": "Professional pH reducer for hot tubs and swim spas. Fast-acting liquid formula for precise water balance control."
    }
  }
]
```

---

**¿Todo claro? ¿Quieres que actualice yo los JSON si me dices qué imágenes tienes?** 😊


