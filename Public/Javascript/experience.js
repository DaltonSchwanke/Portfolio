var experienceCount = 0;
var experienceIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    const experienceNextBtn = document.getElementById("experienceNextBtn");
    const experiencePrevBtn = document.getElementById("experiencePrevBtn");

    /**
     * Fetch and display experience data
     */
    fetch('/experience').then(response => response.json()).then(data => {
        const experiences = data.experience;
        const experienceSection = document.querySelector(".experienceContainer");

        experiences.forEach(experience => {
            experienceCount++;

            const experienceDiv = document.createElement('div');
            const company = document.createElement('h2');
            const title = document.createElement('h3');
            const dates = document.createElement('h4');
            const logo = document.createElement('img');
            const description = document.createElement('p');

            experienceDiv.classList.add("experienceDiv");
            company.classList.add("companyName");
            title.classList.add("experienceTitle");
            dates.classList.add("experienceDates");
            logo.classList.add("experienceImg");
            description.classList.add("experienceDescription");

            company.textContent = experience.company;
            title.textContent = experience.title;
            dates.textContent = experience.dates;
            description.textContent = experience.description;
            logo.src = experience.logo || "/Resources/genericExperience.png";

            experienceDiv.append(logo, company, title, dates, description);
            experienceSection.append(experienceDiv);
        });

        // Ensure the carousel starts in the correct state
        updateExperienceCarousel();
    }).catch(err => {
        console.error("Error fetching experience data:", err);
    });

    /**
     * Add click event for the next button
     */
    if (experienceNextBtn) {
        experienceNextBtn.addEventListener("click", () => {
            if (experienceIndex < experienceCount - 1) {
                experienceIndex++;
                updateExperienceCarousel();
            }
        });
    }

    /**
     * Add click event for the previous button
     */
    if (experiencePrevBtn) {
        experiencePrevBtn.addEventListener("click", () => {
            if (experienceIndex > 0) {
                experienceIndex--;
                updateExperienceCarousel();
            }
        });
    }
});

/**
 * Update the experience carousel and control visibility of navigation buttons
 */
function updateExperienceCarousel() {
    const experienceContainer = document.querySelector(".experienceContainer");
    const experienceNextBtn = document.getElementById("experienceNextBtn");
    const experiencePrevBtn = document.getElementById("experiencePrevBtn");

    // Update the carousel position
    experienceContainer.style.transform = `translateX(-${experienceIndex * 100}%)`;

    // Show or hide the previous button
    if (experiencePrevBtn) {
        experiencePrevBtn.style.display = experienceIndex === 0 ? 'none' : 'block';
    }

    // Show or hide the next button
    if (experienceNextBtn) {
        experienceNextBtn.style.display = experienceIndex === experienceCount - 1 ? 'none' : 'block';
    }
}