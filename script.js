// ========================================
// Velvet Bloom Flowers - JavaScript V2
// ========================================

// Product Data
const products = [
    {
        id: 1,
        image: 'https://i.imgur.com/M12Hbzf.jpeg',
        nameEn: 'Classic Red Satin Bouquet',
        nameAr: 'باقة ساتان حمراء كلاسيكية',
        tag: 'Best Seller ✨',
        price: 1800
    },
    {
        id: 2,
        image: 'https://i.imgur.com/Ecup9L2.jpeg',
        nameEn: 'Luxury Rose Box (Red & Pink)',
        nameAr: 'بوكس ورد فاخر (أحمر ووردي)',
        tag: 'Luxury Box 💎',
        price: 2000
    },
    {
        id: 3,
        image: 'https://i.imgur.com/FDyOE79.jpeg',
        nameEn: 'Heart Rose Arrangement',
        nameAr: 'قلب الورد الساتان',
        tag: 'Love Edition ❤️',
        price: 2500
    },
    {
        id: 4,
        image: 'https://i.imgur.com/J9qnR3z.jpeg',
        nameEn: 'Baby Arrival Bouquet',
        nameAr: 'باقة قدوم مولود',
        tag: 'Baby 🍼',
        price: 2500
    },
    {
        id: 5,
        image: 'https://i.imgur.com/7qDyG90.jpeg',
        nameEn: 'Graduation Special Bouquet',
        nameAr: 'باقة تخرج مميزة',
        tag: 'Graduation 🎓',
        price: null
    },
    {
        id: 6,
        image: 'https://i.imgur.com/pPjtLbP.jpeg',
        nameEn: 'Deluxe Combo (Bouquet + Chocolate + Wrapping)',
        nameAr: 'باقة + شوكولاتة + تغليف فاخر',
        tag: 'Gift Set 🎁',
        price: null
    },
    {
        id: 7,
        image: 'https://i.imgur.com/hTYNG5d.png',
        nameEn: 'Premium Mauve Bouquet',
        nameAr: 'باقة بنفسجي فاخر',
        tag: 'New 🌸',
        price: 1500
    },
    {
        id: 8,
        image: 'https://i.imgur.com/awp259b.png',
        nameEn: 'Elegant Rose Bouquet',
        nameAr: 'باقة ورود أنيقة',
        tag: 'New 🌹',
        price: 1800
    },
    {
        id: 9,
        image: 'https://i.imgur.com/yFFf6rs.jpeg',
        nameEn: 'Wrapped Bouquet (Beautiful Packaging)',
        nameAr: 'باقة مغلفة (تغليف جميل)',
        tag: 'New 🎀',
        price: 800
    },
    {
        id: 10,
        image: 'https://i.imgur.com/YQD1Kbz.png',
        nameEn: 'Pink Roses Bouquet',
        nameAr: 'باقة ورود وردي',
        tag: 'New 💗',
        price: 1500
    },
    {
        id: 11,
        image: 'https://i.imgur.com/EGSpwv8.png',
        nameEn: 'Pink Wrap + White & Pink Roses',
        nameAr: 'وردي + ابيض ووردي',
        tag: 'New ✨',
        price: 2300
    },
    {
        id: 12,
        image: 'https://i.imgur.com/v1KL5iv.png',
        nameEn: 'Luxury Bouquet (Special Edition)',
        nameAr: 'باقة فاخرة (إصدار خاص)',
        tag: 'Special 🏆',
        price: 2000
    },
    {
        id: 13,
        image: 'https://i.imgur.com/CtLrySx.png',
        nameEn: 'Pink Rose Box',
        nameAr: 'بوكس ورود وردي',
        tag: 'Luxury 💎',
        price: 3000
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

// Modal Elements
const modalOverlay = document.getElementById('modalOverlay');
const checkoutModal = document.getElementById('checkoutModal');
const modalClose = document.getElementById('modalClose');
const modalCopyBtn = document.getElementById('modalCopyBtn');
const modalIgBtn = document.getElementById('modalIgBtn');

// Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

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
// Navigation Functions
// ========================================

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });
});

// Active nav link on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Product Functions
// ========================================

function getProductName(product) {
    return currentLang === 'ar' ? product.nameAr : product.nameEn;
}

function getPriceText(product) {
    if (product.price) {
        return currentLang === 'ar' ? `${product.price} دج` : `${product.price} DA`;
    }
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
                <p class="product-price">${getPriceText(product)}</p>
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
            price: product.price,
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
                ${item.price ? `<p class="cart-item-price">${item.price} DA</p>` : ''}
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
    let totalPrice = 0;
    let hasPrice = false;
    
    if (isArabic) {
        message = `مرحبًا 🌸
أرغب في طلب المنتجات التالية من Velvet Bloom Flowers:

`;
        cart.forEach(item => {
            message += `• ${item.nameAr} x ${item.qty}`;
            if (item.price) {
                message += ` - ${item.price * item.qty} DA`;
                totalPrice += item.price * item.qty;
                hasPrice = true;
            }
            message += `\n`;
        });
        message += `
إضافة شوكولاتة؟ (نعم/لا):
تغليف فاخر؟ (نعم/لا):

العملة: دج
${hasPrice ? `الإجمالي: ${totalPrice} DA` : 'السعر: أرجو تأكيد السعر في الرسائل 💌'}

الاسم:
رقم الهاتف:
الولاية:
ملاحظة:`;
    } else {
        message = `Hi 🌸
I'd like to order from Velvet Bloom Flowers:

`;
        cart.forEach(item => {
            message += `• ${item.nameEn} x ${item.qty}`;
            if (item.price) {
                message += ` - ${item.price * item.qty} DA`;
                totalPrice += item.price * item.qty;
                hasPrice = true;
            }
            message += `\n`;
        });
        message += `
Add chocolates? (Yes/No):
Luxury wrapping? (Yes/No):

Currency: DZD
${hasPrice ? `Total: ${totalPrice} DA` : 'Price: Please confirm in DM 💌'}

Name:
Phone:
State:
Note:`;
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

// Checkout Modal Functions
function openCheckoutModal() {
    if (cart.length === 0) return;
    checkoutModal.classList.add('open');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function handleCheckout() {
    if (cart.length === 0) return;
    openCheckoutModal();
}

function handleModalCopy() {
    const message = generateDMMessage();
    copyToClipboard(message);
}

function handleModalIG() {
    window.open('https://www.instagram.com/direct/new/', '_blank');
}

// Event Listeners
checkoutBtn.addEventListener('click', handleCheckout);
copyBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const message = generateDMMessage();
    copyToClipboard(message);
});

modalClose.addEventListener('click', closeCheckoutModal);
modalOverlay.addEventListener('click', closeCheckoutModal);
modalCopyBtn.addEventListener('click', handleModalCopy);
modalIgBtn.addEventListener('click', handleModalIG);

// ========================================
// Scroll Animations
// ========================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe product cards and why cards
    document.querySelectorAll('.product-card, .why-card, .value-card, .step-card').forEach(el => {
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
    
    document.querySelectorAll('.products, .about, .reviews, .howto, .contact').forEach(section => {
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
