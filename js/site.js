// client-side JS for site interactions (language toggle + instagram fetch fallback)
(function(){
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
      waText: "Commander"
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
      waText: "طلب عبر واتساب"
    }
  };

  let currentLang = document.documentElement.lang === 'ar' ? 'ar' : 'fr';
  const langBtn = document.getElementById('langBtn');

  function applyLanguage(lang){
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    langBtn.textContent = content[lang].langBtn;
    langBtn.setAttribute('aria-pressed', String(lang === 'ar'));
    document.getElementById('heroTitle').textContent = content[lang].heroTitle;
    document.getElementById('heroSub').textContent = content[lang].heroSub;
    document.getElementById('catTitle').textContent = content[lang].catTitle;
    document.getElementById('p1Title').textContent = content[lang].p1Title;
    document.getElementById('p1Desc').textContent = content[lang].p1Desc;
    document.getElementById('p2Title').textContent = content[lang].p2Title;
    document.getElementById('p2Desc').textContent = content[lang].p2Desc;
    document.getElementById('p3Title').textContent = content[lang].p3Title;
    document.getElementById('p3Desc').textContent = content[lang].p3Desc;
    document.getElementById('locText').innerHTML = '<i class="fa-solid fa-map-marker-alt" aria-hidden="true"></i> ' + content[lang].locText;
    document.querySelectorAll('.waText').forEach(el => el.textContent = content[lang].waText);
  }

  function toggleLanguage(){
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    applyLanguage(currentLang);
  }

  langBtn.addEventListener('click', toggleLanguage);
  applyLanguage(currentLang);

  // Fetch instagram via /api/instagram fallback to static message
  (async function loadInstagram(){
    const gallery = document.getElementById('igGallery');
    try {
      const res = await fetch('/api/instagram');
      if (!res.ok) throw new Error('no data');
      const json = await res.json();
      if (json.profile) {
        document.getElementById('igProfileImg').src = json.profile.profile_image_url || document.getElementById('igProfileImg').src;
        document.getElementById('igName').textContent = json.profile.username || document.getElementById('igName').textContent;
        if (json.profile.media_count !== undefined) document.getElementById('igFollowers').textContent = json.profile.media_count + ' posts';
      }
      if (Array.isArray(json.media)){
        gallery.innerHTML = '';
        json.media.forEach(item => {
          const a = document.createElement('a');
          a.href = item.permalink || '#';
          a.target = '_blank'; a.rel = 'noopener noreferrer';
          const img = document.createElement('img');
          img.loading = 'lazy'; img.alt = (item.caption||'Instagram post').split('\n')[0]; img.src = item.media_url;
          a.appendChild(img);
          gallery.appendChild(a);
        });
      }
    } catch (e) {
      gallery.innerHTML = '<p style="color:#666">Le flux Instagram n\'est pas disponible. Vous pouvez utiliser le widget LightWidget ou Elfsight, ou configurer le token.</p>';
    }
  })();
})();
