// Global Variables 
var experienceCount = 0;
var experienceIndex = 0;


/**
 *  Content for when the page loads. 
 */
document.addEventListener('DOMContentLoaded', () => {
    getExperience();
    setCarousel();
});



/**
 *  The function below is used to get the experience data 
 *  from the server and from there it will create carousel items for 
 *  each experience. Each item will have a image for the logo, title,
 *  company, dates, description. If the user is logged in as admin then
 *  there will be edit and delete buttons for each item and when the 
 *  user clicks on them it will run a function to either 'editExperience' 
 *  or it will run 'deleteExperience'. 
 */
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

            editExperienceBtn.addEventListener('click', () => {
                editExperience(experience);
            });
            deleteExperienceBtn.addEventListener('click', () => {
                deleteExperience(experience);
            });

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
 *  This function is used to update the carousel for the experience section. 
 *  It will create an instance of the previous and next button for the section 
 *  and from there whenever the carousel is updated it will run three
 *  conditionals. The first will remove the previous button when the first 
 *  item is shown, the second will remove the next button if the user is on the 
 *  last item. The last conditional will remove both if thre is less than 2 items. 
 */
function updateExperienceCarousel() {
    const experienceContainer = document.querySelector(".experienceContainer");
    const experienceNextBtn = document.getElementById("experienceNextBtn");
    const experiencePrevBtn = document.getElementById("experiencePrevBtn");

    experienceContainer.style.transform = `translateX(-${experienceIndex * 100}%)`;

    if (experiencePrevBtn) {
        experiencePrevBtn.style.display = experienceIndex === 0 ? 'none' : 'block';
    }
    if (experienceNextBtn) {
        experienceNextBtn.style.display = experienceIndex === experienceCount - 1 ? 'none' : 'block';
    }
    if(experienceCount <= 1){
        experienceNextBtn.style.display = 'none';
        experiencePrevBtn.style.display = 'none';
    }
}



/**
 *  This function will be used to edit a experience. 
 * 
 * @param {*} data 
 */
function editExperience(data){
    console.log("editing experience: ", data);
}



/**
 *  This function will be used to delete a experience. 
 * 
 * @param {*} data 
 */
function deleteExperience(data){
    console.log("Deleting Experience: ", data);
}