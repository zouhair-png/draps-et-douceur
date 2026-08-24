// client-side JS for site interactions (language toggle + instagram fetch fallback)
(function() {
  'use strict';

  const content = {
    fr: {
      langBtn: "عربي",
      heroTitle: "L'Art du Confort & de l'Élégance",
      heroSub: "Linge de maison, peignoirs personnalisés & draps de qualité supérieure",
      catTitle: "Nos Produits",
      p1Title: "Peignoirs Personnalisés",
      p1Desc: "Peignoirs haut de gamme avec broderie personnalisée (Prénoms, Couronnes, Initiales).",
      p2Title: "Packs Peignoirs Couples",
      p2Desc: "Ensembles assortis pour mariés avec broderies dorées et motifs élégants.",
      p3Title: "Draps & Linge de Lit",
      p3Desc: "Parures de lit luxe, draps brodés et ensembles douillets sélectionnés avec soin.",
      locText: "Mohammedia & Safi Centre | Livraison partout au Maroc 🇲🇦",
      waText: "Commander",
      igTitle: "Suivez-nous sur Instagram"
    },
    ar: {
      langBtn: "Français",
      heroTitle: "فن الراحة والأناقة",
      heroSub: "أفرشة منزلية، برنس حمام مخصص ورائعة الجودة",
      catTitle: "منتجاتنا",
      p1Title: "برنس حمام بالاسم (مُخصص)",
      p1Desc: "برنس حمام عالي الجودة مع تطريز حسب الطلب (أسماء، تاج، أحرف).",
      p2Title: "طقم برنس للعرسان",
      p2Desc: "مجموعات متناسقة للعرسان بتطريز ذهبي ولمسات تقليدية راقية.",
      p3Title: "أغطية وأفرشة الأسرة",
      p3Desc: "أطقم أسرّة فاخرة، أغطية مطرزة ومفارش مختارة بعناية فائقة.",
      locText: "المحمدية وآسفي المركز | التوصيل لجميع المدن المغربية 🇲🇦",
      waText: "طلب عبر واتساب",
      igTitle: "تابعنا على إنستجرام"
    }
  };

  let currentLang = localStorage.getItem('site-lang') || 
                    (document.documentElement.lang === 'ar' ? 'ar' : 'fr');

  const langBtn = document.getElementById('langBtn');

  function applyLanguage(lang) {
    if (!content[lang]) lang = 'fr';
    
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('site-lang', lang);
    
    if (langBtn) {
      langBtn.textContent = content[lang].langBtn;
      langBtn.setAttribute('aria-pressed', String(lang === 'ar'));
    }

    // Update all content
    const updates = {
      'heroTitle': content[lang].heroTitle,
      'heroSub': content[lang].heroSub,
      'catTitle': content[lang].catTitle,
      'p1Title': content[lang].p1Title,
      'p1Desc': content[lang].p1Desc,
      'p2Title': content[lang].p2Title,
      'p2Desc': content[lang].p2Desc,
      'p3Title': content[lang].p3Title,
      'p3Desc': content[lang].p3Desc,
      'igTitle': content[lang].igTitle
    };

    for (const [id, text] of Object.entries(updates)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    // Special handling for location text with icon
    const locText = document.getElementById('locText');
    if (locText) {
      locText.innerHTML = '<i class="fa-solid fa-map-marker-alt" aria-hidden="true"></i> ' + content[lang].locText;
    }

    // Update WhatsApp button text
    document.querySelectorAll('.waText').forEach(el => {
      el.textContent = content[lang].waText;
    });
  }

  function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    applyLanguage(currentLang);
  }

  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }

  // Initialize language
  applyLanguage(currentLang);

  // Fetch instagram via /api/instagram with fallback to static images
  (async function loadInstagram() {
    const gallery = document.getElementById('igGallery');
    if (!gallery) return;

    try {
      const res = await fetch('/api/instagram');
      if (!res.ok) throw new Error('API not available');
      
      const json = await res.json();
      
      if (json.profile) {
        const profileImg = document.getElementById('igProfileImg');
        const igName = document.getElementById('igName');
        const igFollowers = document.getElementById('igFollowers');
        
        if (profileImg && json.profile.profile_image_url) {
          profileImg.src = json.profile.profile_image_url;
        }
        if (igName && json.profile.username) {
          igName.textContent = json.profile.username;
        }
        if (igFollowers && json.profile.media_count !== undefined) {
          igFollowers.textContent = json.profile.media_count + ' posts';
        }
      }

      if (Array.isArray(json.media) && json.media.length > 0) {
        gallery.innerHTML = '';
        json.media.forEach(item => {
          const figure = document.createElement('figure');
          const a = document.createElement('a');
          a.href = item.permalink || 'https://instagram.com/draps_et_douceurs';
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          
          const img = document.createElement('img');
          img.loading = 'lazy';
          img.alt = (item.caption || 'Instagram post').split('\n')[0];
          img.src = item.media_url;
          
          a.appendChild(img);
          figure.appendChild(a);
          
          if (item.caption) {
            const caption = document.createElement('figcaption');
            caption.textContent = item.caption.split('\n')[0];
            figure.appendChild(caption);
          }
          
          gallery.appendChild(figure);
        });
      }
    } catch (e) {
      console.warn('Instagram API unavailable, using fallback', e);
      // Fallback: keep static images from HTML
      // This is already in the HTML, so we don't need to do anything
    }
  })();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();