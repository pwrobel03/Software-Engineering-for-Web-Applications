// init navigation element
const navElement = document.querySelector("nav");
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");

// change menu type
function toggleMenu() {
    navLinks.classList.toggle("open");
    if (navLinks.classList.contains("open")) {
        navElement.style.position = "fixed";
        navElement.style.width = "100%";
    } else {
        navElement.style.position = "sticky";
        navElement.style.width = "";
    }
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu);
}

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            // sticky position
            navElement.style.position = "sticky";
            navElement.style.width = "";
        }
    });
});
