# Mitti & Mocha Café

A responsive, multi-page static café website demo built with HTML, CSS and vanilla JavaScript.

## Pages

- `index.html` — homepage
- `menu.html` — menu with category filters
- `about.html` — café story and values
- `gallery.html` — photo gallery with a lightbox
- `contact.html` — sample contact details and frontend-only form

## Add your images

Put your locally generated and optimised images in `images/`. The HTML and JavaScript refer to the image filenames below. If an image is missing, the site displays a placeholder.

- Homepage: `cafe-interior-hero.webp`, `cappuccino-hero.webp`
- About and café: `cafe-interior-about.webp`, `barista-preparing-coffee.webp`, `cafe-seating.webp`
- Gallery: `gallery-latte-art.webp`, `gallery-sandwich.webp`, `gallery-burger.webp`, `gallery-desserts.webp`, `gallery-waffle.webp`
- Menu: `menu-cappuccino.webp`, `menu-cafe-latte.webp`, `menu-americano.webp`, `menu-hot-chocolate.webp`, `menu-masala-chai.webp`, `menu-iced-coffee.webp`, `menu-cold-coffee.webp`, `menu-iced-latte.webp`, `menu-chocolate-frappe.webp`, `menu-strawberry-milkshake.webp`, `menu-grilled-sandwich.webp`, `menu-paneer-tikka-sandwich.webp`, `menu-veg-burger.webp`, `menu-peri-peri-fries.webp`, `menu-margherita-pizza.webp`, `menu-chocolate-brownie.webp`, `menu-chocolate-lava-cake.webp`, `menu-cheesecake.webp`, `menu-chocolate-waffle.webp`

## Run locally

Open `index.html` in a browser. Alternatively, from this folder run a static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Netlify deployment

Deploy the `mitti-mocha-cafe` folder as the site directory. This is a static website, so it does not need a build command.

Before publishing for a real business, replace the sample café address, phone, email, opening hours, testimonials and menu/prices. The contact form is frontend-only: it does not send or store messages. Configure a form service or backend if you need submissions.

## Fonts

The stylesheet loads Google Fonts when a network connection is available. If unavailable, the site falls back to system serif and sans-serif fonts.