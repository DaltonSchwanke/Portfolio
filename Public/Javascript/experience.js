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
        experienceSection.innerHTML = '';
        experienceCount = experiences.length;
        console.log("getExp: ", experienceCount);

        experiences.forEach(experience => {

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
            dates.textContent = formatDate(experience.startDate) + " - " + formatDate(experience.endDate || "Current");
            description.textContent = experience.description;
            editExperienceBtn.textContent = "Edit";
            deleteExperienceBtn.textContent = "x";
            logo.src = experience.logo || "/Resources/genericExperience.png";

            editExperienceBtn.addEventListener('click', () => {
                event.preventDefault();
                editExperience(experience, experienceDiv);
            });
            deleteExperienceBtn.addEventListener('click', () => {
                event.preventDefault();
                deleteExperience(experience.title, experienceDiv);
            });

            if(token){
                experienceDiv.appendChild(editExperienceBtn);
                experienceDiv.appendChild(deleteExperienceBtn);
            }
            experienceDiv.append(logo, company, title, dates, description);
            experienceSection.append(experienceDiv);
        });
        if(token){
            addExperienceAddition(experienceSection);
        }

        updateExperienceCarousel();
    }).catch(err => {
        console.error("Error fetching experience data:", err);
    });
}

/**
 *  This function is used to add in another experience item
 *  containing a button. Once the button is pressed it will then
 *  call the function 'addExperience' allowing the user to add in 
 *  a new experience item. 
 * 
 * @param {*} parent 
 */
function addExperienceAddition(parent) {
    experienceCount++;
    const addExperienceDiv = document.createElement('div');
    const addExperienceBtn = document.createElement('button');

    addExperienceDiv.classList.add('addExperienceDiv');
    addExperienceBtn.classList.add('addExperienceBtn');

    addExperienceBtn.textContent = "+";
    
    addExperienceBtn.addEventListener('click', () => {
        addExperienceForm(addExperienceDiv);
    });

    addExperienceDiv.appendChild(addExperienceBtn);
    parent.appendChild(addExperienceDiv);
}


/**
 *  This function is used to show the add experience 
 *  form. It will clear out the current carousel content
 *  and then create the form and form elements. It
 *  will then set classes to the elements and their 
 *  parameters. It then sets actions for the button to either submit
 *  or close the form. If the user closes the page it will just reset
 *  the experience section. If the user submits the form it will then
 *  set each piece of data to a variable before passing it all in the 
 *  function 'addExperience'.
 *  
 * @param {*} div 
 */
function addExperienceForm(div){
    div.innerHTML = '';
    const addExpForm = document.createElement('form');
    const title = document.createElement('h2');
    const titleInput = document.createElement('input');
    const companyInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const startDateLabel = document.createElement('label');
    const startDate = document.createElement('input');
    const endDateLabel = document.createElement('label');
    const endDate = document.createElement('input');
    const logoLabel = document.createElement('label');
    const logoInput = document.createElement('input');
    const submitForm = document.createElement('button');
    const closeForm = document.createElement('button');

    addExpForm.classList.add('experienceForm');
    title.classList.add('experienceFormTitle');
    titleInput.classList.add('experienceTitleInput');
    companyInput.classList.add('experienceCompanyInput');
    descriptionInput.classList.add('experienceDescriptionInput');
    startDateLabel.classList.add('startDateLabel');
    startDate.classList.add('startDateInput');
    endDateLabel.classList.add('endDateLabel');
    endDate.classList.add('endDateInput');
    logoLabel.classList.add('logoLabel');
    logoInput.classList.add("logoInput");
    submitForm.classList.add("submitExperienceForm");
    closeForm.classList.add("closeExperienceForm");

    titleInput.type = "text";
    companyInput.type = "text";
    descriptionInput.type = "text";
    startDate.type = "date";
    endDate.type = "date";
    logoInput.type = "image";

    titleInput.placeholder = "Title";
    companyInput.placeholder = "Company";
    descriptionInput.placeholder = "Description";

    startDateLabel.textContent = "Start Date";
    endDateLabel.textContent = "End Date";
    logoLabel.textContent = "Logo";
    submitForm.textContent = "Save";
    closeForm.textContent = "x";

    closeForm.addEventListener('click', () => {
        event.preventDefault();
        getExperience();
    });

    submitForm.addEventListener("click", () => {
        event.preventDefault();
        var newExpTitle = titleInput.value;
        var newExpCompany = companyInput.value;
        var newExpDescription = descriptionInput.value;
        var newExpStartDate = startDate.value;
        var newExpEndDate = endDate.value;
        var newExpLogo = logoInput.value || "/Resources/genericExperience.png";
        addExperience(newExpTitle, newExpCompany, newExpDescription, newExpStartDate, newExpEndDate, newExpLogo, addExpForm);
    });

    addExpForm.appendChild(submitForm);
    addExpForm.appendChild(closeForm);
    addExpForm.appendChild(title);
    addExpForm.appendChild(titleInput);
    addExpForm.appendChild(companyInput);
    addExpForm.appendChild(descriptionInput);
    addExpForm.appendChild(startDateLabel);
    addExpForm.appendChild(startDate);
    addExpForm.appendChild(endDateLabel);
    addExpForm.appendChild(endDate);
    addExpForm.appendChild(logoLabel);
    addExpForm.appendChild(logoInput);
    div.appendChild(addExpForm);
}


/**
 *  This function is used to add in a new experience. It will
 *  check to see if title, company, description, and start date
 *  are not null. If so it will then add a message, and show it 
 *  on the form for 3 seconds before removing it. Otherwise it 
 *  will send a 'POST' request to the server to add in the experience.
 *  If it was successful it will then reload the experience 
 *  section to show the new added experience. 
 *  
 * @param {*} newExpTitle 
 * @param {*} newExpCompany 
 * @param {*} newExpDescription 
 * @param {*} newExpStartDate 
 * @param {*} newExpEndDate 
 * @param {*} newExpLogo 
 * @param {*} div 
 * @returns 
 */
function addExperience(newExpTitle, newExpCompany, newExpDescription, newExpStartDate, newExpEndDate, newExpLogo, div) {

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("addExpError");

    if(!newExpTitle){
        errorBlock.textContent = "Missing Field: Title";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    }
    if(!newExpCompany){
        errorBlock.textContent = "Missing Field: Company";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    }
    if(!newExpDescription){
        errorBlock.textContent = "Missing Field: Description";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    }
    if(!newExpStartDate){
        errorBlock.textContent = "Missing Field: Start Date";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    }

    fetch('/add-experience', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            company: newExpCompany,
            title: newExpTitle,
            startDate: newExpStartDate,
            endDate: newExpEndDate || "Current",
            logo: newExpLogo,
            description: newExpDescription,
        })
    })
    .then(response => {
        if (!response.ok) {
            errorBlock.textContent = (new Error (`HTTP error! status: ${response.status}`) + response.json());
            div.appendChild(errorBlock);
            setTimeout(() => {
                errorBlock.style.display = 'none';
            }, 3000);
        }
    })
    .then(data => {
        console.log(data);
        getExperience();
    })
    .catch(error => {
        errorBlock.textContent = "Error Adding Experience: " + error;
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
    });
}



/**
 *  This function is used to open the edit experience form and 
 *  edit the experience data. It will first clear the elements 
 *  out of the experience container, from there it will create
 *  the form and elements used for editting. It will set the
 *  classes for all of this data, preload in the values that 
 *  already exist, and from there append all the content to the
 *  container. It also contains method to save and close the form. 
 *  If the user closes it, it will just reload the experience 
 *  content. If the user saves it, then it will collect all data, 
 *  and pass it all to the function 'updateExperience'. 
 * 
 * @param {*} data 
 */
function editExperience(data, div){
    div.innerHTML = '';
    const curTitle = data.title;
    const experienceForm = document.createElement('form');
    const title = document.createElement('h2');
    const titleInput = document.createElement('input');
    const companyInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const startDateLabel = document.createElement('label');
    const startDate = document.createElement('input');
    const endDateLabel = document.createElement('label');
    const endDate = document.createElement('input');
    const logoLabel = document.createElement('label');
    const logoInput = document.createElement('input');
    const submitForm = document.createElement('button');
    const closeForm = document.createElement('button');

    experienceForm.classList.add('experienceForm');
    title.classList.add('experienceFormTitle');
    titleInput.classList.add('experienceTitleInput');
    companyInput.classList.add('experienceCompanyInput');
    descriptionInput.classList.add('experienceDescriptionInput');
    startDateLabel.classList.add('startDateLabel');
    startDate.classList.add('startDateInput');
    endDateLabel.classList.add('endDateLabel');
    endDate.classList.add('endDateInput');
    logoLabel.classList.add('logoLabel');
    logoInput.classList.add("logoInput");
    submitForm.classList.add("submitExperienceForm");
    closeForm.classList.add("closeExperienceForm");

    titleInput.type = "text";
    companyInput.type = "text";
    descriptionInput.type = "text";
    startDate.type = "date";
    endDate.type = "date";
    logoInput.type = "image";

    titleInput.value = data.title || "";
    companyInput.value = data.company || "";
    descriptionInput.value = data.description || "" ;
    startDate.value = data.startDate || "" ;
    endDate.value = data.endDate || "";
    logoInput.value = data.logo || "/Resources/genericExperience.png";

    title.textContent = "Edit " + data.title + " Experience";
    startDateLabel.textContent = "Start Date";
    endDateLabel.textContent = "End Date";
    logoLabel.textContent = "Logo";
    submitForm.textContent = "Save";
    closeForm.textContent = "x";

    closeForm.addEventListener('click', () => {
        event.preventDefault();
        getExperience();
    });

    submitForm.addEventListener("click", () => {
        event.preventDefault();
        var newTitle = titleInput.value;
        var newCompany = companyInput.value;
        var newDescription = descriptionInput.value;
        var newStartDate = startDate.value;
        var newEndDate = endDate.value;
        var newLogo = logoInput.value || "/Resources/genericExperience.png";
        updateExperience(newTitle, newCompany, newDescription, newStartDate, newEndDate, newLogo, curTitle, experienceForm);
    });

    experienceForm.appendChild(submitForm);
    experienceForm.appendChild(closeForm);
    experienceForm.appendChild(title);
    experienceForm.appendChild(titleInput);
    experienceForm.appendChild(companyInput);
    experienceForm.appendChild(descriptionInput);
    experienceForm.appendChild(startDateLabel);
    experienceForm.appendChild(startDate);
    experienceForm.appendChild(endDateLabel);
    experienceForm.appendChild(endDate);
    experienceForm.appendChild(logoLabel);
    experienceForm.appendChild(logoInput);
    div.appendChild(experienceForm);
}






/**
 *  The function below is used to update an experience item. It takes in the new data and
 *  the current title, and form container. It will send a post request to update the
 *  experience item and if it comes back successful then it will close the form and run 
 *  the function 'getExperience' refreshing the section with the updated content. If it was 
 *  not successful it will add a error message to the form container stating an error has 
 *  happened along with the error message send back from the server for 5 seconds before 
 *  turning it's display to none.
 * 
 * @param {*} title 
 * @param {*} company 
 * @param {*} description 
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} logo 
 * @param {*} oldTitle 
 * @param {*} form 
 */
function updateExperience(title, company, description, startDate, endDate, logo, oldTitle, form){
    fetch('/update-experience', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldTitle: oldTitle,
            title: title,
            company: company,
            description: description,
            startDate: startDate,
            endDate: endDate,
            logo: logo
        })
    })
    .then(response => response.json())
    .then(data => {
        getExperience();
    })
    .catch((error) => {
        const errorBlock = document.createElement('div');
        errorBlock.classList.add("updateExpError");
        errorBlock.textContent =  "Error Updating " + oldTitle + ": " + error;
        form.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 5000);
    });
}


/**
 *  This function is used to delete a experience item. It will first
 *  create a pop up if the user is trying to delete the only experience
 *  item, then after a second it will remove the popup and return.
 *  Otherwise it will send a 'POST' request to the server to remove the 
 *  experience item from the data file. Once the data is sent back it will
 *  decrement the experienceCount and reload the experiene content. If it 
 *  couldn't delete it then it will add a message to the experience item
 *  saying there was an error deleting the item. 
 * 
 * @param {*} title 
 */
function deleteExperience(title, div){
    if(experienceCount <= 2){
        const experiencePopup = document.createElement("div");
        experiencePopup.classList.add('experiencePopup');
        experiencePopup.textContent = "Can't Delete Last Experience Item";
        const container = document.querySelector(".experienceContainer");
        container.appendChild(experiencePopup);
        setTimeout(() => {
            experiencePopup.style.display = 'none';
        }, 1000);
        return;
    }

    fetch('/delete-experience', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title })
    })
    .then(response => response.json())
    .then(data => {
        experienceCount--;
        getExperience();
    })
    .catch((error) => {
        const deleteError = document.createElement('div');
        deleteError.classList.add("deleteExpError");
        deleteError.textContent = "Error Deleting " + title + ": " + error;
        div.appendchild(deleteError);
        setTimeout(() => {
            deleteError.style.display = 'none';
        }, 3000);
    });
}


/**
 *  This function below is used to modify the dates used for the experience 
 *  items. It takes in a date formatted as "MM/DD/YYYY" and will return a 
 *  string containing the month (written out) and year for a cleaner UI.  
 * 
 * @param {*} date accepts formats MM/DD/YYYY, M/DD/YYYY, MM/D/YYYY
 * @returns  "Month YYYY"
 */
function formatDate(date) {
    if (!date || date === "Current" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
    }

    const [year, month, day] = date.split('-');
    const modDate = new Date(year, month - 1, day);
    const options = { month: 'long', year: 'numeric' };
    return modDate.toLocaleDateString('en-US', options);
}


/**
*  This function is used to to initialize the page carousel. It
*  creates instances of the next and previous button and then 
*  creates event listeners for when either is clicked. When clicked
*  if will either increment or decrement the page index and then call
*  the function 'updateExperienceCarousel'.
*/
function setCarousel(){
    console.log("setCar start: ", experienceIndex);
    const experienceNextBtn = document.getElementById("experienceNextBtn");
    const experiencePrevBtn = document.getElementById("experiencePrevBtn");

    if (experienceNextBtn) {
        experienceNextBtn.addEventListener("click", nextExperience); 
    }
    if (experiencePrevBtn) {
        experiencePrevBtn.addEventListener("click", previousExperience);
    }
}


/** 
 *  This function is a helper used to move to the next carousel item. 
 *  it will ensure there is next element in the carousel, and if so it will
 *  then increment the experience index, and then call the function
 *  'updateExperienceCarousel'. 
 */
function nextExperience(){
    if (experienceIndex < experienceCount - 1) {
        experienceIndex++;
        updateExperienceCarousel();
    }
}


 /**
  *  This function is a helper used to move to the previous carousel item. It
  *  will ensure there is a previous item in the carousel, and if so
  *  it will then decrement the experience index, and then call the function 
  *  'updateExperienceCarousel'
  */
function previousExperience(){
    if (experienceIndex > 0) {
        experienceIndex--;
        updateExperienceCarousel();
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