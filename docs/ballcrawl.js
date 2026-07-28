document.addEventListener("touchstart", function() {}, true);

let theme = localStorage.getItem("theme") || "dark";
setTheme(theme);
  
window.addEventListener("load", () => {
  let html = document.querySelector("html");
  generateColors();
  brandmarkColors();

  html.style.visibility = "visible";

  let header_search = document.querySelector("#header-search");
  header_search.addEventListener("click", () => {
    let nav = document.querySelector("nav");
    let nav_search = document.querySelector("#nav-search");
    let nav_settings = document.querySelector("#nav-settings");
    showNavItem(nav, nav_search, nav_settings);
  });

  let header_settings = document.querySelector("#header-settings");
  header_settings.addEventListener("click", () => {
    let nav = document.querySelector("nav");
    let nav_search = document.querySelector("#nav-search");
    let nav_settings = document.querySelector("#nav-settings");
    showNavItem(nav, nav_settings, nav_search);
  });

  let nav_darklight_toggle = document.querySelector("#nav-darklight-toggle");
  nav_darklight_toggle.addEventListener("click", () => {
    theme = localStorage.getItem("theme");
    if (theme == "light") {
      setTheme("dark");
      brandmarkColors();
    }
    else {
      setTheme("light");
      brandmarkColors();
    }
  });
});

function setTheme(theme) {
  let root = document.documentElement;
  let styles = getComputedStyle(root);
  let properties = [
    "header-bg",
    "nav-bg",
    "nav-btn",
    "main-bg",
    "main-color"
  ];
  properties.forEach(property => {
    let value = styles.getPropertyValue(`--${theme}-${property}`);
    root.style.setProperty(`--${property}`, value);
  });
  localStorage.setItem("theme", theme);
}

function showNavItem(nav, show, hide) {
  if (!nav.classList.contains("nav-section-hidden") && !show.classList.contains("nav-hidden")) {
    nav.classList.add("nav-section-hidden");
  } 
  else if (!nav.classList.contains("nav-section-hidden") && show.classList.contains("nav-hidden")) {
    nav.classList.add("nav-section-hidden");
    setTimeout(() => {
      hide.classList.add("nav-hidden");
      show.classList.remove("nav-hidden");
      nav.classList.remove("nav-section-hidden");
    }, 600);
  }
  else {
    hide.classList.add("nav-hidden");
    show.classList.remove("nav-hidden");
    nav.classList.remove("nav-section-hidden");
  }
}

function generateColors() {
  let root = document.documentElement;
  let styles = getComputedStyle(root);
  
  let colors = [
    styles.getPropertyValue("--randomA"), 
    styles.getPropertyValue("--randomB"), 
    styles.getPropertyValue("--randomC"), 
    styles.getPropertyValue("--randomD"), 
  ];

  /* https://stackoverflow.com/a/46545530 */
  colors = colors
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  root.style.setProperty("--randomA", colors[0]);
  root.style.setProperty("--randomB", colors[1]);
  root.style.setProperty("--randomC", colors[2]);
  root.style.setProperty("--randomD", colors[3]);
}

function brandmarkColors() {
  let styles = getComputedStyle(document.documentElement);
  let brandmarks = document.querySelectorAll(".logo-brandmark");

  brandmarks.forEach(brandmark => {
    let svg = brandmark.contentDocument;  

    let elements = {
      "#ball1": "--randomA",
      "#ball2": "--randomB",
      "#ball3": "--randomC",
      "#pit": "--main-color"
    }

    Object.entries(elements).forEach(([id, color]) => {
      let element = svg.querySelector(id);
      element.setAttribute("fill", styles.getPropertyValue(color));
    });
  });

}
