import './style.css'

const app = document.querySelector('#app')

// State
let cart = []
let activeFilter = 'all'

// Check URL params for filter
const urlParams = new URLSearchParams(window.location.search)
const filterParam = urlParams.get('filter')
if (filterParam && ['all', 'men', 'women', 'performance', 'urban', 'designer'].includes(filterParam)) {
  activeFilter = filterParam
}

const IMG = {
  a: '/assets/stryde_collection_1_1772106195417.png',
  b: '/assets/stryde_collection_2_1772106215613.png',
  c: '/assets/stryde_collection_3_1772106280236.png',
  d: '/assets/stryde_collection_4_1772106300338.png',
}

const products = [
  // ---- STRYDE SIGNATURE (House Brand) ----
  { id: 101, name: 'STRYDE Vapor Bolt', category: 'performance', gender: 'men', desc: 'Flagship speed with Electric Volt tech', img: '/images/stryde_vapor_bolt.png', imgFilter: '', tag: 'Flagship', price: '₹ 24,999', specs: { weight: '180g', grip: 'Aero-Max', breath: '10/10' } },
  { id: 102, name: 'STRYDE Phantom Stealth', category: 'urban', gender: 'men', desc: 'Midnight matte minimalist upper', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(0.5) saturate(0)', tag: 'Stealth', price: '₹ 19,499', specs: { weight: '240g', grip: 'City-Lock', breath: '8/10' } },
  { id: 103, name: 'STRYDE Apex Limitless', category: 'designer', gender: 'women', desc: 'The future of translucent comfort', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', imgFilter: 'hue-rotate(180deg) brightness(1.2)', tag: 'Limited', price: '₹ 29,999', specs: { weight: '195g', grip: 'Glow-Pro', breath: '10/10' } },

  // ---- NIKE & PREMIUM (Audit Corrected) ----
  { id: 1, name: 'Adidas Ultraboost 5X', category: 'urban', gender: 'men', desc: 'The elite energy return icon', img: '/images/adidas_ultraboost_white_1772276996789.png', imgFilter: '', tag: 'Classic', price: '₹ 17,999', specs: { weight: '290g', grip: 'Continental™', breath: '10/10' } },
  { id: 2, name: 'Adidas NMD_R1 V3', category: 'performance', gender: 'men', desc: 'Urban exploration redefined', img: '/images/adidas_nmd_black_red_1772277025606.png', imgFilter: '', tag: 'Neon', price: '₹ 14,999', specs: { weight: '280g', grip: 'Rubber', breath: '9/10' } },
  { id: 3, name: 'Nike Premium LV Edition', category: 'performance', gender: 'men', desc: 'Luxury runway comfort', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800', imgFilter: 'grayscale(0.3)', tag: 'Stealth', price: '₹ 17,999', specs: { weight: '265g', grip: 'Continental™', breath: '10/10' } },
  { id: 4, name: 'Adidas Edge Lux W', category: 'performance', gender: 'women', desc: 'Precision fit for endurance', img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800', imgFilter: '', tag: 'Women', price: '₹ 8,999', specs: { weight: '210g', grip: 'High', breath: '9/10' } },
  { id: 5, name: 'Adidas Superstar Luxe', category: 'urban', gender: 'women', desc: 'Timeless court heritage', img: '/images/adidas_superstar_classic_1772277042110.png', imgFilter: '', tag: 'Icon', price: '₹ 11,499', specs: { weight: '310g', grip: 'Rubber', breath: '7/10' } },
  { id: 6, name: 'Adidas Terrex Trail', category: 'performance', gender: 'men', desc: 'Rugged mountain response', img: '/images/adidas_terrex_trail_1772277061522.png', imgFilter: '', tag: 'Rugged', price: '₹ 12,999', specs: { weight: '340g', grip: 'Traxion', breath: '8/10' } },
  { id: 7, name: 'NB 530 Desert Style', category: 'designer', gender: 'men', desc: 'Avant-garde silhouette', img: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(0.9)', tag: 'Designer', price: '₹ 28,999', specs: { weight: '340g', grip: 'Boost', breath: '8/10' } },
  { id: 8, name: 'Adidas Forum 84 Low', category: 'designer', gender: 'men', desc: 'Vintage basketball prestige', img: '/images/adidas_forum_blue_white_1772277077899.png', imgFilter: '', tag: 'Vintage', price: '₹ 12,999', specs: { weight: '310g', grip: 'Rubber', breath: '7/10' } },

  // ---- NIKE & NB (Audit Corrected) ----
  { id: 9, name: 'Nike Air Max Walk', category: 'performance', gender: 'men', desc: 'Hyper-pillar luxury cushioning', img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=800', imgFilter: '', tag: 'Comfort', price: '₹ 6,499', specs: { weight: '220g', grip: 'Hyper Pillar', breath: '10/10' } },
  { id: 10, name: 'NB 1906 Elite Mesh', category: 'performance', gender: 'women', desc: 'Breathable elite performance', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(1.05)', tag: 'Pro', price: '₹ 7,499', specs: { weight: '240g', grip: 'Soft-Flex', breath: '10/10' } },
  { id: 11, name: 'Nike Dunk High Retro', category: 'urban', gender: 'women', desc: 'Elevated retro aesthetics', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800', imgFilter: 'saturate(1.3)', tag: 'Retro', price: '₹ 8,499', specs: { weight: '310g', grip: 'Solid', breath: '7/10' } },
  { id: 12, name: 'Nike Court Vision', category: 'urban', gender: 'men', desc: 'Clean minimalist urbanism', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(0.95)', tag: 'Street', price: '₹ 6,999', specs: { weight: '295g', grip: 'Traction', breath: '8/10' } },
  { id: 13, name: 'Vans Old Skool Max', category: 'performance', gender: 'men', desc: 'High-rebound impact guard', img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800', imgFilter: 'contrast(1.1)', tag: 'Max', price: '₹ 9,499', specs: { weight: '330g', grip: 'Responsive', breath: '10/10' } },
  { id: 14, name: 'Nike SB Dunk Low', category: 'designer', gender: 'women', desc: 'Eco-conscious chic', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800', imgFilter: 'hue-rotate(45deg)', tag: 'Chic', price: '₹ 4,999', specs: { weight: '195g', grip: 'Light', breath: '10/10' } },
  { id: 15, name: 'Nike Blazer High', category: 'performance', gender: 'women', desc: 'No-hands security tech', img: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(1.05)', tag: 'Easy', price: '₹ 7,999', specs: { weight: '225g', grip: 'Dual', breath: '9/10' } },

  // ---- NIKE & SPECIALISTS (Audit Corrected) ----
  { id: 16, name: 'Nike Air Max Surge', category: 'performance', gender: 'men', desc: 'Bata urban walking tech', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', imgFilter: 'hue-rotate(330deg)', tag: 'Durable', price: '₹ 3,999', specs: { weight: '280g', grip: 'Rubber', breath: '8/10' } },
  { id: 17, name: 'Nike Air Max Rise', category: 'performance', gender: 'men', desc: 'Explosive liftoff power', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(0.8)', tag: 'Speed', price: '₹ 4,499', specs: { weight: '250g', grip: 'High', breath: '10/10' } },
  { id: 21, name: 'Nike Urban Squad Pro', category: 'designer', gender: 'women', desc: 'Future-forward silhouette', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', imgFilter: 'hue-rotate(260deg)', tag: 'Future', price: '₹ 5,999', specs: { weight: '220g', grip: 'City', breath: '8/10' } },
  { id: 18, name: 'Nike Air Visionary', category: 'urban', gender: 'women', desc: 'Minimalist grace runner', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800', imgFilter: 'saturate(1.3)', tag: 'Grace', price: '₹ 3,199', specs: { weight: '210g', grip: 'Med', breath: '9/10' } },
  { id: 19, name: 'Power Glide Luxe', category: 'performance', gender: 'women', desc: 'Aerodynamic performance', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', imgFilter: 'hue-rotate(90deg)', tag: 'Ultra', price: '₹ 3,799', specs: { weight: '190g', grip: 'High', breath: '10/10' } },
  { id: 20, name: 'Nike Aero Strike', category: 'urban', gender: 'men', desc: 'City-ready resilience', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', imgFilter: 'grayscale(0.5)', tag: 'Squad', price: '₹ 3,499', specs: { weight: '295g', grip: 'High', breath: '7/10' } },
  { id: 22, name: 'K-Swiss Trainer Dash', category: 'performance', gender: 'women', desc: 'High-cadence response', img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800', imgFilter: 'brightness(1.1)', tag: 'Dash', price: '₹ 3,299', specs: { weight: '205g', grip: 'Rugged', breath: '9/10' } }
]

function renderProducts() {
  let filtered = products
  if (activeFilter === 'men') filtered = products.filter(p => p.gender === 'men')
  else if (activeFilter === 'women') filtered = products.filter(p => p.gender === 'women')
  else if (activeFilter !== 'all') filtered = products.filter(p => p.category === activeFilter)

  return filtered.map(p => `
    <div class="product-card reveal-on-scroll" data-id="${p.id}">
      <img src="${p.img}" alt="${p.name}" style="filter:${p.imgFilter || ''}">
      <div class="product-info">
        <span class="product-tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p class="product-price">${p.price || '₹ 4,999'}</p>
        <button
          class="add-to-cart-btn card-order-btn"
          data-id="${p.id}"
          style="display:block; margin-top:1rem; padding:12px 20px; background:var(--accent); color:#000; border:none; font-weight:900; font-family:var(--font-heading); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; cursor:pointer; width:100%;">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('')
}

function renderCart() {
  const cartItems = document.querySelector('.cart-items')
  if (!cartItems) return

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center; color:#999; margin-top:2rem;">Your cart is empty.</p>'
    return
  }

  cartItems.innerHTML = cart.map(item => `
    <div style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:center;">
      <img src="${item.img}" style="width:80px; height:80px; object-fit:cover;">
      <div>
        <h4 style="font-family:var(--font-heading); font-size:0.9rem;">${item.name}</h4>
        <button class="remove-item" data-id="${item.id}" style="background:none; border:none; color:red; cursor:pointer; font-size:0.7rem; text-transform:uppercase;">Remove</button>
      </div>
    </div>
  `).join('')
}

app.innerHTML = `
  
  <header>
    <div class="logo-container">
      <img src="/assets/stryde_motion_logo_concept_1772106130468.png" class="logo-s" alt="Logo">
      <span class="brand-name">STRYDE</span>
    </div>
    <nav class="desktop-nav">
      <ul>
        <li><a href="#home" target="_blank">Home</a></li>
        <li><a href="#collections" target="_blank">Collections</a></li>
        <li><a href="#about" target="_blank">About</a></li>
        <li><a href="#contact" target="_blank" id="nav-store">Store</a></li>
      </ul>
    </nav>
    <div class="header-right" style="display:flex; gap:2rem; align-items:center;">
      <div class="header-contact" style="display:none;"> Vadodara </div>
      <button id="cart-toggle" style="background:none; border:none; cursor:pointer; position:relative;">
        <i data-lucide="shopping-bag"></i>
        <span id="cart-count" style="position:absolute; top:-5px; right:-10px; background:var(--accent); color:#000; font-size:0.6rem; width:18px; height:18px; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:bold;">0</span>
      </button>
      <button class="burger-menu" id="mobile-toggle"><i data-lucide="menu"></i></button>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div class="cart-overlay" id="mobile-overlay"></div>
  <div class="cart-drawer" id="mobile-drawer" style="left:-450px; right:auto;">
    <div class="cart-header">
      <h2 style="font-size:1.5rem;">STRYDE</h2>
      <button id="mobile-close" style="background:none; border:none; cursor:pointer;"><i data-lucide="x"></i></button>
    </div>
    <nav style="margin-top:2rem;">
      <ul style="list-style:none; display:flex; flex-direction:column; gap:2rem;">
         <li><a href="#home" class="mobile-link" target="_blank" style="font-size:2rem; font-family:var(--font-heading); text-decoration:none; color:#000;">HOME</a></li>
         <li><a href="#collections" class="mobile-link" target="_blank" style="font-size:2rem; font-family:var(--font-heading); text-decoration:none; color:#000;">SHOP</a></li>
         <li><a href="#about" class="mobile-link" target="_blank" style="font-size:2rem; font-family:var(--font-heading); text-decoration:none; color:#000;">ABOUT</a></li>
         <li><a href="#contact" class="mobile-link" target="_blank" style="font-size:2rem; font-family:var(--font-heading); text-decoration:none; color:#000;">VISIT</a></li>
      </ul>
    </nav>
  </div>

  <div class="cart-overlay" id="cart-overlay-main"></div>
  <div class="cart-drawer" id="cart-drawer-main">
    <div id="cart-content-view">
      <div class="cart-header">
        <h2 style="font-size:1.5rem;">Shopping Bag</h2>
        <button id="cart-close" style="background:none; border:none; cursor:pointer;"><i data-lucide="x"></i></button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-footer">
        <div style="display:flex; justify-content:space-between; margin-bottom:1rem; font-weight:bold; font-size:1.2rem;">
          <span>Total</span>
          <span id="cart-total">₹ 0</span>
        </div>
        <button class="checkout-btn" id="start-checkout">Secure Checkout</button>
      </div>
    </div>

    <!-- Checkout Flow -->
    <div id="checkout-view" style="display:none; transition:0.3s;">
      <button id="back-to-cart" style="background:none; border:none; cursor:pointer; margin-bottom:2rem; display:flex; align-items:center; gap:0.5rem; font-family:var(--font-heading); font-size:0.7rem;">
        <i data-lucide="arrow-left" style="width:14px;"></i> BACK TO BAG
      </button>
      
      <div id="step-shipping" class="checkout-step active">
        <h2 style="margin-bottom:1.5rem;">Shipping</h2>
        <input type="text" placeholder="Full Name" style="width:100%; padding:1rem; margin-bottom:1rem; border:1px solid #ddd;">
        <input type="text" placeholder="Address (O.P. Road, Vadodara...)" style="width:100%; padding:1rem; margin-bottom:1rem; border:1px solid #ddd;">
        <button class="checkout-btn" id="to-payment">Continue to Payment</button>
      </div>

      <div id="step-payment" class="checkout-step">
        <h2 style="margin-bottom:1.5rem;">Payment</h2>
        <div style="padding:1rem; border:1px solid var(--accent); margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
          <div>
             <span style="font-weight:bold;">UPI / CARD</span>
             <p style="font-size:0.7rem; color:#888;">Safe & Secure via STRYDE Pay</p>
          </div>
          <i data-lucide="shield-check" style="color:var(--accent);"></i>
        </div>
        <button class="checkout-btn" id="complete-order">Complete Order</button>
      </div>

      <div id="step-success" class="checkout-step">
        <div class="checkout-success">
          <i data-lucide="check-circle" style="width:60px; height:60px; color:var(--accent); margin-bottom:1.5rem;"></i>
          <h2>POWER DELIVERED</h2>
          <p style="margin-top:1rem; color:#888;">Your order has been placed. Welcome to the STRYDE squad.</p>
          <button class="checkout-btn" style="margin-top:2rem;" onclick="location.reload()">Back to Home</button>
        </div>
      </div>
    </div>
  </div>

  <main>
    <section class="hero" id="home">
      <img src="/assets/stryde_hero_shoe_1772106112022.png" class="hero-visual" alt="STRYDE">
      <div class="hero-content">
        <h1 class="bold-heading">STRYDE</h1>
        <h2>Walk Your Power</h2>
      </div>
    </section>

    <section id="collections">
      <h2 class="section-title">Collections</h2>
      <div class="filter-bar">
        <a href="?filter=all" target="_blank" class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All</a>
        <a href="?filter=men" target="_blank" class="filter-btn ${activeFilter === 'men' ? 'active' : ''}" data-filter="men">Men</a>
        <a href="?filter=women" target="_blank" class="filter-btn ${activeFilter === 'women' ? 'active' : ''}" data-filter="women">Women</a>
        <a href="?filter=performance" target="_blank" class="filter-btn ${activeFilter === 'performance' ? 'active' : ''}" data-filter="performance">Performance</a>
        <a href="?filter=urban" target="_blank" class="filter-btn ${activeFilter === 'urban' ? 'active' : ''}" data-filter="urban">Urban</a>
        <a href="?filter=designer" target="_blank" class="filter-btn ${activeFilter === 'designer' ? 'active' : ''}" data-filter="designer">Designer</a>
      </div>
      <div class="product-grid" id="product-grid-root">
        ${renderProducts()}
      </div>
    </section>

    <section id="about" style="background: #000; color: #fff;">
      <h2 class="section-title" style="color: #fff;">Why STRYDE?</h2>
      <div class="features">
        <div class="feature-item">
          <h3>Comfort</h3>
          <p>Engineered with dual-layer cloud foam for all-day endurance.</p>
        </div>
        <div class="feature-item">
          <h3>Durability</h3>
          <p>High-grade military mesh that withstands the urban grind.</p>
        </div>
        <div class="feature-item">
          <h3>Urban Design</h3>
          <p>Confidence-built silhouettes inspired by global streetwear.</p>
        </div>
      </div>
    </section>

    <section id="contact">
      <h2 class="section-title">Visit Vadodara</h2>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items:center;">
        <div>
          <p style="font-size:1.2rem; margin-bottom:1rem; font-weight:bold;">STRYDE Flagship Store</p>
          <p>O.P. Road, Vadodara, Gujarat, India</p>
          <p>Phone: +91 9824386467</p>
          <p style="margin-top:2rem;">
            Instagram: <a href="https://instagram.com/STRYDO_POWER" target="_blank" style="color:var(--primary); font-weight:bold;">@STRYDO_POWER</a>
          </p>
        </div>
        <div class="map-mockup">
          <div style="z-index:1; text-align:center;">
             <i data-lucide="map-pin" style="width:40px; height:40px; color:var(--accent);"></i>
             <p style="color:#fff; font-size:0.7rem; margin-top:1rem;">O.P. ROAD, VADODARA</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-content">
      <div>
        <div class="footer-logo brand-name">STRYDE</div>
        <p>Walk Your Power</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p>+91 9824386467</p>
        <p>Gujarat, India</p>
      </div>
      <div>
        <h4>Follow</h4>
        <a href="https://instagram.com/STRYDO_POWER" target="_blank" style="color:#fff; text-decoration:none;">Instagram</a>
      </div>
    </div>
    <p>&copy; 2026 STRYDE. Designed for the Bold.</p>
  </footer>

  <a href="https://wa.me/+919824386467" class="whatsapp-float" target="_blank">
    <i data-lucide="message-circle" style="width:30px; height:30px;"></i>
  </a>
`

// Icons
lucide.createIcons()

// Injected Phase 3 Content
const phase3and4Content = `
  <section id="testimonials">
    <h2 class="section-title">Power Stories</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card reveal-on-scroll">
        <p>"The comfort on these is unmatched. I walk through Vadodara every day, and STRYDE keeps my urban grind effortless."</p>
        <div class="testimonial-author">— Rahul M., Urban Runner</div>
      </div>
      <div class="testimonial-card reveal-on-scroll">
        <p>"Sleek, powerful, and bold. STRYDE isn't just a shoe; it's a statement of confidence."</p>
        <div class="testimonial-author">— Priya S., Designer</div>
      </div>
      <div class="testimonial-card reveal-on-scroll">
        <p>"Finally, a premium brand from Gujarat that rivals global giants. The quality is world-class."</p>
        <div class="testimonial-author">— Amit K., Athlete</div>
      </div>
    </div>
  </section>

  <section class="cta-banner">
    <h2 class="reveal-on-scroll">WALK YOUR POWER</h2>
    <a href="#collections" target="_blank" style="text-decoration:none;">
      <button class="checkout-btn" style="width:auto; padding: 1.5rem 4rem;">Shop Latest Drop</button>
    </a>
  </section>

  <section class="newsletter">
    <div class="newsletter-content reveal-on-scroll">
      <h3>JOIN THE SQUAD</h3>
      <p>Sign up for early drops, exclusive events, and the STRYDE community updates.</p>
      <div class="newsletter-form">
        <input type="email" placeholder="ENTER YOUR EMAIL">
        <button class="newsletter-btn">JOIN</button>
      </div>
    </div>
  </section>
`

const footerElement = document.querySelector('footer')
footerElement.insertAdjacentHTML('beforebegin', phase3and4Content)

// Quick View Modal Holder
const modalHTML = `
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close"><i data-lucide="x"></i></button>
      <img src="" class="modal-image" alt="Product">
      <div class="modal-details">
        <span class="product-tag">Performance</span>
        <h2 style="font-size:2.5rem; margin-bottom:1rem;"></h2>
        <div class="modal-price">₹ 4,999</div>
        <p class="modal-desc" style="color:#666; margin-bottom:2rem;"></p>
        
        <div class="tech-badges">
          <div class="tech-badge">
            <span class="tech-badge-val" id="spec-weight">240g</span>
            <span class="tech-badge-label">Weight</span>
          </div>
          <div class="tech-badge">
            <span class="tech-badge-val" id="spec-grip">High</span>
            <span class="tech-badge-label">Traction</span>
          </div>
          <div class="tech-badge">
            <span class="tech-badge-val" id="spec-breath">9/10</span>
            <span class="tech-badge-label">Breathing</span>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <p style="font-weight:bold; font-size:0.8rem; margin-bottom:1rem; text-transform:uppercase; letter-spacing:0.05em;">Select Size (UK)</p>
          <div id="size-selector" style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            ${[6, 7, 8, 9, 10, 11, 12].map(s => `
              <div
                class="size-tile"
                data-size="${s}"
                style="width:44px; height:44px; border:2px solid #ddd; display:flex; justify-content:center; align-items:center; cursor:pointer; font-size:0.85rem; font-weight:bold; border-radius:2px; transition:all 0.2s;">
                ${s}
              </div>
            `).join('')}
          </div>
          <p id="size-error" style="color:red; font-size:0.75rem; margin-top:0.5rem; display:none;">Please select a size to continue.</p>
        </div>
        <button class="modal-order-btn" id="modal-add-btn" style="padding:1.5rem; background:#000; color:#fff; border:none; font-family:var(--font-heading); text-transform:uppercase; cursor:pointer; font-size:1rem; letter-spacing:0.1em; width:100%;">Add to Bag — Order on WhatsApp 💬</button>
      </div>
    </div>
  </div>
`
document.body.insertAdjacentHTML('beforeend', modalHTML)

// Cart Drawer Logic
const cartToggle = document.querySelector('#cart-toggle')
const cartClose = document.querySelector('#cart-close')
const cartDrawer = document.querySelector('.cart-drawer')
const cartOverlay = document.querySelector('.cart-overlay')

// Modal Logic
const modalOverlay = document.querySelector('.modal-overlay')
const modalClose = document.querySelector('.modal-close')

function openModal(id) {
  const p = products.find(prod => prod.id === id)
  if (!p) return
  const modal = document.querySelector('.modal-overlay')
  modal.querySelector('h2').innerText = p.name
  modal.querySelector('.modal-desc').innerText = `Break barriers with the ${p.name}. Built for the urban terrain with ${p.specs.weight} lightweight engineering.`
  modal.querySelector('.modal-image').src = p.img
  modal.querySelector('#spec-weight').innerText = p.specs.weight
  modal.querySelector('#spec-grip').innerText = p.specs.grip
  modal.querySelector('#spec-breath').innerText = p.specs.breath
  // Store product data on the order button
  const addBtn = modal.querySelector('#modal-add-btn')
  addBtn.dataset.name = p.name
  addBtn.dataset.price = p.price || '₹ 4,999'
  // Reset sizes
  modal.querySelectorAll('.size-tile').forEach(t => {
    t.style.background = ''
    t.style.color = '#000'
    t.style.border = '2px solid #ddd'
  })
  if (modal.querySelector('#size-error')) modal.querySelector('#size-error').style.display = 'none'
  modal.classList.add('show')
  lucide.createIcons()
}

function closeModal() {
  document.querySelector('.modal-overlay').classList.remove('show')
}

document.querySelector('.modal-close').addEventListener('click', closeModal)
document.querySelector('.modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal-overlay')) closeModal()
})

function openCart() {
  document.querySelector('#cart-drawer-main').classList.add('open')
  document.querySelector('#cart-overlay-main').classList.add('show')
  renderCart()
  const total = cart.length * 4999
  const totalEl = document.querySelector('#cart-total')
  if (totalEl) totalEl.innerText = `₹ ${total.toLocaleString()}`
}

function closeCart() {
  document.querySelector('#cart-drawer-main').classList.remove('open')
  document.querySelector('#cart-overlay-main').classList.remove('show')
}

cartToggle.addEventListener('click', openCart)
cartClose.addEventListener('click', closeCart)
cartOverlay.addEventListener('click', closeCart)

// Filtering Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelector('.filter-btn.active').classList.remove('active')
    e.target.classList.add('active')
    activeFilter = e.target.dataset.filter
    document.querySelector('#product-grid-root').innerHTML = renderProducts()
    initScrollReveal()
  })
})

// Add to Cart Interaction
app.addEventListener('click', (e) => {
  const target = e.target

  if (target.classList.contains('card-order-btn')) {
    // Open modal for size selection first
    openModal(parseInt(target.dataset.id))
    return
  }

  if (target.classList.contains('modal-order-btn') || target.id === 'modal-add-btn') {
    const selectedSize = document.querySelector('.size-tile.selected')
    const errorEl = document.querySelector('#size-error')
    if (!selectedSize) {
      if (errorEl) { errorEl.style.display = 'block' }
      return
    }
    if (errorEl) errorEl.style.display = 'none'
    const name = target.dataset.name || 'a product'
    const price = target.dataset.price || ''
    const size = selectedSize.dataset.size
    const msg = `Hi! I want to order *${name}* (UK Size ${size}) ${price ? '— ' + price : ''} from STRYDE. Please confirm availability!`
    window.open('https://wa.me/919824386467?text=' + encodeURIComponent(msg), '_blank')
    closeModal()
    return
  }

  // Size tile selection
  if (target.classList.contains('size-tile')) {
    document.querySelectorAll('.size-tile').forEach(t => {
      t.classList.remove('selected')
      t.style.background = ''
      t.style.color = '#000'
      t.style.border = '2px solid #ddd'
    })
    target.classList.add('selected')
    target.style.background = '#000'
    target.style.color = '#CBFF00'
    target.style.border = '2px solid #000'
    const errorEl = document.querySelector('#size-error')
    if (errorEl) errorEl.style.display = 'none'
    return
  }

  if (target.classList.contains('remove-item')) {
    const id = parseInt(target.dataset.id)
    const index = cart.findIndex(item => item.id === id)
    if (index > -1) cart.splice(index, 1)
    document.querySelector('#cart-count').innerText = cart.length
    renderCart()
  }

  // Quick View Trigger
  const card = target.closest('.product-card')
  if (card && !target.classList.contains('add-to-cart-btn')) {
    openModal(parseInt(card.dataset.id))
  }
})

// Burger Menu
const mobileDrawer = document.querySelector('#mobile-drawer')
const mobileOverlay = document.querySelector('#mobile-overlay')

document.querySelector('#mobile-toggle').addEventListener('click', () => {
  mobileDrawer.style.left = '0'
  mobileOverlay.classList.add('show')
})

const closeMobile = () => {
  mobileDrawer.style.left = '-450px'
  mobileOverlay.classList.remove('show')
}
document.querySelector('#mobile-close').addEventListener('click', closeMobile)
mobileOverlay.addEventListener('click', closeMobile)
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobile))

// Multi-Step Checkout State
function goToStep(step) {
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'))
  document.querySelector('#step-' + step).classList.add('active')
}

const startCheckout = document.querySelector('#start-checkout')
if (startCheckout) {
  startCheckout.addEventListener('click', () => {
    document.querySelector('#cart-content-view').style.display = 'none'
    document.querySelector('#checkout-view').style.display = 'block'
  })
}

const backToCart = document.querySelector('#back-to-cart')
if (backToCart) {
  backToCart.addEventListener('click', () => {
    document.querySelector('#cart-content-view').style.display = 'block'
    document.querySelector('#checkout-view').style.display = 'none'
  })
}

const toPayment = document.querySelector('#to-payment')
if (toPayment) toPayment.addEventListener('click', () => goToStep('payment'))

const completeOrder = document.querySelector('#complete-order')
if (completeOrder) completeOrder.addEventListener('click', () => goToStep('success'))

// Scroll Reveal Logic
const observerOptions = {
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    }
  })
}, observerOptions)

function initScrollReveal() {
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el))
}

initScrollReveal()

// Scroll
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY
  const heroVisual = document.querySelector('.hero-visual')
  if (heroVisual) {
    heroVisual.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.15}px)) scale(${1 + scrolled * 0.0004})`
  }
})

