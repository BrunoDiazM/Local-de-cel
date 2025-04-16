// Bienvenida y nombre guardado
document.addEventListener("DOMContentLoaded", function () {
  let nombreUsuario = localStorage.getItem("nombreUsuario");

  if (!nombreUsuario) {
    nombreUsuario = prompt("Bienvenido, por favor ingresa tu nombre:");
    if (nombreUsuario) localStorage.setItem("nombreUsuario", nombreUsuario);
  }

  if (nombreUsuario) {
    document.getElementById(
      "welcomeMessage"
    ).innerText = `Bienvenido a SALTACEL, ${nombreUsuario}!`;
    alert(`¡Bienvenido a SALTACEL, ${nombreUsuario}! Disfruta tu visita.`);
  }
});

// Modo Oscuro
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const mode = body.classList.contains("dark-mode") ? "enabled" : "disabled";
    localStorage.setItem("darkMode", mode);
    toggle.textContent = mode === "enabled" ? "☀️" : "🌙";
  });
});

// Buscador
function filterProducts() {
  const filter = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.style.display = title.includes(filter) ? "" : "none";
  });
}
document
  .getElementById("searchInput")
  .addEventListener("input", filterProducts);

// Carrito
let cart = [];
let products = [];

// Cargar carrito desde LocalStorage
document.addEventListener("DOMContentLoaded", function () {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
});

// Mostrar productos desde products.json
fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    mostrarProductos(data);
  })
  .catch((err) => console.error("Error al cargar productos:", err));

// Mostrar productos en HTML
function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <h3 class="card-title">${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = products.find((p) => p.id === id);
  if (!producto) return;

  const existente = cart.find((item) => item.id === id);
  if (existente) {
    existente.quantity++;
  } else {
    cart.push({ ...producto, quantity: 1 });
  }

  saveCart();
  updateCart();
  alert(`${producto.nombre} agregado al carrito.`);
}

// Guardar carrito en LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Eliminar del carrito
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCart();
}

// Cambiar cantidad
function updateQuantity(id, quantity) {
  const product = cart.find((item) => item.id === id);
  if (product && quantity > 0) {
    product.quantity = parseInt(quantity);
    saveCart();
    updateCart();
  }
}

// Actualizar vista del carrito
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cartCount");
  cartItems.innerHTML = "";

  let total = 0;
  let totalQuantity = 0;

  cart.forEach((item) => {
    const subtotal = item.precio * item.quantity;
    total += subtotal;
    totalQuantity += item.quantity;

    cartItems.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio}</td>
        <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" /></td>
        <td>$${subtotal}</td>
        <td><button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button></td>
      </tr>
    `;
  });

  totalPriceElement.textContent = `Total: $${total}`;
  cartCount.textContent = totalQuantity;
}
