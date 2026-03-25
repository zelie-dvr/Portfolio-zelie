/**
* Template Name: MyResume
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();




// -------------------------------
// OBJETS PROJETS
// -------------------------------
const projects = {
  egg: {
    title: "Catalogue Bonjour François",
    desc: "Réalisation d’un catalogue mettant en avant les produits de la marque ainsi que ses engagements écoresponsables (GRS, GOTS).",
    img: "professionnel/img-professionnel/coverEGG.png",
    link: "professionnel/catalogueEGG.html"
  },
  sm: {
    title: "Catalogue Sur-Mesure",
    desc: "Création d'un catalogue personnalisé qui reflète l'identité de la marque, offrant aux clients une expérience sur mesure.",
    img: "professionnel/img-professionnel/img45.jpg",
    link: "professionnel/catalogueSM.html"
  },
  gsp: {
    title: "Catalogue GSP Textile",
    desc: "Conception d’un livret présentant l’histoire de la marque, son identité et son savoir-faire.",
    img: "professionnel/img-professionnel/coverGSP.png",
    link: "professionnel/catalogueGSP.html"
  },
  regood: {
    title: "Logo Regood",
    desc: "Création d’un logo reflétant les valeurs d’upcycling et de durabilité de la marque, avec une identité visuelle simple et impactante.",
    img: "professionnel/img-professionnel/img9.png",
    link: "professionnel/logoRG.html"
  },
  leonin: {
    title: "Logo Léonin",
    desc: "Réalisation d’un logo pour une marque de sacs et accessoires premium, avec une approche élégante et fonctionnelle.",
    img: "professionnel/img-professionnel/img46.jpg",
    link: "professionnel/logoLEONIN.html"
  },
  mustela: {
    title: "Motif Mustela",
    desc: "Création d’un motif pour le packaging, en lien avec l’univers doux et enfantin de la marque Mustela.",
    img: "professionnel/img-professionnel/img37.jpg",
    link: "professionnel/motifMUSTELA.html"
  },
  proto: {
    title: "Prototype Web Léonin",
    desc: "Conception d’un prototype sur Figma pour imaginer l’expérience du site web de la marque Léonin.",
    img: "assets/img/portfolio/portfolio-details-20.jpg",
    link: "professionnel/site-leonin.html"
  },
  ctco: {
    title: "Salon CTCO 2025",
    desc: "Création de visuels pour des supports de communication (flyers, accessoires) et préparation des fichiers pour l’impression.",
    img: "professionnel/img-professionnel/SalonCTCO.webp",
    link: "professionnel/CTCO2025.html"
  }
};

// -------------------------------
// SELECTION ELEMENTS
// -------------------------------
const items = document.querySelectorAll(".pro-list li");
const img = document.getElementById("preview-img");
const title = document.getElementById("preview-title");
const desc = document.getElementById("preview-desc");
const link = document.getElementById("preview-link");

/// Initialisation GLightbox sur le lien existant
const lightbox = GLightbox({
  selector: '#preview-link',  // un seul lien
  width: '90%',
  height: '90vh',
  openEffect: 'fade',
  closeEffect: 'fade',
  slideEffect: 'fade',
  loop: false,
  touchNavigation: false,
  closeButton: true,
  slideNavigation: false  // désactive les flèches
});


// -------------------------------
// FONCTION DE MISE À JOUR DU PROJET
// -------------------------------
function updateProject(key) {
  const project = projects[key];

  img.style.opacity = 0;

  setTimeout(() => {
    // Mise à jour du contenu
    img.src = project.img;
    title.innerText = project.title;
    desc.innerText = project.desc;
    link.href = project.link;

    // Ajout des classes et attributs GLightbox
    link.classList.add("full-link", "portfolio-details-lightbox");
    link.setAttribute("data-glightbox", "type: external");
    link.setAttribute("title", "Voir le projet");

    img.style.opacity = 1;

    // Recharger GLightbox pour prendre en compte le nouveau lien
    lightbox.reload();
  }, 200);
}

// -------------------------------
// CLIC SUR LES ITEMS DU MENU
// -------------------------------
items.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".pro-list li.active")?.classList.remove("active");
    item.classList.add("active");

    updateProject(item.dataset.project);
  });
});

// -------------------------------
// INITIALISATION AU CHARGEMENT
// -------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const first = document.querySelector(".pro-list li.active");
  if (first) {
    updateProject(first.dataset.project);
  }
});

})()