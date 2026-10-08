/**
 * BY YUSUF KESİCİ - BESPOKE & SARTORIAL TAILORING
 * Etkileşimli JavaScript, Makaslı Kumaş Kesim Animasyonu & 21st.dev Galeri Bileşenleri
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. TAM EKRAN KUMAŞ KESEN MAKAS AÇILIŞ ANİMASYONU
  // -------------------------------------------------------------------------
  const introCurtain = document.getElementById('introCurtain');
  const introSkipBtn = document.getElementById('introSkipBtn');
  const replayCurtainBtn = document.getElementById('replayCurtainBtn');
  let animationTimeouts = [];

  function clearAnimationTimers() {
    animationTimeouts.forEach(timer => clearTimeout(timer));
    animationTimeouts = [];
  }

  function startCurtainAnimation() {
    if (!introCurtain) return;

    clearAnimationTimers();
    document.body.classList.add('curtain-locked');
    introCurtain.classList.remove('opened', 'finished');
    introCurtain.classList.add('running');
    introCurtain.setAttribute('aria-hidden', 'false');

    // Makas tepeye vardığında kumaşın iki yana açılması (2.2s)
    const t1 = setTimeout(() => {
      introCurtain.classList.add('opened');
    }, 2200);

    // Perdenin tamamen gizlenmesi ve sayfa kaydırmanın serbest bırakılması (3.1s)
    const t2 = setTimeout(() => {
      introCurtain.classList.add('finished');
      document.body.classList.remove('curtain-locked');
      introCurtain.setAttribute('aria-hidden', 'true');
    }, 3100);

    animationTimeouts.push(t1, t2);
  }

  function finishCurtainAnimationInstantly() {
    clearAnimationTimers();
    if (introCurtain) {
      introCurtain.classList.add('opened');
      setTimeout(() => {
        introCurtain.classList.add('finished');
        document.body.classList.remove('curtain-locked');
        introCurtain.setAttribute('aria-hidden', 'true');
      }, 100);
    } else {
      document.body.classList.remove('curtain-locked');
    }
  }

  // Sayfa ilk yüklendiğinde başlat
  startCurtainAnimation();

  // "Geç" Butonu
  if (introSkipBtn) {
    introSkipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      finishCurtainAnimationInstantly();
    });
  }

  // Footer'daki "Animasyonu Tekrar Oynat" Butonu
  if (replayCurtainBtn) {
    replayCurtainBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        startCurtainAnimation();
      }, 400);
    });
  }

  // ESC tuşuyla perdeyi geçebilme
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && introCurtain && !introCurtain.classList.contains('finished')) {
      finishCurtainAnimationInstantly();
    }
  });

  // -------------------------------------------------------------------------
  // 2. MOBİL MENÜ YÖNETİMİ
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. SAYFA KAYDIRMA & AKTİF MENÜ TAKİBİ
  // -------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetLink) targetLink.classList.add('active');
      } else {
        if (targetLink) targetLink.classList.remove('active');
      }
    });
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 4. RANDEVU FORMU & WHATSAPP ENTEGRASYONU
  // -------------------------------------------------------------------------
  const appointmentForm = document.getElementById('appointmentForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalWhatsappLink = document.getElementById('modalWhatsappLink');

  // Atölye WhatsApp İletişim Numarası (533 304 5353)
  const ATELIER_PHONE = "905333045353";

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim();
      const phone = document.getElementById('clientPhone')?.value.trim();
      const service = document.getElementById('clientService')?.value;
      const date = document.getElementById('clientDate')?.value;
      const notes = document.getElementById('clientNotes')?.value.trim();

      if (!name || !phone) {
        alert('Lütfen adınızı ve telefon numaranızı giriniz.');
        return;
      }

      // Şık Türkçe WhatsApp Mesaj Taslağı
      let msg = `Sayın Yusuf Kesici Atölyesi,\n\nÖzel dikim randevusu talep etmek istiyorum:\n`;
      msg += `👤 İsim: ${name}\n`;
      msg += `📞 Telefon: ${phone}\n`;
      if (service) msg += `👔 İlgilenilen Hizmet: ${service}\n`;
      if (date) msg += `📅 Tercih Edilen Tarih: ${date}\n`;
      if (notes) msg += `📝 Özel Not: ${notes}\n`;
      msg += `\nAtölye takvim uygunluğunu rica ederim.`;

      const encoded = encodeURIComponent(msg);
      const waUrl = `https://wa.me/${ATELIER_PHONE}?text=${encoded}`;

      if (modalWhatsappLink) {
        modalWhatsappLink.href = waUrl;
      }

      if (successModal) {
        successModal.classList.add('active');
      }

      appointmentForm.reset();
    });
  }

  // Modalı Kapatma Fonksiyonları
  const closeModal = () => {
    if (successModal) successModal.classList.remove('active');
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
  }

  // Form İçi Doğrudan WhatsApp Butonu
  const quickWaBtn = document.getElementById('quickWaBtn');
  if (quickWaBtn) {
    quickWaBtn.addEventListener('click', () => {
      const name = document.getElementById('clientName')?.value.trim() || 'Misafir';
      const service = document.getElementById('clientService')?.value || 'Özel Dikim';
      const msg = encodeURIComponent(`Merhaba Yusuf Kesici Atölyesi, adım ${name}. ${service} için atölye randevusu almak istiyorum.`);
      window.open(`https://wa.me/${ATELIER_PHONE}?text=${msg}`, '_blank');
    });
  }
});
