const productos = [
  {
    id: 1,
    nombre: "Lady Dior",
    descripcion: "Un ícono atemporal que combina elegancia, sofisticación y el inconfundible savoir-faire de Dior.",
    precio: 25000,
    imagen: "https://assets.christiandior.com/is/image/diorprod/M0505ONGEM50P_E01?$default_GHC$&crop=487,646,919,1148&wid=1850&hei=2000&scale=0.875"
  },
  {
    id: 2,
    nombre: "30 Montaigne Dior",
    descripcion: "Elegancia parisina en un diseño icónico que transforma cualquier look.",
    precio: 18000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTk7xOPyD8cmdkRfpOdJG0j6nUKZsPOI2ndtmhjbk3UGsH-P7Jq-e1wwx0&s=10"
  },
  {
    id: 3,
    nombre: "Dior Bobby",
    descripcion: "Un equilibrio perfecto entre elegancia y carácter para acompañarte con estilo en cada ocasión.",
    precio: 30000,
    imagen: "https://assets.christiandior.com/is/image/diorprod/M9319UTZQM928_E01-1?$default_GHC$&crop=375,958,1256,851&wid=1850&hei=2000&scale=0.875"
  },
  {
    id: 4,
    nombre: "Dior Jolie",
    descripcion: "Delicadeza y sofisticación en un diseño que convierte cada detalle en una declaración de estilo",
    precio: 18000,
    imagen: "https://yourelegantboutiques.com/cdn/shop/files/Dior1vlavk.webp?v=1766048423&width=1850"
  },
  {
    id: 5,
    nombre: "Dior Star",
    descripcion: "Sofisticación y actitud en un diseño pensado para destacar en cada ocasión.",
    precio: 22000,
    imagen: "https://londonkelly.com.au/cdn/shop/files/christian-dior-diorstar-hobo-bag-with-chain-oblique-6006546.jpg?v=1776928268"
  }
];


/* ==============================
   CARRITO
================================ */

const carrito = [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");


/* ==============================
   MOSTRAR PRODUCTOS
================================ */

function mostrarProductos() {

  contenedorProductos.innerHTML = "";

  productos.forEach(prod => {

    const div = document.createElement("div");

    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">

      <h3>${prod.nombre}</h3>

      <p class="descripcion">
        ${prod.descripcion}
      </p>

      <p class="precio">
        ${prod.precio.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0
        })}
      </p>

      <button onclick="agregarAlCarrito(${prod.id})">
        Agregar al carrito
      </button>
    `;

    contenedorProductos.appendChild(div);

  });

}


/* ==============================
   AGREGAR AL CARRITO
================================ */

function agregarAlCarrito(id) {

  const productoExistente =
    carrito.find(p => p.id === id);

  if (productoExistente) {

    productoExistente.cantidad++;

  } else {

    const producto =
      productos.find(p => p.id === id);

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  actualizarCarrito();

}


/* ==============================
   ACTUALIZAR CARRITO
================================ */

function actualizarCarrito() {

  listaCarrito.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  carrito.forEach(item => {

    const li =
      document.createElement("li");

    const subtotal =
      item.precio * item.cantidad;

    li.textContent =
      `${item.nombre} x${item.cantidad} — ` +
      subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
      });

    listaCarrito.appendChild(li);

    total += subtotal;
    totalItems += item.cantidad;

  });

  totalCarrito.textContent =
    total.toLocaleString("es-CO");

  actualizarTituloCarrito(totalItems);

}


/* ==============================
   CONTADOR DEL CARRITO
================================ */

function actualizarTituloCarrito(cantidad) {

  const titulo =
    document.querySelector(".carrito h2");

  titulo.textContent =
    `🧾 Carrito de Compras (${cantidad})`;

}


/* ==============================
   VACIAR CARRITO
================================ */

function vaciarCarrito() {

  if (carrito.length === 0) {

    alert("🛒 El carrito ya está vacío.");

    return;

  }

  if (
    confirm(
      "¿Estás seguro de que quieres vaciar el carrito?"
    )
  ) {

    carrito.length = 0;

    actualizarCarrito();

  }

}


/* ==============================
   FINALIZAR COMPRA
================================ */

function finalizarCompra() {

  if (carrito.length === 0) {

    alert(
      "🛒 Tu carrito está vacío. Agrega productos antes de finalizar la compra."
    );

    return;

  }

  alert(
    "🎉 ¡Pedido simulado confirmado!\n\n" +
    "En un eCommerce real, ahora entrarían en acción " +
    "el backend, la pasarela de pago y la logística."
  );

  carrito.length = 0;

  actualizarCarrito();

}


/* ==============================
   INICIAR TIENDA
================================ */

mostrarProductos();
