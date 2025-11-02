document.addEventListener("DOMContentLoaded", () => {
    const contactButtons = document.querySelectorAll(".go-contact");
    const targetURL = "pages/form.html";
    if (contactButtons.length > 0) {
        contactButtons.forEach((button) => {
            button.addEventListener("click", () => {
                window.location.href = targetURL;
                // window.open(targetURL, "_blank");
            });
        });
    } else {
        console.warn(
            "Ostrzeżenie: Nie znaleziono żadnych elementów z klasą .go-contact. Kod nawigacji nie został aktywowany."
        );
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const contactButtons = document.querySelectorAll(".navbar-logo");
    const targetURL = "/Software-Engineering-for-Web-Applications/Project-01/";
    if (contactButtons.length > 0) {
        contactButtons.forEach((button) => {
            button.addEventListener("click", () => {
                window.location.href = targetURL;
                // window.open(targetURL, "_blank");
            });
        });
    } else {
        console.warn(
            "Ostrzeżenie: Nie znaleziono żadnych elementów z klasą .go-contact. Kod nawigacji nie został aktywowany."
        );
    }
});
