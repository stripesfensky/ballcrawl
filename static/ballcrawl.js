document.addEventListener("touchstart", () => {}, true);

const root = document.documentElement;
const currentTheme = localStorage.getItem("theme") || "dark";

root.setAttribute("data-theme", currentTheme);
  
window.addEventListener("load", () => {
  generateColors();
  brandmarkColors();

  root.style.visibility = "visible";

  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    brandmarkColors();
  });
});

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
  let brandmarks = document.querySelectorAll(".brandmark");

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
