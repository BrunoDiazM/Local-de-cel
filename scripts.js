/* Alert */

document.addEventListener("DOMContentLoaded", function () {
  let nombreUsuario = prompt("Bienvenido, por favor ingresa tu nombre:"); // Pide el nombre al usuario

  if (nombreUsuario) {
    document.getElementById(
      "welcomeMessage"
    ).innerText = `Bienvenido a SALTACEL, ${nombreUsuario}!`; // Msuestra el mensaje de bienvenida
    alert(`¡Bienvenido a SALTACEL, ${nombreUsuario}! Disfruta tu visita.`);
  }
});

/*  Modo Oscuro */

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️"; // Sol cuando esta en modo oscuro
  }

  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeToggle.textContent = "🌙"; // Luna cuando esta en modo claro
    }
  });
});

/* buscador */

function filterProducts() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    if (title.includes(filter)) {
      card.style.display = ""; // Muestra la tarjeta
    } else {
      card.style.display = "none"; // Oculta la tarjeta
    }
  });
}

document
  .getElementById("searchInput")
  .addEventListener("input", filterProducts); // Agregar un evento para mostrarlo en tiempo real

/* carrito de compras */

let cart = [];

function addToCart(productName, price) {
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartItems.innerHTML += `
            <tr>
              <td>${item.name}</td>
              <td>$${item.price}</td>
              <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" />
              </td>
              <td>$${subtotal}</td>
              <td><button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Eliminar</button></td>
            </tr>
          `;
  });

  totalPriceElement.textContent = `Total: $${total}`;
}

function updateQuantity(productName, quantity) {
  const product = cart.find((item) => item.name === productName);
  if (product) {
    product.quantity = parseInt(quantity);
    updateCart();
  }
}

function removeFromCart(productName) {
  cart = cart.filter((item) => item.name !== productName);
  updateCart();
}
