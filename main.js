/* MERCINHO FARRA — interações */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const year = document.getElementById('year');

  /* Ano no rodapé */
  if (year) year.textContent = new Date().getFullYear();

  /* Estado do menu mobile */
  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) setMenu(false);
    });
  }

  /* Navbar com fundo ao rolar */
  const onScroll = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Agenda de shows — edite a lista abaixo */
  const shows = [
    // { dia: '28', mes: 'SET', cidade: 'Recife – PE', local: 'Espaço Cultural', status: 'ingressos' },
    // status: 'ingressos' | 'esgotado' | 'em breve'
  ];

  const renderAgenda = () => {
    const list = document.getElementById('agendaList');
    if (!list) return;

    if (!shows.length) {
      list.innerHTML = '<p class="agenda__empty">Agenda de shows será atualizada em breve.</p>';
      return;
    }

    list.innerHTML = '';
    shows.forEach((show, i) => {
      const row = document.createElement('div');
      row.className = 'agenda-row';
      row.style.animationDelay = `${i * 80}ms`;

      const badgeClass = show.status === 'ingressos' ? 'agenda__badge--live' : '';
      const badgeText = {
        ingressos: 'Ingressos',
        esgotado: 'Esgotado',
        'em breve': 'Em breve'
      }[show.status] || 'Em breve';

      row.innerHTML = `
        <div class="agenda__date">
          <span class="agenda__day">${show.dia}</span>
          <span class="agenda__month">${show.mes}</span>
        </div>
        <div class="agenda__where">
          <p class="agenda__city">${show.cidade}</p>
          <p class="agenda__venue">${show.local}</p>
        </div>
        <span class="agenda__badge ${badgeClass}">${badgeText}</span>
      `;

      list.appendChild(row);
    });
  };
  renderAgenda();

  /* Reveal on scroll */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }
});
