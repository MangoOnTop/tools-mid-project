let subtotal = 0;
const shipping = 5;

const cartItems = document.getElementById("cart-items");
const market_grid = document.getElementById("market-grid");

function updateSummary() {
  const total = subtotal > 0 ? subtotal + shipping : 0;
  document.getElementById("sub_total").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("ship").textContent =
    subtotal > 0 ? `$${shipping}` : "$0";
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function createCartItem(product) {
  let quantity = 1;

  subtotal += product.price;

  updateSummary();

  const cartItem = document.createElement("div");

  cartItem.className =
    "flex items-center gap-4 bg-white border-2 border-green-100 rounded-xl p-4 shadow-sm";

  cartItem.innerHTML = `
    <div class="flex flex-col gap-1 flex-1">
      <p class="text-sm font-bold text-gray-800 line-clamp-1">
        ${product.title}
      </p>

      <p class="text-xs text-gray-400">
        ${product.category}
      </p>

      <p class="text-base font-black text-green-900 mt-1">
        $${product.price}
      </p>
    </div>

    <div class="flex items-center gap-2 shrink-0">
      <button
        class="decrease w-7 h-7 rounded-full border-2 border-green-900 text-green-900 font-bold text-sm flex items-center justify-center hover:bg-green-900 hover:text-white transition"
      >
        −
      </button>

      <span class="quantity text-sm font-bold text-gray-800 w-4 text-center">
        1
      </span>

      <button
        class="increase w-7 h-7 rounded-full border-2 border-green-900 text-green-900 font-bold text-sm flex items-center justify-center hover:bg-green-900 hover:text-white transition"
      >
        +
      </button>
    </div>

    <button
      class="remove ml-2 text-red-400 hover:text-red-600 transition shrink-0"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m2 0V5a1 1 0 011-1h4a1 1 0 011 1v2"
        />
      </svg>
    </button>
  `;

  const quantityText = cartItem.querySelector(".quantity");
  const increaseBtn = cartItem.querySelector(".increase");
  const decreaseBtn = cartItem.querySelector(".decrease");
  const removeBtn = cartItem.querySelector(".remove");

  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityText.textContent = quantity;

    subtotal += product.price;

    updateSummary();
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityText.textContent = quantity;

      subtotal -= product.price;
      updateSummary();
    }
  });

  removeBtn.addEventListener("click", () => {
    subtotal -= product.price * quantity;
    updateSummary();

    cartItem.remove();
  });

  return cartItem;
}

const applyBtn = document.getElementById("apply");

applyBtn.addEventListener("click", () => {
  const coupon = document.querySelector("#coupon_code").value;

  if (coupon === "3BrotherS") {
    const discount = subtotal * 0.2;
    const total = subtotal + shipping - discount;

    document.getElementById("sub_total").textContent =
      `$${subtotal.toFixed(2)}`;
    document.getElementById("ship").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    document.getElementById("discount").textContent = `$${discount.toFixed(2)}`;
    alert("20% discount applied! 🎉");
  } else {
    alert("Invalid coupon code!");
  }
});

function createProduct(product) {
  const card = document.createElement("div");

  card.className =
    "w-56 cursor-pointer group border-2 border-green-900 rounded-md";

  card.innerHTML = `
    <div class="bg-gray-100 w-full h-72 overflow-hidden rounded-md">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />
    </div>

    <div class="flex flex-col p-3 gap-2">
      <div>
        <p class="text-sm font-bold text-gray-800">
          ${product.title}
        </p>

        <p class="text-xs text-gray-500">
          ${product.category}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <p class="text-lg font-black text-green-900">
          $${product.price}
        </p>
      </div>

      <button class="w-full bg-green-900 text-white text-sm font-semibold py-2 rounded-md hover:bg-green-800 transition">
        Add to Cart
      </button>
    </div>
  `;

  const cart_button = card.querySelector("button");

  cart_button.addEventListener("click", () => {
    cartItems.appendChild(createCartItem(product));
  });

  return card;
}

let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;

    data.forEach((product) => {
      market_grid.appendChild(createProduct(product));
    });
  })
  .catch((err) => console.log(err));

const all = document.getElementById("all");
const electronics = document.getElementById("electronics");
const jewelery = document.getElementById("jewelery");
const gents = document.getElementById("gents");
const ladies = document.getElementById("ladies");
const filter = document.getElementById("filter");

function update_button(n) {
  for (let button of filter.children) {
    button.classList.remove("bg-green-800");
  }

  filter.children[n].classList.add("bg-green-800");
}

function filterProducts(category, btnIndex) {
  update_button(btnIndex);

  market_grid.innerHTML = "";

  const filtered =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

  filtered.forEach((product) => {
    market_grid.appendChild(createProduct(product));
  });
}

all.addEventListener("click", () => filterProducts("all", 0));

electronics.addEventListener("click", () => filterProducts("electronics", 1));

jewelery.addEventListener("click", () => filterProducts("jewelery", 2));

gents.addEventListener("click", () => filterProducts("men's clothing", 3));

ladies.addEventListener("click", () => filterProducts("women's clothing", 4));

function applyFilters() {
  const searchQuery = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();

  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery),
  );

  market_grid.innerHTML = "";

  filtered.forEach((product) => {
    market_grid.appendChild(createProduct(product));
  });
}

const search = document.getElementById("search_button");

search.addEventListener("click", applyFilters);
