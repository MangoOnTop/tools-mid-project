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
        <p class="text-sm font-bold text-gray-800">${product.title}</p>
        <p class="text-xs text-gray-500">${product.category}</p>
      </div>
      <div class="flex items-center gap-2">
        <p class="text-lg font-black text-green-900">$${product.price}</p>
      </div>
      <button class="w-full bg-green-900 text-white text-sm font-semibold py-2 rounded-md hover:bg-green-800 transition">
        Add to Cart
      </button>
    </div>
  `;

  const cart_button = card.querySelector("button");
  cart_button.addEventListener("click", () => {
    console.log("Cart এ add হলো:", product.title);
  });

  return card;
}

let allProducts = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    const market_grid = document.getElementById("market-grid");
    data.forEach((product) => {
      market_grid.appendChild(createProduct(product));
    });
  });

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
  const market_grid = document.getElementById("market-grid");
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
