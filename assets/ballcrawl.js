const root = document.documentElement;
const currentTheme = localStorage.getItem("theme") || "dark";

root.setAttribute("data-theme", currentTheme);
root.style.visibility = "visible";

document.addEventListener("touchstart", function() {}, true);
  
window.addEventListener("DOMContentLoaded", () => {
  generateColors();
  
  const toggleButton = document.querySelector("#theme-toggle");
  const pageInfoButton = document.querySelector("#pageinfo-toggle");

  updateToggleIcon(currentTheme);

  requestAnimationFrame(() => {
    document.body.classList.remove("preload");
  });

  toggleButton.addEventListener("click", () => {
    const activeTheme = root.getAttribute("data-theme");
    const newTheme = activeTheme === "light" ? "dark" : "light";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateToggleIcon(newTheme);
    brandmarkColors();
  });

  pageInfoButton.addEventListener("click", () => {
    const pageInfoUpdated = document.querySelector("#pageinfo-updated");
    pageInfoUpdated.classList.toggle("visible");
  });

  document.querySelectorAll(".brandmark").forEach(brandmark => {
    brandmark.addEventListener("load", brandmarkColors);

    if (brandmark.contentDocument) {
      brandmarkColors();
    }
  });
});

function updateToggleIcon(theme) {
  const icon = document.querySelector("#theme-toggle i");

  if (!icon) return;

  if (theme === "dark") {
    icon.className = "fa-solid fa-sun";
  }
  else {
    icon.className = "fa-solid fa-moon";
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
  const styles = getComputedStyle(document.documentElement);
  const brandmarks = document.querySelectorAll(".brandmark");
  const elements = {
    "#ball1": "--randomA",
    "#ball2": "--randomB",
    "#ball3": "--randomC",
    "#pit": "--main-color"
  }

  brandmarks.forEach(brandmark => {
    const svg = brandmark.contentDocument;  

    if (!svg) return;

    Object.entries(elements).forEach(([id, color]) => {
      const element = svg.querySelector(id);
      if (element) {
        element.setAttribute("fill", styles.getPropertyValue(color));
      }
    });
  });
}
