// =============================================
// PERSONALIZA TU MENÚ AQUÍ
// =============================================

export const RESTAURANTE = {
  nombre: "La Mesa",
  slogan: "Sabores que cuentan historias",
  whatsapp: "593999999999", // ← CAMBIA este número (con código de país, sin +)
  horario: "Mar–Dom: 12:00 – 22:00",
  direccion: "Av. Amazonas y Patria, Quito",
}

export const CATEGORIAS = [
  {
    id: "entradas",
    nombre: "Entradas",
    emoji: "🥗",
    items: [
      { id: 1, nombre: "Ceviche Clásico", descripcion: "Camarones frescos, limón, cebolla morada, cilantro", precio: 8.50, popular: true },
      { id: 2, nombre: "Patacones con Hogao", descripcion: "Plátano verde frito, salsa de tomate y cebolla", precio: 5.00 },
      { id: 3, nombre: "Ensalada César", descripcion: "Lechuga romana, crutones, aderezo César casero", precio: 7.00 },
    ]
  },
  {
    id: "platos-fuertes",
    nombre: "Platos Fuertes",
    emoji: "🍽️",
    items: [
      { id: 4, nombre: "Seco de Pollo", descripcion: "Pollo en salsa de tomate y especias, arroz y menestra", precio: 12.00, popular: true },
      { id: 5, nombre: "Lomo Saltado", descripcion: "Lomo de res, papas fritas, tomate, soya, arroz blanco", precio: 15.50, popular: true },
      { id: 6, nombre: "Trucha a la Plancha", descripcion: "Trucha del Páramo, ensalada mixta, papas doradas", precio: 14.00 },
      { id: 7, nombre: "Pasta Bolognesa", descripcion: "Spaghetti, carne molida, salsa de tomate italiana", precio: 11.00 },
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    emoji: "🥤",
    items: [
      { id: 8, nombre: "Jugo Natural", descripcion: "Maracuyá, naranjilla, mora o naranja (temporada)", precio: 3.50 },
      { id: 9, nombre: "Limonada de Hierbabuena", descripcion: "Limonada fresca con hierbabuena y hielo", precio: 4.00, popular: true },
      { id: 10, nombre: "Agua con Gas", descripcion: "500ml", precio: 2.00 },
      { id: 11, nombre: "Chicha Morada", descripcion: "Bebida tradicional de maíz morado con frutas", precio: 3.50 },
    ]
  },
  {
    id: "postres",
    nombre: "Postres",
    emoji: "🍮",
    items: [
      { id: 12, nombre: "Tres Leches", descripcion: "Pastel húmedo bañado en tres leches, crema chantilly", precio: 5.50, popular: true },
      { id: 13, nombre: "Helado Artesanal", descripcion: "2 bolas: vainilla, chocolate, fresa o guanábana", precio: 4.50 },
      { id: 14, nombre: "Flan Casero", descripcion: "Flan de huevo con caramelo, receta de la abuela", precio: 4.00 },
    ]
  },
]
