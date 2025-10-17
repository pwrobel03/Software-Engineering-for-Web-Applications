const scheduleData = {
    day1: [
        {
            time: "17:00",
            title: "Otwarcie maratonu",
            description: "Rejestracja uczestników",
        },
        {
            time: "18:00",
            title: "Wykład inauguracyjny",
            description: "Ewolucja gatunku fantasy",
        },
        {
            time: "19:00",
            title: "Sesja czytelnicza #1",
            description: "Rozpoczęcie maratonu",
        },
        {
            time: "21:00",
            title: "Spotkanie z autorem",
            description: "Andrzej Pilipiuk",
        },
    ],
    night: [
        {
            time: "00:00",
            title: "Północna sesja",
            description: "Czytanie przy świecach",
        },
        {
            time: "02:00",
            title: "Dyskusja nocna",
            description: "Polska szkoła fantasy",
        },
        {
            time: "04:00",
            title: "Ciche czytanie",
            description: "Strefa relaksu",
        },
    ],
    day2: [
        {
            time: "08:00",
            title: "Poranna sesja",
            description: "Śniadanie i czytanie",
        },
        {
            time: "10:00",
            title: "Warsztaty",
            description: "Tworzenie światów fantasy",
        },
        {
            time: "12:00",
            title: "Panel dyskusyjny",
            description: "Tolkien vs Martin",
        },
        {
            time: "14:00",
            title: "Sesja grupowa",
            description: "Czytanie na głos",
        },
        {
            time: "16:00",
            title: "Zakończenie",
            description: "Wręczenie certyfikatów",
        },
    ],
};

// Funkcja generująca HTML dla wybranej sekcji
function generateSchedule(section) {
    const events = scheduleData[section];
    let html = '<div class="schedule-content active">';

    events.forEach((event, index) => {
        html += `
                    <div class="event-item" data-delay="${index * 150}">
                        <div class="event-time">${event.time}</div>
                        <div class="event-details">
                            <h3>${event.title}</h3>
                            <p>${event.description}</p>
                        </div>
                    </div>
                `;
    });

    html += "</div>";
    return html;
}

// Funkcja animująca pojawianie się elementów
function animateEvents() {
    const eventItems = document.querySelectorAll(".event-item");

    eventItems.forEach((item) => {
        const delay = parseInt(item.getAttribute("data-delay"));

        setTimeout(() => {
            item.classList.add("visible");
            item.classList.add("fade-in-up");
        }, delay);
    });
}

// Funkcja zmieniająca aktywną zakładkę
function changeTab(tabName) {
    // Pokaż loading
    // document.getElementById("schedule-content").innerHTML =
    //     '<div class="loading">Ładowanie programu...</div>';

    // Zmiana zakładek z opóźnieniem dla płynności
    setTimeout(() => {
        // Usuń aktywną klasę ze wszystkich zakładek
        document.querySelectorAll(".tab").forEach((tab) => {
            tab.classList.remove("active");
        });

        // Dodaj aktywną klasę do klikniętej zakładki
        document
            .querySelector(`[data-tab="${tabName}"]`)
            .classList.add("active");

        // Wygeneruj nową zawartość
        document.getElementById("schedule-content").innerHTML =
            generateSchedule(tabName);

        // Uruchom animację
        animateEvents();
    }, 0);
}

// Obsługa kliknięć w zakładki
document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        const tabName = this.getAttribute("data-tab");
        changeTab(tabName);
    });
});

// Inicjalizacja - pokaż pierwszą zakładkę z animacją
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("schedule-content").innerHTML =
        generateSchedule("day1");
    animateEvents();
});
