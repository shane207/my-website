// Products Management System for TechStart Digital Ecosystem
// Handles XML/JSON product data with dynamic pricing and categories

// Product data structure
const productData = {
    info: {
        company: "TechStart Digital Solutions",
        lastUpdated: "2024-01-15",
        version: "1.0.0"
    },
    categories: [
        {
            id: "web",
            name: "Web Development",
            description: "Complete web development solutions and services"
        },
        {
            id: "mobile",
            name: "Mobile Applications",
            description: "Cross-platform mobile app development"
        },
        {
            id: "api",
            name: "API Services",
            description: "RESTful APIs and system integrations"
        }
    ],
    products: [
        {
            id: 1,
            name: "Web Development Package",
            description: "Complete web development solution with modern frameworks including React, Node.js, and MongoDB",
            category: "web",
            price: 2999.00,
            currency: "USD",
            image: "fas fa-code",
            tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
            features: [
                "Responsive Design",
                "SEO Optimization",
                "Database Integration",
                "User Authentication",
                "Payment Processing"
            ],
            availability: "In Stock",
            rating: 4.8,
            reviews: 127
        },
        {
            id: 2,
            name: "Mobile App Development",
            description: "Cross-platform mobile app development using React Native for iOS and Android",
            category: "mobile",
            price: 3499.00,
            currency: "USD",
            image: "fas fa-mobile-alt",
            tags: ["React Native", "iOS", "Android", "Cross-platform", "App Store"],
            features: [
                "iOS & Android Support",
                "Native Performance",
                "Push Notifications",
                "Offline Capability",
                "App Store Deployment"
            ],
            availability: "In Stock",
            rating: 4.9,
            reviews: 89
        },
        {
            id: 3,
            name: "API Integration Service",
            description: "RESTful API development and third-party integrations for seamless data flow",
            category: "api",
            price: 1999.00,
            currency: "USD",
            image: "fas fa-plug",
            tags: ["REST API", "Node.js", "Express", "MongoDB", "Authentication"],
            features: [
                "RESTful Architecture",
                "JWT Authentication",
                "Rate Limiting",
                "API Documentation",
                "Third-party Integrations"
            ],
            availability: "In Stock",
            rating: 4.7,
            reviews: 156
        },
        {
            id: 4,
            name: "E-commerce Solution",
            description: "Complete e-commerce platform with payment integration and inventory management",
            category: "web",
            price: 4999.00,
            currency: "USD",
            image: "fas fa-shopping-cart",
            tags: ["E-commerce", "Payment", "Inventory", "Analytics", "CMS"],
            features: [
                "Product Management",
                "Payment Gateway Integration",
                "Order Processing",
                "Inventory Tracking",
                "Analytics Dashboard"
            ],
            availability: "In Stock",
            rating: 4.9,
            reviews: 203
        },
        {
            id: 5,
            name: "Cloud Migration Service",
            description: "Migrate your applications to cloud platforms with zero downtime",
            category: "api",
            price: 2499.00,
            currency: "USD",
            image: "fas fa-cloud",
            tags: ["AWS", "Azure", "Google Cloud", "DevOps", "Migration"],
            features: [
                "Zero Downtime Migration",
                "Cloud Architecture Design",
                "Security Implementation",
                "Performance Optimization",
                "24/7 Support"
            ],
            availability: "In Stock",
            rating: 4.6,
            reviews: 78
        },
        {
            id: 6,
            name: "UI/UX Design Package",
            description: "Modern user interface and experience design with prototyping",
            category: "web",
            price: 1799.00,
            currency: "USD",
            image: "fas fa-paint-brush",
            tags: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design System"],
            features: [
                "User Research",
                "Wireframing",
                "Prototyping",
                "Design System",
                "Usability Testing"
            ],
            availability: "In Stock",
            rating: 4.8,
            reviews: 94
        },
        {
            id: 7,
            name: "Progressive Web App",
            description: "Modern PWA with offline capabilities and app-like experience",
            category: "web",
            price: 2299.00,
            currency: "USD",
            image: "fas fa-globe",
            tags: ["PWA", "Service Workers", "Offline", "Push Notifications", "Responsive"],
            features: [
                "Offline Functionality",
                "Push Notifications",
                "App-like Experience",
                "Cross-platform",
                "Fast Loading"
            ],
            availability: "In Stock",
            rating: 4.7,
            reviews: 112
        },
        {
            id: 8,
            name: "AI Integration Service",
            description: "Integrate artificial intelligence and machine learning capabilities",
            category: "api",
            price: 3999.00,
            currency: "USD",
            image: "fas fa-brain",
            tags: ["AI", "Machine Learning", "Python", "TensorFlow", "API"],
            features: [
                "Machine Learning Models",
                "Natural Language Processing",
                "Image Recognition",
                "Predictive Analytics",
                "Custom AI Solutions"
            ],
            availability: "In Stock",
            rating: 4.9,
            reviews: 67
        }
    ]
};

// Dynamic pricing system
class PricingEngine {
    constructor() {
        this.basePrices = new Map();
        this.discounts = new Map();
        this.currencyRates = {
            'USD': 1.0,
            'EUR': 0.85,
            'GBP': 0.73,
            'CAD': 1.35,
            'AUD': 1.45
        };
        this.initializePricing();
    }

    initializePricing() {
        // Set base prices
        productData.products.forEach(product => {
            this.basePrices.set(product.id, product.price);
        });

        // Set seasonal discounts
        this.discounts.set('web', 0.15); // 15% off web development
        this.discounts.set('mobile', 0.10); // 10% off mobile apps
        this.discounts.set('api', 0.20); // 20% off API services
    }

    calculatePrice(productId, currency = 'USD') {
        const product = productData.products.find(p => p.id === productId);
        if (!product) return 0;

        let price = this.basePrices.get(productId);
        
        // Apply category discount
        const discount = this.discounts.get(product.category) || 0;
        price = price * (1 - discount);
        
        // Convert currency
        const rate = this.currencyRates[currency] || 1.0;
        price = price * rate;
        
        return Math.round(price * 100) / 100;
    }

    getFormattedPrice(productId, currency = 'USD') {
        const price = this.calculatePrice(productId, currency);
        const symbol = this.getCurrencySymbol(currency);
        return `${symbol}${price.toLocaleString()}`;
    }

    getCurrencySymbol(currency) {
        const symbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'CAD': 'C$',
            'AUD': 'A$'
        };
        return symbols[currency] || '$';
    }
}

// Initialize pricing engine
const pricingEngine = new PricingEngine();

// Shopping Cart System
class ShoppingCart {
    constructor() {
        this.items = [];
        this.currency = 'USD';
        this.taxRate = 0.10; // 10% tax
    }

    addItem(productId, quantity = 1) {
        const product = productData.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const calculatedPrice = pricingEngine.calculatePrice(productId, this.currency);
            console.log('Adding item to cart:', product.name, 'Price:', calculatedPrice, 'Currency:', this.currency);
            this.items.push({
                id: product.id,
                name: product.name,
                price: calculatedPrice,
                originalPrice: product.price,
                quantity: quantity,
                image: product.image,
                category: product.category
            });
        }
        
        console.log('Cart items after add:', this.items);
        this.updateCartDisplay();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.updateCartDisplay();
            }
        }
    }

    clearCart() {
        this.items = [];
        this.updateCartDisplay();
    }

    getSubtotal() {
        const subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        console.log('Cart subtotal calculation:', this.items, 'Subtotal:', subtotal);
        return subtotal;
    }

    getTax() {
        const tax = this.getSubtotal() * this.taxRate;
        console.log('Tax calculation:', tax);
        return tax;
    }

    getTotal() {
        const total = this.getSubtotal() + this.getTax();
        console.log('Total calculation:', total);
        return total;
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTax = document.getElementById('cartTax');
        const cartTotal = document.getElementById('cartTotal');
        const emptyCart = cartItems.querySelector('.empty-cart');

        console.log('Updating cart display with items:', this.items);

        if (this.items.length === 0) {
            // Show empty cart message
            if (emptyCart) {
                emptyCart.style.display = 'block';
            }
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <small>Add some products to get started!</small>
                </div>
            `;
        } else {
            // Hide empty cart message and show items
            if (emptyCart) {
                emptyCart.style.display = 'none';
            }
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <i class="${item.image}"></i>
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-category">${item.category}</p>
                        <div class="cart-item-price">${pricingEngine.getCurrencySymbol(this.currency)}${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cart.removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update totals
        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const total = this.getTotal();

        cartSubtotal.textContent = pricingEngine.getCurrencySymbol(this.currency) + subtotal.toFixed(2);
        cartTax.textContent = pricingEngine.getCurrencySymbol(this.currency) + tax.toFixed(2);
        cartTotal.textContent = pricingEngine.getCurrencySymbol(this.currency) + total.toFixed(2);

        console.log('Cart totals updated - Subtotal:', subtotal, 'Tax:', tax, 'Total:', total);

        // Update cart badge if exists
        this.updateCartBadge();
    }

    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    setCurrency(currency) {
        this.currency = currency;
        // Update prices for all items
        this.items.forEach(item => {
            item.price = pricingEngine.calculatePrice(item.id, currency);
        });
        this.updateCartDisplay();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Product management functions
function loadProductsFromData() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    
    productData.products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);
    
    const currentPrice = pricingEngine.getFormattedPrice(product.id);
    const originalPrice = pricingEngine.getFormattedPrice(product.id, 'USD');
    const hasDiscount = pricingEngine.discounts.get(product.category) > 0;
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
            ${hasDiscount ? '<div class="discount-badge">Sale!</div>' : ''}
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-pricing">
            <span class="product-price">${currentPrice}</span>
            ${hasDiscount ? `<span class="original-price">${originalPrice}</span>` : ''}
        </div>
        <div class="product-rating">
            <div class="stars">
                ${generateStars(product.rating)}
            </div>
            <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="product-tags">
            ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
        </div>
        <div class="product-actions">
            <button class="btn-primary" onclick="viewProduct(${product.id})">View Details</button>
            <button class="btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = Array.from(filterButtons).find(btn => 
        btn.textContent.toLowerCase().includes(category.toLowerCase()) || 
        (category === 'all' && btn.textContent.toLowerCase().includes('all'))
    );
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Filter products
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
        }
    });
    
    // Update product count
    updateProductCount(category);
}

function updateProductCount(category) {
    const visibleProducts = document.querySelectorAll('.product-card[style*="block"], .product-card:not([style*="none"])');
    const countElement = document.getElementById('productCount');
    
    if (countElement) {
        countElement.textContent = `${visibleProducts.length} products found`;
    }
}

function viewProduct(productId) {
    const product = productData.products.find(p => p.id === productId);
    if (!product) return;
    
    // Create product modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeProductModal()">&times;</span>
            <div class="product-detail">
                <div class="product-image-large">
                    <i class="${product.image}"></i>
                </div>
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <div class="product-pricing">
                        <span class="product-price">${pricingEngine.getFormattedPrice(product.id)}</span>
                    </div>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="product-features">
                        <h4>Features:</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="product-actions">
                        <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                        <button class="btn-secondary" onclick="closeProductModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('fade-in');
}

function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
    }
}

function addToCart(productId) {
    const success = cart.addItem(productId, 1);
    if (success) {
        const product = productData.products.find(p => p.id === productId);
        showNotification(`${product.name} added to cart!`, 'success');
        
        // Auto-expand cart if it's collapsed
        const cartContent = document.getElementById('cartContent');
        if (cartContent && cartContent.style.display === 'none') {
            cartContent.style.display = 'block';
            document.getElementById('cartToggleIcon').className = 'fas fa-chevron-down';
        }
    }
}

// Cart control functions
function toggleCart() {
    const cartContent = document.getElementById('cartContent');
    const toggleIcon = document.getElementById('cartToggleIcon');
    
    if (cartContent.style.display === 'none') {
        cartContent.style.display = 'block';
        toggleIcon.className = 'fas fa-chevron-down';
    } else {
        cartContent.style.display = 'none';
        toggleIcon.className = 'fas fa-chevron-up';
    }
}

function clearCart() {
    if (cart.items.length === 0) {
        showNotification('Cart is already empty!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear all items from your cart?')) {
        cart.clearCart();
        showNotification('Cart cleared successfully!', 'success');
    }
}

function checkout() {
    if (cart.items.length === 0) {
        showNotification('Your cart is empty! Add some products first.', 'error');
        return;
    }
    
    const total = cart.getTotal();
    const itemCount = cart.getItemCount();
    
    showNotification(`Checkout initiated! ${itemCount} items totaling ${pricingEngine.getCurrencySymbol(cart.currency)}${total.toFixed(2)}`, 'success');
    
    // In a real application, this would redirect to payment processing
    console.log('Checkout:', {
        items: cart.items,
        subtotal: cart.getSubtotal(),
        tax: cart.getTax(),
        total: total,
        currency: cart.currency
    });
}

// Currency conversion
function changeCurrency(currency) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(card => {
        const productId = parseInt(card.getAttribute('data-id'));
        const priceElement = card.querySelector('.product-price');
        const originalPriceElement = card.querySelector('.original-price');
        
        if (priceElement) {
            priceElement.textContent = pricingEngine.getFormattedPrice(productId, currency);
        }
        
        if (originalPriceElement) {
            originalPriceElement.textContent = pricingEngine.getFormattedPrice(productId, 'USD');
        }
    });
    
    // Update cart currency
    cart.setCurrency(currency);
}

// Search products
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        const tags = Array.from(product.querySelectorAll('.product-tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(searchTerm) || 
                      description.includes(searchTerm) || 
                      tags.some(tag => tag.includes(searchTerm));
        
        product.style.display = matches ? 'block' : 'none';
    });
    
    updateProductCount('search');
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProductsFromData();
    
    // Add search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
    
    // Add currency selector
    const currencySelect = document.getElementById('currencySelect');
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            changeCurrency(this.value);
        });
    }
});

// Export functions for global access
window.loadProductsFromData = loadProductsFromData;
window.filterProducts = filterProducts;
window.viewProduct = viewProduct;
window.closeProductModal = closeProductModal;
window.addToCart = addToCart;
window.changeCurrency = changeCurrency;
window.searchProducts = searchProducts;
window.toggleCart = toggleCart;
window.clearCart = clearCart;
window.checkout = checkout;
window.cart = cart;
