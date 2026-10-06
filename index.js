/* =========================
   PRODUCT DATA
========================= */

const products = [

    {
        id: 1,
        name: "Premium Brake Pad Set",
        category: "Brake System",
        price: 45000,
        description: "Reliable brake pads designed for smooth and responsive braking.",
        compatible: ["Toyota Camry", "Toyota Corolla", "Toyota Highlander"],
        icon: "fa-circle-stop"
    },

    {
        id: 2,
        name: "Engine Air Filter",
        category: "Filters",
        price: 12000,
        description: "High-quality air filter designed to protect your engine.",
        compatible: ["Toyota Camry", "Honda Accord", "Lexus RX 350"],
        icon: "fa-filter"
    },

    {
        id: 3,
        name: "Premium Oil Filter",
        category: "Filters",
        price: 8500,
        description: "Quality oil filter for efficient engine lubrication.",
        compatible: ["Toyota Camry", "Toyota Corolla", "Honda Civic"],
        icon: "fa-filter"
    },

    {
        id: 4,
        name: "Engine Spark Plug Set",
        category: "Engine Parts",
        price: 28000,
        description: "Reliable spark plugs for improved engine ignition.",
        compatible: ["Toyota Camry", "Honda Accord", "Hyundai Sonata"],
        icon: "fa-bolt"
    },

    {
        id: 5,
        name: "LED Headlight",
        category: "Electrical",
        price: 65000,
        description: "Bright and durable automotive LED headlight.",
        compatible: ["Toyota Camry", "Lexus RX 350"],
        icon: "fa-lightbulb"
    },

    {
        id: 6,
        name: "Suspension Shock Absorber",
        category: "Suspension",
        price: 75000,
        description: "Heavy-duty shock absorber for a smooth driving experience.",
        compatible: ["Toyota Highlander", "Toyota Camry"],
        icon: "fa-car-side"
    },

    {
        id: 7,
        name: "Engine Belt",
        category: "Engine Parts",
        price: 22000,
        description: "Durable engine belt built for dependable performance.",
        compatible: ["Toyota Corolla", "Toyota Camry"],
        icon: "fa-gears"
    },

    {
        id: 8,
        name: "Car Battery",
        category: "Electrical",
        price: 135000,
        description: "Reliable automotive battery for dependable starting power.",
        compatible: ["Toyota Camry", "Honda Accord", "Lexus RX 350"],
        icon: "fa-car-battery"
    }

];


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active-page");
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const matchingLink = document.querySelector(
        `.nav-link[onclick="showPage('${pageId}')"]`
    );

    if (matchingLink) {
        matchingLink.classList.add("active");
    }

    document.getElementById("navbar").classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageId === "parts") {
        renderProducts(products, "all-products");
    }

    if (pageId === "cart") {
        renderCart();
    }

    if (pageId === "checkout") {
        renderCheckout();
    }

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    document
        .getElementById("navbar")
        .classList.toggle("show");

}


/* =========================
   FORMAT MONEY
========================= */

function formatMoney(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


/* =========================
   PRODUCT CARD
========================= */

function createProductCard(product) {

    return `

        <article class="product-card">

            <div class="product-image">

                <span class="product-tag">
                    ${product.category}
                </span>

                <i class="fa-solid ${product.icon}"></i>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatMoney(product.price)}
                    </span>

                    <button
                        class="small-btn"
                        onclick="openProduct(${product.id})"
                        title="View product"
                    >
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(productList, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    if (productList.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h2>No Parts Found</h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;
    }

    container.innerHTML = productList
        .map(createProductCard)
        .join("");

}


/* =========================
   HOME PRODUCTS
========================= */

function loadHomeProducts() {

    renderProducts(
        products.slice(0, 4),
        "home-products"
    );

}


/* =========================
   OPEN PRODUCT
========================= */

function openProduct(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const container =
        document.getElementById("product-detail-content");


    container.innerHTML = `

        <div class="product-detail">

            <div class="detail-image">

                <i class="fa-solid ${product.icon}"></i>

            </div>


            <div class="detail-info">

                <span class="section-label">
                    ${product.category}
                </span>

                <h1>${product.name}</h1>

                <p>
                    ${product.description}
                </p>

                <div class="detail-price">
                    ${formatMoney(product.price)}
                </div>


                <div class="compatibility-box">

                    <h3>
                        <i class="fa-solid fa-car"></i>
                        Compatible Vehicles
                    </h3>

                    <p>
                        ${product.compatible.join(" • ")}
                    </p>

                </div>


                <div class="detail-buttons">

                    <button
                        class="btn primary-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>

                    <button
                        class="btn outline-btn"
                        onclick="buyNow(${product.id})"
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        </div>

    `;

    showPage("product-details");

}


/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;


    const existing = cart.find(
        item => item.id === productId
    );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCartCount();

    alert(`${product.name} has been added to your cart.`);

}


/* =========================
   BUY NOW
========================= */

function buyNow(productId) {

    addToCart(productId);

    showPage("cart");

}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    const container =
        document.getElementById("cart-content");


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Your Cart Is Empty</h2>

                <p>
                    Browse our spare parts and add
                    products to your cart.
                </p>

                <button
                    class="btn primary-btn"
                    onclick="showPage('parts')"
                >
                    Shop Spare Parts
                </button>

            </div>

        `;

        return;
    }


    let subtotal = 0;


    const itemsHTML = cart.map(item => {

        subtotal += item.price * item.quantity;


        return `

            <div class="cart-item">

                <div class="cart-item-image">

                    <i class="fa-solid ${item.icon}"></i>

                </div>


                <div>

                    <h3>${item.name}</h3>

                    <p>
                        ${formatMoney(item.price)} each
                    </p>

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <strong>${item.quantity}</strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <div>

                    <strong>
                        ${formatMoney(item.price * item.quantity)}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        `;

    }).join("");


    const delivery = 5000;

    const total = subtotal + delivery;


    container.innerHTML = `

        ${itemsHTML}

        <div class="cart-total">

            <div class="total-row">

                <span>Subtotal</span>

                <strong>
                    ${formatMoney(subtotal)}
                </strong>

            </div>


            <div class="total-row">

                <span>Delivery</span>

                <strong>
                    ${formatMoney(delivery)}
                </strong>

            </div>


            <div class="total-row total-final">

                <span>Total</span>

                <strong>
                    ${formatMoney(total)}
                </strong>

            </div>


            <button
                class="btn primary-btn full-btn"
                onclick="showPage('checkout')"
            >
                Proceed To Checkout
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        </div>

    `;

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(productId, amount) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }


    updateCartCount();

    renderCart();

}


/* =========================
   REMOVE CART ITEM
========================= */

function removeFromCart(productId) {

    cart = cart.filter(
        product => product.id !== productId
    );

    updateCartCount();

    renderCart();

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const search =
        document
            .getElementById("search-input")
            .value
            .toLowerCase();


    const filtered = products.filter(product => {

        return (
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.compatible.some(vehicle =>
                vehicle.toLowerCase().includes(search)
            )
        );

    });


    renderProducts(
        filtered,
        "all-products"
    );

}


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts() {

    const category =
        document.getElementById("category-filter").value;


    if (category === "all") {

        renderProducts(
            products,
            "all-products"
        );

        return;

    }


    const filtered = products.filter(
        product => product.category === category
    );


    renderProducts(
        filtered,
        "all-products"
    );

}


/* =========================
   CATEGORY PAGE
========================= */

function categoryProducts(category) {

    showPage("parts");

    document.getElementById("category-filter").value =
        category;

    filterProducts();

}


/* =========================
   VEHICLE SEARCH
========================= */

function findVehicleParts() {

    const brand =
        document.getElementById("vehicle-brand")?.value ||
        document.getElementById("home-brand")?.value;


    const model =
        document.getElementById("vehicle-model")?.value ||
        document.getElementById("home-model")?.value;


    if (!brand || !model) {

        alert("Please select your vehicle brand and model.");

        return;

    }


    const vehicleName =
        `${brand} ${model}`;


    const compatible = products.filter(product =>
        product.compatible.includes(vehicleName)
    );


    showPage("vehicles");


    const results =
        document.getElementById("vehicle-results");


    if (compatible.length === 0) {

        results.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-car"></i>

                <h2>No Compatible Parts Found</h2>

                <p>
                    Please contact Jafort Systems
                    for assistance.
                </p>

            </div>

        `;

        return;

    }


    results.innerHTML = `

        <div class="section-heading">

            <div>

                <span class="section-label">
                    COMPATIBLE PARTS
                </span>

                <h2>
                    Parts For ${vehicleName}
                </h2>

            </div>

        </div>

        <div class="product-grid">

            ${compatible
                .map(createProductCard)
                .join("")}

        </div>

    `;

}


/* =========================
   CHECKOUT SUMMARY
========================= */

function renderCheckout() {

    if (cart.length === 0) {

        showPage("cart");

        return;

    }


    let subtotal = 0;


    const html = cart.map(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        return `

            <div class="summary-line">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ${formatMoney(itemTotal)}
                </strong>

            </div>

        `;

    }).join("");


    const delivery = 5000;

    const total = subtotal + delivery;


    document.getElementById("checkout-summary").innerHTML = `

        ${html}

        <div class="summary-line">

            <span>Delivery</span>

            <strong>
                ${formatMoney(delivery)}
            </strong>

        </div>

        <div class="summary-total">

            <span>Total</span>

            <strong>
                ${formatMoney(total)}
            </strong>

        </div>

    `;

}


/* =========================
   CHECKOUT → PAYMENT
========================= */

function goToPayment(event) {

    event.preventDefault();


    const name =
        document.getElementById("customer-name").value;


    if (!name) return;


    localStorage.setItem(
        "customerName",
        name
    );


    let subtotal = 0;


    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });


    const delivery = 5000;

    const total = subtotal + delivery;


    document.getElementById("payment-total")
        .textContent = formatMoney(total);


    const orderNumber =
        "#JFS" +
        Math.floor(1000 + Math.random() * 9000);


    document.getElementById("order-number")
        .textContent = orderNumber;


    document.getElementById("success-order-number")
        .textContent = orderNumber;


    localStorage.setItem(
        "orderNumber",
        orderNumber
    );


    showPage("payment");

}


/* =========================
   PAYMENT METHOD
========================= */

document.addEventListener("change", function(event) {

    if (
        event.target.name === "payment"
    ) {

        const cardFields =
            document.getElementById("card-fields");


        if (
            event.target.value === "card"
        ) {

            cardFields.style.display = "block";

        } else {

            cardFields.style.display = "none";

        }

    }

});


/* =========================
   COMPLETE PAYMENT
========================= */

function completePayment() {

    if (cart.length === 0) {

        showPage("parts");

        return;

    }


    showPage("success");


    cart = [];

    updateCartCount();

}


/* =========================
   CONTACT FORM
========================= */

function sendMessage(event) {

    event.preventDefault();

    alert(
        "Thank you. Your message has been received."
    );

    event.target.reset();

}


/* =========================
   INITIAL LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadHomeProducts();

        renderProducts(
            products,
            "all-products"
        );

        updateCartCount();

    }
);