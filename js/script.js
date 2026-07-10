// ============================================
// SCRAPBOOK NAYLA - INTERAKTIVITAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  // Render Sticky Notes (First Thought)
  function renderStickyNotes() {
    const container = document.getElementById('stickyContainer');
    if (!container) return;

    // Cek apakah data firstThought tersedia
    if (typeof firstThought === 'undefined') {
      console.warn('firstThought data tidak ditemukan');
      return;
    }

    container.innerHTML = firstThought.map((item, index) => {
      const rotations = [-2, 1.5, -1.8, 2.2];
      const colors = ['#FFF8F2', '#FFF5F5', '#F5EDF5', '#F0F5F5'];
      return `
        <div class="sticky-note" style="transform: rotate(${rotations[index % rotations.length]}deg); background: ${colors[index % colors.length]};">
          <div class="thought-icon">💭</div>
          <div class="thought-text">${item.text}</div>
          <div class="author">${item.author}</div>
        </div>
      `;
    }).join('');
  }

  // Render Masonry Cards (If They Were)
  function renderMasonry() {
    const container = document.getElementById('masonryContainer');
    if (!container) return;

    if (typeof ifTheyWere === 'undefined') {
      console.warn('ifTheyWere data tidak ditemukan');
      return;
    }

    container.innerHTML = ifTheyWere.map((item, index) => {
      const rotations = [-1.5, 2, -1.2, 1.8];
      // Ambil emoji dari title (bagian terakhir)
      const emoji = item.title.split(' ').pop() || '🌸';
      return `
        <div class="masonry-card" style="transform: rotate(${rotations[index % rotations.length]}deg);">
          <div class="card-icon">${emoji}</div>
          <div class="card-title">${item.title}</div>
          <div class="card-reason">${item.reason}</div>
          <div class="card-author">${item.author}</div>
        </div>
      `;
    }).join('');
  }

  // Render Diary Entries (A Memory)
  function renderDiary() {
    const container = document.getElementById('diaryContainer');
    if (!container) return;

    if (typeof memories === 'undefined') {
      console.warn('memories data tidak ditemukan');
      return;
    }

    container.innerHTML = memories.map((item, index) => {
      const rotations = [-0.8, 1.2, -0.6];
      return `
        <div class="diary-card" style="transform: rotate(${rotations[index % rotations.length]}deg);">
          <div class="diary-icon">📖</div>
          <div class="diary-text">${item.text}</div>
          <div class="diary-author">${item.author}</div>
        </div>
      `;
    }).join('');
  }

  // Render Letters (Future Them)
  function renderLetters() {
    const container = document.getElementById('letterContainer');
    if (!container) return;

    if (typeof futureLetters === 'undefined') {
      console.warn('futureLetters data tidak ditemukan');
      return;
    }

    container.innerHTML = futureLetters.map((item, index) => {
      const seals = ['💌', '🌸', '🌷'];
      return `
        <div class="envelope" onclick="toggleLetter(this)">
          <div class="envelope-header">
            <span class="envelope-label">✉️ surat untuk Nayla</span>
            <span class="envelope-hint">tap to open ✨</span>
          </div>
          <div class="seal-stamp">${seals[index % seals.length]}</div>
          <div class="letter-content">
            <p>${item.text}</p>
            <div class="letter-author">— ${item.author}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Gallery (Polaroid Wall)
  function renderGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    if (typeof galleryPhotos === 'undefined') {
      console.warn('galleryPhotos data tidak ditemukan');
      return;
    }

    container.innerHTML = galleryPhotos.map((item, index) => {
  const rotations = [-2.5, 3, -1.8, 2.2, -3, 1.5];

  return `
    <div class="polaroid-item"
         style="transform: rotate(${rotations[index % rotations.length]}deg);"
         onclick="openLightbox('${item.src}')">

      <div class="tape"></div>

      <img src="${item.src}"
           alt="${item.alt}"
           loading="lazy"
           onerror="this.src='https://via.placeholder.com/300/FFDCEB/574A57?text=📷'">

      <div class="polaroid-caption">${item.alt}</div>
    </div>
  `;
}).join('');
  }

  // ============================================
  // INTERACTIONS
  // ============================================

  // Toggle letter open/close (global)
  window.toggleLetter = function(element) {
    element.classList.toggle('open');
  };

  // Lightbox for gallery (global)
  window.openLightbox = function(src) {
    // Cek apakah sudah ada lightbox
    const existingOverlay = document.querySelector('.lightbox-overlay');
    if (existingOverlay) return;

    // Create lightbox overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(87, 74, 87, 0.88);
      backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      animation: fadeIn 0.3s ease;
      padding: 20px;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Nayla photo';
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      transform: scale(0.92);
      animation: zoomIn 0.4s ease forwards;
      object-fit: contain;
    `;

    // Close button
    const closeBtn = document.createElement('span');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: 30px;
      right: 40px;
      font-size: 2rem;
      color: white;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.3s;
      font-family: 'Poppins', sans-serif;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.6');

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Close on click (outside image)
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target === closeBtn) {
        closeLightbox(overlay);
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function closeEsc(e) {
      if (e.key === 'Escape') {
        closeLightbox(overlay);
        document.removeEventListener('keydown', closeEsc);
      }
    });
  };

  // Close lightbox function
  function closeLightbox(overlay) {
    if (!overlay) return;
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 300);
  }

  // ============================================
  // SMOOTH SCROLL FOR NAVIGATION
  // ============================================

  // Handle "Open Scrapbook" button
  const openBtn = document.querySelector('.btn-open');
  if (openBtn) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const introSection = document.getElementById('intro');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // INTERSECTION OBSERVER (optional enhancement)
  // ============================================

  // Tambahkan efek fade-up saat elemen masuk viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe semua section
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });

  // ============================================
  // INIT ALL RENDERS
  // ============================================

  renderStickyNotes();
  renderMasonry();
  renderDiary();
  renderLetters();
  renderGallery();

  console.log('🌷 Scrapbook for Nayla is ready!');
  console.log('🥕 Made with love by the Umbi family.');
  console.log('💖 Happy Birthday, Nayla!');

});

// ============================================
// ADDITIONAL CSS ANIMATIONS (injected)
// ============================================

(function injectStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zoomIn {
      from {
        transform: scale(0.85);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Lightbox scroll lock */
    .lightbox-overlay {
      animation: fadeIn 0.3s ease;
    }

    .lightbox-overlay img {
      animation: zoomIn 0.4s ease forwards;
    }

    /* Smooth hover transitions */
    .envelope,
    .polaroid-item,
    .sticky-note,
    .masonry-card,
    .diary-card {
      will-change: transform;
    }

    /* Scroll behavior */
    .section {
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
  `;
  document.head.appendChild(styleSheet);
})();
