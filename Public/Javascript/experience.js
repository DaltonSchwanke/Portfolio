var experienceCount = 0;
var experienceIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("experience content token: ", token || "no token");

      /**
     *  The fetch method below is used to get the experience data from the
     *  server. It will then set the data sent back as a variable, then 
     *  create a variable for the section the content will go on the page. 
     *  From there it will iterate over each item in experiences, creating
     *  new elements for each piece of data. Finally it will append it to
     *  the page section. 
     */
      fetch('/experience').then(response => response.json()).then(data => {
        const experiences = data.experience;
        const experienceSection = document.querySelector(".experienceContainer");
        experiences.forEach(experience => {
            experienceCount++;
            const experienceDiv = document.createElement('div');
            experienceDiv.classList.add("experienceDiv");
            const company = document.createElement('h2');
            company.textContent = experience.company;
            const title = document.createElement('h3');
            title.textContent = experience.title;
            const dates = document.createElement('h4');
            dates.textContent = experience.dates;
            const logo = document.createElement('img');
            logo.classList.add("experienceImg");
            logo.src = experience.logo || "/Resources/genericExperience.png";
            const description = document.createElement('p');
            description.textContent = experience.description;
            experienceDiv.append(logo);
            experienceDiv.append(company);
            experienceDiv.append(title);
            experienceDiv.append(dates);
            experienceDiv.append(description);
            experienceSection.append(experienceDiv);
        });
    }).catch(err => {
        console.error("Error fetching experience data:", err);
    });


    /**
     *  This code below is used to track the next button 
     *  for the experience carousel. It tracks the button and
     *  on click it will a conditional checking if the experience 
     *  index is maxed out, if not it will increase the 
     *  index, then call 'updateExperienceCarousel()'
     */
    const experienceNextBtn = document.getElementById("experienceNextBtn"); // Correct button ID
    if (experienceNextBtn) {
        experienceNextBtn.addEventListener("click", () => {
            if (experienceIndex < experienceCount - 1) {
                experienceIndex++;
                updateExperienceCarousel();
            }
        });
    }

    /**
     *  This code below is used to track the previous button 
     *  for the experience carousel. It tracks the button and
     *  on click it will a conditional checking if the experience 
     *  index equals 0, if not it will decrease the 
     *  index, then call 'updateExperienceCarousel()'
     */
      const experiencePrevBtn = document.getElementById("experiencePrevBtn");
      if(experiencePrevBtn){
          experiencePrevBtn.addEventListener("click", () => {
              if(experienceIndex > 0){
                  experienceIndex--;
                  updateExperienceCarousel();
              }
          });
      }
});


function updateExperienceCarousel() {
    console.log(`experienceIndex: ${experienceIndex}`);
    console.log(`experienceCount: ${experienceCount}`);
    const experienceContainer = document.querySelector(".experienceContainer");
    experienceContainer.style.transform = `translateX(-${experienceIndex * 100}%)`;
}