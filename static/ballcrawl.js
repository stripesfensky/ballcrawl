const root = document.documentElement;

document.addEventListener("touchstart", () => {}, true);

let theme = localStorage.getItem("theme") || "dark";
setTheme(theme);
  
window.addEventListener("load", () => {
  generateColors();
  brandmarkColors();

  root.style.visibility = "visible";

  const search = document.querySelector("#header-search");
  const toggle = document.querySelector("#header-darklight-toggle");

  if (search) {
    search.addEventListener("click", toggleNavSearch);
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = localStorage.getItem("theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
      brandmarkColors();
    });
  }
});

function setTheme(newTheme) {
  const styles = getComputedStyle(root);
  const properties = ["header-bg", "nav-bg", "nav-btn", "main-bg", "main-color"];

  properties.forEach(property => {
    const value = styles.getPropertyValue(`--${newTheme}-${property}`);
    root.style.setProperty(`--${property}`, value);
  });
  
  theme = newTheme;
  localStorage.setItem("theme", newTheme);
}

function toggleNavSearch() {
  const nav = document.querySelector("nav");
  const nav_search = document.querySelector("#nav-search");
  const nav_search_bar = document.querySelector("#nav-search-bar");

  if (!nav.classList.contains("nav-section-hidden") && !nav_search.classList.contains("nav-hidden")) {
    nav.classList.add("nav-section-hidden");
    nav_search_bar.value = "";
  } 
  else if (!nav.classList.contains("nav-section-hidden") && nav_search.classList.contains("nav-hidden")) {
    nav.classList.add("nav-section-hidden");
    setTimeout(() => {
      nav_search.classList.remove("nav-hidden");
      nav.classList.remove("nav-section-hidden");
    }, 600);
    nav_search_bar.value = "";
  }
  else {
    nav_search_bar.value = "";
    nav_search.classList.remove("nav-hidden");
    nav.classList.remove("nav-section-hidden");
  }
}

function generateColors() {
  const styles = getComputedStyle(root);
  
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
