var educationCount = 0;
var educationIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("education content token: ", token || "no token");

    /** 
     *  This section is used to get the data for the education section
     *  it once it gets the data back it will loop through each item in
     *  the array. For each item it will create a new element for that 
     *  piece of data before appending it to it's div container and 
     *  then to the 'aboutSection' on the home page. 
     */
    fetch('/education').then(response => response.json()).then(data => {
        const educations = data.educations;
        const educationSection = document.querySelector(".educationContainer");
        educations.forEach(education => {
            educationCount++;
            const educationDiv = document.createElement('div');
            educationDiv.classList.add("educationDiv");
            const school = document.createElement('h2');
            school.textContent = education.school;
            const title = document.createElement('h3');
            title.textContent = education.title;
            const dates = document.createElement('h4');
            dates.textContent = education.dates;
            const logo = document.createElement('img');
            logo.classList.add("educationImg");
            logo.src = education.logo || "/Resources/education.png";
            const description = document.createElement('p');
            description.textContent = education.description;
            educationDiv.appendChild(school);
            educationDiv.appendChild(title);
            educationDiv.appendChild(dates);
            educationDiv.appendChild(logo);
            educationDiv.appendChild(description);
            educationSection.appendChild(educationDiv);
        });
    }).catch(err => {
        console.error("Error fetching education data:", err);
    });


    /**
     *  This code below is used to track the next button 
     *  for the experience carousel. It tracks the button and
     *  on click it will a conditional checking if the experience 
     *  index is maxed out, if not it will increase the 
     *  index, then call 'updateExperienceCarousel()'
     */
    const educationNextBtn = document.getElementById("educationNextBtn");
    if(educationNextBtn){
        educationNextBtn.addEventListener("click", () => {
            if (educationIndex < educationCount - 1) {
                educationIndex++;
                updateEducationCarousel();
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
    const educationPrevBtn = document.getElementById("educationPrevBtn");
    if(educationPrevBtn){
        educationPrevBtn.addEventListener("click", () => {
            if(educationIndex > 0){
                educationIndex--;
                updateEducationCarousel();
            }
        });
    }

});


function updateEducationCarousel() {
    console.log(`educationIndex: ${educationIndex}`);
    console.log(`educationCount: ${educationCount}`);
    const educationContainer = document.querySelector(".educationContainer");
    educationContainer.style.transform = `translateX(-${educationIndex * 100}%)`;
}