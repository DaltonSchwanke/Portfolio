
// Global Variables
var projectCount = 0;
var projectIndex = 0;

/**
 *  Content for when the page loads. 
 */
document.addEventListener('DOMContentLoaded', () => {
    getProjects();
    setProjectCarousel();
});


/**
 *  The function below is used to get the project data and then
 *  display it on the page. It first will send a 'GET' request to 
 *  the server and from there it will take in the data that it gave
 *  back (projects) and create carousel items for each one. Each 
 *  project will contain an image, title, date, description, link, 
 *  and github. If there is no stored image it will set it to a generic
 *  image. The link and github link will be checked and if they are 
 *  undefined then their button will not be displayed. If the user is 
 *  logged in as admin then there will be buttons for each project 
 *  for editing and deleting the project. There is also buttons to 
 *  switch through the project carousel items. 
 */
function getProjects(){
    const token = sessionStorage.getItem('token');
    fetch('/projects').then(response => response.json()).then(data => {

        const projects = data.projects;
        const projectContainer = document.querySelector(".projectContainer");
        projectContainer.innerHTML = '';
        projectCount = 0;

        projects.forEach(project => {
            projectCount++;
            const projectDiv = document.createElement('div');
            const projectDetails = document.createElement('div');
            const thumbnail = document.createElement('img');
            const title = document.createElement('h2');
            const dates = document.createElement('h4');
            const description = document.createElement('p');
            const projectBtn = document.createElement('button');
            const githubBtn = document.createElement('button');
            
            projectDiv.classList.add('projectDiv');
            projectDetails.classList.add('projectDetails');
            thumbnail.classList.add('projectImg');
            title.classList.add('projectTitle');
            dates.classList.add('projectDate');
            description.classList.add('projectDescription');
            projectBtn.classList.add("projectLinkBtn");
            githubBtn.classList.add('projectGithubBtn');
        
            title.textContent = project.title;
            dates.textContent = project.date;
            description.textContent = project.description;
            projectBtn.textContent = "Visit";
            githubBtn.textContent = "Code";
            thumbnail.src = project.thumbnail || "/Resources/genericProject.jpg";
            
            projectBtn.target = "_blank";
            githubBtn.target = "_blank";

            projectBtn.addEventListener('click', () => {
                window.open(project.url, "_blank");
            })
            githubBtn.addEventListener('click', () => {
                window.open(project.github, '_blank');
            });
        
            if (token) {

                const editBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');

                editBtn.classList.add('editProjectBtn');
                deleteBtn.classList.add('deleteProjectBtn');

                editBtn.textContent = "Edit";
                deleteBtn.textContent = "x";

                editBtn.addEventListener('click', () => {
                     editProject(project, projectDiv);
                });
                deleteBtn.addEventListener('click', () => {
                     deleteProject(project.title, projectDiv);
                });

                projectDiv.appendChild(editBtn);
                projectDiv.appendChild(deleteBtn);
            }

            projectDetails.append(title, dates, description);

            if(project.url){
                projectDetails.appendChild(projectBtn);
            }
            if(project.github){
                projectDetails.appendChild(githubBtn);
            }
        

            projectDiv.append(thumbnail, projectDetails);
            projectContainer.append(projectDiv);
        });
        if(token){
            addProjectAddition(projectContainer);
        }

        updateProjectCarousel();
    }).catch(err => {
        console.error('Error fetching project data:', err);
    });
}

/**
 *  The function below is used for adding in a extra item into the 
 *  project carousel that will contain a singluar button that when 
 *  clicked runs a function that opens up a form over the page content 
 *  that the user uses to add in a new project. 
 * 
 * @param {*} parent 
 */
function addProjectAddition(parent) {
    projectCount++;
    const addProjectDiv = document.createElement('div');
    const addProjectBtn = document.createElement('button');

    addProjectDiv.classList.add('addExperienceDiv');
    addProjectBtn.classList.add('addExperienceBtn');

    addProjectBtn.textContent = "+";
    
    addProjectBtn.addEventListener('click', () => {
        addProjectForm(addProjectDiv);
    });

    addProjectDiv.appendChild(addProjectBtn);
    parent.appendChild(addProjectDiv);
}


function addProjectForm(div){
    div.innerHTML = '';
    const addProjectForm = document.createElement("div");
    const addProjectTitle = document.createElement('h2');
    const titleInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const thumbnailInput = document.createElement('input');
    const dateInput = document.createElement('input');
    const linkInput = document.createElement('input');
    const githubInput = document.createElement('input');
    const submitProjectForm = document.createElement("button");
    const closeProjectForm = document.createElement("button");

    addProjectForm.classList.add("projectForm");
    addProjectTitle.classList.add("projectTitle");
    titleInput.classList.add("titleInput");
    descriptionInput.classList.add("descriptionInput");
    thumbnailInput.classList.add("thumbnailInput");
    dateInput.classList.add("dateInput");
    linkInput.classList.add("linkInput");
    githubInput.classList.add("githubInput");
    submitProjectForm.classList.add("submitPForm");
    closeProjectForm.classList.add("closePForm");

    titleInput.type = 'text';
    descriptionInput.type = 'text';
    thumbnailInput.type = "image";
    dateInput.type = "date";
    linkInput.type = "url";
    githubInput.type = "url";
    
    addProjectTitle.textContent = "Add Project";
    titleInput.placeholder = "Title";
    descriptionInput.placeholder = "Description";
    linkInput.placeholder = "Does it have a live link? Add the URL";
    githubInput.placeholder = "add it here big man!";
    submitProjectForm.textContent = "Save";
    closeProjectForm.textContent = "x";

    closeProjectForm.addEventListener("click", () => {
        event.preventDefault();
        getProjects();
    });

    submitProjectForm.addEventListener("click", () => {
        event.preventDefault();
        newPThumbnail = thumbnailInput.value || "/Resources/genericProject.jpg"; 
        newPTitle = titleInput.value;
        newPDate = dateInput.value;
        newPDescription = descriptionInput.value;
        newPLink = linkInput.value;
        newPGithub = githubInput.value;
        checkRequiredProject(newPThumbnail, newPTitle, newPDate, newPDescription, newPLink, newPGithub, addProjectForm, true, undefined);
    });


    addProjectForm.appendChild(addProjectTitle);
    addProjectForm.appendChild(thumbnailInput);
    addProjectForm.appendChild(titleInput);
    addProjectForm.appendChild(dateInput);
    addProjectForm.appendChild(descriptionInput);
    addProjectForm.appendChild(linkInput);
    addProjectForm.appendChild(githubInput);
    addProjectForm.appendChild(submitProjectForm);
    addProjectForm.appendChild(closeProjectForm);
    div.appendChild(addProjectForm);
}

/**
 *  This function is used to check the form inputs if they are required. If one 
 *  of them is null/undefined then it opens a pop up for 3 seconds stating the
 *  there is a missing field in the form and which one it is. Once that is fone it then returns. 
 * 
 * @param {*} titleValue 
 * @param {*} descriptionValue 
 * @returns 
 */
function checkRequiredProject(thumbnaillValue, titleValue, dateValue, descriptionValue, linkValue, githubValue, div, isNew, searchTitle){

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("addPError");

    if(!titleValue){
        errorBlock.textContent = "Missing Field: Title";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    } else if(!descriptionValue){
        errorBlock.textContent = "Missing Field: Description";
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
        return;
    } else if (isNew){
        addProject(thumbnaillValue, titleValue, dateValue, descriptionValue, linkValue, githubValue, div);
    } else if (!isNew){
        updateProject(thumbnaillValue, titleValue, dateValue, descriptionValue, linkValue, githubValue, div, searchTitle);
    }
}



function addProject(newPThumbnail, newPTitle, newPDate, newPDescription, newPLink, newPGithub, div){

    console.log("Entering add Project Route");

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("addPError");
    fetch('/add-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: newPTitle,
            url: newPLink,
            github: newPGithub,
            thumbnail: newPThumbnail,
            date: newPDate,
            description: newPDescription,
            languages: [],
            frameworks: [],
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
            getProjects();
    })
    .catch(error => {
        errorBlock.textContent = "Error Adding Project: " + error;
        div.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 3000);
    });
    console.log("Ending add Project Route");

}




function editProject(data, div){
    div.innerHTML = '';
    const oldTitle = data.title;
    const editProjectForm = document.createElement("div");
    const editProjectTitle = document.createElement('h2');
    const titleInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const thumbnailInput = document.createElement('input');
    const dateInput = document.createElement('input');
    const linkInput = document.createElement('input');
    const githubInput = document.createElement('input');
    const submitProjectForm = document.createElement("button");
    const closeProjectForm = document.createElement("button");

    editProjectForm.classList.add("projectForm");
    editProjectTitle.classList.add("projectTitle");
    titleInput.classList.add("titleInput");
    descriptionInput.classList.add("descriptionInput");
    thumbnailInput.classList.add("thumbnailInput");
    dateInput.classList.add("dateInput");
    linkInput.classList.add("linkInput");
    githubInput.classList.add("githubInput");
    submitProjectForm.classList.add("submitPForm");
    closeProjectForm.classList.add("closePForm");

    titleInput.type = 'text';
    descriptionInput.type = 'text';
    thumbnailInput.type = "image";
    dateInput.type = "date";
    linkInput.type = "url";
    githubInput.type = "url";
    
    editProjectTitle.textContent = "Edit " + data.title + " Project" ;
    titleInput.value = data.title || "" ;
    descriptionInput.value = data.description || "";
    linkInput.value = data.url || "";
    githubInput.value = data.github || "";
    submitProjectForm.textContent = "Save";
    closeProjectForm.textContent = "x";

    submitProjectForm.addEventListener("click", () => {
        event.preventDefault();
        newPThumbnail = thumbnailInput.value || "/Resources/genericProject.jpg"; 
        newPTitle = titleInput.value;
        newPDate = dateInput.value;
        newPDescription = descriptionInput.value;
        newPLink = linkInput.value;
        newPGithub = githubInput.value;
        checkRequiredProject(newPThumbnail, newPTitle, newPDate, newPDescription, newPLink, newPGithub, editProjectForm, false, oldTitle);
    });

    closeProjectForm.addEventListener("click", () => {
        event.preventDefault();
        getProjects();
    });

    editProjectForm.appendChild(editProjectTitle);
    editProjectForm.appendChild(thumbnailInput);
    editProjectForm.appendChild(titleInput);
    editProjectForm.appendChild(dateInput);
    editProjectForm.appendChild(descriptionInput);
    editProjectForm.appendChild(linkInput);
    editProjectForm.appendChild(githubInput);
    editProjectForm.appendChild(submitProjectForm);
    editProjectForm.appendChild(closeProjectForm);
    div.appendChild(editProjectForm);
}



function updateProject(thumbnail, title, description, date, link, github, form, searchTitle){
    console.log("Entering Update Project Route");

    const errorBlock = document.createElement("div");
    errorBlock.classList.add("addPError");
    fetch('/update-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            oldTitle: searchTitle,
            title: title,
            url: link,
            github: github,
            thumbnail: thumbnail,
            date: date,
            description: description,
            languages: [],
            frameworks: [],
        })
    })
    .then(response => response.json())
    .then(data => {
        getProjects();
    })
    .catch((error) => {
        const errorBlock = document.createElement('div');
        errorBlock.classList.add("updateExpError");
        errorBlock.textContent =  "Error Updating " + searchTitle + ": " + error;
        form.appendChild(errorBlock);
        setTimeout(() => {
            errorBlock.style.display = 'none';
        }, 5000);
    });
    console.log("Ending Updating Project Route");
}




function deleteProject(title, div){
    console.log("Entering Delete Project Route");
    const errorBlock = document.createElement("div");
    errorBlock.classList.add("addPError");
    fetch('/delete-project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title })
    })
    .then(response => response.json())
    .then(data => {
        projectCount--;
        getProjects();
    })
    .catch((error) => {
        const deleteError = document.createElement('div');
        deleteError.classList.add("deleteProjectError");
        deleteError.textContent = "Error Deleting " + title + ": " + error;
        div.appendChild(deleteError);
        setTimeout(() => {
            deleteError.style.display = 'none';
        }, 3000);
    });
    console.log("Ending Delete Project Route");
}










/**
 *  This function is used to set the function for the projects
 *  when the page laods. It will crete an instance of the project
 *  next and previous buttons and from there add event listeners
 *  for them. When they are clicked they will either increment or 
 *  decrement the project index and then call the function
 *  'updateProjectCarousel'. 
 */
function setProjectCarousel(){
    const projectNextBtn = document.getElementById("projectNextBtn");
    const projectPrevBtn = document.getElementById("projectPrevBtn");

    if (projectNextBtn) {
        projectNextBtn.addEventListener("click", nextProject);
    }
    if (projectPrevBtn) {
        projectPrevBtn.addEventListener("click", previousProject);
    }
}

function nextProject(){
    if (projectIndex < projectCount - 1) {
        projectIndex++;
        updateProjectCarousel();
    }
}

function previousProject(){
    if (projectIndex > 0) {
        projectIndex--;
        updateProjectCarousel();
    }
}



/**
 *  The function below is used to update what is shown in the carousel. 
 *  it will get the an instance of the buttons and from there set the 
 *  x axis of the container to the x value and subtract the project 
 *  index * 100 as a percentage. Below that there is three conditions
 *  that control the visibility of the next and previous buttons. If 
 *  the user is on the first item it will remove the previous button. If
 *  the user is at the end of the list then it will remove the next button. 
 *  If there is only one or less project items then it won't show either 
 *  button. 
 */
function updateProjectCarousel() {
    const projectContainer = document.querySelector("#projects .projectContainer");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    const projectNextBtn = document.getElementById("projectNextBtn");

    projectContainer.style.transform = `translateX(-${projectIndex * 100}%)`;

    if (projectPrevBtn) {
        projectPrevBtn.style.display = projectIndex === 0 ? 'none' : 'block';
    }

    if (projectNextBtn) {
        projectNextBtn.style.display = projectIndex === projectCount - 1 ? 'none' : 'block';
    }
    
    if(projectCount <= 1 ){
        projectPrevBtn.style.display = 'none';
        projectNextBtn.style.display = 'none';
    }
}
