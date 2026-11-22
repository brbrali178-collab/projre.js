
const products = [
    {
      id: 1,
      name: "African Heritage Shirt",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600"
    },
    {
      id: 2,
      name: "Urban Ankara Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },
    {
      id: 3,
      name: "Traditional Style Dress",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600"
    },
    {
      id: 4,
      name: "Modern Streetwear Set",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
    }
  ];
  
  let cart = [];
  
  const productGrid = document.getElementById("productGrid");
  const cartItems = document.getElementById("cartItems");
  
  // DISPLAY PRODUCTS
  
  function displayProducts() {
    productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="add-cart" data-id="${product.id}">
            ADD TO CART +
          </button>
        </div>
      </div>
    `).join("");
  }
  
  productGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-cart");
  
    if (button) {
      addToCart(Number(button.dataset.id));
    }
  });
  
  // ADD TO CART
  
  function addToCart(id) {
    const existing = cart.find(item => item.id === id);
  
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, quantity: 1 });
    }
  
    updateCart();
  }
  
  // UPDATE CART
  
  function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    document.getElementById("cartCount").textContent = count;
  
    cartItems.innerHTML = "";
  
    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }
  
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
  
      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">
  
          <div class="cart-item-info">
            <h4>${product.name}</h4>
            <p>$${product.price.toFixed(2)}</p>
  
            <div class="quantity-controls">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
  
          <button class="remove-item" data-action="remove" data-id="${item.id}">
            ✕
          </button>
        </div>
      `;
    });
  
    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + product.price * item.quantity;
    }, 0);
  
    document.getElementById("cartTotal").textContent =
      "$" + total.toFixed(2);
  }
  
  // CART ACTIONS
  
  cartItems.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
  
    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    const item = cart.find(p => p.id === id);
  
    if (action === "increase" && item) {
      item.quantity++;
    }
  
    if (action === "decrease" && item) {
      item.quantity--;
  
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
      }
    }
  
    if (action === "remove") {
      cart = cart.filter(p => p.id !== id);
    }
  
    updateCart();
  });
  
  // OPEN AND CLOSE CART
  
  const cartPanel = document.getElementById("cartPanel");
  const cartOverlay = document.getElementById("cartOverlay");
  
  function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
  }
  
  function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
  
  document.getElementById("cartButton").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  
  // MOBILE MENU
  
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("active");
  });
  
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navLinks").classList.remove("active");
    });
  });
  
  // CONTACT FORM
  
  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
  
    document.getElementById("formMessage").textContent =
      "Thank you! Your message has been received.";
  
    event.target.reset();
  });
  
  // NEWSLETTER
  
  document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
  
    alert("Thank you for joining the BWAY SIBLING family!");
  
    event.target.reset();
  });
  
  // CHECKOUT DEMO
  
  document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your shopping cart is empty!");
      return;
    }
  
    alert("Checkout demo! Connect a payment provider to accept real orders.");
  });
  
  // INITIALIZE
  
  displayProducts();
  updateCart();
  