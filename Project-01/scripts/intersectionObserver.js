document.addEventListener("DOMContentLoaded", () => {
    // Klasa, którą dodamy, aby aktywować animację
    const VISIBLE_CLASS = "is-visible";
    // Lub 'is-animated' jeśli używasz @keyframes

    // Opcje obserwatora (definicja kiedy element jest "widoczny")
    const observerOptions = {
        root: null, // Używamy viewportu jako root (obszar widoku)
        rootMargin: "0px",
        // Uznaj element za widoczny, gdy jest widoczny w 10%
        threshold: 0.1,
    };

    // Funkcja wywoływana, gdy elementy zmieniają status widoczności
    function handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            // Jeśli element jest widoczny (entry.isIntersecting jest true)
            if (entry.isIntersecting) {
                // 1. Dodaj klasę aktywującą animację
                entry.target.classList.add(VISIBLE_CLASS);

                // 2. Przestań obserwować ten element, aby animacja wykonała się tylko raz
                observer.unobserve(entry.target);
            }
            // Opcjonalnie: else { entry.target.classList.remove(VISIBLE_CLASS); }
            // Jeśli chcesz, aby element znikał po wyjechaniu poza widok.
        });
    }

    // Utwórz nowego obserwatora
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Znajdź wszystkie sekcje i rozpocznij ich obserwowanie
    const sectionsToAnimate = document.querySelectorAll(".section");
    sectionsToAnimate.forEach((section) => {
        observer.observe(section);
    });
});
