document.addEventListener("DOMContentLoaded", () => {
  // На странице используются классы .menu-toggle и .site-nav, а CSS
  // показывает мобильное меню, когда у навигации есть класс open.
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    const setMenuOpen = (isOpen) => {
      nav.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    };

    toggle.addEventListener("click", () => {
      setMenuOpen(!nav.classList.contains("open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  // API Яндекс Карт необходимо отдельно подключить до script.js.
  // Без него пропускаем карту, чтобы не возникала ошибка ymaps is not defined.
  const mapElement = document.getElementById("map");
  if (mapElement && !mapElement.querySelector("iframe") && window.ymaps && typeof window.ymaps.ready === "function") {
    window.ymaps.ready(() => {
      const myMap = new window.ymaps.Map("map", {
        center: [54.986940, 73.375529],
        zoom: 10,
      });
      const myPlacemark = new window.ymaps.Placemark([54.986940, 73.375529], {
        hintContent: "Это моя метка",
        balloonContent: "Описание метки",
      });
      myMap.geoObjects.add(myPlacemark);
    });
  } else if (mapElement && !mapElement.querySelector("iframe") && !window.ymaps) {
    console.warn("Карта не инициализирована: API Яндекс Карт не подключён.");
  }
});
