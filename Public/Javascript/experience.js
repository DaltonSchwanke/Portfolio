var experienceCount = 0;
var experienceIndex = 0;


document.addEventListener('DOMContentLoaded', () => {
    getExperience();
    setCarousel();
});



function getExperience(){
    fetch('/experience').then(response => response.json()).then(data => {
        const token = sessionStorage.getItem('token');
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
            const editExperienceBtn = document.createElement('button');
            const deleteExperienceBtn = document.createElement('button');

            experienceDiv.classList.add("experienceDiv");
            company.classList.add("companyName");
            title.classList.add("experienceTitle");
            dates.classList.add("experienceDates");
            logo.classList.add("experienceImg");
            description.classList.add("experienceDescription");
            editExperienceBtn.classList.add("editExperienceBtn");
            deleteExperienceBtn.classList.add("deleteExperienceBtn");

            company.textContent = experience.company;
            title.textContent = experience.title;
            dates.textContent = experience.dates;
            description.textContent = experience.description;
            editExperienceBtn.textContent = "Edit";
            deleteExperienceBtn.textContent = "x";
            logo.src = experience.logo || "/Resources/genericExperience.png";

            if(token){
                experienceDiv.appendChild(editExperienceBtn);
                experienceDiv.appendChild(deleteExperienceBtn);
            }
            experienceDiv.append(logo, company, title, dates, description);
            experienceSection.append(experienceDiv);
        });

        updateExperienceCarousel();
    }).catch(err => {
        console.error("Error fetching experience data:", err);
    });
}


/**
 *  This function is used to to initialize the page carousel. It
 *  creates instances of the next and previous button and then 
 *  creates event listeners for when either is clicked. When clicked
 *  if will either increment or decrement the page index and then call
 *  the function 'updateExperienceCarousel'.
 */
function setCarousel(){
    const experienceNextBtn = document.getElementById("experienceNextBtn");
    const experiencePrevBtn = document.getElementById("experiencePrevBtn");

    if (experienceNextBtn) {
        experienceNextBtn.addEventListener("click", () => {
            if (experienceIndex < experienceCount - 1) {
                experienceIndex++;
                updateExperienceCarousel();
            }
        });
    }
    if (experiencePrevBtn) {
        experiencePrevBtn.addEventListener("click", () => {
            if (experienceIndex > 0) {
                experienceIndex--;
                updateExperienceCarousel();
            }
        });
    }
}

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
    if(experienceCount <= 1){
        experienceNextBtn.style.display = 'none';
        experiencePrevBtn.style.display = 'none';
    }
}