const galleryContainer = document.getElementById("gallery-container");
const filterButtonsContainer = document.getElementById("filter-buttons");
const loadingSpinner = document.getElementById("loading-spinner");
let allImages = [];

function toggleLoader(isVisible) {
    if (isVisible) {
        loadingSpinner.classList.add("visible");
    } else {
        loadingSpinner.classList.remove("visible");
    }
}

async function fetchImages() {
    toggleLoader(true); // show loader before fetching data

    try {
        const response = await fetch("/Project-01/assets/images_content.json");
        allImages = await response.json();

        // after collecting data
        renderGallery(allImages);
        generateFilterButtons(allImages);
    } catch (error) {
        console.error("Błąd podczas ładowania danych JSON:", error);
        galleryContainer.innerHTML =
            '<p style="color: red;">Nie udało się załadować galerii. Spróbuj ponownie później.</p>';
    } finally {
        toggleLoader(false);
    }
}

function renderGallery(imagesToDisplay) {
    galleryContainer.innerHTML = "";

    if (imagesToDisplay.length === 0) {
        galleryContainer.innerHTML =
            "<p>Brak zdjęć pasujących do tego tagu.</p>";
        return;
    }

    imagesToDisplay.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        imgElement.alt = image.alt;

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
        galleryItem.appendChild(imgElement);

        galleryContainer.appendChild(galleryItem);
    });
}

// 2. GENEROWANIE PRZYCISKÓW FILTROWANIA
function generateFilterButtons(images) {
    // collecting tags from json file
    const allTags = images.flatMap((image) => image.tags);
    const uniqueTags = new Set(allTags);

    // creating tag buttons
    uniqueTags.forEach((tag) => {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        button.dataset.tag = tag;
        filterButtonsContainer.appendChild(button);
    });

    document.querySelectorAll(".filter-btn").forEach((button) => {
        button.addEventListener("click", handleFilterClick);
    });
}

// handle filter changes
function handleFilterClick(event) {
    const selectedTag = event.target.dataset.tag;

    // Change active button
    document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    let filteredImages;

    if (selectedTag === "wszystkie") {
        filteredImages = allImages;
    } else {
        // Filtering, keeps only images with selected tag
        filteredImages = allImages.filter((image) =>
            image.tags.includes(selectedTag)
        );
    }

    renderGallery(filteredImages);
}

// Render photos
function renderGallery(imagesToDisplay) {
    galleryContainer.innerHTML = "";

    if (imagesToDisplay.length === 0) {
        galleryContainer.innerHTML =
            "<p>Brak zdjęć pasujących do tego tagu.</p>";
        return;
    }

    imagesToDisplay.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        imgElement.alt = image.alt;

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
        galleryItem.appendChild(imgElement);

        galleryContainer.appendChild(galleryItem);
    });
}

fetchImages();
