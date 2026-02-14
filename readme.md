# 🌸 Sakura of Love - Instrucciones de Uso

## ¿Qué es este proyecto?

Una experiencia romántica interactiva inspirada en los cerezos japoneses (sakura), donde el amor florece como un hermoso árbol con hojas en forma de corazón.

## 📁 Archivos del proyecto

- `index.html` - Estructura HTML con formulario y contenedor de animación
- `styles.css` - Todos los estilos y animaciones con estética japonesa minimalista
- `main.js` - Lógica de animaciones y funcionalidad

## 🚀 Cómo usar

### Opción 1: Uso local
1. Descarga los tres archivos (index.html, styles.css, main.js) en la misma carpeta
2. Abre `index.html` en tu navegador (doble clic)
3. ¡Listo! La aplicación funcionará sin necesidad de servidor

### Opción 2: Con servidor local (opcional)
Si prefieres usar un servidor:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server
```

## 🎯 Flujo de la aplicación

### 1. Formulario inicial
Al abrir la página verás un formulario romántico donde puedes ingresar:
- **Para:** El nombre del amor de tu vida
- **De:** Tu nombre
- **Desde cuándo los amo:** Fecha y hora específica

### 2. Generar link personalizado
Al enviar el formulario:
- Se genera un link único con los datos encriptados en la URL
- Puedes copiar este link y enviarlo a tu ser amado
- Al abrir el link, la animación se reproduce automáticamente

### 3. Secuencia de animación

#### Intro (click en el corazón):
1. **Corazón inicial** - Aparece un corazón grande con "San Valentín"
2. **Contracción** - Al hacer click, el corazón se contrae formando una semilla
3. **Caída** - La semilla cae girando mientras el suelo se crea desde el centro
4. **Aterrizaje** - La semilla toca el suelo

#### Crecimiento del árbol:
5. **Tronco** - Crece de abajo hacia arriba en tres segmentos
6. **Ramas** - Se despliegan las ramas laterales
7. **Hojas** - Aparecen pequeños corazones rosados formando un gran corazón

#### Escena final:
8. **Movimiento** - El árbol se mueve suavemente a la izquierda
9. **Vuelo de hojas** - Los corazones vuelan uno por uno
10. **Mensaje** - Aparece el texto romántico personalizado
11. **Contador** - Muestra el tiempo transcurrido desde la fecha del amor

## 🎨 Características de diseño

### Paleta de colores sakura:
- Rosa sakura claro (#FFB3BA)
- Rosa sakura profundo (#F49CA7)
- Rosa pétalo (#FFC4CC)
- Marrón tronco (#8B6F47)
- Fondo crema (#FFF8F0)

### Tipografía romántica:
- **Títulos:** Playfair Display (elegante y clásico)
- **Texto romántico:** Cormorant Garamond (delicado)
- **Cuerpo:** Quicksand (suave y moderno)

### Efectos especiales:
- Textura de papel japonés en el fondo
- Sombras suaves con efecto sakura
- Animaciones fluidas y orgánicas
- Efecto typewriter en el texto final
- Contador en tiempo real

## 📱 Responsive

El diseño se adapta perfectamente a:
- 💻 Escritorio
- 📱 Tablets
- 📱 Móviles

## 🔧 Personalización

### Cambiar colores:
Edita las variables CSS en `styles.css`:
```css
:root {
    --sakura-pink: #FFB3BA;
    --sakura-deep: #F49CA7;
    /* ... más colores */
}
```

### Modificar el texto romántico:
En `main.js`, función `setupFinalText()`:
```javascript
textMessage.textContent = 'Tu mensaje personalizado aquí';
```

### Ajustar velocidad de animaciones:
En `styles.css`, modifica las duraciones:
```css
@keyframes seedFall {
    /* Cambia "3s" por el tiempo que prefieras */
}
```

## 🌸 Detalles técnicos de las animaciones

### Secuencia temporal:
- Contracción del corazón: 2 segundos
- Caída de semilla: 3 segundos
- Crecimiento del suelo: 2 segundos (simultáneo con caída)
- Crecimiento del tronco: 1.5 segundos
- Aparición de ramas: 1 segundo (escalonado)
- Florecimiento de hojas: 0.6 segundos cada una
- Movimiento del árbol: 2 segundos
- Vuelo de hojas: 4 segundos (150ms entre cada hoja)

### Hojas-corazón:
- 26 hojas distribuidas formando un corazón grande
- Cada hoja es un SVG con path de corazón
- Colores variados de la paleta sakura
- Rotaciones aleatorias para naturalidad

## 💡 Tips de uso

1. **Para mejor experiencia:** Usa pantalla completa (F11)
2. **Compartir:** Envía el link generado por WhatsApp, email, etc.
3. **Captura:** Puedes grabar la pantalla para tener un video
4. **Impresión:** El formulario está diseñado para verse bien impreso

## ⚠️ Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (solo para cargar las fuentes de Google Fonts)

## 🎁 Ideas de uso

- 💕 Carta de San Valentín digital
- 💍 Propuesta de matrimonio
- 🎂 Aniversario
- 💌 Declaración de amor
- 🎉 Celebración especial

## 📝 Notas

- No se guarda ningún dato en servidor (todo es local o en URL)
- Funciona offline una vez cargadas las fuentes
- Compatible con todos los navegadores modernos
- El contador funciona en tiempo real

---

**Creado con 💕 para celebrar el amor**

¡Disfruta creando momentos mágicos! 🌸✨
