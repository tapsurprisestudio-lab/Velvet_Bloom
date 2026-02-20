// ========================================
// Velvet Bloom Flowers - JavaScript
// ========================================

// Product Data
const products = [
    {
        id: 1,
        image: 'https://i.imgur.com/M12Hbzf.jpeg',
        nameEn: 'Classic Red Satin Bouquet',
        nameAr: 'باقة ساتان حمراء كلاسيكية',
        tag: 'Best Seller ✨'
    },
    {
        id: 2,
        image: 'https://i.imgur.com/Ecup9L2.jpeg',
        nameEn: 'Luxury Rose Box (Red & Pink)',
        nameAr: 'بوكس ورد فاخر (أحمر ووردي)',
        tag: 'Luxury Box 💎'
    },
    {
        id: 3,
        image: 'https://i.imgur.com/FDyOE79.jpeg',
        nameEn: 'Heart Rose Arrangement',
        nameAr: 'قلب الورد الساتان',
        tag: 'Love Edition ❤️'
    },
    {
        id: 4,
        image: 'https://i.imgur.com/J9qnR3z.jpeg',
        nameEn: 'Baby Arrival Bouquet',
        nameAr: 'باقة قدوم مولود',
        tag: 'Baby 🍼'
    },
    {
        id: 5,
        image: 'https://i.imgur.com/7qDyG90.jpeg',
        nameEn: 'Graduation Special Bouquet',
        nameAr: 'باقة تخرج مميزة',
        tag: 'Graduation 🎓'
    },
    {
        id: 6,
        image: 'https://i.imgur.com/pPjtLbP.jpeg',
        nameEn: 'Deluxe Combo (Bouquet + Chocolate + Wrapping)',
        nameAr: 'باقة + شوكولاتة + تغليف فاخر',
        tag: 'Gift Set 🎁'
    }
];

// Cart State
let cart = [];
let currentLang = 'en';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const checkoutBtn = document.getElementById('checkoutBtn');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;

// ========================================
// Language Functions
// ========================================

function setLanguage(lang) {
    currentLang = lang;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.setAttribute('dir', dir);
    html.setAttribute('lang', lang);
    
    // Update language toggle button
    const langEn = document.querySelector('.lang-en');
    const langAr = document.querySelector('.lang-ar');
    
    if (lang === 'ar') {
        langEn.style.opacity = '0.5';
        langAr.style.opacity = '1';
    } else {
        langEn.style.opacity = '1';
        langAr.style.opacity = '0.5';
    }
    
    // Update all translatable elements
    updateTranslations();
    
    // Re-render products and cart with new language
    renderProducts();
    renderCart();
}

function updateTranslations() {
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
}

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
});

// ========================================
// Product Functions
// ========================================

function getProductName(product) {
    return currentLang === 'ar' ? product.nameAr : product.nameEn;
}

function getPriceText() {
    return currentLang === 'ar' ? 'السعر عند الطلب 💌' : 'Price via DM 💌';
}

function getAddToCartText() {
    return currentLang === 'ar' ? 'أضيفي للسلة' : 'Add to Cart';
}

function renderProducts() {
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card" data-index="${index}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${getProductName(product)}" class="product-image" loading="lazy">
                <span class="product-tag">${product.tag}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${getProductName(product)}</h3>
                <p class="product-price">${getPriceText()}</p>
                <div class="quantity-stepper">
                    <button class="qty-btn" onclick="updateQty(${product.id}, -1)">−</button>
                    <span class="qty-value" id="qty-${product.id}">1</span>
                    <button class="qty-btn" onclick="updateQty(${product.id}, 1)">+</button>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">${getAddToCartText()}</button>
            </div>
        </div>
    `).join('');
    
    // Trigger scroll animations for new products
    observeElements();
}

// ========================================
// Cart Functions
// ========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qty = parseInt(document.getElementById(`qty-${productId}`).textContent) || 1;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({
            id: productId,
            nameEn: product.nameEn,
            nameAr: product.nameAr,
            image: product.image,
            qty: qty
        });
    }
    
    updateCartBadge();
    renderCart();
    openCart();
}

function updateQty(productId, change) {
    const qtyEl = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyEl.textContent) || 1;
    currentQty = Math.max(1, currentQty + change);
    qtyEl.textContent = currentQty;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>${currentLang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${getProductName(item)}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${getProductName(item)}</h4>
                <p class="cart-item-qty">${currentLang === 'ar' ? 'الكمية' : 'Qty'}: ${item.qty}</p>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    ${currentLang === 'ar' ? 'إزالة' : 'Remove'}
                </button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Cart Event Listeners
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ========================================
// Checkout Functions
// ========================================

function generateDMMessage() {
    const isArabic = currentLang === 'ar';
    
    let message;
    
    if (isArabic) {
        message = `مرحبًا 🌸
أرغب في طلب المنتجات التالية من Velvet Bloom Flowers:

`;
        cart.forEach(item => {
            message += `• ${item.nameAr} x ${item.qty}\n`;
        });
        message += `
إضافة شوكولاتة؟ (نعم/لا):
تغليف فاخر؟ (نعم/لا):

السعر: أرجو تأكيد السعر في الرسائل 💌

الاسم:
العنوان:
رقم الهاتف:`;
    } else {
        message = `Hi 🌸
I'd like to order from Velvet Bloom Flowers:

`;
        cart.forEach(item => {
            message += `• ${item.nameEn} x ${item.qty}\n`;
        });
        message += `
Add chocolates? (Yes/No):
Luxury wrapping? (Yes/No):

Price: Please confirm in DM 💌

Name:
Address:
Phone:`;
    }
    
    return message;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast();
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast();
    }
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function checkout() {
    if (cart.length === 0) {
        return;
    }
    
    const message = generateDMMessage();
    
    // Copy message to clipboard
    copyToClipboard(message);
    
    // Open Instagram DM
    setTimeout(() => {
        window.open('https://www.instagram.com/direct/new/', '_blank');
    }, 500);
}

copyBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const message = generateDMMessage();
    copyToClipboard(message);
});

checkoutBtn.addEventListener('click', checkout);

// ========================================
// Scroll Animations
// ========================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe product cards and why cards
    document.querySelectorAll('.product-card, .why-card').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

// Also observe sections
function observeSections() {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.products, .why-section').forEach(section => {
        section.classList.add('fade-section');
        sectionObserver.observe(section);
    });
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLanguage('en');
    
    // Render products
    renderProducts();
    
    // Observe elements for scroll animations
    setTimeout(() => {
        observeElements();
        observeSections();
    }, 100);
    
    // Smooth scroll for CTA button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Make functions available globally
window.updateQty = updateQty;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
