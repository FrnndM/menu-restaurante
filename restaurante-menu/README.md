# 🍽️ Menú Interactivo para Restaurante

Página web para restaurante con menú interactivo que envía pedidos por WhatsApp.

## ✏️ Personalización rápida

Solo edita el archivo `src/data/menu.js`:

```js
export const RESTAURANTE = {
  nombre: "Tu Restaurante",
  slogan: "Tu slogan aquí",
  whatsapp: "593999999999", // ← número con código de país, SIN el +
  horario: "Lun–Dom: 12:00 – 22:00",
  direccion: "Tu dirección",
}
```

Luego agrega/edita los platos en el array `CATEGORIAS`.

---

## 🚀 Despliegue en Vercel (gratis)

### Opción A – Desde GitHub (recomendado)

1. Sube este proyecto a un repositorio en GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project**
3. Importa tu repositorio
4. Vercel detecta automáticamente que es Vite → clic en **Deploy**
5. ¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

### Opción B – Con Vercel CLI

```bash
npm install -g vercel
cd restaurante-menu
npm install
vercel
```

---

## 💻 Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

---

## 📱 Cómo funciona el pedido por WhatsApp

1. El cliente agrega items al carrito
2. Opcionalmente escribe su nombre y una nota
3. Clic en **"Enviar pedido por WhatsApp"**
4. Se abre WhatsApp con el pedido formateado listo para enviar

Ejemplo del mensaje que llega:

```
🍽️ *Pedido – La Mesa*

👤 Nombre: Carlos López

*Items:*
• 1x Ceviche Clásico — $8.50
• 2x Seco de Pollo — $24.00
• 1x Limonada de Hierbabuena — $4.00

*Total: $36.50*

📝 Nota: Sin cebolla en el ceviche
```
