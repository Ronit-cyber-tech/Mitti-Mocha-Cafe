"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mark the current page in the navigation.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (navToggle && navigation) {
    const closeNavigation = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNavigation();
    });

    document.addEventListener("click", (event) => {
      if (!navigation.contains(event.target) && !navToggle.contains(event.target)) {
        closeNavigation();
      }
    });
  }

  // Smooth-scroll same-page links.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.focus({ preventScroll: true });
    });
  });

  // Show a friendly placeholder until local photos are added.
  document.querySelectorAll(".image-frame img").forEach((image) => {
    image.addEventListener("error", () => {
      image.parentElement.classList.add("image-missing");
      image.setAttribute("aria-hidden", "true");
      image.hidden = true;
    }, { once: true });
  });

  // Menu items and category filter.
  const menuContainer = document.querySelector("#menu-items");
  if (menuContainer) {
    const menuItems = [
      { name: "Cappuccino", category: "hot", label: "Hot Beverage", description: "Espresso, steamed milk and a soft layer of foam.", price: 150, image: "menu-cappuccino.webp.jpg" },
      { name: "Café Latte", category: "hot", label: "Hot Beverage", description: "Smooth espresso mellowed with silky steamed milk.", price: 170, image: "menu-cafe-latte.webp.jpg" },
      { name: "Americano", category: "hot", label: "Hot Beverage", description: "A bold espresso lengthened with hot water.", price: 130, image: "menu-americano.webp.jpg" },
      { name: "Hot Chocolate", category: "hot", label: "Hot Beverage", description: "Rich chocolate, warm milk and a little comfort.", price: 180, image: "menu-hot-chocolate.webp.jpg" },
      { name: "Masala Chai", category: "hot", label: "Hot Beverage", description: "A warming Indian tea brewed with aromatic spices.", price: 100, image: "menu-masala-chai.webp.jpg" },
      { name: "Iced Coffee", category: "cold", label: "Cold Beverage", description: "Chilled coffee served over ice for an easy refresh.", price: 170, image: "menu-iced-coffee.webp.jpg" },
      { name: "Cold Coffee", category: "cold", label: "Cold Beverage", description: "Blended coffee and chilled milk with a creamy finish.", price: 190, image: "menu-cold-coffee.webp.jpg" },
      { name: "Iced Latte", category: "cold", label: "Cold Beverage", description: "Espresso and cold milk poured over plenty of ice.", price: 190, image: "menu-iced-latte.webp.jpg" },
      { name: "Chocolate Frappe", category: "cold", label: "Cold Beverage", description: "A cool, chocolatey blend topped with a creamy finish.", price: 220, image: "menu-chocolate-frappe.webp.jpg" },
      { name: "Strawberry Milkshake", category: "cold", label: "Cold Beverage", description: "A creamy, fruity shake made for slow afternoons.", price: 210, image: "menu-strawberry-milkshake.webp.jpg" },
      { name: "Grilled Sandwich", category: "food", label: "Food", description: "Toasted bread packed with fresh vegetables and cheese.", price: 220, image: "menu-grilled-sandwich.webp.jpg" },
      { name: "Paneer Tikka Sandwich", category: "food", label: "Food", description: "Spiced paneer, crisp vegetables and a toasted finish.", price: 260, image: "menu-paneer-tikka-sandwich.webp.jpg" },
      { name: "Classic Veg Burger", category: "food", label: "Food", description: "A hearty vegetable patty with fresh, crunchy toppings.", price: 250, image: "menu-veg-burger.webp.jpg" },
      { name: "Peri Peri Fries", category: "food", label: "Food", description: "Golden fries tossed with a lively peri peri seasoning.", price: 160, image: "menu-peri-peri-fries.webp.jpg" },
      { name: "Margherita Pizza", category: "food", label: "Food", description: "Tomato, mozzarella and basil on a crisp base.", price: 290, image: "menu-margherita-pizza.webp.jpg" },
      { name: "Chocolate Brownie", category: "desserts", label: "Dessert", description: "A rich, fudgy chocolate square, lovely with coffee.", price: 150, image: "menu-chocolate-brownie.webp.jpg" },
      { name: "Chocolate Lava Cake", category: "desserts", label: "Dessert", description: "Warm chocolate cake with a soft molten centre.", price: 220, image: "menu-chocolate-lava-cake.webp.jpg" },
      { name: "Cheesecake", category: "desserts", label: "Dessert", description: "Creamy cheesecake with a buttery crumb base.", price: 240, image: "menu-cheesecake.webp.jpg" },
      { name: "Chocolate Waffle", category: "desserts", label: "Dessert", description: "A golden waffle finished with chocolate and fresh fruit.", price: 260, image: "menu-chocolate-waffle.webp.jpg" }
    ];

    const renderMenu = (filter = "all") => {
      const visibleItems = filter === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === filter);

      menuContainer.replaceChildren();

      visibleItems.forEach((item) => {
        const card = document.createElement("article");
        card.className = "menu-card";

        const frame = document.createElement("div");
        frame.className = "image-frame menu-card-image";

        const image = document.createElement("img");
        image.src = `images/${item.image}`;
        image.alt = item.name;
        image.loading = "lazy";
        image.addEventListener("error", () => {
          frame.classList.add("image-missing");
          image.hidden = true;
        }, { once: true });
        frame.append(image);

        const copy = document.createElement("div");
        copy.className = "menu-card-copy";

        const category = document.createElement("span");
        category.className = "menu-category";
        category.textContent = item.label;

        const top = document.createElement("div");
        top.className = "menu-card-top";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const price = document.createElement("span");
        price.className = "menu-price";
        price.textContent = `₹${item.price}`;

        const description = document.createElement("p");
        description.textContent = item.description;

        top.append(title, price);
        copy.append(category, top, description);
        card.append(frame, copy);
        menuContainer.append(card);
      });
    };

    renderMenu();

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-button").forEach((filterButton) => {
          const selected = filterButton === button;
          filterButton.classList.toggle("is-active", selected);
          filterButton.setAttribute("aria-pressed", String(selected));
        });
        renderMenu(button.dataset.filter);
      });
    });
  }

  // Accessible gallery lightbox using the native dialog element.
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const thumbnail = item.querySelector("img");
        lightboxImage.src = item.dataset.full || thumbnail.src;
        lightboxImage.alt = thumbnail.alt;
        lightboxCaption.textContent = item.dataset.caption || thumbnail.alt;
        lightbox.showModal();
      });
    });

    closeButton.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", () => {
      lightboxImage.removeAttribute("src");
    });
  }

  // Frontend-only contact form validation and demo confirmation.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const message = document.querySelector("#form-message");

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "";
      message.classList.remove("error");

      if (!contactForm.reportValidity()) return;

      message.textContent = "Thanks for your message! This is a demo form, so nothing has been sent.";
      contactForm.reset();
    });
  }
});